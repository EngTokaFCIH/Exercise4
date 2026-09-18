let popupKeys = document.querySelectorAll("#Gallery .popupKey"),
  popupEle = document.querySelector(".popup"),
  popupBoxEle = popupEle.querySelector(".box"),
  popupExitKey = popupBoxEle.querySelector(".close"),
  popupImgEle = popupEle.querySelector("img"),
  galleryImages = document.querySelectorAll("#Gallery img"),
  currentImgIndex,
  popupNextKey = popupBoxEle.querySelector(".next"),
  popupPrevKey = popupBoxEle.querySelector(".prev"),
  popupIndicatorContainer = popupEle.querySelector(".indicators");


for (let i = 0; i < galleryImages.length; i++) {
  let newIndicator = document.createElement("li");
  //* to make li have a content inside it =>> textContent
  newIndicator.textContent = i + 1;
  if (i == 0) {
    newIndicator.classList.add("active");
  }
  popupIndicatorContainer.append(newIndicator);
}

let popupIndicators = popupEle.querySelectorAll(".indicators li");

popupKeys.forEach(function (popupKey) {
  popupKey.addEventListener("click", function () {
    let currentImgEle = popupKey.parentElement.previousElementSibling,
      currentImgSrc = currentImgEle.src;
    updatePopupImage(currentImgSrc);
    //** console.log(galleryImages.indexOf(currentImgEle))=>> error because indexOf() is not in galleryImages although
    // **   this is an array but it not has all thing in normal array
    //***   let arr=[...galleryImages];=>>here i converted galleryImages to a real array using spread operator now we can use indexOf()
    // ** another way to convert to array use Array.from(semiArray)
    // ** we can use index without need to array =>> bootstrap =>> data-index
    // ** console.log(currentImgEle.getAttribute("data-index"))
    // ** console.log(currentImgEle.dataSet.index) =>> as all (data-) is storage in dataSet property
    galleryImagesArr = Array.from(galleryImages);
    currentImgIndex = galleryImagesArr.indexOf(currentImgEle);
    updateIndicators();
    openPopUp();
  }
  );
}
);
popupEle.addEventListener("click", closePopUp);
popupBoxEle.addEventListener("click", function (e) {
  e.stopPropagation();
}
);

popupExitKey.addEventListener("click", closePopUp);

popupNextKey.addEventListener("click", function () {
  // ** first increase then store it not reverse because i want the next index
  currentImgIndex = ++currentImgIndex % galleryImages.length;
  // ** old code (++currentImgIndex >= galleryImages.length) ? 0 : currentImgIndex;
  let nextImgIndex = currentImgIndex;
  nextImgEle = galleryImages[nextImgIndex];
  nextImgSrc = nextImgEle.getAttribute("src");
  updatePopupImage(nextImgSrc);
  updateIndicators();
}
);

popupPrevKey.addEventListener("click", function () {
  currentImgIndex =
    (--currentImgIndex + galleryImages.length) % galleryImages.length;
  // (--currentImgIndex == -1) ? galleryImages.length -1 : currentImgIndex;
  let prevImgIndex = currentImgIndex,
    prevImgEle = galleryImages[prevImgIndex],
    prevImgSrc = prevImgEle.getAttribute("src");
  updatePopupImage(prevImgSrc);
  updateIndicators();
});

popupIndicators.forEach(function (popupIndicator, currentIndicatorIndex) {
  popupIndicator.addEventListener("click", function () {
    if (currentIndicatorIndex === currentImgIndex) {
      oneClick()
    }
    let newImgEle = galleryImages[currentIndicatorIndex],
      newImgSrc = newImgEle.src;
    currentImgIndex = currentIndicatorIndex;
    updatePopupImage(newImgSrc);
    updateIndicators();
  });
});

// ==================================================================

let key = "",
  lastTimeout;

document.addEventListener("keyup", function (e) {
  key += Number(e.key);

  if (e.key === "Escape") {
    closePopUp();
    key = '';
  }

  else if (e.key === "ArrowRight") {
    currentImgIndex = ++currentImgIndex % galleryImages.length;
    let newImgEle = galleryImages[currentImgIndex],
      newImgSrc = newImgEle.src;
    updatePopupImage(newImgSrc);
    updateIndicators();
    key = '';
  }

  else if (e.key === "ArrowLeft") {
    currentImgIndex =
      (--currentImgIndex + galleryImages.length) % galleryImages.length;
    let newImgEle = galleryImages[currentImgIndex],
      newImgSrc = newImgEle.src;
    updatePopupImage(newImgSrc);
    updateIndicators();
    key = '';
  }

  else {
    clearTimeout(lastTimeout)
    lastTimeout = setTimeout(function () {
      fireKey(Number(key))
    }, 350)
  }
}
);