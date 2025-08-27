/* LOGO HEADER */

document.querySelectorAll(".logo-navbar").forEach((logoNavbar) => {
  logoNavbar.addEventListener("click", (e) => {
    e.preventDefault();
    const id = document.querySelector(".logo-navbar").getAttribute("href");
    setTimeout(() => {
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }, 200);
  });
});

/* NAV HEADER LINK LG */

document.querySelectorAll(".nav-header-link-lg").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const id = link.getAttribute("href");
    setTimeout(() => {
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }, 200);
  });
});

document.querySelectorAll(".nav-external").forEach((link) => {
  link.addEventListener("click", () => {
    const id = link.getAttribute("href");
    window.location.href = id;
    setTimeout(() => history.replaceState(null, null, "index.html"), 100);
  });
});

/* NAV SM */

document.querySelectorAll(".nav-header-link-sm").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const id = link.getAttribute("href");
    document.querySelector(".nav-header-list-sm").style.display = "none";

    setTimeout(() => {
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }, 200);
  });
  document.querySelector("body").classList.remove("no-scroll");
});

document.querySelectorAll(".icon-menu").forEach((iconMenu) => {
  iconMenu.addEventListener("click", () => {
    document.querySelector(".nav-header-list-sm").style.display = "flex";
  });
});

document.querySelectorAll(".icon-close").forEach((iconClose) => {
  iconClose.addEventListener("click", () => {
    document.querySelector(".nav-header-list-sm").style.display = "none";
  });
});

/* NAV FIXED */

if (document.querySelector(".nav-fixed")) {
  window.addEventListener("scroll", () => {
    if (scrollY > 300) {
      document.querySelector(".nav-fixed").style.display = "flex";
    }
    if (scrollY < 300) {
      document.querySelector(".nav-fixed").style.display = "none";
    }
  });
}

if (document.querySelector(".nav-fixed-services")) {
  window.addEventListener("scroll", () => {
    if (scrollY > 300) {
      document.querySelector(".nav-fixed-services").style.display = "flex";
    }
    if (scrollY < 300) {
      document.querySelector(".nav-fixed-services").style.display = "none";
    }
  });
}

/* NAV INTERNAL */

document.querySelectorAll(".btn-navbar").forEach((btnNavbar) => {
  btnNavbar.addEventListener("click", (e) => {
    e.preventDefault();
    setTimeout(() => {
      document.querySelector("#section-contact").scrollIntoView({ behavior: "smooth" });
    }, 200);
  });
});

document.querySelector(".btn-hero").addEventListener("click", (e) => {
  e.preventDefault();
  const id = document.querySelector(".btn-hero").getAttribute("href");
  setTimeout(() => {
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }, 200);
});

document.querySelector(".btn-hero-second").addEventListener("click", (e) => {
  e.preventDefault();
  const id = document.querySelector(".btn-hero-second").getAttribute("href");
  setTimeout(() => {
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }, 200);
});

document.querySelectorAll(".btn-schedule").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const id = btn.getAttribute("href");
    setTimeout(() => {
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }, 200);
  });
});

document.querySelector(".icon-up").addEventListener("click", (e) => {
  const sectionServices = document.querySelector("#home");
  setTimeout(() => {
    sectionServices.scrollIntoView({ behavior: "smooth" });
  }, 200);
});

/* LOGO FOOTER */

document.querySelector(".logo-footer").addEventListener("click", (e) => {
  e.preventDefault();
  const home = document.querySelector("#home");
  setTimeout(() => {
    home.scrollIntoView({ behavior: "smooth" });
  }, 200);
});

/* NAV FOOTER LINK */

document.querySelectorAll(".nav-footer-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const id = link.getAttribute("href");
    setTimeout(() => {
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }, 200);
  });
});

console.log("navi JS");
