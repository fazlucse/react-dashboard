import { useState } from 'react';
import { X } from 'lucide-react';

const MONTHS = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
];

export default function DatePickerModal({
                                            isOpen,
                                            onClose,
                                            onSelect,
                                            initialDate = ''
                                        }) {
    const [year, setYear] = useState(() => {
        return initialDate ? new Date(initialDate).getFullYear() : new Date().getFullYear() - 25;
    });
    const [month, setMonth] = useState(() => {
        return initialDate ? new Date(initialDate).getMonth() : new Date().getMonth();
    });

    if (!isOpen) return null;

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const handleDayClick = day => {
        const date = new Date(year, month, day);
        onSelect(date.toISOString().split('T')[0]);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
                {/* Header */}
                <div className="bg-indigo-600 text-white px-6 py-4 flex items-center justify-between">
                    <h3 className="font-semibold">Select Date of Birth</h3>
                    <button onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Month & Year */}
                <div className="p-4 border-b flex items-center justify-between bg-gray-50">
                    <select value={month} onChange={e => setMonth(Number(e.target.value))} className="px-3 py-1.5 border rounded">
                        {MONTHS.map((m,i) => <option key={m} value={i}>{m}</option>)}
                    </select>
                    <select value={year} onChange={e => setYear(Number(e.target.value))} className="px-3 py-1.5 border rounded">
                        {Array.from({length: 80}, (_,i) => new Date().getFullYear() - 15 - i).map(y => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>

                {/* Days */}
                <div className="p-4 grid grid-cols-7 gap-1 text-center text-sm">
                    {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
                        <div key={d} className="font-medium text-gray-500 py-2">{d}</div>
                    ))}
                    {Array(firstDay).fill().map((_,i) => <div key={`empty-${i}`} />)}
                    {Array.from({length: daysInMonth}, (_,i) => i+1).map(day => (
                        <button
                            key={day}
                            onClick={() => handleDayClick(day)}
                            className="aspect-square rounded-lg hover:bg-indigo-100 transition"
                        >
                            {day}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
