let currentImageIndex = 0;
const images = document.querySelectorAll(".image-slide");
const colorOptions = document.querySelectorAll(".color-option");
const sizeOptions = document.querySelectorAll(".size-option");
const sizeDisplay = document.querySelector(".size-display");
const colorDisplay = document.querySelector(".color-display");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
});

function showImage(index) {
  images.forEach((img, i) => {
    img.classList.remove("active");
    if (i === index) {
      img.classList.add("active");
    }
  });
}

colorOptions.forEach((option, index) => {
  option.addEventListener("click", () => {
    colorOptions.forEach((opt) => opt.classList.remove("active"));
    option.classList.add("active");
    showImage(index);
    currentImageIndex = index;
    const colorName = option.querySelector("img").alt;
    colorDisplay.textContent = `Color: ${colorName}`;
  });
});

sizeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    sizeOptions.forEach((opt) => opt.classList.remove("active"));
    option.classList.add("active");
    sizeDisplay.textContent = `Size: ${option.textContent}`;
  });
});

function changeQuantity(delta) {
  const quantityInput = document.getElementById("quantity");
  let quantity = parseInt(quantityInput.value);
  quantity = Math.max(1, quantity + delta);
  quantityInput.value = quantity;
}

const productSections = document.querySelectorAll(".product__section");

productSections.forEach((section, index) => {
  const productHeader = section.querySelector(".product__section-header");
  const productContent = section.querySelector(".product__section-content");
  const productTitle = section.querySelector(".product__section-title");
  const productToggleBtn = section.querySelector(".product__toggle-btn");

  if (productHeader && productContent && productTitle && productToggleBtn) {
    productHeader.addEventListener("click", () => {
      const activeSections = Array.from(productSections).filter((s) =>
        s.classList.contains("active")
      ).length;

      const isActive = section.classList.contains("active");

      if (isActive && activeSections <= 1) {
        return;
      }

      productSections.forEach((otherSection, otherIndex) => {
        if (otherIndex !== index) {
          otherSection.classList.remove("active");
          const otherContent = otherSection.querySelector(
            ".product__section-content"
          );
          const otherTitle = otherSection.querySelector(
            ".product__section-title"
          );
          const otherToggleBtn = otherSection.querySelector(
            ".product__toggle-btn"
          );

          if (otherContent) otherContent.classList.remove("active");
          if (otherTitle) otherTitle.classList.remove("active");
          if (otherToggleBtn) otherToggleBtn.textContent = "+";
        }
      });

      if (isActive) {
        section.classList.remove("active");
        productContent.classList.remove("active");
        productTitle.classList.remove("active");
        productToggleBtn.textContent = "+";
      } else {
        section.classList.add("active");
        productContent.classList.add("active");
        productTitle.classList.add("active");
        productToggleBtn.textContent = "−";
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  if (productSections.length > 0) {
    const activeSection = document.querySelector(".product__section.active");
    if (activeSection) {
      const activeIndex = Array.from(productSections).indexOf(activeSection);
    }
  }
});

// document.addEventListener("DOMContentLoaded", () => {
//   const productImgWrapper = document.querySelector(".product__img-wrapper");
//   const productImgCarousel = document.querySelector(".product__img-carousel");
//   if (!productImgCarousel) {
//     console.warn("Product image carousel not found!");
//     return;
//   }

//   const firstCard = productImgCarousel.querySelector(".product__img-card");
//   const firstCardWidthImg = firstCard ? firstCard.offsetWidth : 0;
//   const arrowBtnsImg = document.querySelectorAll(".product__img-wrapper i");
//   const productImgCarouselChildrens = [...(productImgCarousel?.children || [])];
//   // const paginationContainer = document.querySelector(
//   //   ".product__img-pagination"
//   // );
//   let isDraggingImg = false,
//     isAutoPlayImg = true,
//     startImgX,
//     startScrollLeftImg,
//     timeoutImgId,
//     currentIndexImg = 0;

//   let cardPerViewImg = firstCardWidthImg
//     ? Math.round(productImgCarousel.offsetWidth / firstCardWidthImg)
//     : 1;

//   productImgCarouselChildrens
//     .slice(-cardPerViewImg)
//     .reverse()
//     .forEach((card) => {
//       productImgCarousel.insertAdjacentHTML("afterbegin", card.outerHTML);
//     });

//   productImgCarouselChildrens.slice(0, cardPerViewImg).forEach((card) => {
//     productImgCarousel.insertAdjacentHTML("beforeend", card.outerHTML);
//   });

//   productImgCarousel.classList.add("no-transition");
//   productImgCarousel.scrollLeft = productImgCarousel.offsetWidth;
//   productImgCarousel.classList.remove("no-transition");

//   const originalSlidesImg = 7;
// if (!paginationContainer) {
//   console.warn("Pagination container (.product__img-pagination) not found!");
//   return;
// }
// for (let i = 0; i < originalSlidesImg; i++) {
//   const bullet = document.createElement("span");
//   bullet.classList.add("product__img-pagination-bullet");
//   if (i === 0) bullet.classList.add("active");
//   bullet.addEventListener("click", () => goToSlideImg(i));
//   paginationContainer.appendChild(bullet);
// }

// function goToSlideImg(index) {
//   currentIndexImg = index;
//   const scrollTo = index * firstCardWidthImg + productImgCarousel.offsetWidth;
//   productImgCarousel.scrollLeft = scrollTo;
//   updatePaginationImg();
// }

// function updatePaginationImg() {
//   const bullets = paginationContainer.querySelectorAll(
//     ".product__img-pagination-bullet"
//   );
//   bullets.forEach((bullet, index) => {
//     bullet.classList.toggle("active", index === currentIndexImg);
//   });
// }

// arrowBtnsImg.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     productImgCarousel.scrollLeft +=
//       btn.id === "left" ? -firstCardWidthImg : firstCardWidthImg;
//     currentIndexImg =
//       Math.round(productImgCarousel.scrollLeft / firstCardWidthImg) %
//       originalSlidesImg;
//     if (currentIndexImg < 0) currentIndexImg += originalSlidesImg;
//     updatePaginationImg();
//   });
// });

// const dragStartImg = (e) => {
//   isDraggingImg = true;
//   productImgCarousel.classList.add("dragging");
//   startImgX = e.pageX || e.touches[0].pageX;
//   startScrollLeftImg = productImgCarousel.scrollLeft;
// };

// const draggingImg = (e) => {
//   if (!isDraggingImg) return;
//   e.preventDefault();
//   const x = e.pageX || e.touches[0].pageX;
//   productImgCarousel.scrollLeft = startScrollLeftImg - (x - startImgX);
// };

// const dragStopImg = () => {
//   isDraggingImg = false;
//   productImgCarousel.classList.remove("dragging");
//   currentIndexImg =
//     Math.round(productImgCarousel.scrollLeft / firstCardWidthImg) %
//     originalSlidesImg;
//   if (currentIndexImg < 0) currentIndexImg += originalSlidesImg;
//   updatePaginationImg();
// };

// const infiniteScrollImg = () => {
//   if (productImgCarousel.scrollLeft === 0) {
//     productImgCarousel.classList.add("no-transition");
//     productImgCarousel.scrollLeft =
//       productImgCarousel.scrollWidth - 2 * productImgCarousel.offsetWidth;
//     productImgCarousel.classList.remove("no-transition");
//     currentIndexImg = originalSlidesImg - 1;
//   } else if (
//     Math.ceil(productImgCarousel.scrollLeft) ===
//     productImgCarousel.scrollWidth - productImgCarousel.offsetWidth
//   ) {
//     productImgCarousel.classList.add("no-transition");
//     productImgCarousel.scrollLeft = productImgCarousel.offsetWidth;
//     productImgCarousel.classList.remove("no-transition");
//     currentIndexImg = 0;
//   }
//   updatePaginationImg();
//   clearTimeout(timeoutImgId);
//   if (!productImgWrapper.matches(":hover")) autoPlayImg();
// };

// const autoPlayImg = () => {
//   if (window.innerWidth < 800 || !isAutoPlayImg) return;
//   timeoutImgId = setTimeout(() => {
//     productImgCarousel.scrollLeft += firstCardWidthImg;
//     currentIndexImg = (currentIndexImg + 1) % originalSlidesImg;
//     updatePaginationImg();
//     autoPlayImg();
//   }, 2500);
// };

// autoPlayImg();

//   productImgCarousel.addEventListener("mousedown", dragStartImg);
//   productImgCarousel.addEventListener("mousemove", draggingImg);
//   document.addEventListener("mouseup", dragStopImg);
//   productImgCarousel.addEventListener("scroll", infiniteScrollImg);
//   productImgWrapper.addEventListener("mouseenter", () =>
//     clearTimeout(timeoutImgId)
//   );
//   productImgWrapper.addEventListener("mouseleave", autoPlayImg);

//   productImgCarousel.addEventListener("touchstart", dragStartImg);
//   productImgCarousel.addEventListener("touchmove", draggingImg);
//   productImgCarousel.addEventListener("touchend", dragStopImg);

//   window.addEventListener("load", () => {
//     const images = document.querySelectorAll(".product__img-img img");
//     let maxHeight = 0;

//     images.forEach((img) => {
//       if (img.height > maxHeight) maxHeight = img.height;
//     });

//     productImgCarousel.style.minHeight = `${maxHeight}px`;
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  // console.log("DOM fully loaded, starting script...");

  const productImgSmaillWrapper = document.querySelector(
    ".product__img-smaill-wrapper"
  );
  const productImgSmaillCarousel = document.querySelector(
    ".product__img-smaill-carousel"
  );
  const paginationSmaillContainer = document.querySelector(
    ".product__img-smaill-pagination"
  );

  if (
    !productImgSmaillCarousel ||
    !paginationSmaillContainer ||
    !productImgSmaillWrapper
  ) {
    console.warn("Carousel, pagination, or wrapper element not found!");
    return;
  }

  // console.log("All elements found, proceeding...");

  let firstCardWidthSmaill = 0;
  const firstSmaillCard = productImgSmaillCarousel.querySelector(
    ".product__img-smaill-card"
  );
  const originalSlidesSmaill = 3;
  const totalPagesSmaill = Math.round(originalSlidesSmaill / 2);
  let isDraggingSmaill = false;
  let startXSmaill = 0;
  let startScrollLeftSmaill = 0;
  let currentIndexSmaill = 0;

  // Tính toán chiều rộng card
  const updateCardWidth = () => {
    firstCardWidthSmaill = firstSmaillCard?.offsetWidth || 100;
  };
  updateCardWidth(); // Tính ban đầu

  // Debounce cho sự kiện scroll
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  function createPaginationSmaill() {
    // console.log("Creating pagination...");
    paginationSmaillContainer.innerHTML = `
      <button class="pagination-btn" id="prev"><i class="fas fa-chevron-left"></i></button>
      <span class="pagination-current">1/${totalPagesSmaill}</span>
      <button class="pagination-btn" id="next"><i class="fas fa-chevron-right"></i></button>
    `;
    // console.log(
    //   "Pagination content set to:",
    //   paginationSmaillContainer.innerHTML
    // );
    updatePaginationSmaill();
  }

  function initCarouselSmaill() {
    productImgSmaillCarousel.classList.add("no-transition");
    productImgSmaillCarousel.scrollLeft = 0;
    productImgSmaillCarousel.classList.remove("no-transition");
  }

  function goToSlideSmaill(index) {
    currentIndexSmaill = index;
    const scrollTo = index * firstCardWidthSmaill;
    productImgSmaillCarousel.scrollLeft = scrollTo;
    updatePaginationSmaill();
  }

  function updatePaginationSmaill() {
    const prevBtn = paginationSmaillContainer.querySelector("#prev");
    const nextBtn = paginationSmaillContainer.querySelector("#next");
    const currentSpan = paginationSmaillContainer.querySelector(
      ".pagination-current"
    );

    if (currentSpan) {
      currentSpan.textContent = `${currentIndexSmaill + 1}/${totalPagesSmaill}`;
    }
    if (prevBtn) {
      prevBtn.disabled = currentIndexSmaill === 0;
    }
    if (nextBtn) {
      nextBtn.disabled = currentIndexSmaill === totalPagesSmaill - 1;
    }
  }

  const dragStartSmaill = (e) => {
    isDraggingSmaill = true;
    productImgSmaillCarousel.classList.add("product__img-smaill-dragging");
    startXSmaill = e.pageX || (e.touches && e.touches[0].pageX);
    startScrollLeftSmaill = productImgSmaillCarousel.scrollLeft;
  };

  const draggingSmaill = (e) => {
    if (!isDraggingSmaill) return;
    e.preventDefault();
    const x = e.pageX || (e.touches && e.touches[0].pageX);
    const newScrollLeft = startScrollLeftSmaill - (x - startXSmaill);
    const maxScrollLeft =
      productImgSmaillCarousel.scrollWidth -
      productImgSmaillCarousel.offsetWidth;

    if (newScrollLeft >= 0 && newScrollLeft <= maxScrollLeft) {
      productImgSmaillCarousel.scrollLeft = newScrollLeft;
    }
  };

  const dragStopSmaill = () => {
    if (!isDraggingSmaill) return;
    isDraggingSmaill = false;
    productImgSmaillCarousel.classList.remove("product__img-smaill-dragging");
    const nearestIndex = Math.round(
      productImgSmaillCarousel.scrollLeft / firstCardWidthSmaill
    );
    currentIndexSmaill = Math.max(
      0,
      Math.min(nearestIndex, totalPagesSmaill - 1)
    );
    goToSlideSmaill(currentIndexSmaill);
  };

  const handleScrollSmaill = debounce(() => {
    if (isDraggingSmaill) return;
    const nearestIndex = Math.round(
      productImgSmaillCarousel.scrollLeft / firstCardWidthSmaill
    );
    currentIndexSmaill = Math.max(
      0,
      Math.min(nearestIndex, totalPagesSmaill - 1)
    );
    updatePaginationSmaill();
  }, 50);
  productImgSmaillCarousel.addEventListener("mousedown", dragStartSmaill);
  productImgSmaillCarousel.addEventListener("mousemove", draggingSmaill);
  document.addEventListener("mouseup", dragStopSmaill);
  productImgSmaillCarousel.addEventListener("touchstart", dragStartSmaill);
  productImgSmaillCarousel.addEventListener("touchmove", draggingSmaill);
  productImgSmaillCarousel.addEventListener("touchend", dragStopSmaill);
  productImgSmaillCarousel.addEventListener("scroll", handleScrollSmaill);

  // Xử lý nút phân trang
  paginationSmaillContainer.addEventListener("click", (e) => {
    if (e.target.closest("#prev") && currentIndexSmaill > 0) {
      currentIndexSmaill -= 1;
      goToSlideSmaill(currentIndexSmaill);
    } else if (
      e.target.closest("#next") &&
      currentIndexSmaill < totalPagesSmaill - 1
    ) {
      currentIndexSmaill += 1;
      goToSlideSmaill(currentIndexSmaill);
    }
  });

  // Xử lý resize
  window.addEventListener("resize", () => {
    updateCardWidth(); // Cập nhật chiều rộng card
    initCarouselSmaill();
    goToSlideSmaill(currentIndexSmaill); // Điều chỉnh vị trí slide
    updatePaginationSmaill();
  });

  // Khởi tạo
  createPaginationSmaill();
  initCarouselSmaill();
});

function setupCardHoverProductEffect() {
  const slideProducts = document.querySelectorAll(".product__img-smaill-card");
  const buttonProducts = document.querySelectorAll(
    ".slide__hover-tag-mobule-product"
  );

  slideProducts.forEach((slide) => {
    slide.removeEventListener("mouseenter", slide._hoverHandler);
    slide.removeEventListener("mouseleave", slide._hoverLeaveHandler);
    const buttonProduct = slide.querySelector(
      ".slide__hover-tag-mobule-product"
    );
    if (buttonProduct && window.innerWidth < 800) {
      slide._hoverHandler = () => {
        buttonProducts.forEach((btn) => btn.classList.remove("active"));
        buttonProduct.classList.add("active");
      };
      slide._hoverLeaveHandler = () => {
        buttonProduct.classList.remove("active");
      };

      slide.addEventListener("mouseenter", slide._hoverHandler);
      slide.addEventListener("mouseleave", slide._hoverLeaveHandler);
    }
  });
}

window.addEventListener("resize", setupCardHoverProductEffect);
window.addEventListener("DOMContentLoaded", setupCardHoverProductEffect);
