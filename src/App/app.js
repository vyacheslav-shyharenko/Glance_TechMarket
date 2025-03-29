// const menuLinksEl = document.querySelector(".js-menu-list");
// const modalCatalog = document.querySelector(".js-modal-catalog");
// const modalCatalogButtonEl = document.querySelector(".js-catalog-button");
const sharesListEl = document.querySelector("#js-shares-list");
const catalogListEl = document.querySelector("#js-catalog-list");
const mobileModalCatalog = document.querySelector(".js-modal__catalog-list");
// modalCatalogButtonEl.addEventListener("click", openMenuLink);
// catalogListEl.addEventListener("click", openCatalogLink);
// menuLinksEl.addEventListener("click", openMenuLink);
mobileModalCatalog.addEventListener("click", openCatalogLink);

// renderingShares();

function openCatalogLink(event) {
  event.preventDefault();
  localStorage.setItem("category", event.target.dataset.name);
  localStorage.setItem("categoryTitle", event.target.textContent.trim());

  window.location.href = "./catalog.html";
}

function renderingShares() {
  const markup = catalog.phones
    .map((phone) => {
      const {
        brand,
        model,
        price,
        discountPercentage,
        quantity,
        colors: [color1, color2, color3],
        features,
        photo,
      } = phone;

      const discountPrice = calculateDiscount(price, discountPercentage);

      return ` <li class="shares__item">
          <div class="shares-item-header">
            <img class="shares__image" src="${photo}" alt="phone" />
            <ul class="shares__color-list">
              <li class="shares__color-item">
                <a
                  href="#"
                  class="shares__color-link"
                  data-color="${color1}"
                ></a>
              </li>
              <li class="shares__color-item">
                <a
                  href="#"
                  class="shares__color-link"
                  data-color="${color2}"
                ></a>
              </li>
              <li class="shares__color-item">
                <a
                  href="#"
                  class="shares__color-link"
                  data-color="${color3}"
                ></a>
              </li>
            </ul>
          </div>
          <h3 class="shares__name">${brand + " " + model}</h3>
          <div class="shares__action">
            <div class="shares__price-box">
              <p class="shares__price shares__price--original">
                ${price} $<span>${"-" + discountPercentage + "%"}</span>
              </p>
              <p class="shares__price shares__price--discount">
                ${discountPrice} $
              </p>
            </div>
            <div class="shares__button-box">
        <button class="shares__button" type="submit"></button>
        <svg class="shares-basket-btn" width="20" height="20">
          <use href="./images/sprite.svg#basket"></use>
        </svg>
      </div>
          </div>
          <div class="shares__info">
            <p class="shares__stock">In stock</p>
            <div class="bgr-svg">
              <svg class="shares__like-icon" width="21" height="17px">
                <use href="./images/sprite.svg#heart"></use>
              </svg>
            </div>
          </div>
        </li>`;
    })
    .join("");

  sharesListEl.insertAdjacentHTML("afterbegin", markup);
}
