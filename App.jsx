import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Brain, 
  CheckCircle2, 
  BarChart3, 
  ArrowRight, 
  User, 
  GraduationCap, 
  RefreshCcw, 
  Sparkles,
  Search,
  MessageCircle,
  ClipboardCheck,
  Smartphone
} from 'lucide-react';

const App = () => {
  const [step, setStep] = useState('welcome'); // welcome, info, quiz, analyzing, result, lead
  const [userInfo, setUserInfo] = useState({ name: '', grade: '초등 3학년' });
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [progress, setProgress] = useState(0);

  const questions = [
    { 
      id: 1, 
      title: "설명 테스트", 
      q: "아이가 오늘 배운 내용을 엄마한테 1분 안에 설명할 수 있나요?",
      desc: "단순 암기가 아닌 '완전한 이해' 여부를 확인하는 지표입니다."
    },
    { 
      id: 2, 
      title: "오답의 이유", 
      q: "틀린 문제를 다시 풀 때, 왜 틀렸는지 이유를 정확히 말하나요?",
      desc: "'아는 착각'을 잡아내는 자기 객관화 능력을 측정합니다."
    },
    { 
      id: 3, 
      title: "학습 주도성", 
      q: "오늘 공부할 양과 내용을 아이 스스로 정하고 실천하나요?",
      desc: "메타인지의 핵심인 '학습 통제권'을 확인합니다."
    },
    { 
      id: 4, 
      title: "핵심 요약", 
      q: "10분 공부한 내용을 1분 안에 핵심만 요약할 수 있나요?",
      desc: "정보를 구조화하여 장기기억으로 전환하는 능력입니다."
    },
    { 
      id: 5, 
      title: "모르는 것 인정", 
      q: "모르는 문제가 나왔을 때 당황하지 않고 '모른다'고 인정하나요?",
      desc: "자신의 지식 한계를 아는 것이 메타인지의 시작입니다."
    }
  ];

  const handleStart = () => setStep('info');
  
  const handleInfoSubmit = (e) => {
    e.preventDefault();
    if (userInfo.name) setStep('quiz');
  };

  const handleAnswer = (val) => {
    const newAnswers = [...answers, val];
    setAnswers(newAnswers);
    
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep('analyzing');
    }
  };

  // 분석 애니메이션 효과
  useEffect(() => {
    if (step === 'analyzing') {
      let interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep('result'), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [step]);

  const score = answers.filter(a => a === 'YES').length;
  
  const getResultType = () => {
    if (score >= 4) return { type: "상위 0.1%형", desc: "스스로 학습을 통제하고 인출할 줄 아는 메타인지 마스터!", color: "text-blue-600", bg: "bg-blue-50" };
    if (score >= 2) return { type: "성실한 구경꾼형", desc: "열심히는 하지만 '아는 것'과 '보는 것'을 구분하는 훈련이 필요해요.", color: "text-orange-600", bg: "bg-orange-50" };
    return { type: "착각의 늪형", desc: "강의만 듣고 다 안다고 생각하는 위험한 상태! 학습법 교정이 시급합니다.", color: "text-red-600", bg: "bg-red-50" };
  };

  const resultInfo = getResultType();

  // 레이더 차트용 점수 계산 (시각적 효과용)
  const radarPoints = questions.map((_, i) => (answers[i] === 'YES' ? 80 : 30));

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4 font-sans select-none">
      {/* Tablet Frame */}
      <div className="relative w-full max-w-[480px] aspect-[3/4] bg-white rounded-[3rem] border-[12px] border-slate-900 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Top Status Bar */}
        <div className="h-6 w-full flex justify-between items-center px-8 pt-2">
          <div className="text-[10px] font-bold text-slate-400">9:41</div>
          <div className="flex gap-1.5 items-center">
            <div className="w-3 h-3 rounded-full bg-slate-200"></div>
            <div className="w-8 h-3 rounded-full bg-slate-200"></div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow overflow-hidden relative">
          
          {/* STEP 1: WELCOME */}
          {step === 'welcome' && (
            <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-orange-400 to-orange-600 text-white text-center">
              <div className="bg-white/20 p-4 rounded-full mb-6 animate-pulse">
                <Brain size={64} />
              </div>
              <h1 className="text-3xl font-black leading-tight mb-4 drop-shadow-lg">
                우리 아이 성적,<br/>
                <span className="text-yellow-200">진짜 공부</span> 중일까?<br/>
                <span className="text-yellow-200">공부 구경</span> 중일까?
              </h1>
              <p className="text-lg font-bold opacity-90 mb-10">
                상위 0.1%의 비밀, 메타인지 지수<br/>
                지금 바로 1분 진단 시작!
              </p>
              <button 
                onClick={handleStart}
                className="w-full py-4 bg-white text-orange-600 rounded-2xl font-black text-xl shadow-xl flex items-center justify-center gap-2 transform active:scale-95 transition-all"
              >
                진단 시작하기 <ChevronRight />
              </button>
            </div>
          )}

          {/* STEP 2: INFO INPUT */}
          {step === 'info' && (
            <div className="h-full flex flex-col p-8 bg-white">
              <div className="mb-10 mt-10 text-center">
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <User size={32} />
                </div>
                <h2 className="text-2xl font-black text-slate-800">진단 전 알려주세요</h2>
                <p className="text-slate-400 font-medium">정확한 분석을 위해 정보가 필요합니다.</p>
              </div>

              <form onSubmit={handleInfoSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2 ml-1">아이 이름</label>
                  <input 
                    type="text" 
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                    placeholder="이름을 입력하세요"
                    className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-orange-500 outline-none font-bold transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2 ml-1">학년</label>
                  <select 
                    value={userInfo.grade}
                    onChange={(e) => setUserInfo({...userInfo, grade: e.target.value})}
                    className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-orange-500 outline-none font-bold transition-all appearance-none"
                  >
                    {["초등 1학년", "초등 2학년", "초등 3학년", "초등 4학년", "초등 5학년", "초등 6학년"].map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-orange-500 text-white rounded-2xl font-black text-lg shadow-lg shadow-orange-200 transform active:scale-95 transition-all mt-8"
                >
                  준비 완료!
                </button>
              </form>
            </div>
          )}

          {/* STEP 3: QUIZ */}
          {step === 'quiz' && (
            <div className="h-full flex flex-col bg-white">
              <div className="p-6 bg-slate-50 flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="text-orange-500 font-black text-sm uppercase tracking-widest mb-1">Metacognition Quiz</span>
                  <h3 className="text-xl font-black text-slate-800">{questions[currentQ].title}</h3>
                </div>
                <div className="text-slate-400 font-bold">
                  <span className="text-orange-500">{currentQ + 1}</span> / {questions.length}
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-slate-100">
                <div 
                  className="h-full bg-orange-500 transition-all duration-300" 
                  style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                ></div>
              </div>

              <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-orange-100">
                  <Sparkles size={40} />
                </div>
                <h4 className="text-2xl font-black text-slate-800 mb-4 leading-tight">
                  "{questions[currentQ].q}"
                </h4>
                <p className="text-slate-400 font-medium leading-snug">
                  {questions[currentQ].desc}
                </p>
              </div>

              <div className="p-8 grid grid-cols-2 gap-4">
                <button 
                  onClick={() => handleAnswer('YES')}
                  className="py-6 bg-orange-500 text-white rounded-3xl font-black text-2xl shadow-xl shadow-orange-100 transform active:scale-95 transition-all border-b-8 border-orange-700"
                >
                  그렇다
                </button>
                <button 
                  onClick={() => handleAnswer('NO')}
                  className="py-6 bg-slate-100 text-slate-400 rounded-3xl font-black text-2xl shadow-sm transform active:scale-95 transition-all border-b-8 border-slate-200"
                >
                  아니다
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: ANALYZING */}
          {step === 'analyzing' && (
            <div className="h-full flex flex-col items-center justify-center p-8 bg-white text-center">
              <div className="relative mb-8">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                  <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={364.4} strokeDashoffset={364.4 - (364.4 * progress) / 100} className="text-orange-500 transition-all duration-300 stroke-round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-black text-slate-800">{progress}%</span>
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-2">데이터 분석 중...</h3>
              <p className="text-slate-400 font-medium">우리 아이의 '진짜 실력'을 확인하고 있습니다.</p>
              
              <div className="mt-12 w-full space-y-4">
                {[
                  { icon: <Search size={16}/>, text: "학습 패턴 데이터 분석 중" },
                  { icon: <BarChart3 size={16}/>, text: "학년 평균 데이터 대조 중" },
                  { icon: <ClipboardCheck size={16}/>, text: "착각 지수 산출 중" }
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 bg-slate-50 rounded-xl transition-all duration-500 ${progress > (i+1)*30 ? 'opacity-100' : 'opacity-30'}`}>
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-orange-500 shadow-sm">
                      {item.icon}
                    </div>
                    <span className="text-sm font-bold text-slate-600">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: RESULT */}
          {step === 'result' && (
            <div className="h-full flex flex-col bg-white overflow-y-auto custom-scrollbar">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                  <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                </div>
                <span className="inline-block px-3 py-1 bg-orange-500 rounded-full text-[10px] font-black tracking-widest mb-4">RESULT REPORT</span>
                <h2 className="text-2xl font-bold mb-1">{userInfo.name} 학생의 진단 결과</h2>
                <div className="text-4xl font-black text-yellow-300 drop-shadow-md">메타인지 {score * 20}점</div>
              </div>

              <div className="p-6 -mt-6">
                <div className={`rounded-3xl p-6 shadow-xl mb-6 ${resultInfo.bg} border-2 border-white`}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className={`text-2xl font-black ${resultInfo.color}`}>{resultInfo.type}</h3>
                    <div className="bg-white p-2 rounded-xl shadow-sm">
                      <BarChart3 size={24} className={resultInfo.color} />
                    </div>
                  </div>
                  <p className="text-slate-700 font-bold leading-relaxed mb-4">
                    {resultInfo.desc}
                  </p>
                  
                  {/* Radar Chart Mockup */}
                  <div className="w-full aspect-square bg-white/50 rounded-2xl flex items-center justify-center p-4">
                    <div className="relative w-full h-full">
                      {/* Grid Background */}
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <polygon points="50,10 90,40 75,90 25,90 10,40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
                        <polygon points="50,30 70,45 62,70 38,70 30,45" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
                        {/* Data Points */}
                        <polygon 
                          points={`50,${100-radarPoints[0]} 90,${100-radarPoints[1]} 75,${100-radarPoints[2]} 25,${100-radarPoints[3]} 10,${100-radarPoints[4]}`} 
                          fill="rgba(249, 115, 22, 0.2)" 
                          stroke="#f97316" 
                          strokeWidth="2" 
                        />
                      </svg>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-[8px] font-black text-slate-400">설명력</div>
                      <div className="absolute top-1/4 right-0 translate-x-2 text-[8px] font-black text-slate-400">구분력</div>
                      <div className="absolute bottom-0 right-1/4 translate-y-2 text-[8px] font-black text-slate-400">계획력</div>
                      <div className="absolute bottom-0 left-1/4 translate-y-2 text-[8px] font-black text-slate-400">요약력</div>
                      <div className="absolute top-1/4 left-0 -translate-x-2 text-[8px] font-black text-slate-400">인정력</div>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-500 rounded-3xl p-6 text-white text-center shadow-lg transform translate-y-2">
                  <h4 className="text-xl font-black mb-2 flex items-center justify-center gap-2">
                    <Smartphone size={24} /> 진짜 실력 처방전 받기
                  </h4>
                  <p className="text-sm opacity-90 mb-6 leading-snug font-medium">
                    부족한 <b>{score < 5 ? questions[answers.indexOf('NO')]?.title : '종합'}</b> 역량을 채우는<br/>
                    비상교육 온리원만의 솔루션을 만나보세요.
                  </p>
                  <button 
                    onClick={() => setStep('lead')}
                    className="w-full py-4 bg-white text-orange-600 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    상세 리포트 신청하기 <ArrowRight size={20} />
                  </button>
                </div>
              </div>
              <div className="h-10"></div>
            </div>
          )}

          {/* STEP 6: LEAD CAPTURE */}
          {step === 'lead' && (
            <div className="h-full flex flex-col p-8 bg-white">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle size={32} />
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">전문가 정밀 상담</h3>
                <p className="text-slate-400 font-medium leading-tight">진단 결과 분석 및 1:1 맞춤형<br/>학습 로드맵을 보내드립니다.</p>
              </div>

              <div className="space-y-5">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-[10px] font-black text-slate-400 mb-1 uppercase">Target info</div>
                  <div className="text-lg font-black text-slate-700">{userInfo.name} ({userInfo.grade})</div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2 ml-1">학부모 연락처</label>
                  <input 
                    type="tel" 
                    placeholder="010-0000-0000"
                    className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none font-bold transition-all"
                  />
                </div>

                <div className="pt-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="w-5 h-5 accent-blue-600" id="agree1" defaultChecked />
                    <label htmlFor="agree1" className="text-xs font-bold text-slate-500">개인정보 수집 및 상담 활용 동의 (필수)</label>
                  </div>
                </div>

                <button 
                  className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xl shadow-xl shadow-blue-100 transform active:scale-95 transition-all mt-6 flex flex-col items-center leading-none"
                >
                  분석 리포트 신청 완료
                  <span className="text-[10px] font-bold opacity-70 mt-1">전문 러닝플래너가 곧 연락드립니다</span>
                </button>

                <button 
                  onClick={() => setStep('welcome')}
                  className="w-full py-3 text-slate-400 font-bold text-sm flex items-center justify-center gap-2"
                >
                  <RefreshCcw size={14} /> 처음으로 돌아가기
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Home Indicator */}
        <div className="h-6 w-full flex justify-center items-end pb-2">
          <div className="w-24 h-1 rounded-full bg-slate-200"></div>
        </div>
      </div>

      <style>{`
        .stroke-round { stroke-linecap: round; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default App;
