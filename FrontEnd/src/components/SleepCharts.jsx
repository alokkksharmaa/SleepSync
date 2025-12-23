import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import api from '../utils/api';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const SleepCharts = ({ logs: propLogs, refreshTrigger }) => {
  const [logs, setLogs] = useState(propLogs || []);
  const [loading, setLoading] = useState(!propLogs);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!propLogs) {
      fetchLogs();
    } else {
      setLogs(propLogs);
    }
  }, [propLogs, refreshTrigger]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const response = await api.get('/sleep-logs');
      setLogs(response.data.sleepLogs);
      setError('');
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch sleep logs';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const renderSkeleton = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-2xl bg-white/80 border border-white shadow-lg p-6 h-64 animate-pulse" />
      ))}
    </div>
  );

  if (logs.length < 5 && !loading) {
    return (
      <div className="rounded-2xl bg-white/80 border border-white shadow-lg p-6 text-center space-y-2">
        <div className="text-4xl">📊</div>
        <p className="text-slate-800 font-semibold">Log more entries to see trends</p>
        <p className="text-slate-500 text-sm">You need at least 5 sleep logs to view charts.</p>
      </div>
    );
  }

  if (loading) return renderSkeleton();

  if (error) {
    return (
      <div className="rounded-2xl bg-white/80 border border-white shadow-lg p-6">
        <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl">
          {error}
        </div>
      </div>
    );
  }

  // Process data for Line Chart: Sleep Duration Over Time (last 14 days)
  const processDurationOverTime = () => {
    const sortedLogs = [...logs].sort((a, b) => new Date(a.date) - new Date(b.date));
    const last14Days = sortedLogs.slice(-14);

    const labels = last14Days.map(log => {
      const date = new Date(log.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });

    const data = last14Days.map(log => log.duration);

    return {
      labels,
      datasets: [{
        label: 'Sleep Duration (hours)',
        data,
        borderColor: 'rgb(79, 70, 229)', // indigo-600
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        tension: 0.4,
        fill: true,
      }],
    };
  };

  // Process data for Bar Chart: Average Sleep by Day of Week
  const processAverageByDayOfWeek = () => {
    const dayOfWeekData = {
      'Sunday': [],
      'Monday': [],
      'Tuesday': [],
      'Wednesday': [],
      'Thursday': [],
      'Friday': [],
      'Saturday': []
    };

    logs.forEach(log => {
      const date = new Date(log.date);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      dayOfWeekData[dayName].push(log.duration);
    });

    const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const data = labels.map(day => {
      const fullDayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][labels.indexOf(day)];
      const durations = dayOfWeekData[fullDayName];
      return durations.length > 0 ? (durations.reduce((a, b) => a + b, 0) / durations.length).toFixed(1) : 0;
    });

    return {
      labels,
      datasets: [{
        label: 'Average Sleep (hours)',
        data,
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)', // blue-500
          'rgba(59, 130, 246, 0.7)',
          'rgba(59, 130, 246, 0.6)',
          'rgba(59, 130, 246, 0.5)',
          'rgba(59, 130, 246, 0.6)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(59, 130, 246, 0.8)',
        ],
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      }],
    };
  };

  // Process data for Doughnut Chart: Sleep Quality Distribution
  const processQualityDistribution = () => {
    const qualityCounts = {
      'Poor': 0,
      'Fair': 0,
      'Good': 0,
      'Excellent': 0
    };

    logs.forEach(log => {
      qualityCounts[log.quality]++;
    });

    const data = Object.values(qualityCounts);
    const labels = Object.keys(qualityCounts);

    return {
      labels,
      datasets: [{
        data,
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',   // red-500 for Poor
          'rgba(245, 158, 11, 0.8)',  // amber-500 for Fair
          'rgba(34, 197, 94, 0.8)',   // green-500 for Good
          'rgba(59, 130, 246, 0.8)',  // blue-500 for Excellent
        ],
        borderColor: [
          'rgb(239, 68, 68)',   // red-500
          'rgb(245, 158, 11)',  // amber-500
          'rgb(34, 197, 94)',   // green-500
          'rgb(59, 130, 246)',  // blue-500
        ],
        borderWidth: 2,
      }],
    };
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sleep Duration Over Time',
        font: {
          size: 16,
          weight: 'bold',
        },
        color: '#4338ca', // indigo-700
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Hours',
        },
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Average Sleep by Day of Week',
        font: {
          size: 16,
          weight: 'bold',
        },
        color: '#4338ca', // indigo-700
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Hours',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Sleep Quality Distribution',
        font: {
          size: 16,
          weight: 'bold',
        },
        color: '#4338ca', // indigo-700
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-2xl bg-white/85 border border-white shadow-xl p-6"
      >
        <div className="h-80">
          <Line data={processDurationOverTime()} options={lineOptions} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="rounded-2xl bg-white/85 border border-white shadow-xl p-6"
      >
        <div className="h-80">
          <Bar data={processAverageByDayOfWeek()} options={barOptions} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="rounded-2xl bg-white/85 border border-white shadow-xl p-6 lg:col-span-2"
      >
        <div className="h-80 flex justify-center">
          <div className="w-full max-w-md">
            <Doughnut data={processQualityDistribution()} options={doughnutOptions} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SleepCharts;
