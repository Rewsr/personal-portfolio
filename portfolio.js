const list = document.getElementById("inbox-list");
const details = [...document.querySelectorAll(".portfolio-detail")];
const search = document.getElementById("search");
const scroll = document.getElementById("mail-scroll");
let category = "all";

function showMessage(name) {
  const selected = document.getElementById(`${name}-detail`);
  list.hidden = Boolean(selected);
  details.forEach((detail) => { detail.hidden = detail !== selected; });
  scroll.scrollTop = 0;
}

function filterRows() {
  const term = search.value.trim().toLowerCase();
  document.querySelectorAll(".portfolio-row").forEach((row) => {
    row.hidden =
      (category !== "all" && row.dataset.open !== category) ||
      !row.textContent.toLowerCase().includes(term);
  });
}

document.querySelectorAll("[data-open]").forEach((row) => {
  row.addEventListener("click", () => {
    location.hash = row.dataset.open;
    showMessage(row.dataset.open);
  });
});
document.querySelectorAll(".detail-back").forEach((button) => {
  button.addEventListener("click", () => {
    location.hash = "inbox";
    showMessage("");
  });
});
document.querySelectorAll('a[href="#inbox"]').forEach((link) => {
  link.addEventListener("click", () => showMessage(""));
});
document.querySelectorAll('a[href="#program"], a[href="#about"]').forEach((link) => {
  link.addEventListener("click", () => showMessage(link.hash.slice(1)));
});
search.addEventListener("input", () => {
  showMessage("");
  filterRows();
});
document.querySelectorAll("[data-category]").forEach((button) => {
  button.addEventListener("click", () => {
    category = button.dataset.category;
    showMessage("");
    filterRows();
    document.querySelectorAll("[data-category]").forEach((item) => {
      item.classList.toggle("category-active", item === button);
    });
  });
});

function showHashRoute() {
  const route = location.hash.slice(1);
  showMessage(route === "program" || route === "about" ? route : "");
}
window.addEventListener("hashchange", showHashRoute);
showHashRoute();
