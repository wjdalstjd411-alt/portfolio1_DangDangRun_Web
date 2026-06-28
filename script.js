/*-----------------------------------------------------------
  네비게이션 스크롤 이동
-----------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links a");
  const goTopLogo = document.getElementById("goTop");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));

      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  goTopLogo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

/*-----------------------------------------------------------
  견종 데이터
-----------------------------------------------------------*/
const breedData = [
  {
    name: "Pomeranian",
    distance: "1~2km",
    advice: "포메는 짧고 자주 산책하는 게 좋아요!",
    img: "포메라니안_카드.png"
  },
  {
    name: "Poodle",
    distance: "3~5km",
    advice: "지능이 높은 만큼 산책 + 놀이 조합 추천!",
    img: "푸들_카드.png"
  },
  {
    name: "Retriever",
    distance: "5~8km",
    advice: "활동량이 많아 충분한 장거리 산책 필요!",
    img: "리트리버_카드.png"
  },
  {
    name: "Maltese",
    distance: "1~2km",
    advice: "짧아도 꾸준함이 중요해요!",
    img: "말티즈_카드.png"
  },
  {
    name: "Welsh Corgi",
    distance: "2~4km",
    advice: "허리가 길어 너무 긴 산책은 피해주세요!",
    img: "웰시코기_카드.png"
  },
  {
    name: "Samoyed",
    distance: "4~6km",
    advice: "체력이 좋아 충분한 산책이 필요해요!",
    img: "사모예드_카드.png"
  },
  {
    name: "Yorkshire",
    distance: "1~2km",
    advice: "소형견이라 짧고 가벼운 산책이 좋아요.",
    img: "요크셔_카드.png"
  },
  {
    name: "Shiba Inu",
    distance: "4~5km",
    advice: "독립적이지만 산책 강도가 중요한 스타일!",
    img: "시바견_카드.png"
  },
  {
    name: "Doberman",
    distance: "6~7km",
    advice: "많은 활동량을 소비할 운동이 필요해요!",
    img: "도베르만_카드.png"
  }
];

/*-----------------------------------------------------------
  견종 카드 렌더링
-----------------------------------------------------------*/
function renderBreeds(filter = "") {
  const list = document.getElementById("breedList");
  const keyword = filter.toLowerCase();

  const filtered = breedData.filter((b) =>
    b.name.toLowerCase().includes(keyword)
  );

  list.innerHTML = filtered
    .map(
      (b) => `
      <div class="flip-card">
        <div class="flip-inner">

          <!-- FRONT -->
          <div class="flip-front">
            <img src="${b.img}" alt="${b.name}">
            <div class="front-text">${b.name}</div>
            <div class="front-distance">${b.distance}</div>
          </div>

          <!-- BACK -->
          <div class="flip-back">
            <div class="b-name">${b.name}</div>
            <div class="b-distance">권장 거리: ${b.distance}</div>
            <div class="b-advice">${b.advice}</div>
          </div>

        </div>
      </div>
    `
    )
    .join("");
}
/*-----------------------------------------------------------
  견종 검색 기능
-----------------------------------------------------------*/
const searchInput = document.getElementById("breedSearchInput");

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    renderBreeds(e.target.value);
  });
}

/*-----------------------------------------------------------
  초기 실행
-----------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
  renderBreeds();
});
/*******************************************************
 *  PARALLAX (스크롤 시 글자가 위로 올라가는 버전)
 *******************************************************/

// PNG 오버레이들
const heroOverlay = document.querySelector(".parallax-logo");
const sloganOverlay = document.querySelector(".slogan-overlay");
const introOverlay = document.querySelector(".intro-overlay"); // ⭐ 신규 추가

// rAF
const rAF =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

let ticking = false;

function updateParallax() {
  const scrollY = window.scrollY;

  // ★ DangDangRun 메인 로고 PNG
  if (heroOverlay) {
    const y = -(scrollY * 0.75);
    heroOverlay.style.transform = `translateX(-50%) translateY(${y}px)`;
  }

  // ★ 슬로건 PNG
  if (sloganOverlay) {
    const y2 = -(scrollY * 0.47);
    sloganOverlay.style.transform = `translateX(-50%) translateY(${y2}px)`;
  }

  // ★★★ 인트로 페이지 텍스트 PNG (너가 추가한 것)
  if (introOverlay) {
    const y3 = -(scrollY * 0.20); // 속도는 네가 원하는 대로 조절
    introOverlay.style.transform = `translateX(-50%) translateY(${y3}px)`;
  }

  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    ticking = true;
    rAF(updateParallax);
  }
});






/*-----------------------------------------------------------
  WALK RECORD CHART (FIXED VERSION)
-----------------------------------------------------------*/

// 데이터
const walkRecordData = {
  week: {
    labels: ["월", "화", "수", "목", "금", "토", "일"],
    distance: [2, 3, 1, 4.5, 1.5, 4.8, 2.5],
    heart: [114, 118, 108, 120, 112, 124, 116],
    health: [70, 75, 65, 80, 68, 85, 72]
  },
  month: {
    labels: ["1주", "2주", "3주", "4주"],
    distance: [12, 15, 10, 18],
    heart: [116, 118, 114, 120],
    health: [72, 75, 70, 80]
  },
  year: {
    labels: ["1월","2월","3월","4월","5월","6월"],
    distance: [40, 45, 38, 50, 55, 60],
    heart: [115, 117, 116, 118, 119, 120],
    health: [70, 72, 74, 76, 78, 80]
  }
};

const ctx = document.getElementById("walkChart").getContext("2d");

let walkChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: walkRecordData.week.labels,
    datasets: [
      {
        label: "산책거리",
        data: walkRecordData.week.distance,
        yAxisID: "yDistance",
        borderColor: "#A3FEA0",
        backgroundColor: "#A3FEA0",
        tension: 0.6,
        cubicInterpolationMode: "monotone",
        pointRadius: 7,
        pointHoverRadius: 10,
        borderWidth: 4
      },
      {
        label: "평균심박수",
        data: walkRecordData.week.heart,
        yAxisID: "yHeart",
        borderColor: "#FF8A4C",
        backgroundColor: "#FF8A4C",
        tension: 0.6,
        cubicInterpolationMode: "monotone",
        pointRadius: 7,
        pointHoverRadius: 10,
        borderWidth: 4
      },
      {
        label: "건강도 점수",
        data: walkRecordData.week.health,
        yAxisID: "yHealth",
        borderColor: "#4CF3FF",
        backgroundColor: "#4CF3FF",
        tension: 0.6,
        cubicInterpolationMode: "monotone",
        pointRadius: 7,
        pointHoverRadius: 10,
        borderWidth: 4
      }
    ]
  },
  options: {
  responsive: true,
  maintainAspectRatio: false,

  animation: {
    duration: 1600,
    easing: "easeInOutCubic"
  },

  plugins: {
    legend: { display: false },

    tooltip: {
      titleFont: {
        size: 24,       // ⬅ 요일 (월, 화…)
        weight: "800"
      },
      bodyFont: {
        size: 22        // ⬅ 값 (km, bpm)
      },
      padding: 14
    }
  },

  scales: {
    yDistance: {
  position: "left",
  beginAtZero: true,
  ticks: {
    callback: (v) => `${v} km`,
    color: "#cfcfcf",
    font: {
      size: 22,
      weight: "700"
    }
  },
  grid: {
    color: "rgba(255,255,255,0.15)"
  }
},


    yHeart: {
      position: "right",
      min: 108,
      max: 124,
      ticks: {
        callback: (v) => `${v} bpm`,
        color: "#cfcfcf",
        font: {
          size: 22,     // ⭐
          weight: "700"
        }
      },
      grid: {
        drawOnChartArea: false
      }
    },

    x: {
      ticks: {
        color: "#cfcfcf",
        font: {
          size: 22,     // ⭐ 월~일 글씨
          weight: "700"
        }
      },
      grid: {
        color: "rgba(255,255,255,0.12)"
      }
    }
  }
}
});

/*-----------------------------------------------------------
  TAB INTERACTION (FIXED)
-----------------------------------------------------------*/
document.querySelectorAll(".record-tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".record-tab")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const type = btn.dataset.type;
    const data = walkRecordData[type];

    walkChart.data.labels = data.labels;
    walkChart.data.datasets[0].data = data.distance;
    walkChart.data.datasets[1].data = data.heart;
    walkChart.data.datasets[2].data = data.health;

    // ⭐ 여기!
    walkChart.options.scales.yDistance.max =
      getDistanceMax(data.distance);

      function getDistanceMax(arr) {
  return Math.ceil(Math.max(...arr) * 1.2);
}


    walkChart.update();
  });
});







/*-----------------------------------------------------------
  FADE-IN SCROLL INTERACTION
-----------------------------------------------------------*/
const fadeSections = document.querySelectorAll(".fade-section");

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        fadeObserver.unobserve(entry.target); // 한 번만 실행
      }
    });
  },
  {
    threshold: 0.2 // 20% 보이면 실행
  }
);

fadeSections.forEach((section) => {
  fadeObserver.observe(section);
});







/* ======================================
   HEALTH AI REPORT LOGIC (FIXED)
====================================== */

/* ---------------------------
   데이터 (HTML 제거)
---------------------------- */
const healthReportData = {
  week: {
    distance: "12.6 km",
    heart: "108 bpm",
    health: "92 / 100",
    goal: "76%",
    feedbackParts: [
      { text: "이번 주는 지난주와 비교했을 때 산책 습관에 긍정적인 변화가 있었어요. 특히 " },
      { text: "산책량이 눈에 띄게 증가했어요", className: "feedback-highlight-good" },
      { text: ". 하루 평균 활동 시간이 늘어나면서 전반적인 운동량이 안정적으로 유지되고 있어요. 또한 " },
      { text: "심박수도 안정적인 범위", className: "feedback-highlight-good" },
      { text: "를 유지하고 있어 무리 없이 건강한 산책이 이루어지고 있어요. 다만 목표 달성률을 조금 더 높이기 위해서는 " },
      { text: "주말에 산책 시간을 조금 더 늘려주는 것이 좋아요", className: "feedback-highlight-warn" },
      { text: ". 짧은 산책을 여러 번 나누어 진행하는 것도 좋은 방법이에요." }
    ]
  },

  month: {
    distance: "52 km",
    heart: "110 bpm",
    health: "88 / 100",
    goal: "81%",
    feedbackParts: [
      { text: "이번 달은 산책 루틴이 안정적으로 자리 잡은 기간이에요. 전반적으로 " },
      { text: "규칙적인 산책 패턴을 잘 유지했어요", className: "feedback-highlight-good" },
      { text: ". 무리하게 거리나 시간을 늘리기보다는 현재의 페이스를 지키며 꾸준히 실천한 점이 인상적이에요. 평균 심박수도 큰 변동 없이 안정적인 흐름을 보이고 있어요. 앞으로도 지금과 같은 패턴을 유지하면서 " },
      { text: "현재의 좋은 흐름을 계속 이어가 주세요", className: "feedback-highlight-good" },
      { text: "." }
    ]
  },

  year: {
    distance: "620 km",
    heart: "112 bpm",
    health: "85 / 100",
    goal: "90%",
    feedbackParts: [
      { text: "올해 한 해 동안 매우 성실하게 산책을 이어오셨어요. 장기간에 걸쳐 형성된 이 습관은 단순한 운동을 넘어 건강한 생활 리듬을 만들어주고 있어요. 특히 " },
      { text: "장기적인 심폐 건강에 매우 긍정적인 영향", className: "feedback-highlight-good" },
      { text: "을 주고 있으며, 체력 유지와 스트레스 관리 측면에서도 큰 도움이 되고 있어요. 앞으로도 지금처럼 즐겁고 무리 없는 산책을 이어가 보세요." }
    ]
  }
};



/* ---------------------------
   타이핑 효과 (완전 수정본)
---------------------------- */
function typeFeedback(element, parts, speed = 25) {
  element.innerHTML = "";

  let partIndex = 0;
  let charIndex = 0;
  let currentSpan = null;

  function type() {
    if (partIndex >= parts.length) return;

    const part = parts[partIndex];

    // ⭐ 파트 시작 시 무조건 span 생성
    if (charIndex === 0) {
      currentSpan = document.createElement("span");

      if (part.className) {
        currentSpan.className = part.className;
      }

      element.appendChild(currentSpan);
    }

    currentSpan.textContent += part.text[charIndex];
    charIndex++;

    if (charIndex >= part.text.length) {
      partIndex++;
      charIndex = 0;
      currentSpan = null;
    }

    setTimeout(type, speed);
  }

  type();
}



/* ---------------------------
   렌더링
---------------------------- */
function renderHealthReport(type) {
  const data = healthReportData[type];

  document.getElementById("summary-distance").textContent = data.distance;
  document.getElementById("summary-heart").textContent = data.heart;
  document.getElementById("summary-health").textContent = data.health;
  document.getElementById("summary-goal").textContent = data.goal;

  const feedbackEl = document.getElementById("feedbackText");
  typeFeedback(feedbackEl, data.feedbackParts);
}


/* ---------------------------
   탭 클릭
---------------------------- */
document.querySelectorAll(".health-tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".health-tab")
      .forEach((b) => b.classList.remove("active"));

    btn.classList.add("active");
    renderHealthReport(btn.dataset.type);
  });
});


/* ---------------------------
   초기 실행
---------------------------- */
renderHealthReport("week");



/* ===============================
   AUTO SCROLL COURSE SLIDER
================================ */
document.addEventListener("DOMContentLoaded", () => {

  const slider = document.getElementById("courseSlider");
  const track = document.getElementById("courseTrack");

  if (!slider || !track) {
    console.error("❌ course slider elements not found");
    return;
  }

  // 카드 복제 (무한 루프)
  track.innerHTML += track.innerHTML;

  let speed = 0.5;      // 속도
  let paused = false;

  function autoScroll() {
    if (!paused) {
      slider.scrollLeft += speed;

      if (slider.scrollLeft >= track.scrollWidth / 2) {
        slider.scrollLeft = 0;
      }
    }
    requestAnimationFrame(autoScroll);
  }

  autoScroll();

  slider.addEventListener("mouseenter", () => paused = true);
  slider.addEventListener("mouseleave", () => paused = false);

});

/* ===============================
   COMMUNITY SCROLL FADE-IN
================================ */
const communitySection = document.getElementById("community");
const cards = document.querySelectorAll(".community-card");

let currentIndex = 0;
let scrollAccumulated = 0;
const SCROLL_THRESHOLD = 350; // ⭐ 이 값이 "휠 2~3번" 느낌

window.addEventListener("wheel", (e) => {
  // 커뮤니티 섹션이 화면에 보일 때만
  const rect = communitySection.getBoundingClientRect();
  if (rect.top > window.innerHeight || rect.bottom < 0) return;

  scrollAccumulated += Math.abs(e.deltaY);

  if (
    scrollAccumulated >= SCROLL_THRESHOLD &&
    currentIndex < cards.length
  ) {
    cards[currentIndex].classList.add("show");
    currentIndex++;
    scrollAccumulated = 0;
  }
});



/* ===============================
   APP PREVIEW AUTO SCROLL
================================ */

const appSlider = document.getElementById("appPreviewSlider");
const appTrack = document.getElementById("appPreviewTrack");

if (appSlider && appTrack) {

  // 무한 루프용 카드 복제
  appTrack.innerHTML += appTrack.innerHTML;

  let speed = 0.35;       // ⭐ 숫자 줄이면 더 천천히
  let paused = false;

  function autoScrollApp() {
    if (!paused) {
      appSlider.scrollLeft += speed;

      if (appSlider.scrollLeft >= appTrack.scrollWidth / 2) {
        appSlider.scrollLeft = 0;
      }
    }
    requestAnimationFrame(autoScrollApp);
  }

  autoScrollApp();

  // 마우스 올리면 멈춤
  appSlider.addEventListener("mouseenter", () => paused = true);
  appSlider.addEventListener("mouseleave", () => paused = false);
}
