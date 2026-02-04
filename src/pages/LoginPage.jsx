import { useState } from 'react';
import driveLogo from '../assets/drivelogo.png';

const DriveLogo = () => (
  <div className="relative w-full h-full flex items-center justify-center p-8">
    <div className="text-center -mt-24">
      <div className="relative w-55 h-55 mx-auto mb-8">
        <img
          src={driveLogo}
          alt="D.R.I.V.E. Logo"
          className="w-full h-full object-contain drop-shadow-2xl"
        />
      </div>
      <h1 className="text-6xl font-bold text-blue-900 mb-4">D.R.I.V.E.</h1>
      <p className="text-xl text-blue-900 mb-2">
        Drowsiness Recognition through
      </p>
      <p className="text-xl text-blue-900">
        Intelligent Vision Evaluation
      </p>
    </div>
  </div>
);

export function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [staySignedIn, setStaySignedIn] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (!emailErr && !passwordErr) {
      onLogin(email, password);
    }
  };

  const handleForgotPassword = () => {
    alert('Password reset functionality will be implemented soon.');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-sky-100 via-blue-50 to-sky-200">
      {/* Left side */}
      <div className="hidden lg:flex lg:w-1/2 relative flex items-start justify-center p-8">
        <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L3N2Zz4=')]"></div>
        <DriveLogo />
      </div>

      {/* Right side */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="lg:hidden mb-8 text-center">
              <img
                src={driveLogo}
                alt="D.R.I.V.E. Logo"
                className="w-24 h-24 mx-auto mb-4 object-contain"
              />
              <h1 className="text-3xl font-bold text-blue-700">
                D.R.I.V.E.
              </h1>
            </div>

            <div className="bg-white/95 rounded-2xl shadow-xl p-8 border border-blue-100">
              <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">
                Admin Login
              </h2>
              <p className="text-gray-600 mb-8">
                Enter your credentials to access the admin dashboard
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError('');
                    }}
                    className={`w-full px-4 py-3 border ${
                      emailError ? 'border-red-500' : 'border-blue-200'
                    } rounded-xl`}
                    placeholder="admin@drive.com"
                  />
                  {emailError && (
                    <p className="text-sm text-red-600 mt-1">
                      {emailError}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError('');
                    }}
                    className={`w-full px-4 py-3 border ${
                      passwordError ? 'border-red-500' : 'border-blue-200'
                    } rounded-xl`}
                    placeholder="••••••••"
                  />
                  {passwordError && (
                    <p className="text-sm text-red-600 mt-1">
                      {passwordError}
                    </p>
                  )}
                </div>

                {/* Stay signed in */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={staySignedIn}
                    onChange={(e) => setStaySignedIn(e.target.checked)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Stay signed in
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold"
                >
                  Login
                </button>

                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="w-full text-blue-600 text-sm"
                >
                  Forgot Password?
                </button>
              </form>
            </div>
          </div>
        </div>

        <footer className="p-6 text-center text-gray-600">
          <div className="text-sm">
            <p className="font-semibold mb-2">© 2025 D.R.I.V.E. System</p>
            <p className="text-xs opacity-80">
              Drowsiness Recognition through Intelligent Vision Evaluation
            </p>
            <p className="text-xs opacity-80 mt-1">
              Advanced IoT-based driver safety monitoring system
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
