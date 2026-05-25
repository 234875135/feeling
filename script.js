const siteConfig = {
  updatedAt: "May 19, 2026",
  versions: [
    {
      id: "live",
      label: "Current release",
      status: "Ready",
      available: true,
      hash: "version-2b1721d47abf49aa",
      file: "/downloads/version-2b1721d47abf49aa.exe",
      note: "For the live Roblox client."
    },
    {
      id: "incoming",
      label: "Explore other versions",
      status: "Ready",
      available: true,
      hash: "version-4b6315bf1f0a4dbb",
      file: "/downloads/version-4b6315bf1f0a4dbb.exe",
      note: "For the next Roblox client."
    },
    {
      id: "legacy",
      label: "Older version",
      status: "Ready",
      available: true,
      hash: "version-9377ee10133e4be3",
      file: "/downloads/version-9377ee10133e4be3.exe",
      note: "Previous Roblox client."
    },
  ],
  features: [
    {
      title: "Aim Modules",
      items: [
        "Aimbot with hold and toggle binds",
        "Silent aim with fast target updates",
        "Hit chance, sticky aim, knocked checks, and team filters",
        "Closest to crosshair or closest by distance",
        "Custom prediction and auto prediction",
        "Triggerbot with delay, radius, and visible checks",
        "FOV circles with fill, spin, and color controls"
      ]
    },
    {
      title: "Visual Overlays",
      items: [
        "Full box and corner box ESP",
        "Health, names, tools, rig type, and distance",
        "Skeletons for R6 and R15",
        "Chams with fill, outline, and fade",
        "Foot trails with the current glow style",
        "Animated Chinese hats",
        "Aim lines and on-screen aim warnings"
      ]
    },
    {
      title: "HUD and Interface",
      items: [
        "Watermark with the Autopsy Beta mark",
        "Hotkeys panel with selectable rows",
        "Radar with circle, square, and zoom settings",
        "Welcome animation on startup",
        "Compact UI with an icon-only tab rail",
        "Change the menu key from Insert",
        "Accent and widget color controls"
      ]
    },
    {
      title: "Game Modules",
      items: [
        "Blade Ball tab that unlocks in Blade Ball",
        "Ball ESP and parry range",
        "Target-only auto parry",
        "Timing, distance, cooldown, and prediction checks",
        "RIVALS mouse handling",
        "Roblox open check on startup",
        "Auto close and restart handling"
      ]
    },
    {
      title: "Exploits and Utility",
      items: [
        "Walkspeed",
        "Hitbox expander",
        "Fly hotkey support",
        "Config export copied to clipboard",
        "Styled config import popup",
        "Hotkey list controls",
        "Menu key binding",
        "Startup Roblox check"
      ]
    },
    {
      title: "Performance Work",
      items: [
        "Faster ESP frame setup",
        "Cached visibility checks",
        "Less repeated player part reading",
        "Shared bone data across visuals",
        "Lighter hat rendering",
        "Cleaner FOV drawing",
        "Smooth page motion"
      ]
    }
  ]
};

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function versionCard(version) {
  const ready = version.available === true;
  const actionText = ready ? "Download" : "Soon";
  const isGreen = document.body.getAttribute("data-theme") === "green";
  const fileUrl = (isGreen && version.id === "live") ? "/downloads/gs-version-2b1721d47abf49aa.exe" : version.file;

  return `
    <article class="version-card ${ready ? "is-live" : "is-pending"}">
      <div class="version-head">
        <span>${version.label}</span>
        <strong>${version.status}</strong>
      </div>
      <code>${version.hash}</code>
      <p>${version.note}</p>
      <a class="button ${ready ? "primary" : "disabled"}" href="${fileUrl}" ${ready ? "download" : "aria-disabled=\"true\""}>${actionText}</a>
    </article>
  `;
}

function featureCard(group, index) {
  const items = group.items.map((item) => `<li>${item}</li>`).join("");
  return `
    <article class="feature-card reveal">
      <span class="card-index">${String(index + 1).padStart(2, "0")}</span>
      <h3>${group.title}</h3>
      <ul>${items}</ul>
    </article>
  `;
}

function applyConfig() {
  const live = siteConfig.versions.find((version) => version.id === "live");
  const incoming = siteConfig.versions.find((version) => version.id === "incoming");

  setText("liveHash", live.hash);
  setText("incomingHash", incoming.hash);
  setText("updatedAt", siteConfig.updatedAt);

  const isGreen = document.body.getAttribute("data-theme") === "green";

  document.querySelectorAll("[data-download='live']").forEach((link) => {
    link.href = isGreen ? "/downloads/gs-version-2b1721d47abf49aa.exe" : live.file;
  });

  document.querySelectorAll("[data-download='incoming']").forEach((link) => {
    link.href = incoming.file;
  });

  const versionGrid = document.getElementById("versionGrid");
  if (versionGrid) {
    const versions = isGreen 
      ? siteConfig.versions.filter((version) => version.id === "live")
      : siteConfig.versions;
    versionGrid.innerHTML = versions.map(versionCard).join("");
  }

  const featureMatrix = document.getElementById("featureMatrix");
  if (featureMatrix) {
    featureMatrix.innerHTML = siteConfig.features.map(featureCard).join("");
  }
}

function addRevealMotion() {
  const items = document.querySelectorAll(".reveal, .version-card");

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -32px" });

  items.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 28, 180)}ms`;
    observer.observe(item);
  });
}

applyConfig();
addRevealMotion();

function handleScroll() {
  const header = document.querySelector(".site-header");
  const scrollCue = document.querySelector(".scroll-cue");
  const scrollY = window.scrollY;

  if (header) {
    if (scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  if (scrollCue) {
    if (scrollY > 60) {
      scrollCue.classList.add("hidden");
    } else {
      scrollCue.classList.remove("hidden");
    }
  }
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

/* ── Protection: disable right-click ── */
document.addEventListener("contextmenu", (e) => e.preventDefault());

/* ── Protection: disable text selection via JS fallback ── */
document.addEventListener("selectstart", (e) => e.preventDefault());

/* ── Protection: disable drag ── */
document.addEventListener("dragstart", (e) => e.preventDefault());

/* ── Protection: block devtools shortcuts ── */
document.addEventListener("keydown", (e) => {
  // F12
  if (e.key === "F12") { e.preventDefault(); return; }
  // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C
  if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c")) { e.preventDefault(); return; }
  // Ctrl+U (view source)
  if (e.ctrlKey && (e.key === "U" || e.key === "u")) { e.preventDefault(); return; }
  // Ctrl+S (save page)
  if (e.ctrlKey && (e.key === "S" || e.key === "s")) { e.preventDefault(); return; }
});
