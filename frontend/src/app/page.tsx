'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Brain, Users, BookOpen, Calendar, ArrowRight, Check, Star, Globe, 
  Shield, Zap, MessageSquare, TrendingUp, Award, Clock, Heart,
  Sparkles, ChevronRight, Play, Menu, X
} from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: Brain,
      title: 'AI Parenting Coach',
      description: 'Get instant Islamic parenting advice in 3 languages',
      stats: '50K+ Questions Answered',
      color: 'from-violet-600 to-indigo-600',
      link: '/ai-coach'
    },
    {
      icon: Users,
      title: 'Community Hub',
      description: 'Connect with Muslim parents worldwide',
      stats: '10K+ Active Parents',
      color: 'from-pink-600 to-rose-600',
      link: '/community'
    },
    {
      icon: Calendar,
      title: 'Daily Parenting Tips',
      description: 'Receive daily Islamic wisdom & reminders',
      stats: 'New Content Daily',
      color: 'from-amber-600 to-orange-600',
      link: '/daily-tips'
    },
    {
      icon: BookOpen,
      title: 'Workshops & Resources',
      description: 'Premium courses, ebooks & video content',
      stats: '100+ Resources',
      color: 'from-emerald-600 to-teal-600',
      link: '/workshops'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Parents', icon: Users },
    { number: '100K+', label: 'Questions Answered', icon: MessageSquare },
    { number: '4.9⭐', label: 'App Rating', icon: Star },
    { number: '24/7', label: 'AI Support', icon: Clock }
  ];

  const testimonials = [
    {
      name: 'Fatima Ahmed',
      location: 'London, UK',
      text: 'Waalid Legacy helped me navigate raising my teenagers in the West while keeping our Islamic values strong.',
      rating: 5
    },
    {
      name: 'Abdi Rahman',
      location: 'Toronto, Canada',
      text: 'The AI coach understands our unique challenges as Muslim parents. The Somali language support is amazing!',
      rating: 5
    },
    {
      name: 'Aisha Mohamed',
      location: 'New York, USA',
      text: 'Finally, a parenting app that combines Islamic wisdom with modern parenting science. Life-changing!',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Waalid Legacy
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/ai-coach" className="hover:text-violet-400 transition">AI Coach</Link>
              <Link href="/community" className="hover:text-violet-400 transition">Community</Link>
              <Link href="/daily-tips" className="hover:text-violet-400 transition">Daily Tips</Link>
              <Link href="/workshops" className="hover:text-violet-400 transition">Workshops</Link>
              <Link href="/login">
                <Button variant="outline" className="border-violet-600 text-violet-400 hover:bg-violet-600 hover:text-white">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                  Get Started Free
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
              <Link href="/ai-coach" className="block py-2 hover:text-violet-400">AI Coach</Link>
              <Link href="/community" className="block py-2 hover:text-violet-400">Community</Link>
              <Link href="/daily-tips" className="block py-2 hover:text-violet-400">Daily Tips</Link>
              <Link href="/workshops" className="block py-2 hover:text-violet-400">Workshops</Link>
              <Link href="/login" className="block">
                <Button variant="outline" className="w-full border-violet-600 text-violet-400">Login</Button>
              </Link>
              <Link href="/register" className="block">
                <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600">Get Started</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-indigo-900/20"></div>
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-violet-900/30 backdrop-blur border border-violet-500/30 rounded-full px-4 py-2 mb-6">
              <Zap className="h-4 w-4 text-violet-400" />
              <span className="text-sm text-violet-300">Trusted by 50,000+ Muslim Parents Worldwide</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent gradient-animate">
                AI-Powered Islamic
              </span>
              <br />
              <span className="text-white">Parenting Support</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Expert guidance for Muslim parents in the West. Combining Quran, Sunnah, and modern parenting science in English, Somali & Arabic.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-lg px-8 py-6 rounded-xl shadow-2xl shadow-violet-500/25">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="border-2 border-violet-600 text-violet-400 hover:bg-violet-600 hover:text-white text-lg px-8 py-6 rounded-xl">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </Link>
            </div>

            {/* Language Support */}
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-violet-400" />
                <span className="text-gray-400">Available in:</span>
              </div>
              <span className="text-white font-semibold">🇬🇧 English</span>
              <span className="text-white font-semibold">🇸🇴 Af-Soomaali</span>
              <span className="text-white font-semibold">🇸🇦 العربية</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 border-y border-white/10 bg-gradient-to-r from-violet-900/10 via-black to-indigo-900/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex p-3 bg-gradient-to-br from-violet-600/20 to-indigo-600/20 rounded-xl mb-3">
                  <stat.icon className="h-6 w-6 text-violet-400" />
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-400 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Enterprise Features
              </span>
            </h2>
            <p className="text-xl text-gray-400">Everything you need to raise confident Muslim children</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={feature.link}>
                  <div className="group relative bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 hover:border-violet-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/20 cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="relative">
                      <div className={`inline-flex p-3 bg-gradient-to-br ${feature.color} rounded-xl mb-4`}>
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-violet-400 transition">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-400 mb-4">
                        {feature.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-violet-400 font-semibold">
                          {feature.stats}
                        </span>
                        <ChevronRight className="h-5 w-5 text-gray-600 group-hover:text-violet-400 group-hover:translate-x-2 transition-all" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-br from-violet-900/10 via-black to-indigo-900/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Parent Success Stories
              </span>
            </h2>
            <p className="text-xl text-gray-400">Join thousands of satisfied Muslim parents</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-violet-900/30 via-indigo-900/30 to-purple-900/30 backdrop-blur-xl border border-violet-500/30 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Ready to Transform Your Parenting?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get instant access to AI-powered Islamic parenting guidance
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-lg px-8 py-6 rounded-xl shadow-2xl shadow-violet-500/25">
                  Start 7-Day Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">Waalid Legacy</span>
              </div>
              <p className="text-gray-400">Empowering Muslim parents with AI-powered Islamic guidance</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-violet-400">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/ai-coach" className="hover:text-violet-400 transition">AI Coach</Link></li>
                <li><Link href="/community" className="hover:text-violet-400 transition">Community</Link></li>
                <li><Link href="/daily-tips" className="hover:text-violet-400 transition">Daily Tips</Link></li>
                <li><Link href="/workshops" className="hover:text-violet-400 transition">Workshops</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-violet-400">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-violet-400 transition">About</Link></li>
                <li><Link href="/blog" className="hover:text-violet-400 transition">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-violet-400 transition">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-violet-400 transition">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-violet-400">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-violet-400 transition">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-violet-400 transition">Terms</Link></li>
                <li><Link href="/security" className="hover:text-violet-400 transition">Security</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center text-gray-400">
            <p>© 2024 Waalid Legacy. All rights reserved. Built with ❤️ for Muslim parents worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}