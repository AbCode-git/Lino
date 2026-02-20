import { motion } from 'framer-motion';

export default function TimeSlotPicker({ slots, selectedTime, bookedSlots = [], onTimeSelect }) {
    return (
        <div className="time-slot-picker">
            <h4 className="text-gold text-[10px] uppercase tracking-[0.2em] font-bold mb-6">Time</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {slots.map((time) => {
                    const isBooked = bookedSlots.includes(time);
                    const isSelected = selectedTime === time;

                    return (
                        <button
                            key={time}
                            disabled={isBooked}
                            onClick={(e) => { e.preventDefault(); onTimeSelect(time); }}
                            className={`
                py-3 px-4 border text-[10px] tracking-widest uppercase transition-all duration-500 relative overflow-hidden
                ${isBooked ? 'border-ivory/5 text-ivory/20 cursor-not-allowed bg-primary-dark/20' :
                                    isSelected ? 'border-gold bg-gold text-primary font-bold shadow-lg shadow-gold/20' :
                                        'border-ivory/10 text-ivory/60 hover:border-gold/50 hover:text-gold'}
              `}
                        >
                            {time}
                            {isBooked && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-full h-[1px] bg-ivory/10 rotate-12"></div>
                                    <span className="bg-primary/80 px-1 text-[8px] font-bold tracking-tighter">Booked</span>
                                </div>
                            )}
                            {isSelected && !isBooked && (
                                <motion.div
                                    layoutId="time-selection"
                                    className="absolute inset-0 border-2 border-primary/20"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
