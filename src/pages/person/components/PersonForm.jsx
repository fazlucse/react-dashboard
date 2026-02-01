import { useState } from 'react';
import { User, Phone, Mail, MapPin, Calendar, Home, CheckCircle } from 'lucide-react';
import SkillsSelector from './SkillsSelector';
import DatePickerModal from './DatePickerModal';
import ErrorMessage from './ErrorMessage';
import {
    isValidName, isValidEmail, isValidPhone, isValidDateOfBirth, isValidAddress
} from '@/lib/validators';
import { INITIAL_PERSON_FORM } from '@/lib/constants';

export default function PersonForm({
                                       initialData = INITIAL_PERSON_FORM,
                                       isEditing = false,
                                       onSubmit,
                                       onCancel
                                   }) {
    const [form, setForm] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [showDatePicker, setShowDatePicker] = useState(false);

    const validate = () => {
        const errs = {};

        if (!form.name.trim() || !isValidName(form.name)) {
            errs.name = 'Valid name (≥2 letters) is required';
        }
        if (!form.phone.trim() || !isValidPhone(form.phone)) {
            errs.phone = 'Valid phone number is required';
        }
        if (!form.email.trim() || !isValidEmail(form.email)) {
            errs.email = 'Valid email is required';
        }
        if (!form.country) errs.country = 'Country is required';
        if (form.skills.length === 0) errs.skills = 'At least one skill is required';
        if (!form.address.trim() || !isValidAddress(form.address)) {
            errs.address = 'Current address (≥10 chars) is required';
        }
        if (!form.permanentAddress.trim() || !isValidAddress(form.permanentAddress)) {
            errs.permanentAddress = 'Permanent address (≥10 chars) is required';
        }
        if (!form.dob || !isValidDateOfBirth(form.dob)) {
            errs.dob = 'Valid date of birth is required';
        }

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!validate()) return;
        onSubmit(form);
        if (!isEditing) setForm(INITIAL_PERSON_FORM);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 mb-10">
                <h2 className="text-2xl font-bold mb-6">
                    {isEditing ? 'Edit Person' : 'Add New Person'}
                </h2>

                {/* Photo - simplified */}
                <div className="mb-8 text-center">
                    <div className="w-28 h-28 mx-auto rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-gray-200">
                        {form.photo ? (
                            <img src={form.photo} alt="preview" className="w-full h-full object-cover" />
                        ) : (
                            <User size={48} className="text-gray-400" />
                        )}
                    </div>
                    <label className="mt-3 inline-block bg-indigo-600 text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-indigo-700">
                        Upload Photo
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={e => {
                                const file = e.target.files[0];
                                if (!file) return;
                                const reader = new FileReader();
                                reader.onload = () => setForm(f => ({ ...f, photo: reader.result }));
                                reader.readAsDataURL(file);
                            }}
                        />
                    </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* name, phone, email, country, skills, dob, addresses */}
                    {/* ... most fields similar to original ... */}

                    <div className="md:col-span-2">
                        <SkillsSelector
                            value={form.skills}
                            onChange={skills => setForm(f => ({ ...f, skills }))}
                            error={errors.skills}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Date of Birth *
                        </label>
                        <button
                            type="button"
                            onClick={() => setShowDatePicker(true)}
                            className={`w-full px-4 py-3 text-left border rounded-lg
                ${errors.dob ? 'border-red-500' : 'border-gray-300'}`}
                        >
                            {form.dob || 'Select date...'}
                        </button>
                        <ErrorMessage message={errors.dob} />
                    </div>

                    {/* address & permanent address textareas */}
                </div>

                <div className="flex gap-4 justify-end mt-8">
                    {isEditing && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-2.5 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
                    >
                        {isEditing ? 'Update' : 'Add Person'}
                    </button>
                </div>
            </form>

            <DatePickerModal
                isOpen={showDatePicker}
                onClose={() => setShowDatePicker(false)}
                onSelect={date => setForm(f => ({ ...f, dob: date }))}
                initialDate={form.dob}
            />
        </>
    );
}
