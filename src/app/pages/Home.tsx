import React from 'react';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { Portfolio } from '../components/Portfolio';
import { Contact } from '../components/Contact';

export const Home = () => {
  return (
    <div className="pt-20"> {/* Add padding top to account for fixed navbar */}
      <Hero />
      <Services />
      <Portfolio />
      <Contact />
    </div>
  );
};
