import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { LogIn } from "lucide-react";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any existing errors
    try {
      await dispatch(login({ email, password })).unwrap();
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <div className="flex justify-center mb-6">
          <LogIn className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome
        </h2>
        <p className="text-center text-gray-600 text-sm mb-6">
          Please sign in to continue to{" "}
          <span className="font-semibold text-green-600">DoIt</span>
        </p>
        {errorMessage && (
          <div className="mb-4 text-center text-red-600 font-medium text-sm">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 bg-gray-50 p-3"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 bg-gray-50 p-3"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium shadow-lg transition ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>
        {/* <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="text-green-600 hover:underline font-medium">
              Sign up
            </a>
          </p>
        </div> */}
      </div>
    </div>
  );
};
