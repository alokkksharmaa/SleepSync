import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';

const cards = [
  { title: 'Average Sleep', unit: 'hours / night', icon: '⏱️', key: 'averageDuration', color: 'from-indigo-500 to-blue-500' },
  { title: 'Total Logs', unit: 'entries recorded', icon: '📒', key: 'totalLogs', color: 'from-purple-500 to-indigo-500' },
  { title: 'Daily Tip', unit: '', icon: '💡', key: 'tip', color: 'from-blue-500 to-cyan-500' },
];

const SleepInsights = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const response = await api.get('/sleep-logs/insights');
      setInsights(response.data.insights);
      setError('');
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch sleep insights';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl bg-white/60 border border-white/80 shadow-lg p-6">
            <div className="h-6 w-24 bg-slate-200 rounded-full mb-4 animate-pulse" />
            <div className="h-10 w-20 bg-slate-200 rounded-lg mb-2 animate-pulse" />
            <div className="h-3 w-32 bg-slate-100 rounded-full animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-red-50 border border-red-100 p-6 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card, idx) => {
        const value = insights?.[card.key];
        const display =
          card.key === 'tip'
            ? `"${value || 'Start logging your sleep to get personalized tips!'}"`
            : value || 0;

        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.35 }}
            className="relative overflow-hidden rounded-2xl bg-white/80 border border-white shadow-lg hover:-translate-y-1 hover:shadow-2xl transition"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-10`} />
            <div className="relative p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white/80 flex items-center justify-center text-lg">
                  {card.icon}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">{card.title}</p>
                  <p className="text-sm text-slate-400">{card.unit}</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900">
                {display}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SleepInsights;
