(function () {
  const gallery = document.querySelector("[data-gallery]");
  if (!gallery) return;

  const frames = Array.from(gallery.querySelectorAll("img"));
  const buttons = Array.from(document.querySelectorAll("[data-shot]"));
  const placeholder = gallery.querySelector(".placeholder");

  function show(index) {
    let visible = 0;
    frames.forEach((img, i) => {
      const missing = img.classList.contains("is-missing");
      img.classList.toggle("is-hidden", missing || i !== index);
      if (!missing && i === index) visible += 1;
    });
    buttons.forEach((btn, i) => btn.classList.toggle("active", i === index));
    gallery.classList.toggle("is-empty", visible === 0);
    if (placeholder) {
      placeholder.hidden = visible !== 0;
    }
  }

  frames.forEach((img) => {
    img.addEventListener("error", () => {
      img.classList.add("is-missing");
      const current = buttons.findIndex((btn) => btn.classList.contains("active"));
      show(current === -1 ? 0 : current);
    });
  });

  buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => show(index));
  });

  show(0);
})();
