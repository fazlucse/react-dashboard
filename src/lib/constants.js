export const COUNTRIES = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany',
    'France', 'Japan', 'India', 'Brazil', 'Mexico'
];

export const AVAILABLE_SKILLS = [
    'JavaScript', 'Python', 'React', 'Node.js', 'Java', 'C++',
    'Data Analysis', 'Machine Learning', 'PHP', 'Ruby', 'Go', 'Swift'
];

export const INITIAL_PERSON_FORM = {
    name: '',
    phone: '',
    email: '',
    country: '',
    skills: [],
    address: '',
    permanentAddress: '',
    dob: '',
    photo: ''
};

export const DEMO_PERSONS = [
    {
        id: 1,
        name: 'John Anderson',
        phone: '+1-555-0123',
        email: 'john.anderson@example.com',
        country: 'United States',
        skills: ['JavaScript', 'React', 'Node.js'],
        address: '123 Main Street, Apt 4B, New York, NY 10001',
        permanentAddress: '456 Oak Avenue, Los Angeles, CA 90001',
        dob: '1990-05-15',
        photo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%234F46E5" width="100" height="100"/%3E%3Ctext x="50" y="50" font-size="40" fill="white" text-anchor="middle" dy=".3em"%3EJA%3C/text%3E%3C/svg%3E'
    },
    // ... you can add more
];
