import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import SleepInsights from "../components/SleepInsights";
import SleepLogForm from "../components/SleepLogForm";
import SleepLogList from "../components/SleepLogList";
import SleepCharts from "../components/SleepCharts";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSleepLogAdded = () => setRefreshTrigger((prev) => prev + 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 text-slate-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/60 border-b border-white/50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 shadow-lg shadow-indigo-200 flex items-center justify-center text-white font-bold">
              SS
            </div>
            <div>
              <p className="text-lg font-semibold text-indigo-900">SleepSync</p>
              <p className="text-xs text-slate-500">Sleep tracking & wellness</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
            <a href="#hero" className="hover:text-indigo-600 transition-colors">Dashboard</a>
            <a href="#log" className="hover:text-indigo-600 transition-colors">Log Sleep</a>
            <a href="#insights" className="hover:text-indigo-600 transition-colors">Insights</a>
            <a href="#profile" className="hover:text-indigo-600 transition-colors">Profile</a>
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-white/60 shadow-sm">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center text-sm font-semibold">
                {user?.username?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="text-xs leading-tight">
                <p className="font-semibold text-slate-800">{user?.username || "Member"}</p>
                <p className="text-slate-500">{user?.email || "Welcome back"}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500 shadow-md shadow-indigo-200 hover:shadow-lg transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white shadow-2xl p-8 md:p-12"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_25%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.12),transparent_25%)]" />
          <div className="relative grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-sm font-medium">
                🌙 Personalized insights · ⏰ Consistent sleep · 😌 Better recovery
              </p>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                Welcome back, {user?.username || "dreamer"}.
                <br />
                Let’s make tonight your best rest yet.
              </h1>
              <p className="text-base md:text-lg text-indigo-100 max-w-2xl">
                Track your sleep, uncover trends, and get actionable guidance to wake up energized every day.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#log"
                  className="px-5 py-3 rounded-xl bg-white text-indigo-700 font-semibold shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition"
                >
                  Log sleep now
                </a>
                <a
                  href="#insights"
                  className="px-5 py-3 rounded-xl bg-white/20 border border-white/30 text-white font-semibold hover:bg-white/30 transition"
                >
                  View insights
                </a>
              </div>
            </div>
            <div className="md:flex flex-col justify-center space-y-4 hidden">
              <div className="backdrop-blur-lg bg-white/15 rounded-2xl p-4 shadow-lg border border-white/20">
                <p className="text-sm text-indigo-50 mb-1">Sleep score</p>
                <p className="text-4xl font-bold">87</p>
                <p className="text-xs text-indigo-100">+4 vs last week</p>
                <div className="mt-3 h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-emerald-300 to-cyan-300" />
                </div>
              </div>
              <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-4 shadow-lg border border-white/20">
                <p className="text-sm text-indigo-50 mb-1">Streak</p>
                <p className="text-2xl font-semibold">6 nights</p>
                <p className="text-xs text-indigo-100">Keep it going!</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 space-y-10">
        {/* Insights */}
        <section id="insights" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-wide text-slate-500 font-semibold">Insights</p>
              <h2 className="text-2xl font-bold text-slate-900">Your sleep at a glance</h2>
            </div>
            <Link to="#" className="text-indigo-600 font-semibold text-sm hover:text-indigo-700">
              View tips →
            </Link>
          </div>
          <SleepInsights />
        </section>

        {/* Trends */}
        <section className="space-y-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-500 font-semibold">Trends</p>
            <h2 className="text-2xl font-bold text-slate-900">Sleep trends & quality</h2>
            <p className="text-slate-500 text-sm mt-1">
              Visualize your duration, consistency, and quality distribution in a single view.
            </p>
          </div>
          <SleepCharts refreshTrigger={refreshTrigger} />
        </section>

        {/* Log form */}
        <section id="log" className="space-y-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-500 font-semibold">Log</p>
            <h2 className="text-2xl font-bold text-slate-900">Log your sleep</h2>
            <p className="text-slate-500 text-sm mt-1">
              Capture your latest sleep session with rich context and keep your streak alive.
            </p>
          </div>
          <SleepLogForm onSuccess={handleSleepLogAdded} />
        </section>

        {/* History */}
        <section className="space-y-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-500 font-semibold">History</p>
            <h2 className="text-2xl font-bold text-slate-900">Your sleep history</h2>
            <p className="text-slate-500 text-sm mt-1">Review and manage past logs.</p>
          </div>
          <SleepLogList refreshTrigger={refreshTrigger} />
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mt-10 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-2xl bg-white/10 flex items-center justify-center font-bold">
                SS
              </div>
              <span className="text-lg font-semibold">SleepSync</span>
            </div>
            <p className="text-sm text-slate-300">
              A premium sleep & wellness companion to help you rest deeper and wake brighter.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a className="hover:text-white transition" href="#hero">Home</a></li>
              <li><a className="hover:text-white transition" href="#hero">Dashboard</a></li>
              <li><a className="hover:text-white transition" href="#hero">Privacy</a></li>
              <li><a className="hover:text-white transition" href="#hero">Terms</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide">Resources</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a className="hover:text-white transition" href="#insights">Sleep Tips</a></li>
              <li><a className="hover:text-white transition" href="#insights">Blog</a></li>
              <li><a className="hover:text-white transition" href="#log">Support</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide">Social</h3>
            <div className="flex gap-3">
              {["GitHub", "LinkedIn", "Twitter"].map((item) => (
                <span
                  key={item}
                  className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-sm font-semibold hover:bg-white/20 transition cursor-pointer"
                >
                  {item[0]}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 text-center text-xs text-slate-400 py-4">
          © {new Date().getFullYear()} SleepSync. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
