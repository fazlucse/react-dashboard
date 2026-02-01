export const isValidName = (name) => {
    const trimmed = name.trim();
    return trimmed.length >= 2 && /^[a-zA-Z\s]+$/.test(trimmed);
};

export const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidPhone = (phone) => {
    return /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/.test(phone);
};

export const isValidDateOfBirth = (dob) => {
    if (!dob) return false;
    const date = new Date(dob);
    const today = new Date();
    const minDate = new Date('1900-01-01');
    return date < today && date > minDate;
};

export const isValidAddress = (address) => {
    return address.trim().length >= 10;
};
