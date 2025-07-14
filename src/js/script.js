let battleZone = document.getElementById('battleZone');

class Element {
	constructor(element) {
		this.element = element;
		this.elementRadius = element.offsetWidth / 2;
		this.inaccuracy = 5;
		this.elementX = element.offsetWidth / 2 + 5;
		this.elementY = element.offsetWidth / 2 + 5;
		this.elementSpeedX = 2;
		this.elementSpeedY = 2;
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

let rockElement = document.createElement('div');
rockElement.classList.add('rock');
rockElement.textContent = '🪨';
let rock = new Element(rockElement);
battleZone.appendChild(rockElement);

function animate() {
	rock.updateElementPosition();

	rock.drawElement();

	setTimeout(animate, 10);
}

animate();
