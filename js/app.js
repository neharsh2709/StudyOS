/* ==========================================
   StudyOS
   Developed by Neharsh Shende
========================================== */

// Welcome message
console.log("🚀 StudyOS Loaded Successfully!");
console.log("Designed & Developed by Neharsh Shende");

// Dashboard Greeting
const hour = new Date().getHours();
let greeting = "Welcome";

if (hour < 12) {
    greeting = "Good Morning ☀️";
} else if (hour < 17) {
    greeting = "Good Afternoon 🌤️";
} else {
    greeting = "Good Evening 🌙";
}

const heading = document.querySelector("header h2");

if (heading) {
    heading.textContent = greeting + ", Neharsh!";
}

// Quotes
const quotes = [
    "Success doesn't come from what you do occasionally. It comes from what you do consistently.",
    "Discipline is stronger than motivation.",
    "Small progress every day adds up to big results.",
    "Dream big. Work hard. Stay humble.",
    "Your future is created by what you do today.",
    "Consistency beats talent when talent doesn't work hard."
];

const quoteText = document.querySelector(".quote p");

if (quoteText) {
    const random = Math.floor(Math.random() * quotes.length);
    quoteText.textContent = quotes[random];
}

// Footer Year
const footer = document.querySelector("footer");

if (footer) {
    footer.innerHTML =
        `© ${new Date().getFullYear()} StudyOS • Designed & Developed by <strong>Neharsh Shende</strong>`;
}