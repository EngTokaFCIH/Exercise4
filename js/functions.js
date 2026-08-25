function openPopUp() {
  popupEle.classList.add("active");
  setTimeout(function () {
    popupEle.classList.add("show");
  }, 10);
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
  // classList property we can't use it with arrays but on elements in array
}
