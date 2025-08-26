import React from 'react';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user, logout, isLoggingOut } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/signin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="text-center relative z-10">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {user?.name}!
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            How can{' '}
            <span className="font-semibold text-indigo-600">
              {user?.assistantName}
            </span>{' '}
            help you today?
          </p>
        </div>

        {/* Assistant */}
        <div className="flex flex-col items-center space-y-4 relative z-10 mt-6">
          <div className="relative">
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white/70 shadow-xl">
              <img
                src={user?.assistantImage}
                alt={user?.assistantName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold text-gray-800">
              {user?.assistantName}
            </p>
            <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
          </div>
        </div>

        {/* Buttons - Always Centered */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10 pt-8">
          <button
            onClick={() => navigate('/customize')}
            className="cursor-pointer flex items-center justify-center gap-2 px-5 py-3 text-base font-medium text-white bg-indigo-600 rounded-xl shadow hover:bg-indigo-700 transition-all duration-200 hover:shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            Customize Assistant
          </button>

          <button
            disabled={isLoggingOut}
            onClick={handleLogout}
            className="cursor-pointer flex items-center justify-center gap-2 px-5 py-3 text-base font-medium text-white bg-gradient-to-r from-red-500 to-rose-500 rounded-xl shadow hover:from-red-600 hover:to-rose-600 transition-all duration-200 hover:shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
