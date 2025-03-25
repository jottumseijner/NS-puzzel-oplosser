let stations = [];

// Load CSV and extract station names
fetch('stations.csv')
  .then(response => response.text())
  .then(data => {
    const rows = data.trim().split('\n');
    // Assume first row is header, skip it
    for (let i = 1; i < rows.length; i++) {
      const columns = rows[i].split(',');
      const stationName = columns[0].trim(); // adjust index if needed
      stations.push(stationName);
    }
  });

function sortString(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z]/g, '')
    .split('')
    .sort()
    .join('');
}

function searchStation() {
  const input = document.getElementById('stationInput').value;
  const sortedInput = sortString(input);
  let match = null;

  for (let station of stations) {
    const sortedStation = sortString(station);
    if (sortedStation === sortedInput) {
      match = station;
      break;
    }
  }

  const result = document.getElementById('result');
  if (match) {
    result.textContent = `Found station: ${match}`;
    result.classList.add('found');
  } else {
    result.textContent = `Station not found`;
    result.classList.remove('found');
  }
}