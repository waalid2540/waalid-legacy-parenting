'use client';

import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { aiCoachAPI } from '@/lib/api';
import { Brain, Send, History, Sparkles, ArrowLeft, Globe, Star, MessageCircle, Heart, Zap, Shield } from 'lucide-react';
import Link from 'next/link';

type Language = 'english' | 'somali' | 'arabic';

export default function AICoachPage() {
  const [question, setQuestion] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('english');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [conversation, setConversation] = useState<Array<{ question: string; response: string; language: Language }>>([]);

  const askMutation = useMutation({
    mutationFn: (data: { question: string; language: Language; category?: string }) => 
      aiCoachAPI.askQuestion(data.question, data.language, data.category),
    onSuccess: (data) => {
      setConversation([...conversation, { 
        question, 
        response: data.data.response, 
        language: selectedLanguage 
      }]);
      setQuestion('');
    },
  });

  const { data: history } = useQuery({
    queryKey: ['ai-coach-history'],
    queryFn: () => aiCoachAPI.getHistory(),
    retry: 1,
    staleTime: 30000,
  });

  const categories = {
    english: [
      'Identity & Belonging', 'School & Education', 'Worship & Spirituality',
      'Social Relationships', 'Technology & Media', 'Cultural Navigation',
      'Language Development', 'Behavioral Challenges', 'Safety & Protection'
    ],
    somali: [
      'Aqoonsi iyo Lamaanaha', 'Dugsiga iyo Waxbarashada', 'Cibaadada iyo Ruuxaaniyada',
      'Xiriirka Bulshada', 'Teknoolajiyada iyo Warbaahinta', 'Socodka Dhaqanka',
      'Horumarinta Luqadda', 'Caqabadaha Dabeecadda', 'Badbaadada iyo Ilaalinta'
    ],
    arabic: [
      'الهوية والانتماء', 'المدرسة والتعليم', 'العبادة والروحانية',
      'العلاقات الاجتماعية', 'التكنولوجيا والإعلام', 'التنقل الثقافي',
      'تطوير اللغة', 'التحديات السلوكية', 'السلامة والحماية'
    ]
  };

  const suggestedQuestions = {
    english: [
      "How do I help my child maintain Islamic identity in a Western school?",
      "My teenager doesn't want to wear hijab anymore. What should I do?",
      "How to handle Ramadan fasting with young children in non-Muslim environment?",
      "Teaching children to be proud of being Muslim while fitting in?",
      "Balancing Islamic values with Western social expectations?"
    ],
    somali: [
      "Sidee ugu caawiyaa ilmahayga inuu ilaaliyo aqoonsigiisa Islaamka iskuulka reer galbeedka?",
      "Gabadhaydii dhallinyarada ah ma rabto inay xidho xijaab. Maxaan sameeyaa?", 
      "Sidee ugu maamuulaa soonka Ramadaan carruurta yaryar oo ku nool deegaan aan Muslim ahayn?",
      "Sidee ugu baraa carruurta inay ku faanaan Muslimnimadooda iyagoo la qabsanaya bulshada?",
      "Sidee isu dheeli tiraa qiyamka Islaamka iyo rabitaanka bulshada reer galbeedka?"
    ],
    arabic: [
      "كيف أساعد طفلي في الحفاظ على هويته الإسلامية في مدرسة غربية؟",
      "ابنتي المراهقة لا تريد ارتداء الحجاب بعد الآن. ماذا أفعل؟",
      "كيف أتعامل مع صيام رمضان مع الأطفال الصغار في بيئة غير مسلمة؟",
      "كيف أعلم أطفالي الفخر بإسلامهم مع الاندماج في المجتمع؟",
      "كيف أوازن بين القيم الإسلامية والتوقعات الاجتماعية الغربية؟"
    ]
  };

  const languageLabels = {
    english: '🇬🇧 English',
    somali: '🇸🇴 Af-Soomaali',
    arabic: '🇸🇦 العربية'
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="sticky top-0 bg-white/90 backdrop-blur-lg z-50 border-b border-purple-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="icon" className="hover:bg-purple-100">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold text-gray-900">Waalid AI Coach</span>
                  <p className="text-xs text-gray-500">Islamic Parenting Expert</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-gray-400" />
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as Language)}
                className="border-2 border-purple-200 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
              >
                {Object.entries(languageLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { icon: MessageCircle, label: '24/7 Support', value: 'Always Available' },
            { icon: Shield, label: 'Islamic Values', value: '100% Halal' },
            { icon: Heart, label: 'Parents Helped', value: '50K+' },
            { icon: Zap, label: 'Response Time', value: 'Instant' }
          ].map((stat, i) => (
            <Card key={i} className="border-0 shadow-lg bg-white/80 backdrop-blur">
              <CardContent className="p-4 flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
                  <stat.icon className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <p className="font-bold text-gray-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Chat Area */}
          <div className="lg:col-span-2">
            <Card className="h-[750px] flex flex-col shadow-2xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white">
                <CardTitle className="flex items-center gap-2 text-2xl text-white">
                  <Sparkles className="h-6 w-6" />
                  {selectedLanguage === 'english' && 'Ask Your Islamic Parenting Question'}
                  {selectedLanguage === 'somali' && 'Weydii Su\'aalahaaga Waalidnimo Islaamka'}
                  {selectedLanguage === 'arabic' && 'اسأل سؤالك عن التربية الإسلامية'}
                </CardTitle>
                <CardDescription className="text-purple-100 text-base">
                  {selectedLanguage === 'english' && 'Expert guidance for Muslim parents in the West - Quran & Sunnah based'}
                  {selectedLanguage === 'somali' && 'Tilmaan khabiir ah waalidka Muslimka ah ee reer galbeedka - Quraan iyo Sunnah ku salaysan'}
                  {selectedLanguage === 'arabic' && 'إرشاد خبير للآباء المسلمين في الغرب - مبني على القرآن والسنة'}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-6 bg-gray-50">
                {/* Category Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {selectedLanguage === 'english' && '📚 Select Topic Category'}
                    {selectedLanguage === 'somali' && '📚 Dooro Qaybta Mawduuca'}
                    {selectedLanguage === 'arabic' && '📚 اختر فئة الموضوع'}
                  </label>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border-2 border-purple-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white font-medium"
                  >
                    <option value="">
                      {selectedLanguage === 'english' && 'All Categories'}
                      {selectedLanguage === 'somali' && 'Dhammaan Qaybaha'}
                      {selectedLanguage === 'arabic' && 'جميع الفئات'}
                    </option>
                    {categories[selectedLanguage].map((cat, index) => (
                      <option key={index} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 bg-white rounded-xl p-4 border-2 border-purple-100">
                  {conversation.length === 0 ? (
                    <div className="text-center py-20">
                      <div className="mb-6 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20"></div>
                        <Brain className="h-32 w-32 text-purple-400 mx-auto relative" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">
                        {selectedLanguage === 'english' && 'Waalid AI Coach is Ready'}
                        {selectedLanguage === 'somali' && 'Macallinka Waalid AI wuu diyaar yahay'}
                        {selectedLanguage === 'arabic' && 'مدرب الوالد الذكي جاهز'}
                      </h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        {selectedLanguage === 'english' && 'Get instant Islamic parenting advice tailored for Muslim families in the West'}
                        {selectedLanguage === 'somali' && 'Hel talo degdeg ah oo waalidnimo Islaam ah oo ku habboon qoysaska Muslimka ah ee reer galbeedka'}
                        {selectedLanguage === 'arabic' && 'احصل على نصائح تربوية إسلامية فورية مخصصة للعائلات المسلمة في الغرب'}
                      </p>
                    </div>
                  ) : (
                    conversation.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3"
                      >
                        {/* User Question */}
                        <div className="flex justify-end">
                          <div className="max-w-[80%] bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl rounded-br-none p-4 shadow-lg">
                            <p className="font-semibold mb-1 text-purple-100">You asked:</p>
                            <p className="text-white">{item.question}</p>
                          </div>
                        </div>
                        
                        {/* AI Response */}
                        <div className="flex justify-start">
                          <div className="max-w-[80%] bg-white rounded-2xl rounded-bl-none p-4 shadow-lg border border-purple-100">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="p-1 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                                <Sparkles className="h-4 w-4 text-white" />
                              </div>
                              <span className="font-semibold text-gray-800">Waalid Coach</span>
                              <div className="flex text-yellow-400 ml-auto">
                                {[1,2,3,4,5].map(i => <Star key={i} className="h-3 w-3 fill-current" />)}
                              </div>
                            </div>
                            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{item.response}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
                
                {/* Input Area */}
                <div className="space-y-3">
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder={
                      selectedLanguage === 'english' ? "Type your parenting question here..." :
                      selectedLanguage === 'somali' ? "Halkan ku qor su'aalahaaga waalidnimo..." :
                      "اكتب سؤالك عن التربية هنا..."
                    }
                    className="w-full p-4 border-2 border-purple-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg bg-white"
                    rows={3}
                    style={{ direction: selectedLanguage === 'arabic' ? 'rtl' : 'ltr' }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey && question.trim()) {
                        e.preventDefault();
                        askMutation.mutate({ 
                          question, 
                          language: selectedLanguage, 
                          category: selectedCategory 
                        });
                      }
                    }}
                  />
                  <Button
                    onClick={() => askMutation.mutate({ 
                      question, 
                      language: selectedLanguage, 
                      category: selectedCategory 
                    })}
                    disabled={!question.trim() || askMutation.isPending}
                    isLoading={askMutation.isPending}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg py-6 rounded-xl shadow-lg"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {selectedLanguage === 'english' && 'Ask Waalid Coach'}
                    {selectedLanguage === 'somali' && 'Weydii Macallinka Waalid'}
                    {selectedLanguage === 'arabic' && 'اسأل مدرب الوالد'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Suggested Questions */}
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  {selectedLanguage === 'english' && 'Popular Questions'}
                  {selectedLanguage === 'somali' && 'Su\'aalaha Caanka ah'}
                  {selectedLanguage === 'arabic' && 'الأسئلة الشائعة'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 space-y-2">
                {suggestedQuestions[selectedLanguage].map((sq, index) => (
                  <button
                    key={index}
                    onClick={() => setQuestion(sq)}
                    className="w-full text-left p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-200 text-sm font-medium text-gray-700 border border-purple-200 hover:border-purple-300"
                    style={{ direction: selectedLanguage === 'arabic' ? 'rtl' : 'ltr' }}
                  >
                    {sq}
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Recent History */}
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <History className="h-5 w-5" />
                  {selectedLanguage === 'english' && 'Your History'}
                  {selectedLanguage === 'somali' && 'Taariikhdaada'}
                  {selectedLanguage === 'arabic' && 'سجلك'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {(history?.data && Array.isArray(history.data) ? history.data.slice(0, 5) : []).map((item: { question: string; createdAt: string; language: string }, index: number) => (
                  <div key={index} className="border-b last:border-0 py-3 hover:bg-gray-50 rounded px-2 cursor-pointer">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-500 font-medium uppercase">
                        {item.language || 'English'}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-700 truncate">{item.question}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                )) || (
                  <p className="text-gray-500 text-sm">No history yet</p>
                )}
              </CardContent>
            </Card>

            {/* Islamic Focus Card */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500">
              <CardContent className="p-6 text-white">
                <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                  🕌 {selectedLanguage === 'english' && 'Islamic Excellence'}
                  {selectedLanguage === 'somali' && 'Hufnaanta Islaamka'}
                  {selectedLanguage === 'arabic' && 'التميز الإسلامي'}
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span>Quran & Hadith based advice</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span>Western context understanding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span>24/7 instant support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span>3 languages support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}