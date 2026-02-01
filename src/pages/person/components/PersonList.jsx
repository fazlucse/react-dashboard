// src/components/PersonList.js
import React from 'react';
import { User, Trash2, Edit2 } from 'lucide-react';

export default function PersonList({ persons, onEdit, onDelete }) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Person List ({persons.length})
            </h2>

            {persons.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    <User className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg">No persons added yet. Add your first person above!</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="bg-indigo-50 border-b-2 border-indigo-200">
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Photo</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Country</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Skills</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">DOB</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Current Address</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Permanent Address</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {persons.map((person) => (
                            <tr key={person.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                                <td className="px-4 py-3">
                                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                        {person.photo ? (
                                            <img src={person.photo} alt={person.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-6 h-6 text-gray-400" />
                                        )}
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">{person.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{person.phone}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{person.email}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{person.country}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    <div className="flex flex-wrap gap-1">
                                        {person.skills.map(skill => (
                                            <span key={skill} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">{person.dob}</td>
                                <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate">{person.address}</td>
                                <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate">{person.permanentAddress}</td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => onEdit(person)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                            title="Edit"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(person.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
