const sketchAreaSize = 400;
let gridSize = 16;
let selectedColor = rainbowColor();

const sketchArea = document.querySelector('.sketch-area');
const clear = document.querySelector('.clear');

sketchArea.style.width = `${sketchAreaSize}px`;
sketchArea.style.height = `${sketchAreaSize}px`;
createGrid();
setHover();

clear.addEventListener('click', reset)

//creates grid at gridSize
function createGrid(){
    for (let i=0; i<(gridSize**2); i++) {
        let pixel = document.createElement('div');
        pixel.className = 'pixel';
        sketchArea.appendChild(pixel);
    };
    let pixel = document.querySelector('.pixel');
    pixel.width = `${sketchAreaSize / gridSize}px`;
    pixel.height = `${sketchAreaSize / gridSize}px`;
};

//Gives all the pixel divs a color on hover.
function setHover(){
    let pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        pixel.addEventListener('mouseover', changeColor);
    });
}

//Sets background color for use in hover fucntion.
function changeColor(event){
    event.target.style.backgroundColor = rainbowColor();    
}

//resets and reinitializes the sketch area with new pixels at specified amount
function reset(){
    document.querySelectorAll('.pixel').forEach(pixel =>{
        pixel.remove();
    })
    gridSize = Math.max(Math.min(window.prompt('1-100', 16), 100), 1);
    console.log(gridSize);
    sketchArea.style.gridTemplate = `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`;
    createGrid();
    setHover();
}

function rainbowColor(){
    let value1 = Math.floor(Math.random() * 255);
    let value2 = Math.floor(Math.random() * 255);
    let value3 = Math.floor(Math.random() * 255);
    let color = `rgb(${value1},${value2},${value3})`
    return color;
};