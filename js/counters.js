let upToClients = 330;
let upToYears = 5;

function updateClientsValue() {
  let count = document.querySelector(".text-counter-clients");
  const increased = ++upToClients;
  count.innerHTML = increased.toLocaleString() + " + <span class='fs-20 fw-700 d-block mtop-20'>clienți fericiți</span>";
  if (upToClients === 400) {
    clearInterval(countClients);
  }
}

function updateYearsValue() {
  let count = document.querySelector(".text-counter-years");
  const increased = ++upToYears;
  count.innerHTML = increased.toLocaleString() + " + <span class='fs-20 fw-700 d-block mtop-20'>ani de experiență</span>";
  if (upToYears === 10) {
    clearInterval(countYears);
  }
}

let countYears;
let countClients;

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("text-counter-clients") && !countClients) {
          countClients = setInterval(updateClientsValue, 30);
        }
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const observerYears = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("text-counter-years") && !countYears) {
          countYears = setInterval(updateYearsValue, 500);
        }
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".text-counter-clients").forEach((el) => observer.observe(el));
document.querySelectorAll(".text-counter-years").forEach((el) => observerYears.observe(el));
