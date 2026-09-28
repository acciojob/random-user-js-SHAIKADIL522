//your code here
const API_URL = "https://randomuser.me/api/";

const photoEl = document.getElementById("photo");
const nameEl = document.getElementById("name");
const infoEl = document.getElementById("info");
const getUserBtn = document.getElementById("getUser");
const attrButtons = document.querySelectorAll("button[data-attr]");

let currentUser = null;

function renderUser(user) {
  photoEl.src = user.picture.large;
  nameEl.textContent = `${user.name.first} ${user.name.last}`;
  infoEl.textContent = ""; // age, email, phone hidden by default
}

function showAttr(attr) {
  if (!currentUser) return;

  const values = {
    age: currentUser.dob.age,
    email: currentUser.email,
    phone: currentUser.phone,
  };

  infoEl.textContent = values[attr]; // replaces whatever was shown before
}

async function fetchUser() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    currentUser = data.results[0];
    renderUser(currentUser);
  } catch (err) {
    console.error("Failed to fetch user:", err);
  }
}

attrButtons.forEach((btn) => {
  btn.addEventListener("click", () => showAttr(btn.dataset.attr));
});

getUserBtn.addEventListener("click", fetchUser);

fetchUser(); // initial load