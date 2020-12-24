const sketchAreaWidth = 67;
const sketchAreaHeight = 61.6;
let gridSize = 16;
let tempGridSize = 16;
let selectedColor = "black";

const sketchArea = document.querySelector('.sketch-area');
const clear = document.querySelector('.clear');
const slider = document.querySelector('.slider');
const setButton = document.querySelector('.set');
const pixelCount = document.querySelector('.pixelCount');
const dropDown = document.getElementById('colors');

//Initialize Gird
sketchArea.style.width = `${sketchAreaWidth}%`;
sketchArea.style.height = `${sketchAreaHeight}%`;
sketchArea.style.gridTemplate = `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`
createGrid();
setHover();

//Set button behaviors
clear.addEventListener('click', reset);
slider.oninput = function () {
    pixelCount.textContent = this.value;
    tempGridSize = this.value;
    return;
};
setButton.addEventListener('click', changePixelSize);

//Controls which color is selected color
dropDown.oninput = function () {
    switch(this.value) {
        case 'rainbowColor':
            selectedColor = rainbowColor;
            break;
        case 'shadeColor':
            selectedColor = shadeColor;
            break;
        case 'shadeRainbow':
            selectedColor = shadeRainbow;
            break;
        default:
            selectedColor = this.value;
    }
    console.log(selectedColor);
    return;
}

//Change number of pixels and reset grid on confirm
function changePixelSize() {
    if (window.confirm("Changing pixel size will reset your art. Do you wish to continue?")) {
        gridSize = tempGridSize;
        reset();
        createGrid();
        setHover();
    }
    return;
}

//creates grid at gridSize
function createGrid() {
    for (let i = 0; i < (gridSize ** 2); i++) {
        let pixel = document.createElement('div');
        pixel.className = 'pixel';
        sketchArea.appendChild(pixel);
    };
    let pixel = document.querySelector('.pixel');
    pixel.width = `${sketchAreaWidth / gridSize}px`;
    pixel.height = `${sketchAreaHeight / gridSize}px`;
};

//Gives all the pixel divs a color on hover.
function setHover() {
    let pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        pixel.addEventListener('mouseover', changeColor);
        pixel.addEventListener('click', changeColor);
    });
}

//Sets background color for use in hover fucntion.
function changeColor(event) {
    if( typeof selectedColor === 'function'){
        event.target.style.backgroundColor = selectedColor();
    }else{
        event.target.style.backgroundColor = selectedColor;
    }
}

//resets and reinitializes the sketch area with new pixels at specified amount
function reset() {
    document.querySelectorAll('.pixel').forEach(pixel => {
        pixel.remove();
    })
    //gridSize = Math.max(Math.min(window.prompt('1-100', 16), 100), 1);
    //console.log(gridSize);
    sketchArea.style.gridTemplate = `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`;
    createGrid();
    setHover();
}

//randomizes a color
function rainbowColor() {
    const value1 = Math.floor(Math.random() * 255);
    const value2 = Math.floor(Math.random() * 255);
    const value3 = Math.floor(Math.random() * 255);
    const color = `rgba(${value1},${value2},${value3})`
    return color;
};

//raises the alpha of a pixel each pass through
function shadeColor() {
    currentColor = this.event.target.style.backgroundColor;
    if (currentColor) {
        decimal = currentColor.indexOf('.');
        if (decimal < 0) { return currentColor };
        alpha = currentColor.substr(decimal - 1, 3);
        newAlpha = (+alpha + 0.1).toString();
        newColor = currentColor.replace(alpha, newAlpha);
    } else {
        newColor = 'rgba(0,0,0,0.13)'
    };
    return newColor;
}

function shadeRainbow(){
    const currentColor = this.event.target.style.backgroundColor;
    let newColor;
    if (currentColor) {
        const decimal = currentColor.indexOf('.');
        if (decimal < 0) { return currentColor };
        const alpha = currentColor.substr(decimal - 1, 3);
        const newAlpha = (+alpha + 0.1).toString();
        newColor = currentColor.replace(alpha, newAlpha);
    } else {
        const value1 = Math.floor(Math.random() * 255);
        const value2 = Math.floor(Math.random() * 255);
        const value3 = Math.floor(Math.random() * 255);
        newColor = `rgba(${value1},${value2},${value3},0.13)` 
    };
    console.log(newColor)
    return newColor;

}