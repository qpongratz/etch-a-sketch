let gridSize = 16;
let selectedColor = "black";
const sketchArea = document.querySelector('.sketch-area');

for (let i=0; i<(gridSize**2); i++) {
    let pixel = document.createElement('div');
    pixel.className = 'pixel';
    sketchArea.appendChild(pixel);
}
setHover();

function setHover(){
    let pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        pixel.addEventListener('mouseover', changeColor);
    });
}

function changeColor(event){
    event.target.style.backgroundColor = selectedColor;    
}