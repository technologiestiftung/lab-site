const initArchivalModal = () => {
  const removeModal = () => {
    const modal = document.getElementById("archival-modal__wrapper");
    modal.classList.add("archival-modal__wrapper--hidden");

    const archivalBanner = document.querySelector(".archival-banner");
    archivalBanner.classList.remove("archival-banner--hidden");

    document.querySelector("body").setAttribute("style", "overflow-y: auto;");
  };

  const showModal = () => {
    const modal = document.getElementById("archival-modal__wrapper");
    modal.classList.remove("archival-modal__wrapper--hidden");

    const archivalBanner = document.querySelector(".archival-banner");
    archivalBanner.classList.add("archival-banner--hidden");

    document.querySelector("body").setAttribute("style", "overflow-y: hidden;");
  };

  if (!window.sessionStorage.getItem("removed_modal")) {
    showModal();
  }

  if (window.sessionStorage.getItem("removed_modal") === true) {
    removeModal();
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
