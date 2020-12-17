const sketchAreaSize = 400;
let gridSize = 16;
let selectedColor = darkenColor;

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
    event.target.style.backgroundColor = selectedColor(event);    
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

//randomizes a color
function rainbowColor(){
    let value1 = Math.floor(Math.random() * 255);
    let value2 = Math.floor(Math.random() * 255);
    let value3 = Math.floor(Math.random() * 255);
    let color = `rgb(${value1},${value2},${value3})`
    return color;
};

function darkenColor(event){
        currentColor = event.target.style.backgroundColor;
        if(currentColor){
            decimal = currentColor.indexOf('.');
            if (decimal<0){return currentColor};
            alpha = currentColor.substr(decimal-1,3);
            newAlpha = (+alpha + 0.1).toString();
            newColor = currentColor.replace(alpha, newAlpha);
        }else{
            newColor = 'rgba(0,0,0,0.1)'
        };
        return newColor;
}