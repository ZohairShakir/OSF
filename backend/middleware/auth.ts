import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import User from '../models/User';

export const authenticate = async (req: any, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token required' });
    }

    const token = authHeader.split(' ')[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'osf_secret_key_2025');
    
    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'User unauthorized or deactivated' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Session expired. Please login again.' });
  }
};

export const authorize = (roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access restricted to ' + roles.join(' or ') });
    }
    next();
  };
};