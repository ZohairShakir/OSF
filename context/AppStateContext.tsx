
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Project, Message, ProjectFile, ActivityLog, ProjectStage } from '../types';

// API Configuration - works in both dev and production
const getApiBase = () => {
  // Check if we're in production build
  const isProd = import.meta.env?.PROD || import.meta.env?.MODE === 'production';
  if (isProd) {
    // In production, use environment variable or default to /api
    return import.meta.env?.VITE_API_URL || '/api';
  }
  // In development, use proxy
  return '/api';
};

const API_BASE = getApiBase();
const API_PROJECTS = `${API_BASE}/projects`;
const API_MESSAGES = `${API_BASE}/messages`;
const API_PUBLIC = `${API_BASE}/public`;
const API_FILES = `${API_BASE}/files`;

interface AppStateContextType {
  projects: Project[];
  messages: Message[];
  files: ProjectFile[];
  activities: ActivityLog[];
  addProject: (project: any) => Promise<void>;
  updateProjectStage: (projectId: string, stage: ProjectStage) => Promise<void>;
  sendMessage: (projectId: string, text: string, isSystem?: boolean) => Promise<void>;
  addFile: (projectId: string, fileData: any) => Promise<void>;
  subscribeEmail: (email: string) => Promise<void>;
  isLoading: boolean;
  refreshData: () => Promise<void>;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getHeaders = useCallback(() => {
    const token = localStorage.getItem('osf_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }, []);

  const refreshData = useCallback(async () => {
    const token = localStorage.getItem('osf_token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const projRes = await fetch(API_PROJECTS, { headers: getHeaders() });
      if (!projRes.ok) throw new Error("Auth failed");
      const projectsData = await projRes.json();
      setProjects(projectsData);

      if (projectsData.length > 0) {
        // Fetch messages for the first active project by default or let dashboard handle it
        const targetId = projectsData[0].id;
        const msgRes = await fetch(`${API_MESSAGES}/${targetId}`, { headers: getHeaders() });
        if (msgRes.ok) {
          const messagesData = await msgRes.json();
          setMessages(messagesData);
        }
        
        // Fetch files for the project
        const filesRes = await fetch(`${API_FILES}/${targetId}`, { headers: getHeaders() });
        if (filesRes.ok) {
          const filesData = await filesRes.json();
          setFiles(filesData);
        }
      }
      
      // Fetch activities (system-wide)
      // Note: Activities are project-specific, so we'll fetch them per project in Dashboard
    } catch (err) {
      console.error('State sync failure:', err);
    } finally {
      setIsLoading(false);
    }
  }, [getHeaders]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const addProject = async (projectData: any) => {
    const res = await fetch(API_PROJECTS, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(projectData)
    });
    if (res.ok) refreshData();
  };

  const updateProjectStage = async (projectId: string, stage: ProjectStage) => {
    const stages = ['Discovery', 'Design', 'Development', 'Review', 'Launch'];
    const progressPercent = Math.round(((stages.indexOf(stage) + 1) / stages.length) * 100);
    
    const res = await fetch(`${API_PROJECTS}/${projectId}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ stage, progressPercent })
    });
    if (res.ok) refreshData();
  };

  const sendMessage = async (projectId: string, text: string, isSystem = false) => {
    const res = await fetch(API_MESSAGES, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ projectId, text, isSystem })
    });
    if (res.ok) {
      const newMessage = await res.json();
      setMessages(prev => [...prev, newMessage]);
      // Refresh messages for this project
      const msgRes = await fetch(`${API_MESSAGES}/${projectId}`, { headers: getHeaders() });
      if (msgRes.ok) {
        const messagesData = await msgRes.json();
        setMessages(messagesData);
      }
    }
  };

  const addFile = async (projectId: string, fileData: any) => {
    const res = await fetch(API_FILES, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ ...fileData, projectId })
    });
    if (res.ok) refreshData();
  };

  const subscribeEmail = async (email: string) => {
    const res = await fetch(`${API_PUBLIC}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (!res.ok) throw new Error("Subscription failed");
  };

  return (
    <AppStateContext.Provider value={{ 
      projects, messages, files, activities,
      addProject, updateProjectStage, sendMessage, addFile, subscribeEmail,
      isLoading, refreshData
    }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
