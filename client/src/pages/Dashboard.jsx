import React from 'react';
import { mockTickets } from '../mockData';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [error, setError] = React.useState(null);

    // Calculate Stats from Mock Data
    try {
        const totalTickets = mockTickets.length;
        const pendingTickets = mockTickets.filter(t => t.status !== 'Closed').length;
        const avgResponse = "14m";
        const recentActivity = mockTickets.slice(0, 3);

        if (error) {
            return (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <p className="text-red-600 font-medium">⚠️ Error loading dashboard</p>
                    <p className="text-sm text-red-500 mt-2">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                    >
                        Retry
                    </button>
                </div>
            );
        }

        return (
            <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 text-sm font-medium">Total Tickets</h3>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{totalTickets}</p>
                        <span className="text-green-500 text-xs font-medium mt-1 inline-block">
                            Active Database
                        </span>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 text-sm font-medium">Pending Response</h3>
                        <p className="text-3xl font-bold text-orange-600 mt-2">{pendingTickets}</p>
                        <span className="text-orange-500 text-xs font-medium mt-1 inline-block">
                            Needs attention
                        </span>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 text-sm font-medium">Avg. Response Time</h3>
                        <p className="text-3xl font-bold text-blue-600 mt-2">{avgResponse}</p>
                        <span className="text-green-500 text-xs font-medium mt-1 inline-block">
                            AI Enabled
                        </span>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
                        <Link to="/tickets" className="text-sm text-primary hover:text-indigo-700 font-medium">View All</Link>
                    </div>

                    {recentActivity.length > 0 ? (
                        <div className="space-y-4">
                            {recentActivity.map(ticket => (
                                <div key={ticket._id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border border-gray-100 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-2 h-2 rounded-full ${ticket.status === 'Open' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">{ticket.title}</p>
                                            <p className="text-xs text-gray-500">
                                                {ticket.customerName} • {new Date(ticket.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-medium text-gray-500 px-2 py-1 bg-gray-100 rounded-md">
                                        {ticket.category}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No recent activity to show.</p>
                    )}
                </div>
            </div>
        );
    } catch (err) {
        setError(err.message);
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-600 font-medium">⚠️ Error loading dashboard</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                    Retry
                </button>
            </div>
        );
    }
};

export default Dashboard;
