const colorValues = {

red: { r: 255, g : 0, b: 0 },
blue: { r: 0, g : 0, b: 255 },
yellow: { r: 255, g : 255, b: 0 },
orange: { r: 255, g : 165, b: 0 },
green: { r: 0, g : 128, b: 0 }

};

const colorNames = [
{ name: "Rojo", r: 255, g: 0, b: 0 },
{ name: "Azul", r: 0, g: 0, b: 255 },
{ name: "Amarillo", r: 255, g: 255, b: 0 },
{ name: "Naranja", r: 255, g: 165, b: 0 },
{ name: "Verde", r: 0, g: 128, b: 0 },
{ name: "Morado", r: 128, g: 0, b: 128 },
{ name: "Marrón", r: 128, g: 64, b: 0 },
{ name: "Gris", r: 128, g: 128, b: 128 },
{ name: "Azul petróleo", r: 0, g: 64, b: 128 },
{ name: "Amarillo dorado", r: 255, g: 210, b: 0 },
{ name: "Verde lima", r: 128, g: 192, b: 0 },
{ name: "Verde musgo", r: 128, g: 146, b: 0 },
{ name: "Rojo anaranjado", r: 255, g: 82, b: 0 },
{ name: "Morado oscuro", r: 128, g: 82, b: 128 }
];

let droppedColors = [];

document.querySelectorAll(".color-box").forEach(box => { 
    box.addEventListener("dragstart", e => { e.dataTransfer.setData("color", box.dataset.color); 
    });
});

const mixArea = document.getElementById("mixArea");
const result = document.getElementById("result");

mixArea.addEventListener("dragover", e => { e.preventDefault();
    e.preventDefault();
});

const colorNameEl = document.getElementById("colorLabel");

mixArea.addEventListener("drop", e => { 
    e.preventDefault();
    const color = e.dataTransfer.getData("color");
    droppedColors.push(color);

    if (droppedColors.length === 2 ) {
    mixColors(droppedColors[0], droppedColors[1]);
    droppedColors = [];

    mixArea.style.outline = "none";
    setTimeout(() => {
      mixArea.style.outline = "2px dashed #555";
    }, 30);

    }
});

function mixColors(c1, c2) {
  const color1 = colorValues[c1];
  const color2 = colorValues[c2];

  const mixed = {
    r: Math.round((color1.r + color2.r) / 2),
    g: Math.round((color1.g + color2.g) / 2),
    b: Math.round((color1.b + color2.b) / 2),
  };

  result.style.backgroundColor = `rgb(${mixed.r}, ${mixed.g}, ${mixed.b})`;

  const name = getClosestColorName(mixed.r, mixed.g, mixed.b);
  colorNameEl.innerText = name;
}


function getClosestColorName(r, g, b) {
  let closest = null;
  let minDistance = Infinity;

  for (let color of colorNames) {
    const distance =
    Math.pow(r - color.r, 2) +
    Math.pow(g - color.g, 2) +
    Math.pow(b - color.b, 2);

    if (distance < minDistance) {
    minDistance = distance;
    closest = color.name;
    }
}

return closest;
}