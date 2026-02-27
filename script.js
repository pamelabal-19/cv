const bootScreen = document.getElementById("boot-screen");
const bootLine = document.getElementById("boot-line");
const bootMessages = [
  "Initializing portfolio modules...",
  "Loading retro UI assets...",
  "Starting interaction engine...",
];

if (bootScreen && bootLine) {
  bootMessages.forEach((msg, idx) => {
    setTimeout(() => {
      bootLine.textContent = msg;
    }, idx * 650);
  });
  setTimeout(() => {
    bootScreen.classList.add("done");
  }, 2150);
}

const nameTarget = document.getElementById("name-typewriter");
const fullName = nameTarget?.dataset.full || "";
let nameChar = 0;
const nameStartDelayMs = 950;

function tickNameTypewriter() {
  if (!nameTarget) return;
  nameChar += 1;
  nameTarget.textContent = fullName.slice(0, nameChar);
  if (nameChar < fullName.length) {
    setTimeout(tickNameTypewriter, 90);
  }
}

setTimeout(tickNameTypewriter, nameStartDelayMs);

const lines = [
  "researching user needs...",
  "designing better experiences...",
  "building product impact...",
  "working globally.",
];

const typeTarget = document.getElementById("typewriter");
let lineIdx = 0;
let charIdx = 0;
let deleting = false;

function tickTaglineTypewriter() {
  if (!typeTarget) return;
  const line = lines[lineIdx];

  if (!deleting) {
    charIdx += 1;
    typeTarget.textContent = line.slice(0, charIdx);

    if (charIdx === line.length) {
      deleting = true;
      setTimeout(tickTaglineTypewriter, 1000);
      return;
    }
  } else {
    charIdx -= 1;
    typeTarget.textContent = line.slice(0, Math.max(0, charIdx));

    if (charIdx === 0) {
      deleting = false;
      lineIdx = (lineIdx + 1) % lines.length;
    }
  }

  const speed = deleting ? 45 : 75;
  setTimeout(tickTaglineTypewriter, speed);
}

tickTaglineTypewriter();

const trail = document.querySelector(".cursor-trail");
const sparkleLayer = document.getElementById("sparkle-layer");
window.addEventListener("pointermove", (e) => {
  if (!trail) return;
  trail.style.setProperty("--mx", `${e.clientX}px`);
  trail.style.setProperty("--my", `${e.clientY}px`);
});

let sparkleTick = 0;
window.addEventListener("pointermove", (e) => {
  if (!sparkleLayer) return;
  sparkleTick += 1;
  if (sparkleTick % 2 !== 0) return;

  const sparkle = document.createElement("span");
  sparkle.className = "sparkle";
  sparkle.textContent = Math.random() > 0.4 ? "✦" : "✧";
  sparkle.style.left = `${e.clientX + (Math.random() * 14 - 7)}px`;
  sparkle.style.top = `${e.clientY + (Math.random() * 14 - 7)}px`;
  sparkle.style.color = Math.random() > 0.5 ? "#ff5fd2" : "#8aff48";
  sparkleLayer.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 700);
});

let audioCtx;
let soundEnabled = false;

function unlockSound() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  soundEnabled = true;
  window.removeEventListener("pointerdown", unlockSound);
  window.removeEventListener("keydown", unlockSound);
}

window.addEventListener("pointerdown", unlockSound);
window.addEventListener("keydown", unlockSound);

function playHoverTick() {
  if (!soundEnabled || !audioCtx) return;
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(720, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.018, now + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + 0.045);
}

document.querySelectorAll(".btn-gloss, .task-btn").forEach((el) => {
  el.addEventListener("mouseenter", playHoverTick);
});
