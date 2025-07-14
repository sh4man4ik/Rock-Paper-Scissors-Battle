//data
let battleZone = document.getElementById('battleZone');
let elementsArray = [];

//constructor
class Element {
	constructor(element, elementX, elementY) {
		this.element = element;
		this.elementRadius = element.offsetWidth / 2;
		this.inaccuracy = 5;
		this.elementX = elementX;
		this.elementY = elementY;
		this.elementSpeedX = Math.random() * (2 - -2) + -2;
		this.elementSpeedY = Math.random() * (2 - -2) + -2;
	}

	drawElement() {
		this.element.style.left = this.elementX - this.elementRadius + 'px';
		this.element.style.top = this.elementY - this.elementRadius + 'px';
	}

	updateElementPosition() {
		this.elementX += this.elementSpeedX;
		this.elementY += this.elementSpeedY;

		if (
			this.elementX + this.elementRadius + this.inaccuracy > window.innerWidth ||
			this.elementX - this.elementRadius - this.inaccuracy < 0
		) {
			this.elementSpeedX = -this.elementSpeedX;
		}
		if (
			this.elementY + this.elementRadius + this.inaccuracy > window.innerHeight ||
			this.elementY - this.elementRadius - this.inaccuracy < 0
		) {
			this.elementSpeedY = -this.elementSpeedY;
		}
	}
}

//create rock
function createRockElement() {
	let rockElement = document.createElement('div');
	rockElement.classList.add('rock', 'element');
	rockElement.textContent = '🪨';
	battleZone.appendChild(rockElement);

	return rockElement;
}
function createRock() {
	let rockElement = createRockElement();
	let elementX = rockElement.offsetWidth / 2 + 5;
	let elementY = rockElement.offsetWidth / 2 + 5;
	let rock = new Element(rockElement, elementX, elementY);
	elementsArray.push(rock);
}

//create paper
function createPaperElement() {
	let paperElement = document.createElement('div');
	paperElement.classList.add('paper', 'element');
	paperElement.textContent = '📜';
	battleZone.appendChild(paperElement);

	return paperElement;
}
function createPaper() {
	let paperElement = createPaperElement();
	let elementX = window.innerWidth - paperElement.offsetWidth / 2 - 5;
	let elementY = paperElement.offsetWidth / 2 + 5;
	let paper = new Element(paperElement, elementX, elementY);
	elementsArray.push(paper);
}

//create scissors
function createScissorsElement() {
	let scissorsElement = document.createElement('div');
	scissorsElement.classList.add('scissors', 'element');
	scissorsElement.textContent = '✂️';
	battleZone.appendChild(scissorsElement);

	return scissorsElement;
}
function createScissors() {
	let scissorsElement = createScissorsElement();
	let elementX = window.innerWidth / 2;
	let elementY = window.innerHeight - scissorsElement.offsetWidth / 2 - 5;
	let scissors = new Element(scissorsElement, elementX, elementY);
	elementsArray.push(scissors);
}

//draw all
function animate() {
	for (let element of elementsArray) {
		element.updateElementPosition();
		element.drawElement();
	}

	setTimeout(animate, 10);
}

//start
function createElements() {
	let num = 10; //number of each elements

	for (let i = 0; i < num; i++) {
		createRock();
	}
	for (let i = 0; i < num; i++) {
		createPaper();
	}
	for (let i = 0; i < num; i++) {
		createScissors();
	}

	animate();
}
createElements();
