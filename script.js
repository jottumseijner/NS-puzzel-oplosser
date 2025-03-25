const input = document.getElementById("stationInput");
const button = document.getElementById("searchButton");
const resultBox = document.getElementById("result");

const CSV_URL = "stations.csv"; // Local file in same folder as index.html

function normalize(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z]/g, "") // Keep only letters
    .split("")
    .sort()
    .join("");
}

async function fetchStations() {
  try {
    const response = await fetch(CSV_URL);
    if (!response.ok) throw new Error("CSV fetch failed");
    const text = await response.text();
    return text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  } catch (err) {
    console.error("Error fetching CSV:", err);
    return [];
  }
}

async function handleSearch() {
  const userInput = input.value.trim();
  const normalizedInput = normalize(userInput);
  const stations = await fetchStations();

  console.log("User input:", userInput);
  console.log("Normalized input:", normalizedInput);
  console.log("Stations loaded:", stations.slice(0, 10), "...");

  for (const station of stations) {
    const cleaned = station.trim();
    const normalizedStation = normalize(cleaned);
    
    if (normalizedStation === normalizedInput) {
      resultBox.textContent = `Found station: ${cleaned}`;
      return;
    }
  }

  resultBox.textContent = "Station not found";
}

button.addEventListener("click", handleSearch);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSearch();
});