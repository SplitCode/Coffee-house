import coffeeData from "./coffeedata.js";
import teaData from "./teadata.js";
import dessertData from "./dessertdata.js";

console.log("Hello");

// burger-menu_______________________________________________________________
const html = document.querySelector("html");
const body = document.body;
const burger = document.querySelector(".burger__menu");
const nav = document.querySelector(".header__nav");
const navItems = document.querySelectorAll(".nav__item");
const unactiveLink = document.querySelector(".unactive__link");

burger.addEventListener("click", () => {
  burger.classList.toggle("cross");
  nav.classList.toggle("open");

  if (nav.classList.contains("open")) {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "auto";
  }
});

body.addEventListener("click", function (e) {
  if (!nav.contains(e.target) && !burger.contains(e.target)) {
    burger.classList.remove("cross");
    nav.classList.remove("open");
  }
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    burger.classList.remove("cross");
    nav.classList.remove("open");
    body.style.overflow = "auto";
  });
});

unactiveLink?.addEventListener("click", () => {
  burger.classList.remove("cross");
  nav.classList.remove("open");
  body.style.overflow = "auto";
});

// create menu_________________________________________________________________
const menu = document.querySelector(".menu__content__container");
const refreshButton = document.querySelector(".refresh__button");
const menuButtons = document.querySelectorAll(".menu__button");
const menuImages = document.querySelectorAll(".menu__button__img");
let activeButton = 0;

const displayCards = (activeButton) => {
  if (
    window.innerWidth <= 768 &&
    window.getComputedStyle(refreshButton).display === "flex"
  ) {
    return 4;
  } else if (activeButton === 1) {
    return 4;
  } else {
    return 8;
  }
};

const createMenu = (data = coffeeData, cards = displayCards(activeButton)) => {
  menu.innerHTML = "";

  data.slice(0, cards).forEach((item) => {
    const menuItem = document.createElement("div");
    menuItem.classList.add("menu__item");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("menu__img__container");

    const img = document.createElement("img");
    img.classList.add("menu__img");
    img.src = `./assets/images/${item.name.toLowerCase().replace(/ /g, "-")}.jpg`;
    img.alt = item.name;
    img.draggable = false;

    imgContainer.appendChild(img);

    const itemDescription = document.createElement("div");
    itemDescription.classList.add("menu__item__description");

    const title = document.createElement("p");
    title.classList.add("menu__item__title");
    title.textContent = item.name;

    const text = document.createElement("p");
    text.classList.add("menu__item__text");
    text.textContent = item.description;

    const itemPrice = document.createElement("p");
    itemPrice.classList.add("menu__item__price");
    itemPrice.textContent = "$" + item.price;

    itemDescription.appendChild(title);
    itemDescription.appendChild(text);
    itemDescription.appendChild(itemPrice);

    menuItem.appendChild(imgContainer);
    menuItem.appendChild(itemDescription);

    menu.appendChild(menuItem);
  });
};

createMenu();

const isDisplayButton = () => {
  if (window.innerWidth > 768) {
    refreshButton.style.display = "none";
  } else {
    refreshButton.style.display = "flex";
  }
};

// switch menu__________________________________________________________

menuButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    menuButtons[activeButton].disabled = false;
    menuButtons[index].disabled = true;
    menuButtons[activeButton].classList.remove("menu__button__active");
    menuButtons[activeButton].firstElementChild.classList.remove(
      "menu__button__img__active"
    );
    menuButtons[index].classList.add("menu__button__active");
    menuImages[index].classList.toggle("menu__button__img__active");
    activeButton = index;
    if (index === 0) {
      isDisplayButton();
      createMenu(coffeeData);
    }
    if (index === 1) {
      refreshButton.style.display = "none";
      createMenu(teaData);
    }
    if (index === 2) {
      isDisplayButton();
      createMenu(dessertData);
    }
  });
});

refreshButton.addEventListener("click", () => {
  refreshButton.style.display = "none";
  if (activeButton === 0) {
    createMenu(coffeeData);
  }
  if (activeButton === 2) {
    createMenu(dessertData);
  }
});

window.addEventListener("resize", () => {
  if (activeButton === 0) {
    isDisplayButton();
    createMenu(coffeeData);
  }
  if (activeButton === 1) {
    createMenu(teaData);
  }
  if (activeButton === 2) {
    isDisplayButton();
    createMenu(dessertData);
  }
});

// модалка__________________________________________________________

let selectedSize = "s";
const selectedAdditives = [];

const getSizePrice = (size) => {
  switch (size) {
    case "s":
      return 0.0;
    case "m":
      return 0.5;
    case "l":
      return 1.0;
    default:
      return 0;
  }
};

const getAdditivesPrice = (selectedAdditives) => {
  const pricePerAdditive = 0.5;
  return selectedAdditives.length * pricePerAdditive;
};

const updateTotalPrice = (data, selectedSize, selectedAdditives) => {
  const sizePrice = getSizePrice(selectedSize);
  const additivesPrice = getAdditivesPrice(selectedAdditives);
  const total = Number(data.price) + Number(sizePrice) + Number(additivesPrice);
  return total.toFixed(2);
};

const createModal = (data, dataTitle) => {
  selectedSize = "s";
  selectedAdditives.length = 0;
  if (data.name === dataTitle.textContent) {
    const modalContainer = document.querySelector(".modal__container");
    const modal = document.querySelector(".modal");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("modal__img__container");

    const img = document.createElement("img");
    img.classList.add("modal__img");
    img.src = `./assets/images/${data.name.toLowerCase().replace(/ /g, "-")}.jpg`;
    img.alt = data.name;
    imgContainer.appendChild(img);

    const content = document.createElement("div");
    content.classList.add("modal__content");

    const titles = document.createElement("div");
    titles.classList.add("modal__titles");

    const title = document.createElement("p");
    title.classList.add("modal__title");
    title.textContent = data.name;

    const description = document.createElement("p");
    description.classList.add("modal__description");
    description.textContent = data.description;

    titles.appendChild(title);
    titles.appendChild(description);

    const sizeContainer = document.createElement("div");
    sizeContainer.classList.add("modal__buttons__container");

    const sizeDescription = document.createElement("p");
    sizeDescription.classList.add("modal__description");
    sizeDescription.textContent = "Size";

    const sizeButtonsContainer = document.createElement("div");
    sizeButtonsContainer.classList.add("modal__size__container");

    for (const size in data.sizes) {
      const sizeButton = document.createElement("button");
      sizeButton.classList.add("size__button");
      const sizeButtonImg = document.createElement("div");
      sizeButtonImg.classList.add("size__button__img");
      sizeButtonImg.textContent = size.toUpperCase();
      if (size === "s") {
        sizeButton.classList.add("size__button__active");
        sizeButtonImg.classList.add("size__button__img__active");
      }

      const sizeButtonText = document.createElement("span");
      sizeButtonText.classList.add("size__button__text");
      sizeButtonText.textContent = data.sizes[size].size;
      sizeButton.appendChild(sizeButtonImg);
      sizeButton.appendChild(sizeButtonText);
      sizeButtonsContainer.appendChild(sizeButton);
    }

    sizeContainer.appendChild(sizeDescription);
    sizeContainer.appendChild(sizeButtonsContainer);

    const additivesContainer = document.createElement("div");
    additivesContainer.classList.add("modal__buttons__container");

    const additivesDescription = document.createElement("p");
    additivesDescription.classList.add("modal__description");
    additivesDescription.textContent = "Additives";

    const additivesButtonsContainer = document.createElement("div");
    additivesButtonsContainer.classList.add("modal__add__container");

    data.additives.forEach((additive, index) => {
      const additiveButton = document.createElement("button");
      additiveButton.classList.add("add__button");
      const additiveButtonImg = document.createElement("div");
      additiveButtonImg.classList.add("add__button__img");
      additiveButtonImg.textContent = index + 1;
      const additiveButtonText = document.createElement("span");
      additiveButtonText.classList.add("add__button__text");
      additiveButtonText.textContent = additive.name;
      additiveButton.appendChild(additiveButtonImg);
      additiveButton.appendChild(additiveButtonText);
      additivesButtonsContainer.appendChild(additiveButton);
    });

    additivesContainer.appendChild(additivesDescription);
    additivesContainer.appendChild(additivesButtonsContainer);

    const priceContainer = document.createElement("div");
    priceContainer.classList.add("modal__price");

    const totalText = document.createElement("p");
    totalText.classList.add("modal__text__price");
    totalText.textContent = "Total:";

    const totalPrice = document.createElement("p");
    totalPrice.classList.add("modal__text__price");
    totalPrice.textContent = `$${data.price}`;

    priceContainer.appendChild(totalText);
    priceContainer.appendChild(totalPrice);

    const info = document.createElement("div");
    info.classList.add("modal__info");

    info.innerHTML = `<svg class="modal__info__img" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_268_9647)">
  <path d="M8 7.66663V11" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8 5.00667L8.00667 4.99926" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M7.99992 14.6667C11.6818 14.6667 14.6666 11.6819 14.6666 8.00004C14.6666 4.31814 11.6818 1.33337 7.99992 1.33337C4.31802 1.33337 1.33325 4.31814 1.33325 8.00004C1.33325 11.6819 4.31802 14.6667 7.99992 14.6667Z" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
  <clipPath id="clip0_268_9647">
  <rect width="16" height="16" fill="white"/>
  </clipPath>
  </defs>
  </svg>
The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.`;

    const closeButton = document.createElement("button");
    closeButton.classList.add("modal__button");
    closeButton.textContent = "Close";

    closeButton.addEventListener("click", () => {
      modalContainer.classList.remove("modal__container__open");
      html.style.overflow = "auto";
      body.style.overflow = "auto";
      modal.innerHTML = "";
    });

    modalContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("modal__container")) {
        modalContainer.classList.remove("modal__container__open");
        html.style.overflow = "auto";
        body.style.overflow = "auto";
        modal.innerHTML = "";
      }
    });

    sizeButtonsContainer.addEventListener("click", (event) => {
      const sizeButton = event.target.closest(".size__button");

      if (sizeButton) {
        sizeButtonsContainer
          .querySelectorAll(".size__button")
          .forEach((button) => {
            button.classList.remove("size__button__active");
          });
        sizeButtonsContainer
          .querySelectorAll(".size__button__img")
          .forEach((image) => {
            image.classList.remove("size__button__img__active");
          });

        sizeButton.classList.add("size__button__active");
        sizeButton
          .querySelector(".size__button__img")
          .classList.add("size__button__img__active");

        selectedSize = sizeButton
          .querySelector(".size__button__img")
          .textContent.toLowerCase();
        totalPrice.textContent = `$${updateTotalPrice(data, selectedSize, selectedAdditives)}`;
      }
    });

    additivesButtonsContainer.addEventListener("click", (event) => {
      const addButton = event.target.closest(".add__button");

      if (addButton) {
        const selectedAdditive = addButton.textContent;
        addButton.classList.toggle("add__button__selected");
        addButton.classList.toggle("add__button__active");
        addButton
          .querySelector(".add__button__img")
          .classList.toggle("add__button__img__active");

        if (addButton.classList.contains("add__button__selected")) {
          selectedAdditives.push(selectedAdditive);
        } else {
          const index = selectedAdditives.indexOf(selectedAdditive);
          if (index !== -1) {
            selectedAdditives.splice(index, 1);
          }
        }

        totalPrice.textContent = `$${updateTotalPrice(data, selectedSize, selectedAdditives)}`;
      }
    });

    content.appendChild(titles);
    content.appendChild(sizeContainer);
    content.appendChild(additivesContainer);
    content.appendChild(priceContainer);
    content.appendChild(info);
    content.appendChild(closeButton);

    modal.appendChild(imgContainer);
    modal.appendChild(content);

    modalContainer.appendChild(modal);
  }
};

menu.addEventListener("click", (e) => {
  const coffeeButton = document.querySelector(
    ".coffee__button.menu__button__active"
  );
  const teaButton = document.querySelector(".tea__button.menu__button__active");
  const dessertButton = document.querySelector(
    ".dessert__button.menu__button__active"
  );

  if (e.target !== menu) {
    const modalContainer = document.querySelector(".modal__container");
    modalContainer.classList.add("modal__container__open");
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const dataTitle =
      e.target.parentElement.querySelector(".menu__item__title") ||
      e.target.parentElement.parentElement.querySelector(".menu__item__title");

    if (coffeeButton) {
      coffeeData.forEach((data) => createModal(data, dataTitle));
    }
    if (teaButton) {
      teaData.forEach((data) => createModal(data, dataTitle));
    }
    if (dessertButton) {
      dessertData.forEach((data) => createModal(data, dataTitle));
    }
  }
});
