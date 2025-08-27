/* OPEN BOX FAQ */

document.querySelectorAll(".card-faq").forEach((cardFaq) => {
  cardFaq.addEventListener("click", (e) => {
    const cardFaqAnswer = e.currentTarget.querySelector(".text-answer-faq");
    const cardFaqAnswerD = window.getComputedStyle(cardFaqAnswer).display;
    const cardFaqQuestion = e.currentTarget.querySelector(".text-question-faq");

    if (cardFaqAnswerD === "none") {
      cardFaqAnswer.style.display = "block";
    } else if (cardFaqAnswerD === "block") {
      cardFaqAnswer.style.display = "none";
    }
  });
});

console.log("cards JS");
