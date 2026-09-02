// Week 2 - Interactive Image Gallery
// DOM manipulation + event handling + lightbox navigation

const cards = document.querySelectorAll(".gallery-card");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const counter = document.getElementById("counter");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;

const images = Array.from(cards).map(card => ({
  src: card.querySelector("img").src,
  alt: card.querySelector("img").alt,
  title: card.querySelector("h2").textContent
}));

function showImage(index) {
  currentIndex = (index + images.length) % images.length;
  const image = images[currentIndex];

  lightboxImg.src = image.src;
  lightboxImg.alt = image.alt;
  lightboxCaption.textContent = image.title;
  counter.textContent = `${currentIndex + 1} / ${images.length}`;
}

function openLightbox(index) {
  showImage(index);
  lightbox.classList.add("show");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

cards.forEach((card, index) => {
  card.addEventListener("click", () => openLightbox(index));
});

prevBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  showImage(currentIndex - 1);
});

nextBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  showImage(currentIndex + 1);
});

closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("show")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showImage(currentIndex - 1);
  if (event.key === "ArrowRight") showImage(currentIndex + 1);
});
