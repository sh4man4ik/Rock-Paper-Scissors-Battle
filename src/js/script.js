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
		this.elementSpeedX = randomSpeed();
		this.elementSpeedY = randomSpeed();
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

function randomSpeed() {
	let randomSpeed;

	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		randomSpeed = Math.random() * 2 - 1;

		if (randomSpeed < 0.3 && randomSpeed > -0.3) {
			randomSpeed = Math.random() < 0.5 ? 1 : -1;
		}
	} else {
		randomSpeed = Math.random() * 1.6 - 0.8;

		if (randomSpeed < 0.1 && randomSpeed > -0.1) {
			randomSpeed = Math.random() < 0.5 ? 0.8 : -0.8;
		}
	}

	return randomSpeed;
}

//create rock
function createRockElement() {
	let rockElement = document.createElement('div');
	rockElement.classList.add('rock', 'element');
	battleZone.appendChild(rockElement);

	return rockElement;
}
function createRock() {
	let rockElement = createRockElement();
	let elementX;
	let elementY;

	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		elementX = rockElement.offsetWidth / 2 + 5;
		elementY = window.innerHeight * 0.15;
	} else {
		elementX = window.innerWidth * 0.15;
		elementY = rockElement.offsetWidth / 2 + 5;
	}

	let rock = new Element(rockElement, elementX, elementY);
	elementsArray.push(rock);
}

//create paper
function createPaperElement() {
	let paperElement = document.createElement('div');
	paperElement.classList.add('paper', 'element');
	battleZone.appendChild(paperElement);

	return paperElement;
}
function createPaper() {
	let paperElement = createPaperElement();
	let elementX;
	let elementY;

	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		elementX = paperElement.offsetWidth / 2 + 5;
		elementY = window.innerHeight * 0.85;
	} else {
		elementX = window.innerWidth * 0.85;
		elementY = paperElement.offsetWidth / 2 + 5;
	}

	let paper = new Element(paperElement, elementX, elementY);
	elementsArray.push(paper);
}

//create scissors
function createScissorsElement() {
	let scissorsElement = document.createElement('div');
	scissorsElement.classList.add('scissors', 'element');
	battleZone.appendChild(scissorsElement);

	return scissorsElement;
}
function createScissors() {
	let scissorsElement = createScissorsElement();
	let elementX;
	let elementY;

	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		elementX = window.innerWidth - scissorsElement.offsetWidth / 2 - 5;
		elementY = window.innerHeight / 2;
	} else {
		elementX = window.innerWidth / 2;
		elementY = window.innerHeight - scissorsElement.offsetWidth / 2 - 5;
	}

	let scissors = new Element(scissorsElement, elementX, elementY);
	elementsArray.push(scissors);
}

//draw all
function animate() {
	for (let element of elementsArray) {
		element.updateElementPosition();
		element.drawElement();
	}

	newClassNames();

	requestAnimationFrame(animate);
}

//control
function newClassNames() {
	for (let i = 0; i < elementsArray.length - 1; i++) {
		for (let j = i + 1; j < elementsArray.length; j++) {
			let element1 = elementsArray[i].element;
			let element2 = elementsArray[j].element;

			if (checkContact(element1, element2)) {
				if (element1.className != element2.className) {
					if (element1.classList.contains('rock') && element2.classList.contains('paper')) {
						element1.classList.remove('rock');
						element1.classList.add('paper');
					} else if (element1.classList.contains('rock') && element2.classList.contains('scissors')) {
						element2.classList.remove('scissors');
						element2.classList.add('rock');
					} else if (element1.classList.contains('paper') && element2.classList.contains('rock')) {
						element2.classList.remove('rock');
						element2.classList.add('paper');
					} else if (element1.classList.contains('paper') && element2.classList.contains('scissors')) {
						element1.classList.remove('paper');
						element1.classList.add('scissors');
					} else if (element1.classList.contains('scissors') && element2.classList.contains('rock')) {
						element1.classList.remove('scissors');
						element1.classList.add('rock');
					} else if (element1.classList.contains('scissors') && element2.classList.contains('paper')) {
						element2.classList.remove('paper');
						element2.classList.add('scissors');
					}
				}
			}
		}
	}
}

function checkContact(element1, element2) {
	let elementCoordinates1 = element1.getBoundingClientRect();
	let elementCoordinates2 = element2.getBoundingClientRect();

	let elementX1 = elementCoordinates1.left + elementCoordinates1.width / 2;
	let elementY1 = elementCoordinates1.top + elementCoordinates1.height / 2;
	let elementX2 = elementCoordinates2.left + elementCoordinates2.width / 2;
	let elementY2 = elementCoordinates2.top + elementCoordinates2.height / 2;

	let distanceX = elementX1 - elementX2;
	let distanceY = elementY1 - elementY2;
	let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

	let radiusSum = element1.clientWidth / 2 + element2.clientWidth / 2;

	return distance + 5 < radiusSum;
}

//start
function createElements() {
	//1-25
	let rockNumber = 25;
	let paperNumber = 25;
	let scissorsNumber = 25;

	for (let i = 0; i < rockNumber; i++) {
		createRock();
	}
	for (let i = 0; i < paperNumber; i++) {
		createPaper();
	}
	for (let i = 0; i < scissorsNumber; i++) {
		createScissors();
	}

	animate();
}
createElements();
