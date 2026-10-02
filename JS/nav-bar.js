const menuToggle = document.querySelector(".menu-toggle");
const drawer = document.querySelector(".mobile-menu");
const drawerBackdrop = document.querySelector(".drawer-backdrop");
const drawerClose = document.querySelector(".drawer-close");
const mobileViewport = window.matchMedia("(max-width: 768px)");

function setMenuOpen(isOpen, restoreFocus = true) {
  const drawerIsOpen = mobileViewport.matches && isOpen;
  const drawerIsHidden = mobileViewport.matches && !isOpen;

  document.body.classList.toggle("drawer-open", drawerIsOpen);
  menuToggle.setAttribute("aria-expanded", String(drawerIsOpen));
  menuToggle.setAttribute(
    "aria-label",
    drawerIsOpen ? "Close navigation menu" : "Open navigation menu",
  );
  drawer.setAttribute("aria-hidden", String(drawerIsHidden));
  drawer.inert = drawerIsHidden;

  if (drawerIsOpen) {
    drawerClose.focus();
  } else if (mobileViewport.matches && restoreFocus) {
    menuToggle.focus();
  }
}

setMenuOpen(false, false);
mobileViewport.addEventListener("change", () => setMenuOpen(false, false));

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

drawerClose.addEventListener("click", () => setMenuOpen(false));
drawerBackdrop.addEventListener("click", () => setMenuOpen(false));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

drawer.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (mobileViewport.matches) setMenuOpen(false);
  });
});
