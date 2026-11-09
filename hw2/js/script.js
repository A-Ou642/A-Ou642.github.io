document.querySelector("button").addEventListener("click", gradeQuiz);

function isFormValid() {
  let isValid = true;
  let q1Response = document.querySelector("#q1").value;
  let validationFdbk = document.querySelector("#validationFdbk");

  if (q1Response === "") {
    isValid = false;
    validationFdbk.textContent = "Question 1 was not answered";
  }

  return isValid;
}

function gradeQuiz() {
    document.querySelector("#validationFdbk").textContent = "";

    if (!isFormValid()) {
        return;
    }

    score = 0;

    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;

    // Grade Question 1
    if (q1Response === "sacramento") {
        rightAnswer(1);
    } else {
        wrongAnswer(1);
    }

    // Grade Question 2
    if (q2Response === "mo") {
        rightAnswer(2);
    } else {
        wrongAnswer(2);
    }

    // Grade Question 3
    if (document.querySelector("#Jefferson").checked &&
        document.querySelector("#Roosevelt").checked &&
        !document.querySelector("#Jackson").checked &&
        !document.querySelector("#Franklin").checked) {
        rightAnswer(3);
    } else {
        wrongAnswer(3);
    }

    // Grade Question 4
    let selectedQ4 = document.querySelector("input[name=q4]:checked");

    if (selectedQ4 !== null && selectedQ4.value === "Rhode Island") {
        rightAnswer(4);
    } else {
        wrongAnswer(4);
    }

    // Display total score
    document.querySelector("#totalScore").textContent = `Total Score: ${score}`;
}


let score =0;

function setMarkImage(index, imageName, altText) {
  let markContainer = document.querySelector(`#markImg${index}`);
  markContainer.textContent = "";

  let img = document.createElement("img");
  img.src = `img/${imageName}`;
  img.alt = altText;
  markContainer.appendChild(img);
}

function rightAnswer(index) {
  let feedback = document.querySelector(`#q${index}Feedback`);
  feedback.textContent = "Correct!";
  feedback.className = "bg-success text-white";

  setMarkImage(index, "checkmark-image.jpg", "Checkmark");
  score += 20;
}

function wrongAnswer(index) {
  let feedback = document.querySelector(`#q${index}Feedback`);
  feedback.textContent = "Incorrect!";
  feedback.className = "bg-warning text-white";

  setMarkImage(index, "xmark-image2.jpg", "X mark");
}