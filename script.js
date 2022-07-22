const MAX_GRID_SIZE = 500;

function getRandomValue(max) {
	return Math.floor(Math.random() * max);
}

function addEventListeners() {
	let cells = document.querySelectorAll(".cell");

	cells.forEach((cell) => {
		cell.addEventListener("mouseenter", (event) => {
			cell.style.backgroundColor = `rgb(${getRandomValue(
				256
			)}, ${getRandomValue(256)}, ${getRandomValue(256)})`;
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
	let body = document.querySelector("body");
	body.removeChild(oldContainer);
	body.appendChild(container);
}

let changeButton = document.querySelector("#grid-changer");

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

generateGrid(50);
addEventListeners();
