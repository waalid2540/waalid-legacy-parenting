'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Play, Download, Star, Clock, Users, ArrowLeft, Filter, Search, Crown } from 'lucide-react';
import Link from 'next/link';

export default function WorkshopsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const workshops = [
    {
      id: 1,
      title: "Raising Confident Muslim Children in the West",
      instructor: "Dr. Yasmin Al-Rashid",
      duration: "3 hours",
      students: 2847,
      rating: 4.9,
      price: 97,
      type: "Premium Course",
      category: "Identity & Belonging",
      thumbnail: "🕌",
      description: "Learn evidence-based strategies for helping your children maintain strong Islamic identity while thriving in Western society.",
      lessons: 12,
      language: "English",
      level: "All Levels"
    },
    {
      id: 2,
      title: "Waxbarashada Carruurta Islaamka ah ee Reer Galbeedka",
      instructor: "Ustadh Abdirahman Omar",
      duration: "2.5 hours",
      students: 1563,
      rating: 4.8,
      price: 79,
      type: "Premium Course",
      category: "Islamic Education",
      thumbnail: "📚",
      description: "Hab cusub oo aad ugu barto carruurta aqoonta Islaamka iyada oo la dhex galiyey deegaanka reer galbeedka.",
      lessons: 10,
      language: "Somali",
      level: "Beginner"
    },
    {
      id: 3,
      title: "تربية الأطفال المسلمين في المجتمع الغربي",
      instructor: "د. عائشة محمد",
      duration: "4 hours",
      students: 3241,
      rating: 4.9,
      price: 127,
      type: "Master Class",
      category: "Advanced Parenting",
      thumbnail: "👨‍👩‍👧‍👦",
      description: "دورة شاملة لتربية الأطفال المسلمين وفقاً للقرآن والسنة مع مراعاة التحديات الغربية الحديثة.",
      lessons: 16,
      language: "Arabic",
      level: "Advanced"
    },
    {
      id: 4,
      title: "Teen Challenges: Islamic Solutions",
      instructor: "Imam Abdullah Khan",
      duration: "2 hours",
      students: 1876,
      rating: 4.7,
      price: 67,
      type: "Workshop",
      category: "Teenagers",
      thumbnail: "🧑‍🎓",
      description: "Navigate the unique challenges of raising Muslim teenagers with practical Islamic guidance and modern understanding.",
      lessons: 8,
      language: "English",
      level: "Intermediate"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Courses', count: 47 },
    { id: 'identity', name: 'Identity & Belonging', count: 12 },
    { id: 'education', name: 'Islamic Education', count: 15 },
    { id: 'teens', name: 'Teenagers', count: 8 },
    { id: 'marriage', name: 'Marriage & Family', count: 9 },
    { id: 'advanced', name: 'Advanced Parenting', count: 3 }
  ];

  const featuredStats = [
    { icon: BookOpen, label: 'Premium Courses', value: '47+', color: 'from-emerald-600 to-teal-600' },
    { icon: Users, label: 'Expert Instructors', value: '23', color: 'from-blue-600 to-indigo-600' },
    { icon: Play, label: 'Hours of Content', value: '150+', color: 'from-purple-600 to-pink-600' },
    { icon: Star, label: 'Average Rating', value: '4.9⭐', color: 'from-yellow-600 to-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="sticky top-0 bg-black/80 backdrop-blur-xl z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="icon" className="hover:bg-violet-600/20 text-white">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold text-white">Workshops & Resources</span>
                  <p className="text-xs text-gray-400">Premium Islamic parenting education</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800 border border-gray-600 text-white rounded-lg pl-10 pr-4 py-2 text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {featuredStats.map((stat, index) => (
            <Card key={index} className="bg-gradient-to-br from-gray-900 to-black border border-white/10">
              <CardContent className="p-4 text-center">
                <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl mb-3 mx-auto w-fit opacity-20`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 sticky top-24">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Filter className="h-5 w-5 text-emerald-400" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedFilter(category.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all ${
                      selectedFilter === category.id 
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white' 
                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{category.name}</span>
                      <span className="text-xs bg-gray-700 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Workshops Grid */}
          <div className="lg:col-span-3">
            <div className="grid gap-6">
              {workshops.map((workshop, index) => (
                <motion.div
                  key={workshop.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 hover:border-emerald-500/30 transition-all overflow-hidden group">
                    <div className="md:flex">
                      {/* Course Thumbnail */}
                      <div className="md:w-1/3 bg-gradient-to-br from-emerald-600/20 to-teal-600/20 flex items-center justify-center p-8">
                        <div className="text-6xl opacity-70 group-hover:scale-110 transition-transform">
                          {workshop.thumbnail}
                        </div>
                      </div>

                      {/* Course Content */}
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs bg-emerald-600/20 text-emerald-400 px-2 py-1 rounded-full">
                                {workshop.type}
                              </span>
                              <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                                {workshop.language}
                              </span>
                              <span className="text-xs bg-indigo-600/20 text-indigo-400 px-2 py-1 rounded-full">
                                {workshop.level}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition" style={{
                              direction: workshop.language === 'Arabic' ? 'rtl' : 'ltr'
                            }}>
                              {workshop.title}
                            </h3>
                            <p className="text-gray-400 mb-3" style={{
                              direction: workshop.language === 'Arabic' ? 'rtl' : 'ltr'
                            }}>
                              {workshop.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-emerald-400">${workshop.price}</div>
                            <div className="text-xs text-gray-500">one-time</div>
                          </div>
                        </div>

                        {/* Course Details */}
                        <div className="flex items-center gap-6 mb-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{workshop.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{workshop.lessons} lessons</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{workshop.students.toLocaleString()} students</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span>{workshop.rating}</span>
                          </div>
                        </div>

                        {/* Instructor */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center">
                            <Crown className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">{workshop.instructor}</p>
                            <p className="text-xs text-gray-400">Islamic Parenting Expert</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                          <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 flex-1">
                            <Play className="mr-2 h-4 w-4" />
                            Start Learning
                          </Button>
                          <Button variant="outline" className="border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-8 py-3">
                Load More Workshops
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}