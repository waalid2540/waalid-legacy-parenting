'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MessageSquare, Heart, Share2, ArrowLeft, Crown, Globe, Trending, Filter } from 'lucide-react';
import Link from 'next/link';

export default function CommunityPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const posts = [
    {
      id: 1,
      author: 'Fatima Al-Zahra',
      location: 'London, UK',
      time: '2 hours ago',
      content: 'Alhamdulillah! My 7-year-old just memorized Surah Al-Fatiha perfectly. Any tips for making Quran memorization fun for kids?',
      likes: 24,
      comments: 8,
      language: 'English',
      category: 'Islamic Education'
    },
    {
      id: 2,
      author: 'Ahmed Hassan',
      location: 'Toronto, Canada', 
      time: '4 hours ago',
      content: 'Walaalayaal, maxaan ka fali karaa markii wiilkaygu uu ka diiday inuu Duhr tukado? Wuu dhallinyaro yahay. 🤲',
      likes: 18,
      comments: 12,
      language: 'Somali',
      category: 'Prayer & Worship'
    },
    {
      id: 3,
      author: 'Aisha Rahman',
      location: 'New York, USA',
      time: '6 hours ago',
      content: 'السلام عليكم، ابنتي تسأل لماذا أصدقاؤها في المدرسة لا يصومون رمضان. كيف أشرح لها بطريقة لطيفة؟',
      likes: 31,
      comments: 15,
      language: 'Arabic',
      category: 'Cultural Questions'
    },
    {
      id: 4,
      author: 'Khadija Mohamed',
      location: 'Melbourne, Australia',
      time: '8 hours ago',
      content: 'MashaAllah, found an amazing Islamic homeschool curriculum! DMing those who asked. May Allah reward the creators! 📚',
      likes: 45,
      comments: 22,
      language: 'English',
      category: 'Education'
    }
  ];

  const communityStats = [
    { icon: Users, label: 'Active Members', value: '50,247', growth: '+12%' },
    { icon: MessageSquare, label: 'Daily Posts', value: '1,234', growth: '+8%' },
    { icon: Heart, label: 'Helpful Answers', value: '98,456', growth: '+15%' },
    { icon: Globe, label: 'Countries', value: '67', growth: '+3%' }
  ];

  const categories = [
    { id: 'all', name: 'All Posts', count: 1247 },
    { id: 'education', name: 'Islamic Education', count: 342 },
    { id: 'prayer', name: 'Prayer & Worship', count: 189 },
    { id: 'cultural', name: 'Cultural Questions', count: 156 },
    { id: 'teens', name: 'Teenagers', count: 234 },
    { id: 'marriage', name: 'Marriage & Family', count: 198 },
    { id: 'newborn', name: 'New Parents', count: 128 }
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
                <div className="p-2 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold text-white">Community Hub</span>
                  <p className="text-xs text-gray-400">Connect with Muslim parents worldwide</p>
                </div>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
              Create Post
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {communityStats.map((stat, index) => (
            <Card key={index} className="bg-gradient-to-br from-gray-900 to-black border border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-gradient-to-br from-violet-600/20 to-indigo-600/20 rounded-xl">
                    <stat.icon className="h-5 w-5 text-violet-400" />
                  </div>
                  <span className="text-xs text-green-400 font-semibold">{stat.growth}</span>
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
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
                  <Filter className="h-5 w-5 text-violet-400" />
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
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white' 
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

          {/* Posts Feed */}
          <div className="lg:col-span-3 space-y-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 hover:border-violet-500/30 transition-all">
                  <CardContent className="p-6">
                    {/* Post Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full flex items-center justify-center font-bold text-white">
                          {post.author.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white flex items-center gap-2">
                            {post.author}
                            <Crown className="h-4 w-4 text-yellow-500" />
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Globe className="h-3 w-3" />
                            <span>{post.location}</span>
                            <span>•</span>
                            <span>{post.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-violet-600/20 text-violet-400 px-2 py-1 rounded-full">
                          {post.language}
                        </span>
                        <span className="text-xs bg-indigo-600/20 text-indigo-400 px-2 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="mb-4">
                      <p className="text-gray-300 leading-relaxed" style={{ 
                        direction: post.language === 'Arabic' ? 'rtl' : 'ltr' 
                      }}>
                        {post.content}
                      </p>
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center space-x-6">
                        <button className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition">
                          <Heart className="h-4 w-4" />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition">
                          <MessageSquare className="h-4 w-4" />
                          <span className="text-sm">{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition">
                          <Share2 className="h-4 w-4" />
                          <span className="text-sm">Share</span>
                        </button>
                      </div>
                      <Button variant="ghost" className="text-violet-400 hover:bg-violet-600/20">
                        Reply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}