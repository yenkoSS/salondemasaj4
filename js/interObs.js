const xOffsets = document.querySelectorAll(".offsetX");
const yOffsets = document.querySelectorAll(".offsetY");

const offsetXObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("offset-x0", entry.isIntersecting);
      if (entry.isIntersecting) offsetXObserver.unobserve(entry.target);
    });
  },
  {
    root: null, // default is the viewport
    rootMargin: "0px 0px 0px 0px", // top, right, bottom, left
  }
);

const offsetYObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("offset-y0", entry.isIntersecting);
      if (entry.isIntersecting) offsetYObserver.unobserve(entry.target);
    });
  },
  {
    root: null, // default is the viewport
    rootMargin: "0px 0px 0px 0px", // top, right, bottom, left
  }
);

xOffsets.forEach((xOffset) => offsetXObserver.observe(xOffset));
yOffsets.forEach((yOffset) => offsetYObserver.observe(yOffset));

console.log("intersection OBS JS");
