// /* ================= FIREBASE ================= */
// /* 👉 DÁN CONFIG FIREBASE CỦA BẠN VÀO ĐÂY */
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
// import {
//   getFirestore, collection, addDoc,
//   query, orderBy, limit, getDocs
// } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_PROJECT.firebaseapp.com",
//   projectId: "YOUR_PROJECT_ID"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// /* ================= QUIZ DATA ================= */
// /* 👉 BẠN SỬA NỘI DUNG CÂU HỎI Ở ĐÂY */
// const questions = [
//   { q: "Câu hỏi 1?", a: ["A", "B", "C"], correct: 0 },
//   { q: "Câu hỏi 2?", a: ["A", "B", "C"], correct: 1 },
//   { q: "Câu hỏi 3?", a: ["A", "B", "C"], correct: 2 },
//   { q: "Câu hỏi 4?", a: ["A", "B", "C"], correct: 0 },
//   { q: "Câu hỏi 5?", a: ["A", "B", "C"], correct: 1 }
// ];

// /* ================= STATE ================= */
// let playerName = "";
// let quizIndex = 0;
// let quizList = [];
// let startTime = 0;

// /* ================= SCENE CONTROL ================= */
// function showScene(id) {
//   document.querySelectorAll('[id^="scene-"]').forEach(s =>
//     s.setAttribute("visible", false)
//   );
//   document.querySelector(id).setAttribute("visible", true);
// }

// /* ================= MENU ================= */
// document.querySelector(".btn-join").onclick = () => {
//   document.getElementById("name-ui").style.display = "block";
// };

// document.querySelector(".btn-product").onclick = () => {
//   /* 👉 LINK TRANG SẢN PHẨM */
//   window.open("https://your-product-site.com", "_blank");
// };

// document.querySelector(".btn-leaderboard").onclick = () => {
//   showScene("#scene-leaderboard");
//   loadLeaderboard();
// };

// /* ================= START QUIZ ================= */
// document.getElementById("btn-start").onclick = () => {
//   playerName = document.getElementById("player-name").value;
//   document.getElementById("name-ui").style.display = "none";

//   quizList = [...questions].sort(() => 0.5 - Math.random());
//   quizIndex = 0;
//   startTime = Date.now();

//   showScene("#scene-quiz");
//   loadQuestion();
// };

// /* ================= QUIZ LOGIC ================= */
// function loadQuestion() {
//   const q = quizList[quizIndex];
//   document.getElementById("question-text")
//     .setAttribute("value", q.q);

//   document.querySelectorAll(".answer").forEach((btn, i) => {
//     btn.innerHTML =
//       `<a-text value="${q.a[i]}" align="center"></a-text>`;
//     btn.onclick = () => selectAnswer(i);
//   });
// }

// function selectAnswer(i) {
//   quizIndex++;
//   if (quizIndex < 5) loadQuestion();
//   else finishQuiz();
// }

// /* ================= FINISH QUIZ ================= */
// async function finishQuiz() {
//   const time = (Date.now() - startTime) / 1000;

//   /* 👉 LƯU TÊN + THỜI GIAN VÀO FIREBASE */
//   await addDoc(collection(db, "leaderboard"), {
//     name: playerName,
//     time: time
//   });

//   showScene("#scene-product");

//   /* 👉 ĐỢI ANIMATION XONG RỒI HIỆN NÚT NHẬN QUÀ */
//   setTimeout(() => {
//     document.getElementById("btn-reward")
//       .setAttribute("visible", true);
//   }, 3000);
// }

// /* ================= REWARD ================= */
// document.getElementById("btn-reward").onclick = () => {
//   showScene("#scene-reward");
// };

// /* ================= LEADERBOARD ================= */
// async function loadLeaderboard() {
//   const q = query(
//     collection(db, "leaderboard"),
//     orderBy("time"),
//     limit(10)
//   );

//   const snap = await getDocs(q);
//   const list = document.getElementById("leaderboard-list");
//   list.innerHTML = "";

//   let y = 0.3;
//   let rank = 1;

//   snap.forEach(d => {
//     const t = document.createElement("a-text");
//     t.setAttribute(
//       "value",
//       `${rank}. ${d.data().name} - ${d.data().time.toFixed(2)}s`
//     );
//     t.setAttribute("align", "center");
//     t.setAttribute("position", `0 ${y} 0`);
//     list.appendChild(t);
//     y -= 0.15;
//     rank++;
//   });
// }
// ================== ĐỢI DOM LOAD ==================
window.addEventListener("DOMContentLoaded", () => {

  // ===== SCENE =====
  const sceneWelcome = document.querySelector("#scene-welcome");
  const sceneQuiz = document.querySelector("#scene-quiz");
  const sceneProduct = document.querySelector("#scene-product");
  const sceneReward = document.querySelector("#scene-reward");
  const sceneLeaderboard = document.querySelector("#scene-leaderboard");

  // ===== UI HTML =====
  const nameUI = document.querySelector("#name-ui");
  const btnStart = document.querySelector("#btn-start");
  const inputName = document.querySelector("#player-name");

  // ===== BUTTON 3D =====
  const btnJoin = document.querySelector(".btn-join");
  const btnLeaderboard = document.querySelector(".btn-leaderboard");
  const btnReward = document.querySelector("#btn-reward");

  // ===== QUIZ =====
  const questionText = document.querySelector("#question-text");
  const answers = document.querySelectorAll(".answer");

  let playerName = "";
  let currentQuestion = 0;
  const sceneEl = document.querySelector('a-scene');
  const mindarSystem = sceneEl.systems['mindar-image-system'];
  const targetEl = document.querySelector('[mindar-image-target]');

  targetEl.addEventListener('targetFound', () => {
  console.log('🎯 Đã nhận diện xong – dừng quét');
  mindarSystem.stop(); // ❗ QUAN TRỌNG
});


  const quizData = [
    {
      question: "Sản phẩm này thuộc nhóm nào?",
      answers: ["Nước hoa", "Mỹ phẩm", "Thực phẩm"],
      correct: 0
    }
  ];

  // ================== HÀM CHUYỂN SCENE ==================
  function showScene(scene) {
    [sceneWelcome, sceneQuiz, sceneProduct, sceneReward, sceneLeaderboard]
      .forEach(s => s.setAttribute("visible", "false"));
    scene.setAttribute("visible", "true");
  }

  // ================== BẮT ĐẦU AR KHI QUÉT ==================
  const target = document.querySelector("[mindar-image-target]");
  target.addEventListener("targetFound", () => {
    console.log("🎯 Target found");
    showScene(sceneWelcome);
  });

  // ================== SCENE WELCOME ==================
  btnJoin.addEventListener("click", () => {
    nameUI.style.display = "block";
  });

  btnLeaderboard.addEventListener("click", () => {
    showScene(sceneLeaderboard);
  });

  // ================== NHẬP TÊN ==================
  btnStart.addEventListener("click", () => {
    if (!inputName.value.trim()) return alert("Nhập tên đi bà 😤");
    playerName = inputName.value;
    nameUI.style.display = "none";
    loadQuestion();
    showScene(sceneQuiz);
  });

  // ================== QUIZ ==================
  function loadQuestion() {
    const q = quizData[currentQuestion];
    questionText.setAttribute("value", q.question);

    answers.forEach((btn, i) => {
      btn.setAttribute("color", "#fff");

      let text = btn.querySelector("a-text");
      if (!text) {
        text = document.createElement("a-text");
        text.setAttribute("align", "center");
        text.setAttribute("position", "0 0 0.01");
        btn.appendChild(text);
      }
      text.setAttribute("value", q.answers[i]);
    });
  }

  answers.forEach(btn => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.dataset.index);
      const correct = quizData[currentQuestion].correct;

      if (index === correct) {
        showScene(sceneProduct);
        setTimeout(() => {
          btnReward.setAttribute("visible", "true");
        }, 1500);
      } else {
        btn.setAttribute("color", "#f00");
      }
    });
  });

  // ================== NHẬN QUÀ ==================
  btnReward.addEventListener("click", () => {
    showScene(sceneReward);
  });

});
