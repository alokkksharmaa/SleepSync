import { MdAlternateEmail } from "react-icons/md";
import { FaFingerprint } from "react-icons/fa";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { BsApple } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordView = () => setShowPassword(prev => !prev);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // your login logic here
    console.log("Login attempt");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[90%] max-w-sm md:max-w-md p-5 bg-gray-900 flex-col flex items-center gap-3 rounded-xl shadow-slate-500 shadow-lg">
        
        <img src="/logo.png" alt="logo" className="w-12 md:w-14" />
        
        <h1 className="text-lg md:text-xl font-semibold">Welcome Back</h1>
        
        <p className="text-xs md:text-sm text-gray-500 text-center">
          Don't have an account?{" "}
          <span className="text-white cursor-pointer hover:underline">Sign up</span>
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 mt-2">

          {/* Email Field */}
          <div className="w-full flex items-center gap-2 bg-gray-800 p-2 rounded-xl">
            <MdAlternateEmail aria-hidden="true" />
            <input
              type="email"
              placeholder="Email address"
              required
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
            />
          </div>

          {/* Password Field */}
          <div className="w-full flex items-center gap-2 bg-gray-800 p-2 rounded-xl relative">
            <FaFingerprint aria-hidden="true" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
            />

            {/* Password Toggle Icon */}
            {showPassword ? (
              <FaRegEyeSlash
                aria-hidden="true"
                className="absolute right-5 cursor-pointer"
                onClick={togglePasswordView}
              />
            ) : (
              <FaRegEye
                aria-hidden="true"
                className="absolute right-5 cursor-pointer"
                onClick={togglePasswordView}
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 rounded-xl mt-3 hover:bg-blue-600 transition text-sm md:text-base"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="relative w-full flex items-center justify-center py-3">
          <div className="w-2/5 h-[2px] bg-gray-800"></div>
          <h3 className="font-lora text-xs md:text-sm px-4 text-gray-500">
            Or
          </h3>
          <div className="w-2/5 h-[2px] bg-gray-800"></div>
        </div>

        {/* Social Login */}
        <div className="w-full flex items-center justify-evenly gap-2">

          {/* Apple */}
          <div className="p-2 md:px-6 bg-slate-700 cursor-pointer rounded-xl hover:bg-slate-800 transition">
            <BsApple className="text-lg md:text-xl" aria-hidden="true" />
          </div>

          {/* Google */}
          <div className="p-1 md:px-6 bg-slate-700 cursor-pointer rounded-xl hover:bg-slate-800 transition">
            <img
              src="/google-icon.png"
              alt="google icon"
              className="w-6 md:w-8"
            />
          </div>

          {/* X/Twitter */}
          <div className="p-2 md:px-6 bg-slate-700 cursor-pointer rounded-xl hover:bg-slate-800 transition">
            <FaXTwitter className="text-lg md:text-xl" aria-hidden="true" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
