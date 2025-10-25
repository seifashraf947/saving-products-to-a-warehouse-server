const theme1 = document.getElementById("theme1");
const theme2 = document.getElementById("theme2");
const theme3 = document.getElementById("theme3");

const btn1 = document.getElementById("style1Btn");
const btn2 = document.getElementById("style2Btn");
const btn3 = document.getElementById("style3Btn");
const colorOptions = document.querySelectorAll(".colorOption");

// Activate selected theme
function activateTheme(themeName) {
  theme1.disabled = themeName !== "theme1";
  theme2.disabled = themeName !== "theme2";
  theme3.disabled = themeName !== "theme3";

  // Reset body background when leaving style3
  if (themeName !== "theme3") {
    document.body.style.background = ""; // remove inline color
    localStorage.removeItem("bgColor");
  }

  localStorage.setItem("selectedTheme", themeName);

  btn1.style.display = themeName === "theme1" ? "none" : "inline-block";
  btn2.style.display = themeName === "theme2" ? "none" : "inline-block";
  btn3.style.display = themeName === "theme3" ? "none" : "inline-block";
}

// Buttons
btn1.onclick = () => activateTheme("theme1");
btn2.onclick = () => activateTheme("theme2");
btn3.onclick = () => activateTheme("theme3");

// Color picker (works only for style3)
colorOptions.forEach(option => {
  option.addEventListener("click", () => {
    const color = option.getAttribute("data-color");

    // Apply color only if style3 is active
    const currentTheme = localStorage.getItem("selectedTheme");
    if (currentTheme === "theme3") {
      document.body.style.background = color;
      localStorage.setItem("bgColor", color);
    }
  });
});

// Load saved theme and color
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("selectedTheme") || "theme1";
  const savedColor = localStorage.getItem("bgColor");

  activateTheme(savedTheme);

  // Only apply color if style3 is active
  if (savedTheme === "theme3" && savedColor) {
    document.body.style.background = savedColor;
  }
});

const colorPicker = document.getElementById("colorPicker");
const toggleBtn = document.getElementById("togglePicker");

toggleBtn.addEventListener("click", () => {
  colorPicker.classList.toggle("open");
});









