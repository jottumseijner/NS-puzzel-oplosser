const input = document.getElementById("stationInput");
const button = document.getElementById("searchButton");
const resultBox = document.getElementById("result");

// Replace this with your actual GitHub raw CSV path:
const CSV_URL = "https://raw.githubusercontent.com/jottumseijner/NS-puzzel-oplosser/main/stations.csv";

// Helper: Normalize and sort station name into lowercase string
function normalize(str) {
  return str
    .toLowerCase()
    .split("")
    .filter((c) => /[a-z]/.test(c))
    .sort()
    .join("");
}

// Fetch and parse CSV
async function fetchStations() {
  const response = await fetch(CSV_URL);
  const text = await response.text();
  return text.split("\n").map((line) => line.trim()).filter(Boolean);
}

// Main function to handle search
async function handleSearch() {
  const userInput = input.value;
  const normalizedInput = normalize(userInput);
  const stations = await fetchStations();

  for (const station of stations) {
    const clean = station.trim();
    const normalizedStation = normalize(clean);

    if (normalizedStation === normalizedInput) {
      resultBox.textContent = `Found station: ${clean}`;
      return;
    }
  }

  resultBox.textContent = "Station not found";
}

// Trigger on click
button.addEventListener("click", handleSearch);

// Optional: allow Enter key to submit
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    handleSearch();
  }
});