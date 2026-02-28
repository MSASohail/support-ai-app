import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const Layout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const dropdownRef = React.useRef(null);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const navItems = [
        { path: '/', label: 'Dashboard', icon: '📊' },
        { path: '/tickets', label: 'Tickets', icon: '🎫' },
        { path: '/settings', label: 'Settings', icon: '⚙️' },
    ];

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-primary">Support AI</h1>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-gray-500">
                        ✕
                    </button>
                </div>
                <nav className="mt-6 px-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${location.pathname === item.path
                                ? 'bg-indigo-50 text-primary'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <span className="mr-3">{item.icon}</span>
                            {item.label}
                        </Link>
                    ))}

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-8"
                    >
                        <span className="mr-3">🚪</span>
                        Logout
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-8 shrink-0">
                    <div className="flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="mr-4 lg:hidden text-gray-500 hover:text-gray-700"
                        >
                            ☰
                        </button>
                        <h2 className="text-xl font-semibold text-gray-800">
                            {navItems.find((i) => i.path === location.pathname)?.label || 'Support AI'}
                        </h2>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500 hidden sm:inline">Welcome, Agent</span>
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-primary font-bold hover:bg-indigo-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            >
                                A
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 animate-fadeIn">
                                    <Link
                                        to="/settings"
                                        onClick={() => setIsDropdownOpen(false)}
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="mr-3">⚙️</span>
                                        Settings
                                    </Link>
                                    <hr className="my-1 border-gray-100" />
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <span className="mr-3">🚪</span>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>
                <div className="flex-1 overflow-auto p-4 lg:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
