const MAX_GRID_SIZE = 500;
let PEN_COLOR = "black";
let RAINBOW_MODE = false;
let LBUTTON_CLICKED = false;

function getRandomValue(max) {
	return Math.floor(Math.random() * max);
}

function getBackgroundColor(random) {
	if (!LBUTTON_CLICKED) {
		return;
	}
	if (RAINBOW_MODE) {
		return `rgb(${getRandomValue(256)}, ${getRandomValue(
			256
		)}, ${getRandomValue(256)})`;
	} else {
		return PEN_COLOR;
	}
}

function addEventListeners() {
	let cells = document.querySelectorAll(".cell");

	cells.forEach((cell) => {
		cell.addEventListener("mouseenter", (event) => {
			cell.style.backgroundColor = `${getBackgroundColor()}`;
		});
	});
}

function generateGrid(cellPerColumn) {
	let cellSize = MAX_GRID_SIZE / cellPerColumn;
	let container = document.createElement("div");
	container.classList.add("container");
	for (let column = 0; column < cellPerColumn; column++) {
		let columnn = document.createElement("div");
		columnn.classList.add("column");
		for (let row = 0; row < cellPerColumn; row++) {
			let cell = document.createElement("div");
			cell.classList.add("cell");
			cell.style.height = `${cellSize}px`;
			cell.style.width = `${cellSize}px`;
			columnn.appendChild(cell);
		}
		container.appendChild(columnn);
	}
	let oldContainer = document.querySelector(".container");
	let body = document.querySelector("main");
	body.removeChild(oldContainer);
	body.appendChild(container);
}

let changeButton = document.querySelector("#grid-changer");
let rainbowButton = document.querySelector("#rainbow-color");
let noRainbowButton = document.querySelector("#single-color");
let resetButton = document.querySelector("#reset-button");
let penColorButton = document.querySelector("#pen");

resetButton.onclick = function () {
	let cells = document.querySelectorAll(".cell");

	cells.forEach((cell) => {
		cell.style.backgroundColor = "white";
	});
};

rainbowButton.addEventListener("click", () => {
	noRainbowButton.classList.remove("selected");
	rainbowButton.classList.add("selected");
	RAINBOW_MODE = true;
});

noRainbowButton.addEventListener("click", () => {
	rainbowButton.classList.remove("selected");
	noRainbowButton.classList.add("selected");
	RAINBOW_MODE = false;
});

penColorButton.onchange = function () {
	PEN_COLOR = penColorButton.value;
};

changeButton.addEventListener("click", () => {
	let cellPerColumn = Number.parseInt(
		window.prompt("Enter the size for grid (upto 100)", 64)
	);
	if (cellPerColumn > 100 || cellPerColumn < 1) {
		alert("Please enter value between 1 to 100");
	} else {
		generateGrid(cellPerColumn);
		addEventListeners();
	}
});

generateGrid(64);
addEventListeners();

document.querySelector(".date").innerHTML = new Date().getFullYear();

window.addEventListener("mousedown", () => {
	LBUTTON_CLICKED = true;
});

window.addEventListener("mouseup", () => {
	LBUTTON_CLICKED = false;
});
