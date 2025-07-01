import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Warehouse, Mail, Lock, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useTranslation } from 'react-i18next';

export const Login: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuthStore();

  const demoUsers = [
    { email: 'admin@logitrack.com', role: t('auth.admin'), password: 'password' },
    { email: 'manager@logitrack.com', role: t('auth.manager'), password: 'password' },
    { email: 'worker@logitrack.com', role: t('auth.worker'), password: 'password' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const success = await login(email, password);
    if (!success) {
      setError('Invalid credentials');
    }
    setIsLoading(false);
  };

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy/90 to-violet/20 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-white space-y-6"
        >
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 bg-violet rounded-2xl flex items-center justify-center">
              <Warehouse className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">LogiTrack 360</h1>
              <p className="text-silver/80">Warehouse Management System</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Comprehensive Warehouse Control</h2>
            <div className="space-y-3 text-silver/90">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-violet rounded-full"></div>
                <span>Real-time 3D warehouse visualization</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-violet rounded-full"></div>
                <span>Advanced inventory tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-violet rounded-full"></div>
                <span>Streamlined task management</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-violet rounded-full"></div>
                <span>Comprehensive analytics & reporting</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('auth.login')}</h2>
            <p className="text-gray-600">Access your warehouse management system</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.email')}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.password')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-violet hover:bg-violet/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : t('auth.login')}
            </button>
          </form>

          <div className="mt-8">
            <div className="text-center text-gray-500 mb-4">Demo Accounts</div>
            <div className="space-y-2">
              {demoUsers.map((user, index) => (
                <button
                  key={index}
                  onClick={() => handleDemoLogin(user.email)}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <User className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">{user.role}</span>
                  </div>
                  <span className="text-xs text-gray-500">{user.email}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};