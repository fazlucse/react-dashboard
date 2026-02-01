import { useState, useEffect } from 'react';
import { loadPersons, savePersons } from '@/lib/storage';
import { DEMO_PERSONS } from '@/lib/constants';

export function usePersons() {
    const [persons, setPersons] = useState(() => {
        const saved = loadPersons();
        return saved.length > 0 ? saved : DEMO_PERSONS;
    });

    useEffect(() => {
        savePersons(persons);
    }, [persons]);

    const addPerson = (person) => {
        setPersons(prev => [...prev, { ...person, id: Date.now() }]);
    };

    const updatePerson = (updatedPerson) => {
        setPersons(prev =>
            prev.map(p => (p.id === updatedPerson.id ? updatedPerson : p))
        );
    };

    const deletePerson = (id) => {
        setPersons(prev => prev.filter(p => p.id !== id));
    };

    return {
        persons,
        addPerson,
        updatePerson,
        deletePerson
    };
}
