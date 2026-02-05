import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import driveLogo from '../assets/drivelogo.png';

const DriveLogo = () => (
  <div className="relative w-full h-full flex items-center justify-center p-8">
    <div className="text-center -mt-24">
      <div className="relative w-55 h-55 mx-auto mb-8 ">
        <img src={driveLogo} alt="D.R.I.V.E. Logo" className="w-full h-full object-contain drop-shadow-2xl" />
      </div>
      <h1 className="text-6xl font-bold text-blue-900 mb-4">D.R.I.V.E.</h1>
      <p className="text-xl text-blue-900 mb-2">Drowsiness Recognition through</p>
      <p className="text-xl text-blue-900">Intelligent Vision Evaluation</p>
    </div>
  </div>
);


export function ForgotPasswordPage({ onBackToLogin }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email) => {
    if (!email) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate email
    const emailErr = validateEmail(email);
    setEmailError(emailErr);

    // If no errors, show success message
    if (!emailErr) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-sky-100 via-blue-50 to-sky-200">
        {/* Left side - Logo and branding */}
        <div className="hidden lg:flex lg:w-1/2 relative flex items-start justify-center p-8">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L3N2Zz4=')] opacity-30"></div>
          <DriveLogo />
        </div>

        {/* Right side - Success message */}
        <div className="flex-1 flex flex-col justify-between relative">
          <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
            <div className="w-full max-w-md">
              {/* Mobile logo */}
              <div className="lg:hidden mb-8">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <img src={driveLogo} alt="D.R.I.V.E. Logo" className="w-full h-full object-contain drop-shadow-2xl" />
                </div>
                <h1 className="text-3xl font-bold text-blue-700 text-center mb-2 drop-shadow-lg">D.R.I.V.E.</h1>
              </div>

              <div className="bg-white/95 lg:bg-white backdrop-blur-md lg:backdrop-blur-none rounded-2xl shadow-2xl lg:shadow-xl p-8 lg:p-10 border border-white/20 lg:border-blue-100">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  
                  <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-4">
                    Check Your Email
                  </h2>
                  
                  <p className="text-gray-600 mb-6">
                    We've sent password reset instructions to <span className="font-semibold text-gray-800">{email}</span>
                  </p>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-left">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>What's next?</strong>
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                      <li>Check your inbox for the password reset email</li>
                      <li>Click the link in the email to reset your password</li>
                      <li>Return to the login page to sign in with your new password</li>
                    </ul>
                  </div>

                  <p className="text-sm text-gray-500 mb-6">
                    Didn't receive the email? Check your spam folder or{' '}
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      try again
                    </button>
                  </p>

                  <button
                    onClick={onBackToLogin}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5"
                  >
                    Back to Login
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
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

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-sky-100 via-blue-50 to-sky-200">
      {/* Left side - Logo and branding */}
      <div className="hidden lg:flex lg:w-1/2 relative flex items-start justify-center p-8">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L3N2Zz4=')] opacity-30"></div>
        <DriveLogo />
      </div>

      {/* Right side - Forgot password form */}
      <div className="flex-1 flex flex-col justify-between relative">
        <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="lg:hidden mb-8">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <img src={driveLogo} alt="D.R.I.V.E. Logo" className="w-full h-full object-contain drop-shadow-2xl" />
              </div>
              <h1 className="text-3xl font-bold text-blue-700 text-center mb-2 drop-shadow-lg">D.R.I.V.E.</h1>
            </div>

            <div className="bg-white/95 lg:bg-white backdrop-blur-md lg:backdrop-blur-none rounded-2xl shadow-2xl lg:shadow-xl p-8 lg:p-10 border border-white/20 lg:border-blue-100">
              <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">
                Reset Password
              </h2>
              <p className="text-gray-600 mb-8">
                Enter your email address and we'll send you instructions to reset your password
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError('');
                    }}
                    className={`w-full px-4 py-3 border ${emailError ? 'border-red-500' : 'border-blue-200'} rounded-xl focus:ring-2 ${emailError ? 'focus:ring-red-400' : 'focus:ring-blue-400'} focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200 hover:border-blue-300`}
                    placeholder="admin@drive.com"
                  />
                  {emailError && (
                    <p className="mt-1 text-sm text-red-600">{emailError}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5"
                >
                  Send Reset Instructions
                </button>

                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="w-full text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                >
                  Back to Login
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
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
