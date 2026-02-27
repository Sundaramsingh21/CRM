import { Mail, Lock } from "lucide-react";
import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

const Login = () => {
  const { login, navigate } = useContext(AppContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await login(formData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* LEFT SIDE (Branding - Desktop Only) */}
      <div className="hidden lg:flex w-1/2 bg-linear-to-br from-indigo-600 to-purple-600 text-white flex-col justify-center px-16">
        <h1 className="text-4xl font-bold mb-6">
          CRM Pro
        </h1>
        <p className="text-lg opacity-90 leading-relaxed">
          Manage your leads, track deals, and monitor activities —
          all in one powerful CRM platform built for modern teams.
        </p>
      </div>

      {/* RIGHT SIDE (Login Form) */}
      <div className="flex flex-1 items-center justify-center px-6 sm:px-12">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8">

          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              Welcome Back
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              Please enter your details to sign in
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Email
              </label>
              <div className="mt-2 relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Password
              </label>
              <div className="mt-2 relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="accent-indigo-600" />
                Remember me
              </label>

              <button
                type="button"
                className="text-indigo-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer bg-indigo-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition"
            > {loading ?
              (
                <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-2xl z-10">
                  <Loading />
                </div>
              )
              : "Sign In"}
            </button>

          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/register")} className="text-indigo-600 cursor-pointer hover:underline">
              Register
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;