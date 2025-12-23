import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

// Zod validation schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    clearError();

    const result = await login(data.email, data.password);

    if (result?.success) {
      navigate('/dashboard');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_25%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.06),transparent_25%)]" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl w-full max-w-md p-8 md:p-10 text-white"
      >
        <div className="mb-8 text-center space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-indigo-100">SleepSync</p>
          <h2 className="text-3xl font-bold">Welcome back</h2>
          <p className="text-indigo-100">Log in to continue your wellness journey</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm text-indigo-100">Email address</label>
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-300">
              <span>📧</span>
              <input
                {...register('email')}
                type="email"
                placeholder="you@example.com"
                className="w-full bg-transparent focus:outline-none text-white placeholder:text-indigo-200"
              />
            </div>
            {errors.email && <p className="text-red-200 text-sm">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm text-indigo-100">Password</label>
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-300">
              <span>🔒</span>
              <input
                {...register('password')}
                type="password"
                placeholder="•••••••"
                className="w-full bg-transparent focus:outline-none text-white placeholder:text-indigo-200"
              />
            </div>
            {errors.password && <p className="text-red-200 text-sm">{errors.password.message}</p>}
          </div>

          {error && (
            <p className="text-red-200 text-center text-sm bg-red-500/10 border border-red-300/30 rounded-xl py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white font-semibold py-3 rounded-xl shadow-xl hover:-translate-y-0.5 hover:shadow-2xl transition disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="text-center mt-8 text-indigo-100">
          Don't have an account?
          <Link
            to="/register"
            className="text-white font-semibold hover:underline ml-1"
          >
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
