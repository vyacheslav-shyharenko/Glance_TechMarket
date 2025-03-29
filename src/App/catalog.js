const categoryTitle = document.querySelector("#js-filter-title");
const productsListEl = document.querySelector("#js-products-list");
console.log(" productsListEl:", productsListEl);
const menuLinksEl = document.querySelector(".js-menu-list");
const modalCatalogEl = document.querySelector(".js-modal-catalog");
const catalogListEl = document.querySelector("#js-catalog-list");

menuLinksEl.addEventListener("click", openMenuLink);

document.addEventListener("DOMContentLoaded", renderingCategory);
const category = localStorage.getItem("category");
const categoryName = localStorage.getItem("categoryTitle");

categoryTitle.textContent = categoryName;

renderingCategory(category);

function renderingCategory(category) {
  const products = catalog[category];

  // Якщо категорія існує
  if (products) {
    let markup = products
      .map((product) => {
        const {
          brand,
          model,
          price,
          discountPercentage,
          quantity,
          colors,
          features,
          photo,
        } = product;

        // Обчислюємо знижку
        const discountPrice = calculateDiscount(price, discountPercentage);

        return `<li class="shares__item">
          <div class="shares-item-header">
            <img class="shares__image" src="${photo}" alt="phone" />
            <ul class="shares__color-list">
              <li class="shares__color-item">
                <a
                  href="#"
                  class="shares__color-link"
                  data-color=""
                ></a>
              </li>
              <li class="shares__color-item">
                <a
                  href="#"
                  class="shares__color-link"
                  data-color=""
                ></a>
              </li>
              <li class="shares__color-item">
                <a
                  href="#"
                  class="shares__color-link"
                  data-color=""
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

    productsListEl.insertAdjacentHTML("afterbegin", markup);
  }
}

// Функція для обчислення ціни зі знижкою
function calculateDiscount(price, discountPercentage) {
  const discountAmount = (price * discountPercentage) / 100;
  const discountedPrice = price - discountAmount;
  return Math.round(discountedPrice);
}

function openMenuLink(event) {
  event.preventDefault();
  const homeLink = event.target.classList.contains("menu__link--home");
  const catalogLink = event.target.classList.contains("menu__link--catalog");
  console.log(" catalogLink:", catalogLink);
  const basketLink = event.target.classList.contains("menu__link--basket");
  const profileLink = event.target.classList.contains("menu__link--profile");

  let wasCatalogOpen = modalCatalogEl.classList.contains("menu__is-open");

  if (homeLink) {
    if (modalCatalogEl.classList.contains("menu__is-open")) {
      modalCatalogEl.classList.remove("menu__is-open");
      setTimeout(function () {
        window.location.href = "/Glance/index.html";
      }, 200);
    }
  } else if (catalogLink || event.target === modalCatalogButtonEl) {
    modalCatalogEl.classList.toggle("menu__is-open");
  } else if (basketLink) {
    console.log("basketPage");
  } else if (profileLink) {
    console.log("profilePage");
  }

  if (wasCatalogOpen !== modalCatalogEl.classList.contains("menu__is-open")) {
    document.body.style.overflow = modalCatalogEl.classList.contains(
      "menu__is-open"
    )
      ? "hidden"
      : "auto";
  }
}
