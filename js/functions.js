function openPopUp() {
  popupEle.classList.add("active");
  setTimeout(function () {
    popupEle.classList.add("show");
  }, 10);
  scrollToActiveIndicator();
}

function closePopUp() {
  popupEle.classList.remove("show");
  setTimeout(function () {
    popupEle.classList.remove("active");
  }, 1000);
}

function updatePopupImage(imgSrc) {
  popupImgEle.setAttribute("src", imgSrc);
}

function updateIndicators() {
  let newIndicator = popupIndicators[currentImgIndex],
    oldIndicator = popupEle.querySelector(".indicators li.active");
  oldIndicator.classList.remove("active");
  newIndicator.classList.add("active");
  let tableResponsive = newIndicator.closest(".table-responsive"),
    liLeft = newIndicator.offsetLeft,
    liRight = liLeft + newIndicator.offsetWidth,
    tableLeft = tableResponsive.scrollLeft,
    tableRight = tableLeft + tableResponsive.clientWidth;

  if (liLeft < tableLeft || liRight > tableRight) {
    tableResponsive.scrollTo({
      left: newIndicator.offsetLeft,
      behavior: "smooth"
    })
  }
  // classList property we can't use it with arrays but on elements in array
}

function scrollToActiveIndicator() {
  activeIndicator = document.querySelector("li.active");
  if (activeIndicator) {
    let tableResponsive = activeIndicator.closest(".table-responsive");
    tableResponsive.scrollLeft = activeIndicator.offsetLeft

  }
}

function fireKey(keyIn) {
  if (keyIn > 0 && keyIn <= galleryImages.length) {
    if (keyIn === currentImgIndex + 1) {
      popupBoxEle.classList.add("expand");
      setTimeout(function () {
        popupBoxEle.classList.remove("expand");
      }, 300);
    }

    else {
      let newImgEle = galleryImages[keyIn - 1],
        newImgSrc = newImgEle.src;
      currentImgIndex = keyIn - 1;
      updatePopupImage(newImgSrc);
      updateIndicators();
    }
  }
  else {
    popupBoxEle.classList.add("shaking");
    setTimeout(function () {
      popupBoxEle.classList.remove("shaking");
    }, 1500);
  }

  key = '';
}

function oneClick() {
  popupBoxEle.classList.add("expand")
  setTimeout(function () {
    popupBoxEle.classList.remove("expand")
  }, 500)
}
