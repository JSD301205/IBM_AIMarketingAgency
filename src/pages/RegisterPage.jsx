import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const RegisterPage = ( {showToast} ) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        email,
        password,
        firstName,
        lastName,
      });

      if (response.status === 200 ) {

        showToast('Registration successful!', 'success');

        // Redirect to dashboard
        navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);

      if (error.response) {
        setError(error.response.data?.message || 'Registration failed. Please try again.');
      } else if (error.request) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex justify-center mb-6"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl blur-lg opacity-75"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.75, 0.9, 0.75],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="relative bg-gradient-to-r from-pink-500 to-purple-600 p-4 rounded-3xl shadow-2xl">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
            </div>
          </motion.div>
          <motion.h2
            className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Create Your Account
          </motion.h2>
          <motion.p
            className="text-gray-300 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Sign up for MarketingAI Pro
          </motion.p>
        </motion.div>

        {/* Form */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl" />
          <div className="relative p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <motion.div
                  className="bg-red-500/20 border border-red-500/30 rounded-2xl p-4 text-red-200 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {error}
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-3">First Name</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 backdrop-blur-sm"
                  placeholder="Enter your first name"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-3">Last Name</label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 backdrop-blur-sm"
                  placeholder="Enter your last name"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-3">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 backdrop-blur-sm"
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-3">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 backdrop-blur-sm"
                  placeholder="Create a password"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-3">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 backdrop-blur-sm"
                  placeholder="Confirm your password"
                  disabled={isLoading}
                />
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full relative overflow-hidden bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                whileHover={{ scale: isLoading ? 1 : 1.02, y: isLoading ? 0 : -2 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0"
                  whileHover={{ opacity: isLoading ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative flex items-center justify-center space-x-3">
                  {isLoading ? (
                    <motion.div
                      className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    <>
                      <span className="text-lg">Sign Up</span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </div>
              </motion.button>
            </form>

            <div className="mt-8 text-center space-y-4">
              <div className="text-gray-400 text-sm">
                Already have an account?{' '}
                <motion.button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-purple-400 hover:text-purple-300 transition-colors duration-300 font-medium"
                  whileHover={{ scale: 1.05 }}
                  disabled={isLoading}
                >
                  Login
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
