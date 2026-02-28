import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { mockTickets } from '../mockData';

const CreateTicket = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Simulate Network Delay
            await new Promise((resolve) => setTimeout(resolve, 800));
            // 1. Mock AI Categorization
            let category = 'General';
            const lowerTitle = title.toLowerCase();
            const lowerDesc = description.toLowerCase();
            if (lowerTitle.includes('bill') || lowerDesc.includes('charge') || lowerDesc.includes('payment')) {
                category = 'Billing';
            } else if (lowerTitle.includes('ship') || lowerDesc.includes('deliver') || lowerDesc.includes('order')) {
                category = 'Delivery';
            } else if (lowerTitle.includes('error') || lowerTitle.includes('bug') || lowerDesc.includes('crash')) {
                category = 'Technical';
            }

            // 2. Create Ticket Object
            const newTicket = {
                _id: `mock_id_${Date.now()}`,
                title,
                description,
                customerName: name,
                customerEmail: email,
                status: 'Open',
                category,
                createdAt: new Date().toISOString(),
                messages: [
                    {
                        _id: `msg_${Date.now()}_1`,
                        sender: 'user',
                        content: description,
                        createdAt: new Date().toISOString()
                    }
                ]
            };

            // 3. Mock AI Chatbot Auto-Response
            const aiResponse = {
                _id: `msg_${Date.now()}_2`,
                sender: 'ai',
                content: `Hi ${name}, thanks for reaching out about "${title}". This is an automated response. An agent from our ${category} team will be with you shortly.`,
                createdAt: new Date(Date.now() + 1000).toISOString()
            };
            newTicket.messages.push(aiResponse);

            // 4. Save to Mock Data
            mockTickets.unshift(newTicket);

            setLoading(false);
            navigate(`/tickets/${newTicket._id}`);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Submit a New Ticket</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input
                        type="text"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                        type="email"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input
                        type="text"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        required
                        rows="4"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-600 text-sm">⚠️ {error}</p>
                    </div>
                )}

                <div className="flex justify-end pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/tickets')}
                        className="mr-3 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-primary hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50"
                    >
                        {loading ? 'Submitting...' : 'Submit Ticket'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateTicket;
