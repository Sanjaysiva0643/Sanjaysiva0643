
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

const canvas = document.getElementById("particles");

if (canvas) {
  const ctx = canvas.getContext("2d");
  let particles = [];
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = Array.from({length: 65}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.7 + 0.15
    }));
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,245,255,0.6)";

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      if (!reducedMotion) {
        p.y -= p.speed;
        if (p.y < 0) p.y = canvas.height;
      }
    });

    if (!reducedMotion) requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resize);
  resize();
  animate();
}
