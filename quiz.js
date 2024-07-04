const facts = [
  {
    statement: "Before it's name change, Constantinople was called Byzantium.",
    answer: "true",
    explanation:
      "The city of Byzantium was renamed Constantinople by Constantine the Great in 330AD, and re-inaugurated as the new Roman capital.",
  },
  {
    statement: "Constantinople lacked defensive city walls.",
    answer: "false",
    explanation:
      "Constantinople was surrounded by the formidable Theodosian Walls, completed in 413 AD.",
  },
  {
    statement:
      "Byzantine princess Honoria asked Attila the Hun to rescue her from an arranged marriage.",
    answer: "true",
    explanation:
      "In 450 AD, Honoria sent a message to Attila asking him to rescue her from a loveless arranged marriage. Along with her message, Honoria sent a ring, which Attila interpreted as a proposal of marriage.",
  },
  {
    statement: "The emperor Charlemagne was crowned in Constantinople.",
    answer: "false",
    explanation: "In 800 AD Charlemagne was crowned in Rome.",
  },
  {
    statement: "The Alexiad was written by emperor Alexios Komnenos.",
    answer: "false",
    explanation:
      "The Alexiad, the most important primary source of Byzantine history of the late 11th-early 12th centuries, was written by Byzantine princess Anna Comnena in 1148 AD.",
  },
];

function hide(element) {
  element.classList.add("hidden");
}

function show(element) {
  element.classList.remove("hidden");
}

function disable(button) {
  button.setAttribute("disabled", "");
}

function enable(button) {
  button.removeAttribute("disabled");
}

let correct = 0;
let completed = 0;

let fact;

const explanation = document.getElementById("explanation");
const nextButton = document.getElementById("next-question");
const optionButtons = document.getElementById("options").children;

function getNextFact() {
  fact = facts.shift(); //get the first fact in the array (which shortens the array)

  //set the question text to the current fact's statement
  document.getElementById("statement").textContent = fact.statement;

//hide previous explanation 
  hide(explanation);

  for (let option of optionButtons) {
    //clear previous classes
    option.classList.remove("correct");
    option.classList.remove("incorrect");
    
//make sure buttons are enabled
    enable(option);
  }

  //disable 'next question' button
  disable(nextButton);
}

nextButton.addEventListener("click", getNextFact);

for (let option of optionButtons) {
  option.addEventListener("click", (e) => {
    //when this option is clicked...

    //disable all the option buttons
    for (let button of optionButtons) {
      disable(button);
    }

    //to enable the 'next question' button if there are still facts left
    if (facts.length > 0) {
      enable(nextButton);
    } else {
      nextButton.textContent = "End of quiz";
    }

    const guess = e.target.value;
    if (guess === fact.answer) {
      //right answer
      e.target.classList.add("correct");
      correct += 1;
    } else {
      //wrong answer
      e.target.classList.add("incorrect");
    }

    //to show the explanation

    explanation.textContent = fact.explanation;
    show(explanation);

    //to update the score
    completed += 1;
    document.getElementById("correct").textContent = correct;
    document.getElementById("completed").textContent = completed;
  });
}

getNextFact();
