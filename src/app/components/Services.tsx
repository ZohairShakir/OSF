import React from 'react';
import { motion } from 'motion/react';
import { Layers, Rocket, Code2, PenTool } from 'lucide-react';

const services = [
  {
    icon: <PenTool className="w-7 h-7 text-purple-600" />,
    title: "UI/UX Design",
    description: "User-centric interfaces that drive engagement through intuitive patterns and aesthetic precision.",
    gradient: "from-purple-50 to-indigo-50",
    border: "group-hover:border-purple-200"
  },
  {
    icon: <Code2 className="w-7 h-7 text-blue-600" />,
    title: "Web Development",
    description: "Scalable, high-performance websites built with modern stacks for maximum speed and reliability.",
    gradient: "from-blue-50 to-cyan-50",
    border: "group-hover:border-blue-200"
  },
  {
    icon: <Rocket className="w-7 h-7 text-pink-600" />,
    title: "Growth Strategy",
    description: "Data-driven marketing campaigns designed to scale your startup's user base effectively.",
    gradient: "from-pink-50 to-rose-50",
    border: "group-hover:border-pink-200"
  },
  {
    icon: <Layers className="w-7 h-7 text-orange-600" />,
    title: "Brand Identity",
    description: "Memorable branding that tells your story and connects with your target audience instantly.",
    gradient: "from-orange-50 to-amber-50",
    border: "group-hover:border-orange-200"
  }
];

export const Services = () => {
  return (
    <section id="services" className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="text-blue-600 font-semibold tracking-wider text-sm uppercase mb-3 block">Our Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Crafted for Growth</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
            Comprehensive solutions to help your startup thrive in a competitive landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={`group p-8 rounded-[2rem] bg-white border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden ${service.border}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 ease-out">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">{service.title}</h3>
                <p className="text-gray-500 leading-relaxed font-light group-hover:text-gray-600 transition-colors">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
