const backgroundCanvas = document.querySelector('#bg-canvas'),
	inputDotCount = document.querySelector('#dotCount'),
	inputDotSize = document.querySelector('#dotSize'),
	inputVelocityMin = document.querySelector('#velocityMin'),
	inputVelocityMax = document.querySelector('#velocityMax'),
	inputDistanceGap = document.querySelector('#distanceGap'),
	inputLineWidth = document.querySelector('#lineWidth'),
	inputDotColor = document.querySelector('#dotColor'),
	inputStrokeColor = document.querySelector('#strokeColor'),
	buttonApply = document.querySelector('#Apply');

let width = 100,
	height = 100,
	dotCount = 30,
	dotSize = 2,
	velocityMin = 1,
	velocityMax = 2,
	distanceGap = 100,
	lineWidth = 1,
	dotArray = [],
	dotColor = 'rgb(100,100,200)',
	strokeColor = 'rgb(150,150,250)';

function setSize() {
	width = window.innerWidth;
	height = window.innerHeight;
	backgroundCanvas.setAttribute('width', width);
	backgroundCanvas.setAttribute('height', height);
	ctx = backgroundCanvas.getContext('2d');
}

buttonApply.addEventListener('click', (event) => {
	event.preventDefault();
	dotCount = inputDotCount.value;
	dotSize = inputDotSize.value;
	velocityMin = inputVelocityMin.value;
	velocityMax = inputVelocityMax.value;
	distanceGap = inputDistanceGap.value;
	lineWidth = inputLineWidth.value;
	dotColor = inputDotColor.value;
	strokeColor = inputStrokeColor.value;
	restart();
});

setup();
function setup() {
	setSize();
	for (var i = 0; i < dotCount; i++) {
		var velocity = Math.random() * (velocityMax - velocityMin) + velocityMin,
			velocityAngle = Math.random() * 360,
			velocityX = Math.cos(velocityAngle) * velocity,
			velocityY = Math.sin(velocityAngle) * velocity;
		dotArray.push({
			velocity: velocity,
			velocityAngle: velocityAngle,
			velocityX: velocityX,
			velocityY: velocityY,
			locationX: Math.random() * width,
			locationY: Math.random() * height,
			show: function() {
				ctx.beginPath();
				ctx.fillStyle = dotColor;
				ctx.arc(this.locationX, this.locationY, dotSize, 0, 360);
				ctx.fill();
				ctx.closePath();
				ctx.strokeWidth = 0;
			},
			update: function() {
				this.locationX += this.velocityX;
				this.locationY += this.velocityY;
				if (this.locationX > width) this.locationX = 0;
				if (this.locationY > height) this.locationY = 0;
				if (this.locationX < 0) this.locationX = width;
				if (this.locationY < 0) this.locationY = height;
			}
		});
		dotArray[i].show();
	}
}

function update() {
	ctx.clearRect(0, 0, width, height);
	for (let i = 0; i < dotArray.length; i++) {
		const element = dotArray[i];
		element.update();
		element.show();
	}
	for (let i = 0; i < dotArray.length; i++) {
		const element = dotArray[i];
		for (let j = 0; j < dotArray.length; j++) {
			if (i !== j) {
				var distanceX = Math.abs(element.locationX - dotArray[j].locationX);
				var distanceY = Math.abs(element.locationY - dotArray[j].locationY);
				var distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
				if (distance < distanceGap) {
					ctx.strokeStyle = strokeColor;
					ctx.lineWidth = lineWidth;
					ctx.lineCap = 'round';
					ctx.stroke();
					ctx.moveTo(element.locationX, element.locationY);
					ctx.lineTo(dotArray[j].locationX, dotArray[j].locationY);
				}
			}
		}
	}
}

var updateInterval = setInterval(() => {
	update();
}, 16);

function restart() {
	dotArray = [];
	clearInterval(updateInterval);
	setup();
	updateInterval = setInterval(() => {
		update();
	}, 16);
}

inputDotCount.value = dotCount;
inputDotSize.value = dotSize;
inputVelocityMin.value = velocityMin;
inputVelocityMax.value = velocityMax;
inputDistanceGap.value = distanceGap;
inputLineWidth.value = lineWidth;
inputDotColor.value = dotColor;
inputStrokeColor.value = strokeColor;
