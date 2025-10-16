import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import toast from 'react-hot-toast';
import { auth, db, provider } from '../firebase';
import {doc, getDoc, setDoc} from "firebase/firestore";
import { Navigate, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import Header from '../components/Header';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Button style configurations
  const buttonBaseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50";
  const buttonVariants = {
    default: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-xl",
    outline: "border-2 border-slate-300 bg-white hover:bg-slate-100 text-slate-700 hover:shadow-lg hover:border-slate-400"
  };
  const buttonSizes = {
    default: "h-10 px-4 py-2"
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, email, password, confirmPassword } = formData;

    if (isSignUp) {
      if (formData.password === formData.confirmPassword) {
        console.log('Sign Up:', formData);

        if (name != "" && email != "" && password != "" && confirmPassword != "") {
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed up 
              const user = userCredential.user;
              console.log("User>>>", user);
              toast.success("User Created!");
              setLoading(false);
              setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
              });
              createDoc(user);
              navigate("/dashboard");
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              toast.error(errorMessage);
              setLoading(false);
              // ..
            });
        } else {
          toast.error("All fields are mendatory!");
          setLoading(false);
        }
      } else {
        toast.error("Passwords don't match!");
        setLoading(false);
      }


    } else {
      setLoading(true);
      if (email != "" && password != "") {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            toast.success("User Logged In");
            console.log("User Logged In", user);
            setLoading(false);
            navigate("/dashboard");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setLoading(false);
            toast.error(errorMessage);
          });
      } else {
        toast.error("All fields are mendatory!");
        setLoading(false);
      }
    }
  };

  async function createDoc(user) {
    setLoading(true);
    if (!user) return;
    
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
   try {
     await setDoc(doc(db, "users", user.uid), {
      name: user.displayName ? user.displayName : formData.name,
      email: user.email,
      photoURL: user.photoURL ? user.photoURL : "",
      createdAt: new Date(),
    });
    toast.success("Doc Created!");
    setLoading(false);
   } catch (e) {
    toast.error(e.message);
    setLoading(false);
   }
   } else {
    // toast.error("Doc already exists");
    setLoading(false);
   }
  }

  const handleGoogleLogin = () => {
    setLoading(true);
    try {
       signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log("user>>>", user);
    createDoc(user);
    setLoading(false);
    navigate("/dashboard");
    toast.success("User authenticated!");
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    setLoading(false);
    toast.error(errorMessage);
  });
    } catch (e) {
      setLoading(false);
      toast.error(e.message);
    }
  };

  const EyeIcon = ({ isOpen, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
    >
      {isOpen ? (
        <Eye className="w-5 h-5" />
      ) : (
        <EyeOff className="w-5 h-5" />
      )} 
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      {/* Use the Header component with showProfileSection set to false */}
      <Header showProfileSection={false} />

      <div className="flex-grow flex items-center justify-center p-4">
        <div className="rounded-xl border border-slate-200 bg-slate-50/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:border-slate-300 w-full max-w-md">
          <div className="flex flex-col space-y-1.5 p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold leading-none tracking-tight">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </h3>
          </div>
          <div className="p-4 sm:p-6 pt-0">
            <div className="space-y-4">
              {isSignUp && (
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-3 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:border-slate-400 focus-visible:ring-0 focus-visible:shadow-lg transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 hover:border-slate-300 hover:shadow-md"
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-3 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:border-slate-400 focus-visible:ring-0 focus-visible:shadow-lg transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 hover:border-slate-300 hover:shadow-md"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-3 pr-12 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:border-slate-400 focus-visible:ring-0 focus-visible:shadow-lg transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 hover:border-slate-300 hover:shadow-md"
                />
                <EyeIcon
                  isOpen={showPassword}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
              {isSignUp && (
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-3 pr-12 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:border-slate-400 focus-visible:ring-0 focus-visible:shadow-lg transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 hover:border-slate-300 hover:shadow-md"
                  />
                  <EyeIcon
                    isOpen={showConfirmPassword}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                </div>
              )}
              <button
                disabled={loading}
                className={`${buttonBaseClasses} ${buttonVariants.default} ${buttonSizes.default} w-full`}
                onClick={handleSubmit}
              >
                {loading ? 'loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
              </button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-slate-50/30 text-slate-600">Or continue with</span>
                </div>
              </div>
              <button
                className={`${buttonBaseClasses} ${buttonVariants.outline} ${buttonSizes.default} w-full flex items-center justify-center gap-2`}
                onClick={handleGoogleLogin}
              >
                {loading ? (
                  'loading...'
                ) : (
                  <>
                    <img className='w-5 h-5' src="/google.svg" alt="Google Icon" />
                    Sign {isSignUp ? 'up' : 'in'} with Google
                  </>
                )}
              </button>
              <div className="text-center text-sm text-slate-600">
                {isSignUp ? 'Already have an account?' : 'Need an account?'}
                <button
                  className="text-emerald-600 hover:text-emerald-700 font-medium ml-1"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;