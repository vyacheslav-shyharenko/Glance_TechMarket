export const modalCatalog = document.querySelector(".js-modal-catalog");

export function setupModalListeners() {
  const catalogLink = document.querySelector("#catalog-link");
  const modalCatalogButton = document.querySelector(".js-catalog-button");

  catalogLink.addEventListener("click", (event) =>
    openCloseModal(event, modalCatalog)
  );

  if (modalCatalogButton) {
    modalCatalogButton.addEventListener("click", (event) =>
      openCloseModal(event, modalCatalog)
    );
  }
}

export function openCloseModal(event, modalCatalog) {
  event.preventDefault();

  modalCatalog.classList.toggle("menu__is-open");

  const isCatalogOpen = modalCatalog.classList.contains("menu__is-open");

  if (isCatalogOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  modalCatalog.scrollTop = 0;
}

export function closeModal(event, modalCatalog) {
  if (modalCatalog.classList.contains("menu__is-open")) {
    modalCatalog.classList.remove("menu__is-open");
  }
  const isCatalogOpen = modalCatalog.classList.contains("menu__is-open");

  if (isCatalogOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}
