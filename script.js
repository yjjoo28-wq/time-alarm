// ============================================================================
// 1. DATA DEFINITIONS & CONFINGURATIONS
// ============================================================================

const WEEKDAY_NAMES = ["일", "월", "화", "수", "목", "금", "토"];

// Jamul High School (잠일고) Standard Period Timetable
const PERIODS = [
  { period: 1, start: "08:10", end: "09:00" },
  { period: 2, start: "09:10", end: "10:00" },
  { period: 3, start: "10:10", end: "11:05" },
  { period: 4, start: "11:15", end: "12:05" },
  { period: 5, start: "13:05", end: "13:55" }, // After Lunch (12:05 ~ 13:05)
  { period: 6, start: "14:05", end: "14:55" },
  { period: 7, start: "15:05", end: "15:55" },
];

// Weekday Subjects List (요일별 시간표)
const TIMETABLES = {
  1: ["공통국어A", "공통사회A", "공통과학A", "미술", "공통영어A", "한국사"],
  2: ["공통수학A", "공통영어B", "과학탐구", "체육", "공통국어B", "미술", "공통과학B"],
  3: ["공통국어A", "공통수학A", "공통과학A", "체육", "진로", "공통사회C"],
  4: ["공통국어B", "공통사회B", "공통수학B", "한국사", "미술", "공통과학C", "공통영어A"],
  5: ["공통영어B", "공통사회A", "공통수학A", "한국사", "동아리", "동아리"],
};

// Default classrooms presets
const DEFAULT_CLASSROOM_PRESETS = {
  "미술": "미술실",
  "체육": "체육관",
  "공통과학A": "교실",
  "공통과학B": "교실",
  "공통과학C": "교실",
  "과학탐구": "뉴턴실",
  "공통영어A": "교실",
  "공통영어B": "교실",
  "진로": "진로실",
  "동아리": "동아리실",
};

// Fixed background color classes dynamically resolved
const SUBJECT_COLORS = {
  "국어": "bg-rose-500",
  "수학": "bg-indigo-500",
  "영어": "bg-sky-500",
  "과학": "bg-emerald-500",
  "탐구": "bg-teal-500",
  "사회": "bg-amber-500",
  "한국사": "bg-orange-500",
  "미술": "bg-purple-500",
  "체육": "bg-green-500",
  "진로": "bg-lime-500",
  "동아리": "bg-pink-500",
};

const getSubjectColorClass = (subjectName) => {
  for (const [key, bgClass] of Object.entries(SUBJECT_COLORS)) {
    if (subjectName.includes(key)) {
      return bgClass;
    }
  }
  return "bg-slate-400";
};

// --- REFRESH LUCIDE ICONS SAFE HELPER ---
const refreshIcons = () => {
  try {
    if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
      lucide.createIcons();
    }
  } catch (err) {
    console.warn("Lucide icons could not be initialized yet:", err);
  }
};

// School Meals Menu Dataset
const MEAL_DATA = {
  1: {
    dateLabel: "11일 (월)",
    menu: [
      { name: "차수수밥" },
      { name: "맑은미역국" },
      { name: "참나물사과초절이" },
      { name: "허니간장불고기", allergy: "5.6.10.13.18" },
      { name: "해물볶음우동", allergy: "5.6.8.9.13.17.18" },
      { name: "배추김치" },
      { name: "달칩초코샌" }
    ]
  },
  2: {
    dateLabel: "12일 (화)",
    menu: [
      { name: "스팸버터장조림밥", allergy: "1.2.5.6.10.13" },
      { name: "토핑마라탕 (분모자&푸주 푸짐)", allergy: "1.2.5.6.9.12.13.15.16.18" },
      { name: "꿔바로우 탕수무침", allergy: "1.5.6.10.11.12" },
      { name: "바삭 바비큐 군만두", allergy: "1.5.6.10.13" },
      { name: "아삭 파인애플 겉절이" },
      { name: "아이스 요구르트", allergy: "2" }
    ]
  },
  3: {
    dateLabel: "6일 (수)",
    menu: [
      { name: "간장계란밥 & 계란후라이", allergy: "1.2.5.6.13" },
      { name: "미소된장국", allergy: "5.6.9.13" },
      { name: "마늘종고추장무침" },
      { name: "슈프림자메이카치킨", allergy: "5.6.15" },
      { name: "맛깔 깍두기" },
      { name: "시원 쿨피스(파인)" }
    ]
  },
  4: {
    dateLabel: "7일 (목)",
    menu: [
      { name: "안심 흑미밥" },
      { name: "어묵쑥갓국", allergy: "1.5.6.9.13" },
      { name: "두부견과류쌈장", allergy: "2.4.5.6.13.14" },
      { name: "두절콩나물" },
      { name: "매콤 제육볶음", allergy: "5.6.10.13" },
      { name: "야채계란말이 & 토마토케찹", allergy: "1.5.12" },
      { name: "싱싱 양배추쌈" },
      { name: "아삭 배추김치" },
      { name: "두바이초코찹쌀떡", allergy: "2.4" }
    ]
  },
  5: {
    dateLabel: "8일 (금)",
    menu: [
      { name: "유기농 현미밥" },
      { name: "다시마무채국" },
      { name: "오이겨자간장무침" },
      { name: "알싸 마파두부덮밥", allergy: "5.6.10.12.13.18" },
      { name: "누룽지찹쌀숙성탕수육 & 탕수소스", allergy: "1.5.6.10" },
      { name: "맛깔 깍두기" },
      { name: "딸기듬뿍 미니도넛", allergy: "1.2.5.6" }
    ]
  }
};

const SCHOOL_ROOMS = [
  // 1F
  { id: "GYM", name: "체육관", floor: 1, type: "facilities", desc: "체육 활동 및 대강당 행사" },
  { id: "CAFETERIA", name: "급식실", floor: 1, type: "facilities", desc: "1층 학생식당 및 조리 배식관" },
  { id: "INFIRMARY", name: "보건실", floor: 1, type: "facilities", desc: "건강관리 및 긴급 응급처치" },
  { id: "PRINCIPAL", name: "교장실", floor: 1, type: "office", desc: "본관 1층 서편 행정구역" },
  { id: "ADMIN", name: "행정실", floor: 1, type: "office", desc: "서류 발급 및 총무 사무" },
  { id: "STUDENT_COMM", name: "학생회실", floor: 1, type: "facilities", desc: "학생 자치 위원회 자율 회의" },
  { id: "WAIT_ROOM", name: "일시적대기실", floor: 1, type: "facilities", desc: "1층 동편 출입구 옆 대기소" },
  
  // 2F
  { id: "CLASS_1_1", name: "1학년 1반 교실", floor: 2, type: "classroom", desc: "2층 동편 복도" },
  { id: "CLASS_1_2", name: "1학년 2반 교실", floor: 2, type: "classroom", desc: "2층 동편 복도" },
  { id: "CLASS_1_3", name: "1학년 3반 교실", floor: 2, type: "classroom", desc: "2층 중간 복도" },
  { id: "CLASS_1_4", name: "1학년 4반 교실", floor: 2, type: "classroom", desc: "2층 서편 복도" },
  { id: "MAIN_STAFF", name: "본교무실", floor: 2, type: "office", desc: "교무 전반 및 주임 교사 집무" },
  { id: "BROADCAST", name: "방송실", floor: 2, type: "facilities", desc: "교내 아침방송국 및 사운드 믹서실" },
  { id: "NEWTON", name: "뉴턴실", floor: 2, type: "special", desc: "과학 실험 및 물리 탐구실" },
  { id: "BIO_LAB", name: "생명과학실", floor: 2, type: "special", desc: "생물 현미경 및 전담 실험" },
  { id: "COMP_LAB", name: "컴퓨터실", floor: 2, type: "special", desc: "멀티미디어 코딩 교실" },

  // 3F
  { id: "CLASS_1_5", name: "1학년 5반 교실", floor: 3, type: "classroom", desc: "3층 동편 복도" },
  { id: "CLASS_1_6", name: "1학년 6반 교실", floor: 3, type: "classroom", desc: "3층 동편 복도" },
  { id: "CLASS_1_7", name: "1학년 7반 교실", floor: 3, type: "classroom", desc: "3층 중간 복도" },
  { id: "CLASS_1_8", name: "1학년 8반 교실", floor: 3, type: "classroom", desc: "3층 중간 복도" },
  { id: "CLASS_1_9", name: "1학년 9반 교실", floor: 3, type: "classroom", desc: "3층 서편 복도" },
  { id: "CLASS_1_10", name: "1학년 10반 교실", floor: 3, type: "classroom", desc: "3층 서편 복도" },
  { id: "LIBRARY", name: "잠일도서관", floor: 3, type: "special", desc: "책 무덤, 정숙 학습 및 대출" },
  { id: "CAREER_COUNSEL", name: "진로학습실", floor: 3, type: "special", desc: "진로 면담 및 대학교 책자실" },
  { id: "SOCIAL_ROOM_C", name: "공통사회C실", floor: 3, type: "special", desc: "공통사회 교실" },
  { id: "MATH_ROOM_A", name: "공통수학A실", floor: 3, type: "special", desc: "공통수학A 수준별 이동식" },

  // 4F
  { id: "CLASS_2_1", name: "2학년 1반 교실", floor: 4, type: "classroom", desc: "4층 동편 본관" },
  { id: "CLASS_2_2", name: "2학년 2반 교실", floor: 4, type: "classroom", desc: "4층 동편 복도" },
  { id: "CLASS_2_3", name: "2학년 3반 교실", floor: 4, type: "classroom", desc: "4층 중간 교사" },
  { id: "CLASS_2_4", name: "2학년 4반 교실", floor: 4, type: "classroom", desc: "4층 중간 복도" },
  { id: "CLASS_2_5", name: "2학년 5반 교실", floor: 4, type: "classroom", desc: "4층 서편 복도" },
  { id: "CLASS_2_6", name: "2학년 6반 교실", floor: 4, type: "classroom", desc: "4층 서편 복도" },
  { id: "CLASS_2_7", name: "2학년 7반 교실", floor: 4, type: "classroom", desc: "4층 서편 복도 끝" },
  { id: "CLASS_2_8", name: "2학년 8반 교실", floor: 4, type: "classroom", desc: "4층 서편 복도 끝" },
  { id: "STAFF_2ND", name: "2학년 교무실", floor: 4, type: "office", desc: "2학년 담임 전담 교무" },
  { id: "ENGLISH_ZONE", name: "외국어교실", floor: 4, type: "special", desc: "외국어 및 스키마 영어" },
  { id: "CHEM_LAB", name: "화학실", floor: 4, type: "special", desc: "화학 반응 및 원소 도구" },
  { id: "MATH_ROOM_B", name: "공통수학B실", floor: 4, type: "special", desc: "가우스 수학반" },

  // 5F
  { id: "ART_ROOM", name: "미술실", floor: 5, type: "special", desc: "5층 드로잉 실내 미술기구" },
  { id: "MUSIC_ROOM", name: "음악실", floor: 5, type: "special", desc: "5층 그랜드피아노 및 실용음악" },
  { id: "HOME_ECON", name: "가사실", floor: 5, type: "special", desc: "가정 기술 실습" },
  { id: "CLUB_ROOM", name: "동아리실", floor: 5, type: "special", desc: "동아리 연합 자치 활동" },
  { id: "SEMINAR", name: "세미나실", floor: 5, type: "special", desc: "교사-학부모 합동 회의실" },
  { id: "PROJ_ROOM", name: "프로젝트실", floor: 5, type: "special", desc: "팀 프로젝트 및 열린 과업" }
];

// ============================================================================
// 2. STATE MANAGER
// ============================================================================

const state = {
  currentTime: new Date(),
  mockEnabled: false,
  mockDay: 2, // Tuesday
  mockMinutes: 555, // 09:15 AM
  mockSeconds: 0,
  
  isDarkMode: false,
  customLocations: {}, // key: `jamul_room_${day}_${period}`
  viewDay: 1, // Currently viewed tab (Mon=1, Tue=2...)
  
  // Modal State
  isMapModalOpen: false,
  mapModalTarget: null, // { day, period, subjectName }
  modalSelectedFloor: 3,
  mapSearchQuery: "",
  manualRoomVal: "",
  
  showMealMenu: false,
  soundEnabled: true,
  prevPeriodStatusHash: "",
};

// --- INITIALIZE FROM LOCAL STORAGE ---
try {
  state.isDarkMode = localStorage.getItem("jamul_dark_mode") === "true";
  if (state.isDarkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
} catch {
  state.isDarkMode = false;
}

try {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("jamul_room_")) {
      state.customLocations[key] = localStorage.getItem(key) || "";
    }
  }
} catch (e) {
  console.error("Local storage error during initialization:", e);
}

const currentRealDay = new Date().getDay();
state.viewDay = (currentRealDay >= 1 && currentRealDay <= 5) ? currentRealDay : 1;

// ============================================================================
// 3. SOUND SYNTHESIZER
// ============================================================================

const playRetroSchoolBell = () => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    const playTone = (frequency, startTime, duration, volume) => {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, startTime);
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    };
    
    const nowSec = audioCtx.currentTime;
    playTone(329.63, nowSec, 0.7, 0.12);       // E4
    playTone(392.00, nowSec + 0.4, 0.7, 0.12); // G4
    playTone(349.23, nowSec + 0.8, 0.7, 0.12); // F4
    playTone(261.63, nowSec + 1.2, 1.3, 0.15); // C4
  } catch (error) {
    console.warn("School bell synthesizer blocked by browser interaction restrictions:", error);
  }
};

// ============================================================================
// 4. TIMING & TIMETABLE CORE CALCULATIONS
// ============================================================================

function getMinutesFromTimeStr(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

function getActiveContext() {
  if (state.mockEnabled) {
    const h = Math.floor(state.mockMinutes / 60);
    const m = state.mockMinutes % 60;
    
    const fakeDate = new Date();
    fakeDate.setHours(h, m, state.mockSeconds);
    
    return {
      date: fakeDate,
      day: state.mockDay,
      minutes: state.mockMinutes,
      seconds: state.mockSeconds,
    };
  } else {
    const now = state.currentTime;
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    
    return {
      date: now,
      day: now.getDay(),
      minutes: h * 60 + m,
      seconds: s,
    };
  }
}

function getStatusAnalysis(context) {
  const { day, minutes } = context;
  
  if (day === 0 || day === 6) {
    return {
      type: 'weekend',
      title: '즐거운 주말 보내는 중 ☕',
      sub: '충전하여 월요일에 만나요!',
      periodNum: null,
      currentSubject: null,
      nextSubject: null,
      targetTimeLabel: '월요일 등교',
      targetMinutes: getMinutesFromTimeStr("08:10"),
      progressPercent: 0
    };
  }

  const todaySubjects = TIMETABLES[day];
  if (!todaySubjects) {
    return {
      type: 'weekend',
      title: '주말 자유 시간',
      sub: '주말에는 학업 타이머가 쉽니다.',
      periodNum: null,
      currentSubject: null,
      nextSubject: null,
      targetTimeLabel: '월요일 등교',
      targetMinutes: getMinutesFromTimeStr("08:10"),
      progressPercent: 0
    };
  }

  const maxPeriods = todaySubjects.length;
  const firstPeriodStart = getMinutesFromTimeStr(PERIODS[0].start); // 08:10

  // Before School
  if (minutes < firstPeriodStart) {
    return {
      type: 'before_school',
      title: '등교 전 준비 시간 🎒',
      sub: '오늘 하루도 활기차게 시작해봐요!',
      periodNum: 1,
      currentSubject: null,
      nextSubject: todaySubjects[0],
      targetTimeLabel: '1교시 시작',
      targetMinutes: firstPeriodStart,
      progressPercent: 0
    };
  }

  for (let idx = 0; idx < maxPeriods; idx++) {
    const periodNum = idx + 1;
    const pStart = getMinutesFromTimeStr(PERIODS[idx].start);
    const pEnd = getMinutesFromTimeStr(PERIODS[idx].end);

    // Active period
    if (minutes >= pStart && minutes < pEnd) {
      const totalDuration = pEnd - pStart;
      const elapsed = minutes - pStart;
      const progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 105)); // keep matching visual scaling 

      return {
        type: 'class',
        title: `${periodNum}교시 수업 진행 중`,
        sub: todaySubjects[idx],
        periodNum: periodNum,
        currentSubject: todaySubjects[idx],
        nextSubject: idx < maxPeriods - 1 ? todaySubjects[idx + 1] : null,
        targetTimeLabel: `${periodNum}교시 일과 종료`,
        targetMinutes: pEnd,
        progressPercent: progress
      };
    }

    // Breaks / transitions
    if (idx < maxPeriods - 1) {
      const nextPeriodStart = getMinutesFromTimeStr(PERIODS[idx + 1].start);
      
      if (minutes >= pEnd && minutes < nextPeriodStart) {
        const totalDuration = nextPeriodStart - pEnd;
        const elapsed = minutes - pEnd;
        const progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));

        if (periodNum === 4) {
          // Lunch Break
          return {
            type: 'lunch',
            title: '점심시간 🍱',
            sub: '맛있게 밥 먹고 충전하는 시간!',
            periodNum: 5,
            currentSubject: null,
            nextSubject: todaySubjects[4],
            targetTimeLabel: '5교시 시작',
            targetMinutes: nextPeriodStart,
            progressPercent: progress
          };
        } else {
          // Break time
          return {
            type: 'break',
            title: '쉬는 시간 🏃‍♂️',
            sub: '이동 교실을 확인하고 미리 이동하세요!',
            periodNum: periodNum + 1,
            currentSubject: null,
            nextSubject: todaySubjects[idx + 1],
            targetTimeLabel: `${periodNum + 1}교시 시작`,
            targetMinutes: nextPeriodStart,
            progressPercent: progress
          };
        }
      }
    }
  }

  // After school
  const lastPeriodEnd = getMinutesFromTimeStr(PERIODS[maxPeriods - 1].end);
  if (minutes >= lastPeriodEnd) {
    return {
      type: 'after_school',
      title: '오늘의 모든 수업 종료 🎉',
      sub: '일과가 성공적으로 마무리되었습니다. 수고 많았어요!',
      periodNum: null,
      currentSubject: null,
      nextSubject: null,
      targetTimeLabel: '내일 일과 시작',
      targetMinutes: getMinutesFromTimeStr("23:59"),
      progressPercent: 100
    };
  }

  return {
    type: 'after_school',
    title: '일과 외 자유 시간',
    sub: '내일 일과 정보를 확인해보세요.',
    periodNum: null,
    currentSubject: null,
    nextSubject: null,
    targetTimeLabel: '일과 종료',
    targetMinutes: 0,
    progressPercent: 100
  };
}

function getCountdownText(statusAnalysis, activeContext) {
  if (statusAnalysis.type === 'after_school' || statusAnalysis.type === 'weekend') {
    return "--:--";
  }

  const targetSecTotal = statusAnalysis.targetMinutes * 60;
  const currentSecTotal = activeContext.minutes * 60 + activeContext.seconds;
  
  const diffSeconds = targetSecTotal - currentSecTotal;
  if (diffSeconds <= 0) return "00:00";

  const displayMin = Math.floor(diffSeconds / 60);
  const displaySec = diffSeconds % 60;

  const padZero = (n) => String(n).padStart(2, "0");
  return `${padZero(displayMin)}:${padZero(displaySec)}`;
}

function formatTimeDisplay(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? '오후' : '오전';
  const displayHour = hours % 12 || 12;
  const pad = (n) => String(n).padStart(2, "0");
  return `${ampm} ${displayHour}:${pad(minutes)}:${pad(seconds)}`;
}

// ============================================================================
// 5. RENDERING CORE (RE-RENDERS DYNAMIC DOM FRAGMENTS)
// ============================================================================

function render() {
  const activeContext = getActiveContext();
  const statusAnalysis = getStatusAnalysis(activeContext);
  const countdownText = getCountdownText(statusAnalysis, activeContext);

  // --- DARK MODE THEME ALIGN ---
  if (state.isDarkMode) {
    document.documentElement.classList.add("dark");
    document.getElementById("master_container").className = "min-h-screen py-6 px-4 md:py-10 bg-zinc-950 text-zinc-100 transition-colors duration-300";
    document.getElementById("master_card").className = "max-w-md mx-auto rounded-3xl overflow-hidden flex flex-col border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/40 transition-all duration-300";
    document.getElementById("app_header").className = "px-6 pt-6 pb-4 border-b border-zinc-805 bg-zinc-900/40 transition-all duration-300";
    document.getElementById("timer_stage").className = "px-6 py-6 border-b border-zinc-800 bg-zinc-950/20 transition-all duration-300";
    document.getElementById("weekly_tab_nav").className = "px-6 pt-5 pb-1 bg-zinc-900 transition-all duration-300";
    document.getElementById("list_view_section").className = "px-6 pb-6 flex-1 bg-zinc-900 transition-all duration-300";
    document.getElementById("simulator_dock").className = "border-t border-zinc-800 bg-zinc-950/40 p-5 transition-all duration-300";
    
    // Toggle Button
    const dmBtn = document.getElementById("dark_mode_toggle_btn");
    dmBtn.className = "p-2 rounded-xl border border-zinc-700 bg-zinc-800 text-yellow-400 hover:bg-zinc-700/80 transition-all active:scale-95 cursor-pointer";
    dmBtn.innerHTML = `<i data-lucide="sun" class="w-4 h-4"></i>`;
    
    // Bell Chime Button
    const bellChimeBtn = document.getElementById("bell_chime_btn");
    bellChimeBtn.className = "p-2 rounded-xl border border-zinc-800 bg-zinc-800/40 text-zinc-400 hover:text-blue-400 hover:bg-zinc-800 hover:border-zinc-700 transition-all active:scale-95 cursor-pointer";
    
    // Sound Bell Toggle
    const stBtn = document.getElementById("sound_toggle_btn");
    stBtn.className = state.soundEnabled 
      ? "p-2 rounded-xl border border-blue-900/50 bg-blue-950/40 text-blue-400 transition-all active:scale-95 cursor-pointer" 
      : "p-2 rounded-xl border border-zinc-800 bg-zinc-800/40 text-zinc-500 transition-all active:scale-95 cursor-pointer";

    document.getElementById("toggle_mock_mode_btn").className = "flex items-center space-x-2 text-xs font-bold text-zinc-300 hover:text-zinc-100 transition-colors cursor-pointer";
  } else {
    document.documentElement.classList.remove("dark");
    document.getElementById("master_container").className = "min-h-screen py-6 px-4 md:py-10 bg-slate-50 text-zinc-800 transition-colors duration-300";
    document.getElementById("master_card").className = "max-w-md mx-auto rounded-3xl overflow-hidden flex flex-col border border-zinc-100 bg-white shadow-sm transition-all duration-300";
    document.getElementById("app_header").className = "px-6 pt-6 pb-4 border-b border-zinc-100 bg-white transition-all duration-300";
    document.getElementById("timer_stage").className = "px-6 py-6 border-b border-zinc-100 bg-zinc-50/40 transition-all duration-300";
    document.getElementById("weekly_tab_nav").className = "px-6 pt-5 pb-1 bg-white transition-all duration-300";
    document.getElementById("list_view_section").className = "px-6 pb-6 flex-1 bg-white transition-all duration-300";
    document.getElementById("simulator_dock").className = "border-t border-zinc-100 bg-zinc-50/80 p-5 transition-all duration-300";
    
    // Toggle Button
    const dmBtn = document.getElementById("dark_mode_toggle_btn");
    dmBtn.className = "p-2 rounded-xl border border-zinc-100 text-zinc-400 hover:text-amber-500 hover:bg-amber-50 hover:border-amber-100 transition-all active:scale-95 cursor-pointer";
    dmBtn.innerHTML = `<i data-lucide="moon" class="w-4 h-4"></i>`;
    
    // Bell Chime Button
    const bellChimeBtn = document.getElementById("bell_chime_btn");
    bellChimeBtn.className = "p-2 rounded-xl border border-zinc-100 text-zinc-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all active:scale-95 cursor-pointer";
    
    // Sound Bell Toggle
    const stBtn = document.getElementById("sound_toggle_btn");
    stBtn.className = state.soundEnabled 
      ? "p-2 rounded-xl border border-blue-100 bg-blue-50/50 text-blue-600 transition-all active:scale-95 cursor-pointer" 
      : "p-2 rounded-xl border border-zinc-100 bg-zinc-50 text-zinc-300 transition-all active:scale-95 cursor-pointer";

    document.getElementById("toggle_mock_mode_btn").className = "flex items-center space-x-2 text-xs font-bold text-zinc-700 hover:text-zinc-900 transition-colors cursor-pointer";
  }

  // --- AUTOMATIC CHIME TRIGGER MONITOR ---
  if (state.soundEnabled) {
    const currentHash = `${statusAnalysis.type}_${statusAnalysis.periodNum || 0}`;
    if (state.prevPeriodStatusHash && state.prevPeriodStatusHash !== currentHash) {
      playRetroSchoolBell();
    }
    state.prevPeriodStatusHash = currentHash;
  }

  // --- LIVE TIMER CLOCK SECTION ---
  document.getElementById("live_clock_text").innerText = formatTimeDisplay(activeContext.date);
  
  if (state.mockEnabled) {
    document.getElementById("test_badge").classList.remove("hidden");
    document.getElementById("test_indicator_dot").className = "w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse";
  } else {
    document.getElementById("test_badge").classList.add("hidden");
    document.getElementById("test_indicator_dot").className = "w-2.5 h-2.5 rounded-full bg-zinc-300";
  }

  // Stage Banner Labels
  document.getElementById("stage_title_span").innerText = statusAnalysis.title;
  
  const subSpan = document.getElementById("stage_sub_span");
  if (statusAnalysis.sub) {
    subSpan.classList.remove("hidden");
    
    let subSpanClass = "inline-flex items-center space-x-1 ";
    subSpanClass += state.isDarkMode ? "text-blue-300 font-extrabold" : "text-blue-600 font-bold";
    
    const periodData = statusAnalysis.periodNum ? PERIODS[statusAnalysis.periodNum - 1] : null;
    const timeLimits = periodData ? ` (${periodData.start} ~ ${periodData.end})` : "";
    
    const labelTextClass = state.isDarkMode ? "text-zinc-350 text-zinc-400 font-medium ml-1.5" : "text-zinc-450 text-zinc-500 text-xs font-medium ml-1.5";
    
    subSpan.innerHTML = `
      <span class="${subSpanClass}">
        <span>${statusAnalysis.sub}</span>
        ${periodData ? `<span class="${labelTextClass}">${timeLimits}</span>` : ""}
      </span>
    `;
  } else {
    subSpan.classList.add("hidden");
    subSpan.innerHTML = "";
  }

  // Clock Countdown Time Big
  const clockCount = document.getElementById("countdown_clock_display");
  clockCount.innerText = countdownText;
  if (state.isDarkMode) {
    clockCount.className = "my-2 select-all font-mono text-6xl font-black tracking-tight text-zinc-50";
  } else {
    clockCount.className = "my-2 select-all font-mono text-6xl font-black tracking-tight text-zinc-900";
  }

  // Countdown Progress Target Desc
  const targetLabel = document.getElementById("target_label_indicator");
  if (statusAnalysis.type !== 'after_school' && statusAnalysis.type !== 'weekend') {
    const boldClass = state.isDarkMode 
      ? 'text-zinc-100 font-extrabold underline decoration-blue-500 decoration-2' 
      : 'text-zinc-800 font-bold underline decoration-blue-600';
    targetLabel.innerHTML = `<strong class="${boldClass}">${statusAnalysis.targetTimeLabel}</strong>까지 남은 시간`;
  } else {
    targetLabel.innerText = "일과 외 시간입니다";
  }

  // Visual Slider Progress bar
  const visualBar = document.getElementById("visual_timeline_bar");
  visualBar.style.width = `${statusAnalysis.progressPercent}%`;
  if (state.isDarkMode) {
    visualBar.className = "h-full rounded-full transition-all duration-1000 ease-out bg-blue-400";
  } else {
    visualBar.className = "h-full rounded-full transition-all duration-1000 ease-out bg-blue-600";
  }

  const tagLabelPercent = document.getElementById("progress_labels_desc");
  if (statusAnalysis.type !== 'after_school' && statusAnalysis.type !== 'weekend') {
    tagLabelPercent.classList.remove("hidden");
    tagLabelPercent.innerHTML = `
      <span>0% 진행</span>
      <span>${Math.round(statusAnalysis.progressPercent)}% 경과</span>
      <span>완료</span>
    `;
  } else {
    tagLabelPercent.classList.add("hidden");
    tagLabelPercent.innerHTML = "";
  }

  // --- TIMETABLE TABS INJECTION ---
  const activeRealDay = new Date().getDay();
  for (let d = 1; d <= 5; d++) {
    const tabEl = document.getElementById(`tab_day_${d}`);
    const isToday = activeRealDay === d;
    const isSelected = state.viewDay === d;

    // Apply exact visual specs matching React markup
    if (isSelected) {
      tabEl.className = state.isDarkMode
        ? "py-2 text-xs font-bold rounded-lg transition-all relative cursor-pointer select-none bg-zinc-850 text-blue-450 shadow-xs border border-zinc-700/80"
        : "py-2 text-xs font-bold rounded-lg transition-all relative cursor-pointer select-none bg-white text-blue-600 shadow-xs";
    } else {
      tabEl.className = state.isDarkMode
        ? "py-2 text-xs font-bold rounded-lg transition-all relative cursor-pointer select-none text-zinc-300 hover:text-white hover:bg-zinc-800/30"
        : "py-2 text-xs font-bold rounded-lg transition-all relative cursor-pointer select-none text-zinc-500 hover:text-zinc-800";
    }
    
    // Sync indicator dot
    const dot = tabEl.querySelector(".today-dot");
    if (isToday) {
      if (!dot) {
        tabEl.innerHTML = `
          ${WEEKDAY_NAMES[d]}
          <span class="today-dot absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-500 shadow-sm border border-white" title="오늘"></span>
        `;
      }
    } else {
      if (dot) {
        tabEl.innerHTML = WEEKDAY_NAMES[d];
      }
    }
  }

  // --- TIME TABLE DETAILED ROWS ---
  const listSubjects = TIMETABLES[state.viewDay] || [];
  const maxPeriodsToday = listSubjects.length;
  const itemsToRender = [];

  for (let i = 0; i < maxPeriodsToday; i++) {
    const currentPeriodNum = i + 1;
    const pTimeInfo = PERIODS[i];
    
    itemsToRender.push({
      isLunch: false,
      period: currentPeriodNum,
      subjectName: listSubjects[i],
      start: pTimeInfo.start,
      end: pTimeInfo.end,
    });

    if (currentPeriodNum === 4) {
      itemsToRender.push({
        isLunch: true,
        period: 0,
        subjectName: "🍱 점심시간",
        start: "12:05",
        end: "13:05",
      });
    }
  }

  const listContainer = document.getElementById("timetable_rows_container");
  listContainer.innerHTML = "";

  itemsToRender.forEach((item, idx) => {
    // Is this row currently active?
    let isActive = false;
    if (state.mockEnabled) {
      if (state.viewDay === state.mockDay) {
        if (item.isLunch && statusAnalysis.type === 'lunch') isActive = true;
        else if (!item.isLunch && statusAnalysis.type === 'class' && statusAnalysis.periodNum === item.period) isActive = true;
      }
    } else {
      const todayRealIndex = new Date().getDay();
      if (state.viewDay === todayRealIndex) {
        if (item.isLunch && statusAnalysis.type === 'lunch') isActive = true;
        else if (!item.isLunch && statusAnalysis.type === 'class' && statusAnalysis.periodNum === item.period) isActive = true;
      }
    }

    if (item.isLunch) {
      const mealInfo = MEAL_DATA[state.viewDay];
      const lunchRow = document.createElement("div");
      lunchRow.className = "flex flex-col space-y-2 w-full";
      
      const cardThemeClass = isActive 
        ? (state.isDarkMode 
            ? "bg-amber-955/35 border-amber-800/80 text-amber-300 shadow-md shadow-amber-950/20" 
            : "bg-amber-50/70 border-amber-200 text-amber-900 shadow-xs shadow-amber-50/10") 
        : (state.isDarkMode 
            ? "bg-zinc-900/60 border-zinc-750/70 text-zinc-100 hover:border-zinc-750/80" 
            : "bg-white border-zinc-150 text-zinc-700 hover:border-zinc-250");
            
      lunchRow.innerHTML = `
        <button 
          type="button"
          id="lunch_row_card"
          class="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border text-left transition-all cursor-pointer active:scale-[0.99] select-none ${cardThemeClass}"
        >
          <div class="flex items-center space-x-3">
            <div class="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${isActive ? 'bg-amber-500 text-white animate-bounce' : (state.isDarkMode ? 'bg-zinc-800 text-amber-300' : 'bg-amber-50 text-amber-600')}">
              🍱
            </div>
            <div>
              <div class="flex items-center space-x-2">
                <span class="text-sm font-bold">점심시간 급식표</span>
                <span class="text-[10px] uppercase tracking-wide bg-amber-500 text-white font-bold px-1.5 py-0.2 rounded font-mono">중식</span>
              </div>
              <span class="text-[10px] font-bold block mt-0.5 ${state.isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}">
                ${state.showMealMenu ? '🔽 클릭하여 식단 닫기' : '▶ 클릭하여 식단표 보기'}
              </span>
            </div>
          </div>
          <div class="flex flex-col items-end flex-shrink-0">
            <span class="text-xs font-mono font-bold">${item.start} ~ ${item.end}</span>
            ${mealInfo ? `<span class="text-[10px] font-mono font-bold mt-0.5 ${state.isDarkMode ? 'text-zinc-450' : 'text-zinc-500'}">${mealInfo.dateLabel}</span>` : ''}
          </div>
        </button>
      `;

      // Meal Menu Expand panel
      if (state.showMealMenu && mealInfo) {
        const mealCollapseCard = document.createElement("div");
        mealCollapseCard.id = "meal_info_collapse_card";
        mealCollapseCard.className = `p-4 rounded-2xl border transition-all duration-300 animate-fadeIn ${
          state.isDarkMode 
            ? "bg-zinc-950/65 border-zinc-800 text-zinc-100 shadow-inner" 
            : "bg-orange-50/25 border-orange-100 text-zinc-800 shadow-sm"
        }`;
        
        let menuItemsHtml = "";
        mealInfo.menu.forEach((dish) => {
          menuItemsHtml += `
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between py-1.5 border-b border-zinc-100/40 dark:border-zinc-900/20 last:border-0">
              <span class="text-xs font-bold ${state.isDarkMode ? 'text-white' : 'text-zinc-850'}">
                ${dish.name}
              </span>
              ${dish.allergy ? `
                <span class="text-[10px] font-semibold font-mono px-1.5 py-0.5 rounded max-w-fit mt-1 sm:mt-0 ${state.isDarkMode ? 'bg-zinc-800/80 text-zinc-200 border border-zinc-700/40' : 'bg-zinc-100/85 text-zinc-550'}">
                  알레르기: ${dish.allergy}
                </span>
              ` : ""}
            </div>
          `;
        });

        mealCollapseCard.innerHTML = `
          <div class="flex items-center justify-between border-b pb-2 mb-3 border-zinc-150 dark:border-zinc-800/60">
            <span class="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center space-x-1">
              <span>🏫 잠일고등학교 오늘의 급식</span>
            </span>
            <span class="text-[11px] font-mono font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 px-1.5 py-0.5 rounded">
              ${mealInfo.dateLabel} (중식)
            </span>
          </div>
          <div class="space-y-2">
            ${menuItemsHtml}
          </div>
          <div class="text-[10px] font-bold mt-3 pt-2 border-t border-dashed flex justify-between ${state.isDarkMode ? 'border-zinc-800 text-zinc-450' : 'border-zinc-150 text-zinc-500'}">
            <span>출처: school.koreacharts.com (잠일고 데이터)</span>
            <span>* 괄호 숫자는 알레르기 유발 유도 정보</span>
          </div>
        `;
        lunchRow.appendChild(mealCollapseCard);
      }

      lunchRow.querySelector("#lunch_row_card").addEventListener("click", () => {
        state.showMealMenu = !state.showMealMenu;
        render();
      });

      listContainer.appendChild(lunchRow);
    } else {
      // Normal Period
      const storageKey = `jamul_room_${state.viewDay}_${item.period}`;
      const userSavedRoom = state.customLocations[storageKey] || "";
      let displayRoom = userSavedRoom || DEFAULT_CLASSROOM_PRESETS[item.subjectName] || "교실";

      const rowCard = document.createElement("div");
      rowCard.id = `period_row_${item.period}`;
      
      const rowThemeClass = isActive
        ? (state.isDarkMode ? "bg-blue-950/30 border-blue-800/70 shadow-xs ring-1 ring-blue-900/30" : "bg-blue-50/40 border-blue-200 shadow-xs ring-1 ring-blue-100/30")
        : (state.isDarkMode ? "bg-zinc-900/60 border-zinc-750/70 hover:border-zinc-600/80" : "bg-white border-zinc-100 hover:border-zinc-200");
        
      const pIdxNum = isActive 
        ? "bg-blue-600 text-white" 
        : (state.isDarkMode ? "bg-zinc-800 text-zinc-100 border border-zinc-700/60" : "bg-zinc-100 text-zinc-650");

      const subjTextClass = isActive 
        ? (state.isDarkMode ? 'text-blue-300 font-extrabold' : 'text-blue-900 font-bold') 
        : (state.isDarkMode ? 'text-white font-extrabold' : 'text-zinc-850 font-bold');

      const roomBtnClass = userSavedRoom 
        ? (state.isDarkMode ? "bg-blue-950/50 text-blue-300 border border-blue-900/60" : "bg-blue-50 text-blue-600 border border-blue-100") 
        : (state.isDarkMode ? "bg-zinc-800/80 text-zinc-300 border border-zinc-700/70" : "bg-zinc-100/60 text-zinc-500 border border-zinc-200/50");

      rowCard.className = `flex items-center justify-between px-4 py-3.5 rounded-2xl border transition-all ${rowThemeClass}`;
      rowCard.innerHTML = `
        <div class="flex items-center space-x-4">
          <div class="w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${pIdxNum}">
            ${item.period}
          </div>
          
          <div class="flex flex-col">
            <div class="flex items-center space-x-1.5">
              <span class="w-2 h-2 rounded-full ${getSubjectColorClass(item.subjectName)}"></span>
              <span class="text-sm ${subjTextClass}">${item.subjectName}</span>
            </div>
            <span class="text-[11px] font-mono font-bold ${state.isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}">
              ${item.start} ~ ${item.end}
            </span>
          </div>
        </div>
        
        <div class="flex items-center">
          <button
            class="map-room-btn group flex items-center space-x-1 px-2.5 py-1.2 rounded-md font-bold transition-all text-[12px] outline-none cursor-pointer border ${roomBtnClass}"
            data-period="${item.period}"
            data-subject="${item.subjectName}"
            data-current="${userSavedRoom || displayRoom}"
            title="학교 건물 지도에서 교실 찾기 및 선택"
          >
            <i data-lucide="map-pin" class="w-3 h-3 text-blue-500 mr-0.5"></i>
            <span>${displayRoom}</span>
            <i data-lucide="edit-2" class="w-3 h-3 text-zinc-400 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity ml-1.5"></i>
          </button>
        </div>
      `;

      rowCard.querySelector(".map-room-btn").addEventListener("click", (e) => {
        const btn = e.currentTarget;
        const p = Number(btn.getAttribute("data-period"));
        const s = btn.getAttribute("data-subject");
        const curr = btn.getAttribute("data-current");
        openMapRoomModal(state.viewDay, p, s, curr);
      });

      listContainer.appendChild(rowCard);
    }
  });

  // --- TIME TEST CONTROLLER DOCK ---
  const ctrlBlock = document.getElementById("mock_controllers_block");
  if (state.mockEnabled) {
    ctrlBlock.classList.remove("hidden");
    const testMinutesOutput = document.getElementById("test_minutes_output");
    testMinutesOutput.innerText = `${String(Math.floor(state.mockMinutes / 60)).padStart(2, "0")}:${String(state.mockMinutes % 60).padStart(2, "0")}`;
    document.getElementById("mock_minutes_range").value = state.mockMinutes;

    // Highlights matching virt-day selector button
    for (let d = 1; d <= 5; d++) {
      const b = document.getElementById(`mock_day_btn_${d}`);
      if (state.mockDay === d) {
        b.className = state.isDarkMode
          ? "py-1 text-xs font-semibold rounded-md border text-zinc-900 bg-zinc-100 border-zinc-100 cursor-pointer"
          : "py-1 text-xs font-semibold rounded-md border text-white bg-zinc-900 border-zinc-900 cursor-pointer";
      } else {
        b.className = state.isDarkMode
          ? "py-1 text-xs font-semibold rounded-md border text-zinc-300 bg-zinc-800 border-zinc-700 hover:bg-zinc-750 cursor-pointer"
          : "py-1 text-xs font-semibold rounded-md border text-zinc-650 bg-zinc-50 border-zinc-200 hover:bg-zinc-100 cursor-pointer";
      }
    }
  } else {
    ctrlBlock.classList.add("hidden");
  }

  // --- REFRESH ALL LUCIDE ICONS (CRITICAL) ---
  refreshIcons();
}

// ============================================================================
// 6. SCHOOL MAP SELECTOR MODAL CONTROLS
// ============================================================================

const openMapRoomModal = (day, period, subjectName, currentVal) => {
  state.mapModalTarget = { day, period, subjectName };
  state.manualRoomVal = currentVal;
  
  // Predict best floor
  let initialFloor = 3;
  const cleanCurrent = currentVal.replace(/\s+/g, '');
  if (cleanCurrent) {
    const matchedRoom = SCHOOL_ROOMS.find(r => 
      r.name.replace(/\s+/g, '').includes(cleanCurrent) || 
      cleanCurrent.includes(r.name.replace(/\s+/g, ''))
    );
    if (matchedRoom) {
      initialFloor = matchedRoom.floor;
    } else {
      if (subjectName.includes("미술") || subjectName.includes("음악") || subjectName.includes("동아리")) {
        initialFloor = 5;
      } else if (subjectName.includes("체육") || subjectName.includes("강당")) {
        initialFloor = 1;
      } else if (subjectName.includes("과학") || subjectName.includes("탐구") || subjectName.includes("실험")) {
        initialFloor = 2;
      } else if (subjectName.includes("진로") || subjectName.includes("상담") || subjectName.includes("사회")) {
        initialFloor = 3;
      } else if (subjectName.includes("수학") || subjectName.includes("영어") || subjectName.includes("한국사")) {
        initialFloor = 4;
      }
    }
  } else {
    if (subjectName.includes("미술") || subjectName.includes("음악") || subjectName.includes("동아리")) {
      initialFloor = 5;
    } else if (subjectName.includes("체육") || subjectName.includes("강당")) {
      initialFloor = 1;
    } else if (subjectName.includes("과학") || subjectName.includes("탐구") || subjectName.includes("실험")) {
      initialFloor = 2;
    } else if (subjectName.includes("진로") || subjectName.includes("상담") || subjectName.includes("사회")) {
      initialFloor = 3;
    } else if (subjectName.includes("수학") || subjectName.includes("영어") || subjectName.includes("한국사")) {
      initialFloor = 4;
    }
  }
  
  state.modalSelectedFloor = initialFloor;
  state.mapSearchQuery = "";
  state.isMapModalOpen = true;
  
  renderMapModal();
};

const handleSaveLocation = (day, period, val) => {
  const key = `jamul_room_${day}_${period}`;
  const trimmedVal = val.trim();
  
  try {
    if (trimmedVal === "") {
      localStorage.removeItem(key);
      delete state.customLocations[key];
    } else {
      localStorage.setItem(key, trimmedVal);
      state.customLocations[key] = trimmedVal;
    }
  } catch (e) {
    console.error("Local storage permission issue during save:", e);
  }
  
  state.isMapModalOpen = false;
  state.mapModalTarget = null;
  render();
};

const renderMapModal = () => {
  const overlay = document.getElementById("map_selector_modal_overlay");
  
  if (!state.isMapModalOpen || !state.mapModalTarget) {
    overlay.classList.add("hidden");
    return;
  }
  
  overlay.classList.remove("hidden");
  
  // Custom Card colors according to Dark Mode state
  const mCard = document.getElementById("map_card_shell");
  mCard.className = `w-full max-w-sm rounded-3xl overflow-hidden flex flex-col border shadow-2xl transition-all duration-300 max-h-[90vh] ${
    state.isDarkMode ? 'bg-zinc-900 border-zinc-805 text-zinc-100' : 'bg-white border-zinc-150 text-zinc-850'
  }`;
  
  // Set Header Dynamic Target titles
  document.getElementById("modal_period_tag").innerText = `${state.mapModalTarget.period}교시`;
  document.getElementById("modal_subject_tag").innerText = state.mapModalTarget.subjectName;
  
  // --- FLOOR PLANE MAP RENDER ---
  const mapCenterSection = document.getElementById("modal_dynamic_map_section");
  mapCenterSection.innerHTML = "";
  
  const searchInput = document.getElementById("modal_search_input");
  searchInput.className = `w-full pl-9 pr-9 py-2 text-xs rounded-xl border focus:outline-none focus:ring-1 font-bold ${
    state.isDarkMode ? 'bg-zinc-950 border-zinc-800 text-white focus:ring-blue-500/50' : 'bg-zinc-50 border-zinc-200 text-zinc-800 focus:ring-blue-500/30'
  }`;
  searchInput.value = state.mapSearchQuery;

  // Render direct manual text fallback wrapper
  const manualInput = document.getElementById("modal_manual_text_input");
  manualInput.className = `w-full px-3 py-1.8 text-xs rounded-xl border focus:outline-none focus:ring-1 font-bold ${
    state.isDarkMode ? 'bg-zinc-950 border-zinc-800 text-white focus:ring-blue-500/50' : 'bg-white border-zinc-200 text-zinc-800 focus:ring-blue-500/30'
  }`;
  manualInput.value = state.manualRoomVal;

  if (state.mapSearchQuery.trim() !== "") {
    // === SEARCH MODE RENDER ===
    const filtered = SCHOOL_ROOMS.filter(r => 
      r.name.toLowerCase().includes(state.mapSearchQuery.toLowerCase()) ||
      (r.desc && r.desc.toLowerCase().includes(state.mapSearchQuery.toLowerCase()))
    );

    const searchResultsDiv = document.createElement("div");
    searchResultsDiv.className = "space-y-2";
    
    let listHtml = "";
    if (filtered.length === 0) {
      listHtml = `
        <div class="p-6 text-center rounded-2xl border border-dashed ${state.isDarkMode ? 'bg-zinc-950/40 border-zinc-805 text-zinc-400' : 'bg-zinc-50/50 border-zinc-200 text-zinc-500'}">
          <p class="text-xs font-bold">검색된 교실이 없습니다.</p>
          <p class="text-[10px] mt-1">하단 직접 입력 창에 수동 등록 가능합니다.</p>
        </div>
      `;
    } else {
      listHtml += `<div class="grid grid-cols-1 gap-1.5 max-h-[180px] overflow-y-auto pr-1">`;
      filtered.forEach(room => {
        const isSelected = state.manualRoomVal === room.name;
        const btnBg = isSelected
          ? 'bg-blue-600 border-blue-600 text-white'
          : (state.isDarkMode ? 'bg-zinc-950 border-zinc-800 text-zinc-200 hover:border-zinc-700' : 'bg-slate-50 border-zinc-150 text-zinc-700 hover:border-zinc-250');
        
        const badgeBg = isSelected 
          ? 'bg-white/20 text-white' 
          : 'bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400';

        listHtml += `
          <button
            type="button"
            class="search-select-btn w-full flex items-center justify-between p-2 rounded-xl border text-left transition-all cursor-pointer ${btnBg}"
            data-room="${room.name}"
            data-floor="${room.floor}"
          >
            <div class="flex items-center space-x-2">
              <span class="text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase ${badgeBg}">
                ${room.floor}F
              </span>
              <div class="flex flex-col">
                <span class="text-xs font-bold">${room.name}</span>
                ${room.desc ? `<span class="text-[9px] ${isSelected ? 'text-blue-150' : 'text-zinc-400'}">${room.desc}</span>` : ''}
              </div>
            </div>
            ${isSelected ? `<i data-lucide="check" class="w-3.5 h-3.5 text-white"></i>` : ""}
          </button>
        `;
      });
      listHtml += `</div>`;
    }

    searchResultsDiv.innerHTML = `
      <h4 class="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center space-x-1 mb-2">
        <i data-lucide="search" class="w-3 h-3 text-blue-500 mr-1 inline-block"></i>
        <span>검색 결과</span>
      </h4>
      ${listHtml}
    `;

    searchResultsDiv.querySelectorAll(".search-select-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        state.manualRoomVal = btn.getAttribute("data-room");
        state.modalSelectedFloor = Number(btn.getAttribute("data-floor"));
        renderMapModal();
      });
    });

    mapCenterSection.appendChild(searchResultsDiv);
  } else {
    // === FLOOR MAP GRID PLANNER ===
    const planDiv = document.createElement("div");
    planDiv.className = "space-y-3";
    
    // Create floor buttons Mon-Fri lookalike tabs
    let floorsHeaderHtml = `<div class="grid grid-cols-5 gap-1 p-1 rounded-xl ${state.isDarkMode ? 'bg-zinc-950/60' : 'bg-zinc-100'}">`;
    [5, 4, 3, 2, 1].forEach((fl) => {
      const isSelected = state.modalSelectedFloor === fl;
      const fBtnStyle = isSelected
        ? (state.isDarkMode ? "bg-zinc-800 text-blue-400 border border-zinc-700 shadow-xs" : "bg-white text-blue-600 shadow-xs")
        : (state.isDarkMode ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-805");
        
      floorsHeaderHtml += `
        <button
          type="button"
          class="floor-tab-btn py-1 text-[11px] font-bold rounded-lg transition-all relative cursor-pointer ${fBtnStyle}"
          data-floor="${fl}"
        >
          ${fl}F
        </button>
      `;
    });
    floorsHeaderHtml += `</div>`;

    // High quality corridor alignment
    const roomsOnFloor = SCHOOL_ROOMS.filter(r => r.floor === state.modalSelectedFloor);
    let floorGridHtml = "";
    
    if (roomsOnFloor.length === 0) {
      floorGridHtml = `
        <div class="col-span-3 py-6 text-center text-[11px] text-zinc-400">
          이 층에는 등록된 교실 배치가 없습니다.
        </div>
      `;
    } else {
      roomsOnFloor.forEach(room => {
        const isSelected = state.manualRoomVal === room.name;
        
        let roomBorderColor = "border-zinc-200 dark:border-zinc-800";
        let roomTagBg = "bg-zinc-100 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-400";
        
        if (room.type === 'special') {
          roomBorderColor = 'border-purple-200 dark:border-purple-900/30';
          roomTagBg = 'bg-purple-100/50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400';
        } else if (room.type === 'office') {
          roomBorderColor = 'border-amber-200 dark:border-amber-900/30';
          roomTagBg = 'bg-amber-100/50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400';
        } else if (room.type === 'facilities') {
          roomBorderColor = 'border-emerald-200 dark:border-emerald-900/30';
          roomTagBg = 'bg-emerald-100/50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400';
        }

        const btnTheme = isSelected
          ? (state.isDarkMode 
              ? "bg-blue-600 border-blue-600 text-white shadow-md scale-[1.02]" 
              : "bg-blue-600 border-blue-600 text-white shadow-md scale-[1.02]")
          : (state.isDarkMode 
              ? "bg-zinc-900 hover:bg-zinc-800 " + roomBorderColor + " text-zinc-100" 
              : "bg-white hover:bg-zinc-50 " + roomBorderColor + " text-zinc-800 shadow-xxs");

        floorGridHtml += `
          <button
            type="button"
            class="grid-room-select-btn p-2 rounded-xl border text-center transition-all cursor-pointer h-16 flex flex-col justify-between ${btnTheme}"
            data-room="${room.name}"
          >
            <div class="flex justify-between items-start w-full">
              <span class="text-[7px] font-extrabold px-1 rounded uppercase tracking-tighter scale-90 -ml-0.5 origin-left ${isSelected ? 'bg-white/20 text-white' : roomTagBg}">
                ${room.type === 'classroom' ? '교실' : (room.type === 'special' ? '특화' : room.type === 'office' ? '교무' : '시설')}
              </span>
              ${isSelected ? `<i data-lucide="check" class="w-2.5 h-2.5 text-white"></i>` : ""}
            </div>
            <span class="text-[10px] font-black tracking-tight leading-tight block truncate w-full text-center">
              ${room.name.replace("교실", "").trim()}
            </span>
            <span class="text-[7px] truncate block w-full text-center ${isSelected ? 'text-blue-100' : 'text-zinc-400'}">
              ${room.floor}층 복도방향
            </span>
          </button>
        `;
      });
    }

    planDiv.innerHTML = `
      <div class="flex justify-between items-center mb-2">
        <span class="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center">
          <i data-lucide="layers" class="w-3 h-3 text-blue-500 mr-1.5 inline-block"></i>
          <span>층별 지도 탐색</span>
        </span>
        <span class="text-[10px] font-bold text-blue-600 dark:text-blue-400 font-mono">
          ${state.modalSelectedFloor}층 평면도
        </span>
      </div>
      
      ${floorsHeaderHtml}

      <div class="p-3 rounded-2xl border relative ${state.isDarkMode ? 'bg-zinc-950/70 border-zinc-850' : 'bg-slate-50/40 border-zinc-150'}">
        <div class="space-y-2.5">
          <div class="flex justify-between text-[7px] font-mono font-bold uppercase tracking-wide text-zinc-400 px-0.5">
            <span>◀ 서편 (계단)</span>
            <span>교실 전경 배치</span>
            <span>동편 (엘카) ▶</span>
          </div>

          <div class="grid grid-cols-3 gap-1.5">
            ${floorGridHtml}
          </div>

          <div class="py-0.5 rounded-md flex items-center justify-center text-[8px] font-extrabold tracking-wider ${state.isDarkMode ? 'bg-zinc-900 text-zinc-400' : 'bg-zinc-100 text-zinc-500'}">
            -- 🏢 ${state.modalSelectedFloor}층 중앙 복도 --
          </div>
        </div>
      </div>
    `;

    planDiv.querySelectorAll(".floor-tab-btn").forEach(tab => {
      tab.addEventListener("click", () => {
        state.modalSelectedFloor = Number(tab.getAttribute("data-floor"));
        renderMapModal();
      });
    });

    planDiv.querySelectorAll(".grid-room-select-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        state.manualRoomVal = btn.getAttribute("data-room");
        renderMapModal();
      });
    });

    mapCenterSection.appendChild(planDiv);
  }

  // --- SELECTION SHOWCASE BOX ---
  const showcase = document.getElementById("modal_selection_showcase");
  if (state.manualRoomVal) {
    showcase.classList.remove("hidden");
    showcase.className = `p-3 rounded-2xl border flex items-center space-x-2.5 transition-colors ${
      state.isDarkMode ? 'bg-blue-950/20 border-blue-900/40' : 'bg-blue-50/50 border-blue-100'
    }`;
    
    const matchedRoomInfo = SCHOOL_ROOMS.find(r => r.name === state.manualRoomVal);
    let floorLabelInfo = `<span class="text-[9px] font-extrabold text-amber-600 px-1.5 py-0.2 rounded bg-amber-50">수동 입력</span>`;
    if (matchedRoomInfo) {
      floorLabelInfo = `<span class="text-[9px] font-bold px-1.5 py-0.2 rounded ${state.isDarkMode ? 'bg-zinc-800 text-zinc-350' : 'bg-zinc-200/60 text-zinc-650'}">${matchedRoomInfo.floor}층 위치</span>`;
    }

    showcase.innerHTML = `
      <div class="w-6 h-6 rounded-lg bg-blue-600 text-white font-extrabold flex items-center justify-center text-xs">📍</div>
      <div class="flex-1 min-w-0">
        <p class="text-[9px] font-bold ${state.isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}">선택된 교실 위치</p>
        <p class="text-xs font-extrabold tracking-tight truncate ${state.isDarkMode ? 'text-blue-300' : 'text-blue-800'}">
          ${state.manualRoomVal}
        </p>
      </div>
      ${floorLabelInfo}
    `;
  } else {
    showcase.classList.add("hidden");
    showcase.innerHTML = "";
  }

  // --- REFRESH PRESETS HIGHLIGHTS ---
  const presetPillsContainer = document.getElementById("modal_popular_presets");
  presetPillsContainer.innerHTML = "";
  ["교실", "미술실", "체육관", "뉴턴실", "진로학습실", "잠일도서관", "음악실", "동아리실"].map(pItem => {
    const isSelected = state.manualRoomVal === pItem;
    const pBtn = document.createElement("button");
    pBtn.type = "button";
    pBtn.className = `px-2 py-0.8 text-[10px] rounded-lg font-bold border transition-all cursor-pointer ${
      isSelected
        ? 'bg-blue-600 border-blue-600 text-white'
        : (state.isDarkMode ? 'bg-zinc-800 border-zinc-700/60 text-zinc-300 hover:border-zinc-600' : 'bg-zinc-50 border-zinc-150 text-zinc-600 hover:bg-zinc-100')
    }`;
    pBtn.innerText = pItem;
    pBtn.addEventListener("click", () => {
      state.manualRoomVal = pItem;
      const rMatch = SCHOOL_ROOMS.find(r => r.name === pItem);
      if (rMatch) state.modalSelectedFloor = rMatch.floor;
      renderMapModal();
    });
    presetPillsContainer.appendChild(pBtn);
  });

  refreshIcons();
};

// ============================================================================
// 7. EVENT LISTENERS SETUP
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
  // --- Header Action Switches ---
  document.getElementById("dark_mode_toggle_btn").addEventListener("click", () => {
    state.isDarkMode = !state.isDarkMode;
    try {
      localStorage.setItem("jamul_dark_mode", String(state.isDarkMode));
    } catch {}
    render();
  });

  document.getElementById("bell_chime_btn").addEventListener("click", () => {
    playRetroSchoolBell();
  });

  document.getElementById("sound_toggle_btn").addEventListener("click", () => {
    state.soundEnabled = !state.soundEnabled;
    render();
  });

  // --- Mon-Fri Timetable Tabs selectors ---
  for (let d = 1; d <= 5; d++) {
    document.getElementById(`tab_day_${d}`).addEventListener("click", () => {
      state.viewDay = d;
      render();
    });
  }

  // --- Test Simulator Actions ---
  document.getElementById("toggle_mock_mode_btn").addEventListener("click", () => {
    state.mockEnabled = !state.mockEnabled;
    
    if (state.mockEnabled) {
      state.viewDay = state.mockDay;
    } else {
      const liveDay = new Date().getDay();
      state.viewDay = (liveDay >= 1 && liveDay <= 5) ? liveDay : 1;
    }
    render();
  });

  document.getElementById("reset_mock_time_btn").addEventListener("click", () => {
    if (state.mockEnabled) {
      state.mockMinutes = 555;
      state.mockDay = 2;
      state.mockSeconds = 0;
      state.viewDay = state.mockDay;
      render();
    }
  });

  // Virtual Range Slider Time adjustor
  const rangeSlider = document.getElementById("mock_minutes_range");
  rangeSlider.addEventListener("input", (e) => {
    state.mockMinutes = Number(e.target.value);
    state.mockSeconds = 0;
    render();
  });

  // Simulator Weekday buttons click bound
  for (let d = 1; d <= 5; d++) {
    document.getElementById(`mock_day_btn_${d}`).addEventListener("click", () => {
      state.mockDay = d;
      state.viewDay = d;
      render();
    });
  }

  // Quick One-Click scenarios
  const applyPresetTest = (pNum, isBreak) => {
    state.mockEnabled = true;
    if (pNum === 0) {
      state.mockMinutes = 480; // 08:00 AM
      state.mockSeconds = 0;
    } else if (pNum === 4.5) {
      state.mockMinutes = 740; // 12:20 PM
      state.mockSeconds = 0;
    } else if (pNum === 8) {
      state.mockMinutes = 970; // 16:10 PM
      state.mockSeconds = 0;
    } else {
      const targetPeriod = PERIODS[pNum - 1];
      if (isBreak) {
        const endMin = getMinutesFromTimeStr(targetPeriod.end);
        state.mockMinutes = endMin + 4; // 4 mins into break (e.g. 10:04 AM)
        state.mockSeconds = 0;
      } else {
        const startMin = getMinutesFromTimeStr(targetPeriod.start);
        state.mockMinutes = startMin + 15; // 15 mins into class
        state.mockSeconds = 0;
      }
    }
    state.viewDay = state.mockDay;
    render();
  };

  document.getElementById("preset_scen_0").addEventListener("click", () => applyPresetTest(0, false));
  document.getElementById("preset_scen_1").addEventListener("click", () => applyPresetTest(1, false));
  document.getElementById("preset_scen_2").addEventListener("click", () => applyPresetTest(2, true));
  document.getElementById("preset_scen_3").addEventListener("click", () => applyPresetTest(4.5, false));
  document.getElementById("preset_scen_4").addEventListener("click", () => applyPresetTest(7, false));
  document.getElementById("preset_scen_5").addEventListener("click", () => applyPresetTest(8, false));

  // --- Modal Map Interactive components ---
  const modalOverlay = document.getElementById("map_selector_modal_overlay");
  modalOverlay.addEventListener("click", () => {
    state.isMapModalOpen = false;
    state.mapModalTarget = null;
    renderMapModal();
  });

  const modalCardshell = document.getElementById("map_card_shell");
  modalCardshell.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent closing overlay on interior click
  });

  // Modal X dismiss button
  document.getElementById("modal_close_btn").addEventListener("click", () => {
    state.isMapModalOpen = false;
    state.mapModalTarget = null;
    renderMapModal();
  });

  // Modal Search action bounds
  const modalSearch = document.getElementById("modal_search_input");
  modalSearch.addEventListener("input", (e) => {
    state.mapSearchQuery = e.target.value;
    renderMapModal();
  });

  // Modal Custom fallback manual input action bounds
  const modalManual = document.getElementById("modal_manual_text_input");
  modalManual.addEventListener("input", (e) => {
    state.manualRoomVal = e.target.value;
    renderMapModal();
  });

  // Modal Clean text button
  document.getElementById("modal_search_clear_btn").addEventListener("click", () => {
    state.mapSearchQuery = "";
    document.getElementById("modal_search_input").value = "";
    renderMapModal();
  });

  // Modal save and cancel buttons
  document.getElementById("modal_cancel_btn").addEventListener("click", () => {
    state.isMapModalOpen = false;
    state.mapModalTarget = null;
    renderMapModal();
  });

  document.getElementById("modal_save_btn").addEventListener("click", () => {
    if (state.mapModalTarget) {
      handleSaveLocation(state.mapModalTarget.day, state.mapModalTarget.period, state.manualRoomVal);
    }
  });

  // Initial Bootup Render
  render();

  // Tick time every second and re-render
  setInterval(() => {
    state.currentTime = new Date();
    
    if (state.mockEnabled) {
      state.mockSeconds++;
      if (state.mockSeconds >= 60) {
        state.mockSeconds = 0;
        state.mockMinutes++;
        if (state.mockMinutes >= 24 * 60) {
          state.mockMinutes = 0;
          state.mockDay = (state.mockDay % 5) + 1; // Mon-Fri
        }
      }
    }
    
    render();
  }, 1000);
});
