import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BookCall = () => {
  const WHATSAPP_NUMBER = "919424871885";

  const now = useMemo(() => new Date(), []);
  const [month, setMonth] = useState(() => new Date(now.getFullYear(), now.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const timeSlots = ["9:00 AM", "9:30 AM", "10:00 AM", "11:00 AM"];

  const monthLabel = month.toLocaleString(undefined, { month: "long", year: "numeric" });

  const daysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const startDay = (y: number, m: number) => {
    // Convert Sunday=0 to Monday=0
    const d = new Date(y, m, 1).getDay();
    return (d + 6) % 7;
  };

  const gridDays = useMemo(() => {
    const y = month.getFullYear();
    const m = month.getMonth();
    const total = daysInMonth(y, m);
    const offset = startDay(y, m);
    const cells: Array<{ day: number | null }> = [];
    for (let i = 0; i < offset; i++) cells.push({ day: null });
    for (let day = 1; day <= total; day++) cells.push({ day });
    // pad to full weeks (up to 42 cells)
    while (cells.length % 7 !== 0) cells.push({ day: null });
    return cells;
  }, [month]);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  const formatSelected = () => {
    if (!selectedDate) return "Select a date";
    return selectedDate.toLocaleDateString(undefined, { weekday: "short", year: "numeric", month: "short", day: "numeric" });
  };

  const handlePrevMonth = () => {
    setMonth((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleNextMonth = () => {
    setMonth((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time.");
      return;
    }
    const details = [
      "Booking Request - Discovery Call",
      `Date: ${selectedDate.toLocaleDateString()}`,
      `Time: ${selectedTime}`,
      message ? `Project: ${message}` : undefined,
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(details)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-50 relative overflow-hidden">
        {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-blue-50 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-purple-50 blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8">
           <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium">
              <ArrowLeft size={16} /> Back to Home
            </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Book a Discovery Call</h1>
            <p className="text-gray-500 font-light text-lg mb-8 leading-relaxed">
              Let's discuss your startup's needs and how our elite freelancers can help you scale. It's free, confidential, and no obligation.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-white/60 rounded-2xl border border-white/60 shadow-sm backdrop-blur-md">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Video size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Video Consultation</h3>
                  <p className="text-sm text-gray-500">We meet via Google Meet or Zoom.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-white/60 rounded-2xl border border-white/60 shadow-sm backdrop-blur-md">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">30 Minutes</h3>
                  <p className="text-sm text-gray-500">Short, focused, and high-impact.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Booking Form Mockup */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.1 }}
             className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-gray-100"
          >
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Select a Date & Time</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {/* Calendar */}
                 <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold text-gray-900">{monthLabel}</span>
                      <div className="flex gap-2">
                        <button type="button" onClick={handlePrevMonth} className="p-1 hover:bg-gray-200 rounded text-gray-500">&lt;</button>
                        <button type="button" onClick={handleNextMonth} className="p-1 hover:bg-gray-200 rounded text-gray-500">&gt;</button>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2 text-gray-400">
                      <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium">
                      {gridDays.map((cell, idx) => {
                        if (!cell.day) {
                          return <span key={idx} className="text-gray-300 py-2">&nbsp;</span>;
                        }
                        const d = new Date(month.getFullYear(), month.getMonth(), cell.day);
                        const selected = selectedDate ? isSameDay(d, selectedDate) : false;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setSelectedDate(d);
                              setSelectedTime(null);
                            }}
                            className={
                              selected
                                ? "py-2 bg-blue-600 text-white rounded-lg shadow-md"
                                : "py-2 hover:bg-blue-100 rounded-lg text-gray-700"
                            }
                          >
                            {cell.day}
                          </button>
                        );
                      })}
                    </div>
                 </div>

                 {/* Time Slots */}
                 <div className="space-y-3">
                    <h4 className="font-medium text-gray-700 mb-4">
                      Available times for {formatSelected()}
                    </h4>
                    {timeSlots.map((t) => {
                      const selected = selectedTime === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setSelectedTime(t)}
                          className={
                            selected
                              ? "w-full py-3 rounded-xl border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-colors"
                              : "w-full py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:border-blue-600 hover:text-blue-600 transition-colors"
                          }
                          disabled={!selectedDate}
                        >
                          {t}
                        </button>
                      );
                    })}
                 </div>
              </div>
            </div>

            <form className="space-y-6 pt-8 border-t border-gray-100" onSubmit={handleConfirm}>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 pl-1">What is your project about?</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 outline-none transition-all"
                    placeholder="Briefly describe what you're looking for..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
               </div>
               <button type="submit" className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-all shadow-lg text-lg">
                 Confirm Booking
               </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
