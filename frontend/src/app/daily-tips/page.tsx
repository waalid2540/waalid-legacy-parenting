'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, BookOpen, Heart, Share2, ArrowLeft, Sun, Moon, Star, Sparkles, Clock, Bookmark } from 'lucide-react';
import Link from 'next/link';

export default function DailyTipsPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'somali' | 'arabic'>('english');
  
  const dailyTips = [
    {
      id: 1,
      date: 'Today',
      time: 'Fajr Reflection',
      icon: Sun,
      title: {
        english: "Teaching Gratitude Through Morning Prayers",
        somali: "Barista Mahadnaqaha iyada oo loo marayo Tukashada Subaxda",
        arabic: "تعليم الامتنان من خلال صلاة الفجر"
      },
      content: {
        english: "Start each day by teaching your children to say 'Alhamdulillahi rabbil alameen' and reflect on 3 things they're grateful for. This builds positive Islamic mindset from dawn.",
        somali: "Billow maalin kasta adiga oo caruurta ku baraysaa inay yiraahdan 'Alhamdulillahi rabbil alameen' oo ay ka fikiran 3 shay oo ay ugu mahadsan yihiin. Tani waxay dhisaysaa fekerka togan ee Islaamka ah subaxda ka bilaabaya.",
        arabic: "ابدأ كل يوم بتعليم أطفالك قول 'الحمد لله رب العالمين' والتفكير في 3 أشياء يشعرون بالامتنان لها. هذا يبني عقلية إسلامية إيجابية من الفجر."
      },
      verse: "وَإِذْ تَأَذَّنَ رَبُّكُمْ لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
      reference: "Quran 14:7"
    },
    {
      id: 2,
      date: 'Yesterday',
      time: 'Evening Wisdom',
      icon: Moon,
      title: {
        english: "Building Strong Islamic Character",
        somali: "Dhisida Dabeecad Islaamiya Xoog badan",
        arabic: "بناء شخصية إسلامية قوية"
      },
      content: {
        english: "Before sleep, discuss one good deed your child did today. Praise them for following Islamic manners and encourage more acts of kindness tomorrow.",
        somali: "Ka hor hurdada, kala hadla hal fal wanaagsan oo ilmahaagu maanta sameeyay. Amaan u heli isaga oo raacaya edebka Islaamka oo dhiirrigeeli falal naxariis badan berrito.",
        arabic: "قبل النوم، ناقش عملاً حسناً واحداً قام به طفلك اليوم. امدحه لاتباعه الآداب الإسلامية وشجعه على المزيد من أعمال الخير غداً."
      },
      verse: "وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",
      reference: "Quran 103:3"
    },
    {
      id: 3,
      date: '2 days ago',
      time: 'Weekend Practice',
      icon: Star,
      title: {
        english: "Making Salah Fun for Young Children",
        somali: "Ka dhigista Tukashada mid Xiiso leh Caruurta Yaryar",
        arabic: "جعل الصلاة ممتعة للأطفال الصغار"
      },
      content: {
        english: "Create a colorful prayer mat corner with Islamic books and toys. Let them 'lead' family prayers sometimes. Make wudu together and explain each step with love and patience.",
        somali: "Samee gees saliid midab badan leh oo leh kutub Islaam ah iyo ciyaar. Mararka qaarkood u oggollow inay 'hogaamiyaan' tukashada qoyska. Wudu isla samaaya oo tallaabo kastaa ku sharax jacayl oo dulqaad ah.",
        arabic: "أنشئ ركناً لسجادة صلاة ملونة مع كتب وألعاب إسلامية. دعهم 'يؤمون' صلاة العائلة أحياناً. توضؤوا معاً واشرحوا كل خطوة بحب وصبر."
      },
      verse: "وَأْمُرْ أَهْلَكَ بِالصَّلَاةِ وَاصْطَبِرْ عَلَيْهَا",
      reference: "Quran 20:132"
    }
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
                <div className="p-2 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold text-white">Daily Parenting Tips</span>
                  <p className="text-xs text-gray-400">Islamic wisdom for everyday parenting</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as 'english' | 'somali' | 'arabic')}
                className="bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm"
              >
                <option value="english">🇬🇧 English</option>
                <option value="somali">🇸🇴 Af-Soomaali</option>
                <option value="arabic">🇸🇦 العربية</option>
              </select>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { icon: Clock, label: 'Daily Tips', value: '365+' },
            { icon: BookOpen, label: 'Islamic Sources', value: '100%' },
            { icon: Heart, label: 'Parents Helped', value: '25K+' },
            { icon: Sparkles, label: 'Languages', value: '3' }
          ].map((stat, i) => (
            <Card key={i} className="bg-gradient-to-br from-gray-900 to-black border border-white/10">
              <CardContent className="p-4 text-center">
                <div className="p-3 bg-gradient-to-br from-amber-600/20 to-orange-600/20 rounded-xl mb-3 mx-auto w-fit">
                  <stat.icon className="h-5 w-5 text-amber-400" />
                </div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Daily Tips Feed */}
        <div className="space-y-6">
          {dailyTips.map((tip, index) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-amber-600/10 via-orange-600/10 to-yellow-600/10 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl">
                        <tip.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-lg">
                          {tip.title[selectedLanguage]}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <span>{tip.date}</span>
                          <span>•</span>
                          <span>{tip.time}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-amber-400 hover:bg-amber-600/20">
                      <Bookmark className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="text-gray-300 leading-relaxed text-lg" style={{
                      direction: selectedLanguage === 'arabic' ? 'rtl' : 'ltr'
                    }}>
                      {tip.content[selectedLanguage]}
                    </p>
                    
                    {/* Quran Verse */}
                    <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-xl p-4 border border-emerald-500/20">
                      <div className="text-center">
                        <p className="text-emerald-300 text-xl mb-2 font-amiri" dir="rtl">
                          {tip.verse}
                        </p>
                        <p className="text-emerald-400 text-sm font-semibold">
                          {tip.reference}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-6">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">127 likes</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition">
                        <Share2 className="h-4 w-4" />
                        <span className="text-sm">Share</span>
                      </button>
                    </div>
                    <Button variant="outline" className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-white">
                      Save to My Tips
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 px-8 py-3">
            Load More Daily Tips
          </Button>
        </div>
      </div>
    </div>
  );
}