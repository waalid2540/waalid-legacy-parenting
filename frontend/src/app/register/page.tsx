'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Lock, User, ArrowLeft, Eye, EyeOff, Sparkles, Check, Globe } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    preferredLanguage: 'english',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate registration
    setTimeout(() => setIsLoading(false), 2000);
  };

  const benefits = [
    "24/7 AI Islamic parenting coach",
    "Connect with 50K+ Muslim parents",
    "Daily Islamic parenting tips",
    "Premium workshops & courses",
    "Support in 3 languages",
    "100% Islamic values focused"
  ];

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-indigo-900/20"></div>
      
      <div className="w-full max-w-4xl relative">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-violet-600/20 p-2">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 shadow-2xl">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl w-fit">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">
                  Join Waalid Legacy
                </CardTitle>
                <p className="text-gray-400">
                  Start your 7-day free trial today
                </p>
              </CardHeader>

              <CardContent className="space-y-6 p-6">
                <form onSubmit={handleRegister} className="space-y-4">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-300">
                        First Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          placeholder="First name"
                          className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 text-white rounded-xl focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-300">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        placeholder="Last name"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white rounded-xl focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 text-white rounded-xl focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                        required
                      />
                    </div>
                  </div>

                  {/* Language Preference */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300">
                      Preferred Language
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                        value={formData.preferredLanguage}
                        onChange={(e) => setFormData({...formData, preferredLanguage: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 text-white rounded-xl focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                      >
                        <option value="english">🇬🇧 English</option>
                        <option value="somali">🇸🇴 Af-Soomaali</option>
                        <option value="arabic">🇸🇦 العربية</option>
                      </select>
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        placeholder="Create password"
                        className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-600 text-white rounded-xl focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        placeholder="Confirm password"
                        className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-600 text-white rounded-xl focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
                      className="mt-1 rounded border-gray-600 bg-gray-800 text-violet-600 focus:ring-violet-500"
                      required
                    />
                    <label className="text-sm text-gray-300">
                      I agree to the{' '}
                      <Link href="/terms" className="text-violet-400 hover:text-violet-300">
                        Terms of Service
                      </Link>
                      {' '}and{' '}
                      <Link href="/privacy" className="text-violet-400 hover:text-violet-300">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  {/* Register Button */}
                  <Button
                    type="submit"
                    isLoading={isLoading}
                    disabled={!formData.agreeToTerms}
                    className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 py-3 text-lg font-semibold"
                  >
                    Start Free Trial
                  </Button>
                </form>

                {/* Sign In Link */}
                <div className="text-center text-gray-400">
                  Already have an account?{' '}
                  <Link href="/login" className="text-violet-400 hover:text-violet-300 font-semibold transition">
                    Sign in here
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Benefits Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="bg-gradient-to-br from-violet-900/30 to-indigo-900/30 border border-violet-500/30">
              <CardHeader>
                <CardTitle className="text-white text-xl">
                  🌟 What You Get With Waalid Legacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="p-1 bg-green-600 rounded-full">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border border-emerald-500/30">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🕌</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  100% Islamic Values
                </h3>
                <p className="text-gray-300 text-sm">
                  All our content is reviewed by Islamic scholars and follows Quran and Sunnah guidance.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 border border-amber-500/30">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  50,000+ Parents Trust Us
                </h3>
                <p className="text-gray-300 text-sm">
                  Join thousands of Muslim families worldwide who use Waalid Legacy daily.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}