// src/pages/person/index.jsx
import { useState } from 'react';
import { usePersons } from '@/hooks/usePersons';                        // global hook
import PersonForm from './components/PersonForm';                      // ← local
import PersonList from './components/PersonList';                      // ← local
import { INITIAL_PERSON } from '@/lib/constants';

const demoPersons = [ /* ... */ ];

export default function PersonManagementPage() {
    const { persons, addPerson, updatePerson, deletePerson } = usePersons(demoPersons);
    const [editingPerson, setEditingPerson] = useState(null);

    const handleSubmit = (data) => {
        if (editingPerson) {
            updatePerson({ ...data, id: editingPerson.id });
            setEditingPerson(null);
        } else {
            addPerson(data);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-indigo-900 mb-8">
                    Person Management
                </h1>

                <PersonForm
                    initialData={editingPerson || INITIAL_PERSON}
                    isEditing={!!editingPerson}
                    onSubmit={handleSubmit}
                    onCancel={() => setEditingPerson(null)}
                />

                <PersonList
                    persons={persons}
                    onEdit={setEditingPerson}
                    onDelete={deletePerson}
                />
            </div>
        </div>
    );
}
