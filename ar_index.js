/* ======================
   SCENE SWITCH
====================== */
function showScene(id) {
  document.querySelectorAll('[id^="scene-"]').forEach(scene => {
    scene.setAttribute("visible", false);
  });
  document.querySelector(id).setAttribute("visible", true);
}

/* ======================
   QUIZ DATA
====================== */
const questions = [
  { q: "Câu hỏi 1?", a: ["A", "B", "C"] },
  { q: "Câu hỏi 2?", a: ["A", "B", "C"] },
  { q: "Câu hỏi 3?", a: ["A", "B", "C"] },
  { q: "Câu hỏi 4?", a: ["A", "B", "C"] },
  { q: "Câu hỏi 5?", a: ["A", "B", "C"] }
];

let quizIndex = 0;
let quizList = [];
let arReady = false;

/* ======================
   MINDAR LIFECYCLE
====================== */
const target = document.querySelector("[mindar-image-target]");

target.addEventListener("targetFound", () => {
  if (arReady) return;
  arReady = true;

  console.log("✅ Target Found");
  showScene("#scene-welcome");
  bindEvents();
});

/* ======================
   EVENT BINDING
====================== */
function bindEvents() {

  // NODE THAM GIA
  document.querySelector(".btn-join")
    .addEventListener("click", () => {
      document.getElementById("name-ui").style.display = "block";
    });

  // BẮT ĐẦU QUIZ
  document.getElementById("btn-start")
    .addEventListener("click", () => {
      document.getElementById("name-ui").style.display = "none";
      startQuiz();
    });

  // TRANG SẢN PHẨM (LINK NGOÀI)
  document.querySelector(".btn-product")
    .addEventListener("click", () => {
      window.open("https://your-product-site.com", "_blank");
    });

  // BẢNG XẾP HẠNG (CHƯA LÀM)
  document.querySelector(".btn-leaderboard")
    .addEventListener("click", () => {
      alert("Scene bảng xếp hạng – làm sau");
    });

  // NHẬN QUÀ
  document.getElementById("btn-reward")
    .addEventListener("click", () => {
      showScene("#scene-reward");
    });
}

/* ======================
   QUIZ FLOW
====================== */
function startQuiz() {
  quizList = [...questions];
  quizIndex = 0;

  showScene("#scene-quiz");
  loadQuestion();
}

function loadQuestion() {
  const q = quizList[quizIndex];
  document.getElementById("question-text")
    .setAttribute("value", q.q);

  document.querySelectorAll(".answer").forEach((btn, i) => {
    btn.querySelector(".answer-text")
      .setAttribute("value", q.a[i]);

    btn.addEventListener("click", nextQuestion, { once: true });
  });
}

function nextQuestion() {
  quizIndex++;

  if (quizIndex < quizList.length) {
    loadQuestion();
  } else {
    finishQuiz();
  }
}

/* ======================
   SAU QUIZ
====================== */
function finishQuiz() {
  showScene("#scene-product");

  // GIẢ LẬP CHỜ ANIMATION CHẠY XONG
  setTimeout(() => {
    document.getElementById("btn-reward")
      .setAttribute("visible", true);
  }, 3000);
}
