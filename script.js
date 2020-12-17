let gridSize = 16;
const sketchArea = document.querySelector('.sketch-area');

for (let i=0; i<(gridSize**2); i++) {
    let pixel = document.createElement('div');
    pixel.className = 'pixel';
    sketchArea.appendChild(pixel);
}

