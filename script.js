const input = document.getElementById("stationInput");
const button = document.getElementById("searchButton");
const resultBox = document.getElementById("result");

const CSV_URL = "stations.csv";  // Assumes this file is in the same folder as index.html

function normalize(str) {
  return str
    .toLowerCase()
    .split("")
    .filter((c) => /[a-z]/.test(c))
    .sort()
    .join("");
}

async function fetchStations() {
  const response = await fetch(CSV_URL);
  const text = await response.text();
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

async function handleSearch() {
  const userInput = input.value;
  const normalizedInput = normalize(userInput);
  const stations = await fetchStations();

  for (const station of stations) {
    const normalizedStation = normalize(station);
    if (normalizedStation === normalizedInput) {
      resultBox.textContent = `Found station: ${station}`;
      return;
    }
  }

  resultBox.textContent = "Station not found";
}

button.addEventListener("click", handleSearch);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
});