const questions = [
  {
    text: "Сыртқы жады құрылғысының қызметі",
    options: {
      a: "Ақпаратты ұзақ сақтау",
      b: "Енгізу, шығару программаларының жиынтығы",
      c: "Ақпаратты тұрақты уақыт сақтау",
      d: "Қатынау жиілігін азайту",
    },
    correct: "a",
  },
  {
    text: "Компьютер жадындағы кескінді мониторға бейнесигнал түрінде жіберетін құрылғы",
    options: {
      a: "Аналық тақша",
      b: "Жедел жад",
      c: "Процессор",
      d: "Бейнеадаптер",
    },
    correct: "d",
  },
  {
    text: "Абылай мектепте Google кестесін пайдаланып, оқушыларға қолжетімділік ашты. Қолданылған бұлттық технология түрі",
    options: {
      a: "Аралас",
      b: "Қоғамдық",
      c: "Ортақ",
      d: "Файлдық",
    },
    correct: "c",
  },
  {
    text: "Кітаптың 289 беті компьютерде терілген. Әр бетте 89 жол, әр жолда 78 символ бар. Кітаптағы ақпарат көлемі",
    options: {
      a: "1957,86 Кбайт",
      b: "1959,21 Кбайт",
      c: "1945,65 Кбайт",
      d: "1377,89 Кбайт",
    },
    correct: "b",
  },
];

document.head.insertAdjacentHTML(
  "beforeend",
  `
  <style>
    #questions {
      max-height: 80vh;
      overflow-y: auto;
      padding-right: 10px;
    }
    
    .question-container {
      margin-bottom: 20px;
    }
    
    body, html {
      height: 100%;
      overflow: auto !important;
    }
    
    /* Ensure the results are visible and scrollable */
    #result {
      margin-top: 20px;
      padding: 15px;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
    }
    
    /* Make sure options are clearly visible */
    .option {
      display: block;
      margin: 8px 0;
      padding: 8px;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .option.correct {
      background-color: rgba(0, 255, 0, 0.2);
    }
    
    .option.incorrect {
      background-color: rgba(255, 0, 0, 0.2);
    }
  </style>
`
);

let current = 0;
const userAnswers = [];
const container = document.getElementById("questions");
const resultDiv = document.getElementById("result");

function renderQuestions() {
  container.innerHTML = "";
  questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.classList.add("question-container");
    if (index === current) div.classList.add("active");
    div.id = `q${index}`;

    const title = document.createElement("div");
    title.className = "question";
    title.textContent = q.text;
    div.appendChild(title);

    Object.entries(q.options).forEach(([key, val]) => {
      const label = document.createElement("label");
      label.className = "option";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question${index}`;
      input.value = key;
      input.onchange = () => {
        userAnswers[index] = key;
        document.getElementById("nextBtn").disabled = false;
      };
      label.appendChild(input);
      label.append(" " + val);
      div.appendChild(label);
    });

    container.appendChild(div);
  });
}

function nextQuestion() {
  if (current < questions.length - 1) {
    document.getElementById(`q${current}`).classList.remove("active");
    current++;
    document.getElementById(`q${current}`).classList.add("active");
    document.getElementById("prevBtn").disabled = false;
    document.getElementById("nextBtn").disabled = !userAnswers[current];
  } else {
    showResult();
  }
}

function prevQuestion() {
  if (current > 0) {
    document.getElementById(`q${current}`).classList.remove("active");
    current--;
    document.getElementById(`q${current}`).classList.add("active");
    document.getElementById("nextBtn").disabled = !userAnswers[current];
  }
  if (current === 0) {
    document.getElementById("prevBtn").disabled = true;
  }
}

function showResult() {
  
  container.style.maxHeight = "80vh";
  container.style.overflowY = "auto";

  document.querySelectorAll(".question-container").forEach((q) => {
    q.classList.add("active");
  });

  document.querySelectorAll("input[type=radio]").forEach((input) => {
    input.disabled = true;
  });

  questions.forEach((q, index) => {
    const chosen = userAnswers[index];
    const correct = q.correct;
    const div = document.getElementById(`q${index}`);
    const options = div.querySelectorAll(".option");

    options.forEach((opt) => {
      const val = opt.querySelector("input").value;
      if (val === correct) opt.classList.add("correct");
      if (val === chosen && val !== correct) opt.classList.add("incorrect");
    });
  });
  
  document.querySelector(".buttons").style.display = "none";

  const correctCount = userAnswers.filter((ans, i) => ans === questions[i].correct).length;
  resultDiv.innerHTML = `<h3>Тест завершён!</h3><p>Правильных ответов: ${correctCount} из ${questions.length}</p>`;
  resultDiv.style.display = "block";

  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
  }, 100);
}

renderQuestions();
document.getElementById("prevBtn").disabled = true;
document.getElementById("nextBtn").disabled = true;
