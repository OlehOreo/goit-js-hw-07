import { galleryItems } from "./gallery-items.js";
// Change code below this line

const container = document.querySelector(".gallery");

function createMarkup(arr) {
  return arr
    .map(
      ({ preview, description, original }) => `
<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
    )
    .join("");
}

container.insertAdjacentHTML("beforeend", createMarkup(galleryItems));
container.addEventListener("click", handlerGalleryClick);

function handlerGalleryClick(evt) {
  evt.preventDefault();

  if (evt.target === evt.currentTarget) {
    return;
  }

  const instance = basicLightbox.create(`<img src="${evt.target.dataset.source}"/>`, {
    onShow: (instance) => {
      document.addEventListener("keydown", (event) => onKeyDown(event, instance));
    },
    onClose: (instance) => {
      document.removeEventListener("keydown", (event) => onKeyDown(event, instance));
    },
  });
  instance.show();
}

function onKeyDown(event, instance) {
  if (event.code === "Escape") {
    instance.close();
  }
}
