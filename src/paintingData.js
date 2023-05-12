export const paintingData = [
  // Front Wall
  ...Array.from({ length: 4 }, (_, i) => ({
    imgSrc: `artworks/${i + 1}.jpg`,
    width: 5,
    height: 3,
    position: { x: -15 + 10 * i, y: 2, z: -19.5 },
    rotationY: 0,
    info: {
      title: `Painting ${i + 1}`,
      artist: `Artist ${i + 1}`,
      description: `Description ${i + 1}`,
      year: `Year ${i + 1}`,
    },
  })),
  // Back Wall
  ...Array.from({ length: 4 }, (_, i) => ({
    imgSrc: `artworks/${i + 5}.jpg`,
    width: 5,
    height: 3,
    position: { x: -15 + 10 * i, y: 2, z: 19.5 },
    rotationY: Math.PI,
    info: {
      title: `Painting ${i + 5}`,
      artist: `Artist ${i + 5}`,
      year: `Year ${i + 5}`,
    },
  })),
  // Left Wall
  ...Array.from({ length: 4 }, (_, i) => ({
    imgSrc: `artworks/${i + 9}.jpg`,
    width: 5,
    height: 3,
    position: { x: -19.5, y: 2, z: -15 + 10 * i },
    rotationY: Math.PI / 2,
    info: {
      title: `Painting ${i + 9}`,
      artist: `Artist ${i + 9}`,
      year: `Year ${i + 9}`,
    },
  })),
  // Right Wall
  ...Array.from({ length: 4 }, (_, i) => ({
    imgSrc: `artworks/${i + 13}.jpg`,
    width: 5,
    height: 3,
    position: { x: 19.5, y: 2, z: -15 + 10 * i },
    rotationY: -Math.PI / 2,
    info: {
      title: `Painting ${i + 13}`,
      artist: `Artist ${i + 13}`,
      year: `Year ${i + 13}`,
    },
  })),
];
