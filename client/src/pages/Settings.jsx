import React, { useState, useEffect } from 'react';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [user, setUser] = useState({ name: '', email: '' });
    const [notifications, setNotifications] = useState(true);
    const [aiAutoReply, setAiAutoReply] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Load user from local storage (mock auth)
        const storedUser = JSON.parse(localStorage.getItem('user') || '{"name": "Agent Smith", "email": "agent@example.com"}');
        setUser(storedUser);
    }, []);

    const handleSave = () => {
        alert('Settings saved successfully!');
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: '👤' },
        { id: 'preferences', label: 'Preferences', icon: '⚙️' },
        { id: 'security', label: 'Security', icon: '🔒' }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Settings</h2>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <span className="mr-2">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-6">
                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-800">Profile Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={user.name}
                                        readOnly
                                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-500 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        value={user.email}
                                        readOnly
                                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-500 cursor-not-allowed"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Preferences Tab */}
                    {activeTab === 'preferences' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-800">Preferences</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-2">
                                    <div>
                                        <p className="font-medium text-gray-800">Email Notifications</p>
                                        <p className="text-sm text-gray-500">Receive emails when new tickets are assigned to you.</p>
                                    </div>
                                    <button
                                        onClick={() => setNotifications(!notifications)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${notifications ? 'bg-primary' : 'bg-gray-200'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${notifications ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between py-2">
                                    <div>
                                        <p className="font-medium text-gray-800">AI Auto-Reply</p>
                                        <p className="text-sm text-gray-500">Automatically send AI-generated responses to new tickets.</p>
                                    </div>
                                    <button
                                        onClick={() => setAiAutoReply(!aiAutoReply)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${aiAutoReply ? 'bg-primary' : 'bg-gray-200'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${aiAutoReply ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between py-2">
                                    <div>
                                        <p className="font-medium text-gray-800">Dark Mode</p>
                                        <p className="text-sm text-gray-500">Enable dark theme for the dashboard.</p>
                                    </div>
                                    <button
                                        onClick={() => setDarkMode(!darkMode)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'security' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-800">Security Settings</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    className="bg-primary hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default Settings;
