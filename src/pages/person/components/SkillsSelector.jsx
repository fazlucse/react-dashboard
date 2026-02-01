import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, CheckCircle } from 'lucide-react';
import { AVAILABLE_SKILLS } from '@/lib/constants';

export default function SkillsSelector({
                                           value = [],
                                           onChange,
                                           error
                                       }) {
    const [open, setOpen]         = useState(false);
    const [query, setQuery]       = useState('');
    const wrapperRef              = useRef(null);
    const searchInputRef          = useRef(null);

    useEffect(() => {
        const handleClickOutside = e => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOpen(false);
                setQuery('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (open && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [open]);

    const filtered = AVAILABLE_SKILLS.filter(s =>
        s.toLowerCase().includes(query.toLowerCase())
    );

    const toggle = skill => {
        const next = value.includes(skill)
            ? value.filter(s => s !== skill)
            : [...value, skill];
        onChange(next);
    };

    const remove = skill => {
        onChange(value.filter(s => s !== skill));
    };

    return (
        <div className="relative" ref={wrapperRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Skills *
            </label>

            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={`w-full min-h-[42px] px-4 py-2 text-left border rounded-lg flex items-center justify-between gap-2
          ${error ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500`}
            >
                <div className="flex flex-wrap gap-1.5">
                    {value.length === 0 && <span className="text-gray-400">Select skills...</span>}
                    {value.map(skill => (
                        <span
                            key={skill}
                            className="bg-indigo-100 text-indigo-800 text-xs px-2.5 py-1 rounded-full flex items-center gap-1"
                        >
              {skill}
                            <button
                                type="button"
                                onClick={e => {
                                    e.stopPropagation();
                                    remove(skill);
                                }}
                                className="text-indigo-600 hover:text-indigo-800"
                            >
                <X size={14} />
              </button>
            </span>
                    ))}
                </div>
                <ChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} size={18} />
            </button>

            {open && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-xl max-h-64 overflow-hidden flex flex-col">
                    <div className="p-3 border-b bg-gray-50">
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Search skills..."
                            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            onClick={e => e.stopPropagation()}
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {filtered.length === 0 ? (
                            <div className="py-6 text-center text-gray-500 text-sm">
                                No skills found
                            </div>
                        ) : (
                            filtered.map(skill => (
                                <label
                                    key={skill}
                                    className="flex items-center px-4 py-2.5 hover:bg-indigo-50 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={value.includes(skill)}
                                        onChange={() => toggle(skill)}
                                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    />
                                    <span className="ml-3 text-gray-700">{skill}</span>
                                    {value.includes(skill) && (
                                        <CheckCircle className="ml-auto text-indigo-600" size={16} />
                                    )}
                                </label>
                            ))
                        )}
                    </div>
                </div>
            )}

            {error && <ErrorMessage message={error} />}
        </div>
    );
}
