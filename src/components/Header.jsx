import React, { useEffect } from 'react';
import { LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from "../firebase";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

const Header = ({ showProfileSection = true }) => {

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if(user){
      navigate("/dashboard");
    }
  }, [user, loading]);
  

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate('/');
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <header className="bg-emerald-600 border-b border-emerald-700 shadow-sm">
      <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-17">
        <div className="flex justify-between items-center h-14">
          <h1 className="text-xl sm:text-2xl font-bold text-white">Finexa</h1>
          
          {showProfileSection && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {user?.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full border-2 border-emerald-800"
                  />
                ) : (
                  <div className="w-8 h-8 bg-emerald-800 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    {getInitials(user?.displayName || user?.name)}
                  </div>
                )}
                <span className="text-sm text-emerald-100 hidden sm:inline max-w-32 truncate">
                  {user?.displayName || user?.name || 'User'}
                </span>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-emerald-100 hover:text-white hover:bg-emerald-700 rounded-lg transition-all duration-200 group"
              >
                <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;