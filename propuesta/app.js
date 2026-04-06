function $(sel, root = document) {
  return root.querySelector(sel);
}

function $all(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

function setActiveNav() {
  const sections = [
    "#resumen",
    "#alcance",
    "#modelo-pos",
    "#fases",
    "#paquetes",
    "#entregables",
    "#requerimientos",
  ]
    .map((id) => $(id))
    .filter(Boolean);

  const links = $all(".nav__link");

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      const id = `#${visible.target.id}`;
      links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === id));
    },
    {
      root: null,
      threshold: [0.12, 0.2, 0.35, 0.5],
      rootMargin: "-10% 0px -70% 0px",
    },
  );

  sections.forEach((s) => observer.observe(s));
}

function bindPrint() {
  const print = () => window.print();
  $("#btnPrint")?.addEventListener("click", print);
  $("#btnPrint2")?.addEventListener("click", print);
}

function setVersion() {
  const tag = $("#versionTag");
  if (!tag) return;

  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  tag.textContent = `v1 (${yyyy}-${mm}-${dd})`;
}

setActiveNav();
bindPrint();
setVersion();
