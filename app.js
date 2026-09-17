// Categories data
const categories = [
  { name: "Restaurants", icon: "🍽️" },
  { name: "Hotels", icon: "🏨" },
  { name: "Beauty Spa", icon: "💅" },
  { name: "Home Decor", icon: "🛋️" },
  { name: "Wedding", icon: "💍" },
  { name: "Education", icon: "📚" },
  { name: "Rent & Hire", icon: "🔑" },
  { name: "Hospitals", icon: "🏥" },
  { name: "Contractors", icon: "🔧" },
  { name: "Pet Shops", icon: "🐾" },
  { name: "PG / Hostel", icon: "🛏️" },
  { name: "Estate Agent", icon: "🏠" },
  { name: "Dentists", icon: "🦷" },
  { name: "Gym", icon: "💪" },
  { name: "Loans", icon: "💰" },
  { name: "Events", icon: "🎉" },
  { name: "Driving School", icon: "🚗" },
  { name: "Packers & Movers", icon: "📦" },
];

// Toast helper
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

// Render categories
function renderCategories() {
  const grid = document.getElementById("categoryGrid");
  if (!grid) return;
  grid.innerHTML = categories
    .map(
      (c) => `
    <div class="category-card" data-name="${c.name}">
      <div class="category-icon">${c.icon}</div>
      <div class="category-name">${c.name}</div>
    </div>
  `
    )
    .join("");

  grid.querySelectorAll(".category-card").forEach((card) => {
    card.addEventListener("click", () => {
      const name = card.dataset.name;
      document.getElementById("searchQuery").value = name;
      showToast(`Searching for "${name}" near you…`);
      // In a real app this would navigate to results
    });
  });
}

// Search interactions
function initSearch() {
  const searchBtn = document.getElementById("searchBtn");
  const queryInput = document.getElementById("searchQuery");
  const locationInput = document.getElementById("searchLocation");

  function doSearch() {
    const q = queryInput.value.trim() || "local businesses";
    const loc = locationInput.value.trim() || "your area";
    showToast(`Searching "${q}" in ${loc}…`);
  }

  searchBtn?.addEventListener("click", doSearch);
  queryInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") doSearch();
  });
  locationInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") doSearch();
  });

  // Quick tags
  document.querySelectorAll(".tag").forEach((tag) => {
    tag.addEventListener("click", () => {
      queryInput.value = tag.dataset.q;
      doSearch();
    });
  });
}

// Header scroll effect
function initHeader() {
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// Mobile menu
function initMobileMenu() {
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");
  menuBtn?.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  // Close on link click
  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });
}

// Listing form
function initForm() {
  const form = document.getElementById("listingForm");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("🎉 Thanks! We'll contact you shortly to complete your free listing.");
    form.reset();
  });
}

// Login button
function initLogin() {
  document.getElementById("loginBtn")?.addEventListener("click", () => {
    showToast("Login coming soon — stay tuned!");
  });
}

// Init everything
document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  initSearch();
  initHeader();
  initMobileMenu();
  initForm();
  initLogin();
});
