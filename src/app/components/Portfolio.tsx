import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const categories = ["All", "UI/UX", "Web", "Graphics", "Video"];

const projects = [
  {
    id: 1,
    title: "FinTech Dashboard",
    category: "UI/UX",
    image: "https://images.unsplash.com/photo-1581404999056-8a2f9f24baad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1aSUyMHV4JTIwZGFzaGJvYXJkJTIwZGFyayUyMG1vZGV8ZW58MXx8fHwxNzY4OTc4MTUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    impact: "Increased user retention by 20%"
  },
  {
    id: 2,
    title: "HealthCare App",
    category: "Mobile",
    image: "https://images.unsplash.com/photo-1761305135319-70b8dbde3525?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBkZXNpZ24lMjB2aWJyYW50fGVufDF8fHx8MTc2ODk3ODE1Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    impact: "Boosted daily active users by 45%"
  },
  {
    id: 3,
    title: "E-Commerce Platform",
    category: "Web",
    image: "https://images.unsplash.com/photo-1761623135965-6f32e8a916b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbGVlayUyMG1pbmltYWxpc3QlMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc2ODk3ODE1Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    impact: "Improved conversion rate by 30%"
  },
  {
    id: 4,
    title: "Corporate Rebrand",
    category: "Graphics",
    image: "https://images.unsplash.com/photo-1751644332113-2004a1b143f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMDNkJTIwY29sb3JmdWwlMjBzaGFwZSUyMGRlc2lnbnxlbnwxfHx8fDE3Njg5NzgxNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    impact: "Expanded market reach by 150%"
  },
  {
    id: 5,
    title: "Startup Launch",
    category: "Web",
    image: "https://images.unsplash.com/photo-1758873268663-5a362616b5a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdGFydHVwJTIwdGVhbSUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzY4OTc4MTUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    impact: "Secured Series A funding of $5M"
  },
  {
    id: 6,
    title: "Crypto Wallet",
    category: "UI/UX",
    image: "https://images.unsplash.com/photo-1581404999056-8a2f9f24baad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1aSUyMHV4JTIwZGFzaGJvYXJkJTIwZGFyayUyMG1vZGV8ZW58MXx8fHwxNzY4OTc4MTUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    impact: "Reduced onboarding time by 60%"
  }
];

export const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory || (activeCategory === "Web" && p.category === "Mobile"));

  return (
    <section id="portfolio" className="py-32 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-lg">
            <span className="text-purple-600 font-semibold tracking-wider text-sm uppercase mb-3 block">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Selected Work</h2>
            <p className="text-lg text-gray-500 font-light">Explore how we've helped startups scale through design and engineering excellence.</p>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-8 md:mt-0 p-1.5 bg-white/50 backdrop-blur-sm rounded-full border border-gray-200/50">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-gray-900 text-white shadow-lg"
                    : "text-gray-500 hover:text-gray-900 hover:bg-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-[2rem] overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Glassy Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                     <div className="w-16 h-16 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 delay-75">
                       <ArrowUpRight className="text-white w-8 h-8" />
                     </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{project.title}</h3>
                        <span className="text-sm font-medium text-gray-400">
                          {project.category}
                        </span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-dashed border-gray-200">
                    <p className="text-[#8B5CF6] font-semibold text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] ring-4 ring-purple-50"></span>
                      {project.impact}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
