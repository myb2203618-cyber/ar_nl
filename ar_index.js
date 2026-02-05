const questions = [
  { q:"Câu hỏi 1?", a:["A","B","C"] },
  { q:"Câu hỏi 2?", a:["A","B","C"] },
  { q:"Câu hỏi 3?", a:["A","B","C"] },
  { q:"Câu hỏi 4?", a:["A","B","C"] },
  { q:"Câu hỏi 5?", a:["A","B","C"] }
];

let index = 0;
let list = [];
let startTime = 0;

function showScene(id){
  document.querySelectorAll('[id^="scene-"]').forEach(s=>{
    s.setAttribute("visible",false);
  });
  document.querySelector(id).setAttribute("visible",true);
}

AFRAME.scenes[0].addEventListener("loaded", ()=>{

  document.querySelector(".btn-join").addEventListener("click",()=>{
    document.getElementById("name-ui").style.display="block";
  });

  document.querySelector(".btn-product").addEventListener("click",()=>{
    window.open("https://your-product-site.com","_blank");
  });

  document.querySelector(".btn-leaderboard").addEventListener("click",()=>{
    alert("Bảng xếp hạng – bạn gắn Firebase sau");
  });

  document.getElementById("btn-start").addEventListener("click", startQuiz);

  document.getElementById("btn-reward").addEventListener("click",()=>{
    showScene("#scene-reward");
  });
});

function startQuiz(){
  document.getElementById("name-ui").style.display="none";
  list = [...questions].sort(()=>Math.random()-0.5);
  index = 0;
  startTime = Date.now();
  showScene("#scene-quiz");
  loadQuestion();
}

function loadQuestion(){
  const q = list[index];
  document.getElementById("question-text").setAttribute("value", q.q);

  document.querySelectorAll(".answer").forEach((btn,i)=>{
    btn.querySelector(".answer-text").setAttribute("value", q.a[i]);
    btn.addEventListener("click", nextQuestion, { once:true });
  });
}

function nextQuestion(){
  index++;
  index < 5 ? loadQuestion() : finishQuiz();
}

function finishQuiz(){
  console.log("Thời gian:", (Date.now()-startTime)/1000);
  showScene("#scene-product");
  setTimeout(()=>{
    document.getElementById("btn-reward").setAttribute("visible",true);
  },2000);
}
