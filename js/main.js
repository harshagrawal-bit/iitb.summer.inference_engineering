/* MLIE 2026 — site interactions */
(function () {
  "use strict";

  /* ---- Mobile navigation ---- */
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") menu.classList.remove("open");
    });
  }

  /* ---- Schedule day tabs ---- */
  var tabs = document.querySelectorAll(".daytab");
  if (tabs.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var day = tab.getAttribute("data-day");
        document.querySelectorAll(".daytab").forEach(function (t) { t.classList.remove("active"); });
        document.querySelectorAll(".daypanel").forEach(function (p) { p.classList.remove("active"); });
        tab.classList.add("active");
        var panel = document.getElementById("day-" + day);
        if (panel) panel.classList.add("active");
      });
    });
  }

  /* ---- Countdown to 21 June 2026, 09:00 IST ---- */
  var cd = document.getElementById("countdown");
  if (cd) {
    var target = new Date("2026-06-21T09:00:00+05:30").getTime();
    var fields = {
      d: cd.querySelector('[data-cd="d"]'),
      h: cd.querySelector('[data-cd="h"]'),
      m: cd.querySelector('[data-cd="m"]'),
      s: cd.querySelector('[data-cd="s"]')
    };
    var tick = function () {
      var diff = target - Date.now();
      if (diff < 0) diff = 0;
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      if (fields.d) fields.d.textContent = d;
      if (fields.h) fields.h.textContent = ("0" + h).slice(-2);
      if (fields.m) fields.m.textContent = ("0" + m).slice(-2);
      if (fields.s) fields.s.textContent = ("0" + s).slice(-2);
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---- Registration / contact form (demo only) ---- */
  document.querySelectorAll("form[data-demo]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = form.querySelector(".form-note");
      if (note) {
        note.style.display = "block";
        note.textContent = "Thank you — this is a demonstration form for the project website. In the live portal your application would be recorded and a confirmation e-mail sent to " + (form.querySelector('[type=email]') ? form.querySelector('[type=email]').value || "your address" : "your address") + ".";
      }
      form.reset();
    });
  });

  /* ---- Footer year ---- */
  var y = document.getElementById("yr");
  if (y) y.textContent = new Date().getFullYear();
})();
