import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../utils/api";

const SleepLogList = ({ refreshTrigger }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    fetchLogs();
  }, [refreshTrigger]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const response = await api.get("/sleep-logs");
      setLogs(response.data.sleepLogs);
      setError("");
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to fetch sleep logs";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (logId) => {
    if (!window.confirm("Are you sure you want to delete this sleep log?")) {
      return;
    }

    try {
      setDeleteLoading(logId);
      await api.delete(`/sleep-logs/${logId}`);
      setLogs(logs.filter((log) => log._id !== logId));
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to delete sleep log";
      setError(message);
    } finally {
      setDeleteLoading(null);
    }
  };

  const getQualityColor = (quality) => {
    switch (quality) {
      case "Poor":
        return "bg-red-100 text-red-800";
      case "Fair":
        return "bg-amber-100 text-amber-800";
      case "Good":
        return "bg-emerald-100 text-emerald-800";
      case "Excellent":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-white/80 border border-white shadow-lg p-6">
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-slate-100 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white/80 border border-white shadow-lg p-4 md:p-6">
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {logs.length === 0 ? (
        <div className="text-center py-10 space-y-2">
          <div className="text-4xl">🌙</div>
          <p className="text-slate-700 font-semibold">No sleep logs yet</p>
          <p className="text-slate-500 text-sm">Log your first night to see history.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {logs.map((log, index) => (
            <motion.div
              key={log._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.25 }}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-xl bg-gradient-to-r from-slate-50 via-white to-slate-50 border border-slate-100 px-4 py-3 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-indigo-50 text-indigo-700 font-semibold flex items-center justify-center">
                  {log.duration}h
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{formatDate(log.date)}</p>
                  <p className="text-sm text-slate-500">{log.notes || "No notes provided"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getQualityColor(log.quality)}`}>
                  {log.quality}
                </span>
                <button
                  onClick={() => handleDelete(log._id)}
                  disabled={deleteLoading === log._id}
                  className="text-red-500 hover:text-red-700 disabled:opacity-50 px-3 py-1 text-sm font-semibold"
                >
                  {deleteLoading === log._id ? "..." : "Delete"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SleepLogList;
