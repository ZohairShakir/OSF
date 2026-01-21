import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { BookCall } from './pages/BookCall';

// Create a layout component to handle conditional rendering of Navbar/Footer/WhatsApp
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  // We want the Navbar and Footer to appear on the home page, but also maybe on others if desired.
  // For this design, let's keep them on Home, but maybe not on the dedicated "auth" pages to keep them focused.
  // The prompt asked to "Add Login Sign up and Book a Free Call pages".
  // Usually Login/Signup are distraction-free. Book Call might benefit from a Navbar.
  
  // Let's decide: Navbar everywhere? 
  // The Navbar has links to "Login" and "Sign Up", so if I'm on Login, showing Navbar is redundant or helpful?
  // Let's hide Navbar/Footer on Login and Signup for a cleaner look. Show on Home and BookCall.
  
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  
  return (
    <>
      {!isAuthPage && <Navbar />}
      {children}
      {!isAuthPage && <Footer />}
      {!isAuthPage && <WhatsAppButton />}
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/book-call" element={<BookCall />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
