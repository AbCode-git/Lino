import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BookingCalendar({ selectedDate, onDateSelect }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [days, setDays] = useState([]);

    useEffect(() => {
        generateDays();
    }, [currentMonth]);

    const generateDays = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        // First day of the month
        const firstDay = new Date(year, month, 1);
        // Last day of the month
        const lastDay = new Date(year, month + 1, 0);

        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay(); // 0 is Sunday

        const calendarDays = [];

        // Padding for previous month
        for (let i = 0; i < startingDay; i++) {
            calendarDays.push({ day: null, currentMonth: false });
        }

        // Current month days
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 1; i <= daysInMonth; i++) {
            const dateObj = new Date(year, month, i);
            const isPast = dateObj < today;

            // Format to exact local date string (YYYY-MM-DD) avoiding UTC conversion offset (crucial for EAT timezone)
            const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

            calendarDays.push({
                day: i,
                date: formattedDate,
                isPast,
                currentMonth: true
            });
        }

        setDays(calendarDays);
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const monthName = currentMonth.toLocaleString('default', { month: 'long' });
    const year = currentMonth.getFullYear();

    return (
        <div className="booking-calendar bg-primary-dark/50 p-6 border border-ivory/5  backdrop-blur-sm">
            <div className="flex justify-between items-center mb-8">
                <h4 className="text-gold text-sm font-playfair tracking-widest uppercase">
                    {monthName} <span className="text-ivory/40 font-light ml-2">{year}</span>
                </h4>
                <div className="flex gap-4">
                    <button
                        onClick={(e) => { e.preventDefault(); prevMonth(); }}
                        className="text-ivory/40 hover:text-gold transition-colors text-xs uppercase tracking-tighter p-2"
                    >
                        Prev
                    </button>
                    <button
                        onClick={(e) => { e.preventDefault(); nextMonth(); }}
                        className="text-ivory/40 hover:text-gold transition-colors text-xs uppercase tracking-tighter p-2"
                    >
                        Next
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                    <div key={day} className="text-center text-[8px] text-gold/30 font-bold uppercase tracking-widest py-2">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-px bg-ivory/5 border border-ivory/5">
                {days.map((d, i) => {
                    const isSelected = d.date === selectedDate;

                    return (
                        <div
                            key={i}
                            className={`
                aspect-square flex items-center justify-center text-[10px] transition-all duration-300 relative
                ${!d.day ? 'bg-transparent' : 'bg-primary cursor-pointer'}
                ${d.isPast ? 'opacity-20 cursor-not-allowed' : 'hover:bg-primary-light hover:text-gold'}
                ${isSelected ? '!text-primary font-bold' : 'text-ivory/60'}
              `}
                            onClick={() => d.day && !d.isPast && onDateSelect(d.date)}
                        >
                            <span className="relative z-10">{d.day}</span>
                            {isSelected && (
                                <motion.div
                                    layoutId="calendar-selection"
                                    className="absolute inset-0 bg-gold border border-gold"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
