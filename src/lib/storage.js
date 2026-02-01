const PERSONS_KEY = 'personManager:persons';

export const loadPersons = () => {
    try {
        const data = localStorage.getItem(PERSONS_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

export const savePersons = (persons) => {
    try {
        localStorage.setItem(PERSONS_KEY, JSON.stringify(persons));
    } catch (err) {
        console.warn('Could not save to localStorage', err);
    }
};
