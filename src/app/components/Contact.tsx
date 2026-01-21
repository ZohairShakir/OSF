import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      alert("Please enter your requirement/message.");
      return;
    }

    const to = "info@ourstartupfreelancer.com";
    const subject = `Project requirement from ${name ? name : "Website visitor"}`;
    const bodyLines = [
      "Hello Our Startup Freelancer Team,",
      "",
      "Here are my requirements:",
      message,
      "",
      `Name: ${name || "-"}`,
      `Email: ${email || "-"}`,
    ];
    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    // Opens default mail client (Gmail if configured / Gmail web handler in browser)
    window.location.href = mailto;
  };

  return (
    <section id="contact" className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Form */}
          <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Let's Talk</h2>
            <p className="text-gray-500 mb-8 font-light">We'd love to hear about your project.</p>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 pl-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                 <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 pl-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="john@example.com"
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 pl-1">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us about your goals..."
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gray-900 text-white font-bold py-5 rounded-2xl hover:bg-gray-800 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 shadow-lg"
              >
                Send Message
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="lg:pl-12 flex flex-col justify-center">
             <span className="text-blue-600 font-semibold tracking-wider text-sm uppercase mb-3 block">Contact Us</span>
            <h2 className="text-5xl font-bold text-gray-900 mb-12 tracking-tight">Get in touch with our team</h2>
            
            <div className="space-y-10">
              <div className="flex items-start gap-8 group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Email</h3>
                  <a href="mailto:info@ourstartupfreelancer.com" className="text-gray-500 hover:text-blue-600 transition-colors text-lg font-light">
                    info@ourstartupfreelancer.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-8 group">
                <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center flex-shrink-0 text-green-600 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Phone</h3>
                  <a href="tel:+919424871885" className="text-gray-500 hover:text-green-600 transition-colors text-lg font-light">
                    +91 94248 71885
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-8 group">
                <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center flex-shrink-0 text-purple-600 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Location</h3>
                  <p className="text-gray-500 text-lg font-light">
                    Indore, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
