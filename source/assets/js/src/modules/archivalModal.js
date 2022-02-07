const archivalModal = document.getElementById("archival-modal__wrapper");
const archivalBanner = document.querySelector(".archival-banner");

const removeModal = () => {
  archivalModal.classList.add("archival-modal__wrapper--hidden");
  archivalBanner.classList.remove("archival-banner--hidden");
  document.querySelector("body").setAttribute("style", "overflow-y: auto;");
};

const showModal = () => {
  archivalModal.classList.remove("archival-modal__wrapper--hidden");
  archivalBanner.classList.add("archival-banner--hidden");
  document.querySelector("body").setAttribute("style", "overflow-y: hidden;");
};

const initArchivalModal = () => {
  if (!window.sessionStorage.getItem("removed_modal")) {
    showModal();
  }

  const closeButton = document.getElementById("close-archival-modal");
  closeButton.addEventListener("click", () => {
    window.sessionStorage.setItem("removed_modal", true);
    removeModal();
  });

  const openButton = document.getElementById("open-archival-modal");
  openButton.addEventListener("click", () => {
    window.sessionStorage.setItem("removed_modal", false);
    showModal();
  });
};

export default initArchivalModal;
