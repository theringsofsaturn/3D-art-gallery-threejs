// paintingInfo.js
export function displayPaintingInfo(info) {
  const infoElement = document.getElementById('painting-info');
  infoElement.innerHTML = `
    <h3>${info.title}</h3>
    <p>Artist: ${info.artist}</p>
    <p>Year: ${info.year}</p>
  `;
  infoElement.classList.add('show');
}

export function hidePaintingInfo() {
  const infoElement = document.getElementById('painting-info');
  infoElement.classList.remove('show');
}
