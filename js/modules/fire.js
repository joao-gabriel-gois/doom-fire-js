export default class Fire {
	constructor(fireWidth, fireHeight, fireCanvasElement) {
		this.firePixelArray = [];
		this.fireWidth = fireWidth;
		this.fireHeight = fireHeight;
		this.fireCanvasArea = fireWidth * fireHeight;
		this.fireCanvasElement = document.getElementById(fireCanvasElement);
		this.fireColorsPalette = [
			{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},
			{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7}, {"r":175,"g":63,"b":7},
			{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7}, {"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},
			{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},
			{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},
			{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},
			{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},
			{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}
		] // this.fireColorsPalette.length === 37
		this.btn =  document.querySelector('button');
		this.onClick = this.onClick.bind(this);
	}

	createFireDataStructure() {
		for (let i = 0; i < this.fireCanvasArea; i++) {
			this.firePixelArray[i] = 0;
		}
	}

	calculateFirePropagation(debug) {
		for (let column = 0; column < this.fireWidth; column++) {
			for (let row = 0; row < this.fireHeight; row++) {
				const firePixelIndex = column + (this.fireWidth * row);// linear data struct(array), a full width moves 1 column down
				this.updateFireIntensityPerPixel(firePixelIndex);
			}
		}
		const oldTableContent = this.fireCanvasElement;
		if (oldTableContent.children.length === 1) oldTableContent.lastChild.remove();
		else if (oldTableContent.children.length > 1) {
			oldTableContent.firstChild.remove();
			oldTableContent.lastChild.remove();
		}
		this.renderFire(debug);
	}

	updateFireIntensityPerPixel(currentPixelIndex) {
		const bellowPixelIndex = currentPixelIndex + this.fireWidth;// same linear logic for moving through columns
		if (bellowPixelIndex >= this.fireCanvasArea) return;
		
		const decay = Math.round(Math.random() * 1.25 + .45);
		const bellowPixelFireIntensity = this.firePixelArray[bellowPixelIndex];
		this.firePixelArray[currentPixelIndex] = (bellowPixelFireIntensity - decay) >= 0 ? bellowPixelFireIntensity - decay : 0;
	}

	renderFire(debug) {
		// need to figure out how to shrink this method
		// next exercise after refactoring
		const table = document.createElement('table');
		table.setAttribute('cellpadding', 0);
		table.setAttribute('cellspacing', 0);
		for (let row = 0; row < this.fireHeight; row++) {
			const tableRow = document.createElement('tr');
			table.appendChild(tableRow);
		}
		const allTableRows = [...table.children];
		allTableRows.forEach((tableRow, rowIndex) => {
			for (let column = 0; column < this.fireWidth; column++) {
				// elements and calculated index for columns, as we have a linear array
				const tableCell = document.createElement('td');
				const divPixelIndex = document.createElement('div');
				const firePixelIndex = column + (this.fireWidth * rowIndex);
				const fireIntensity = this.firePixelArray[firePixelIndex];
				// inserting content and style for each cell (also to its index label, for debug case)
				const color = this.fireColorsPalette[fireIntensity];
				const colorString = `rgb(${color.r}, ${color.g}, ${color.b})`;
				if (debug) {
					table.style.background = '#222';// 1/3 devil
					divPixelIndex.classList.add('pixel-index');
					divPixelIndex.innerText = firePixelIndex;
					tableCell.style.width = '7px';
					tableCell.style.height = '7px';
					tableCell.style.color = colorString;
					tableCell.innerText = fireIntensity;
				} else {
					table.background = '#fff';
					tableCell.style.backgroundColor = colorString;
				}
				// rendering
				tableCell.appendChild(divPixelIndex);
				tableRow.appendChild(tableCell);
			};
			table.appendChild(tableRow);
		});
		this.fireCanvasElement.appendChild(table);
	}

	createFireSource() {
		//loop to add/update values only for the last row
		for (let column = 0; column <= this.fireWidth; column++) {
			const lastLinePixelsIndex = (this.fireCanvasArea - this.fireWidth) + column;
			this.firePixelArray[lastLinePixelsIndex] = 36;
		}
	}

	onClick(event) {
		event.preventDefault();
		this.btn.classList.toggle('active');
		[...this.fireCanvasElement.children].forEach(child => {
			child.remove();
		});
		this.btn.removeEventListener('click', this.onClick);
		clearInterval(this.interval, 8);
		if (this.btn.classList.contains('active')) {
			this.btn.innerText = 'see fire animation';
			this.init(true);
		} else {
			this.btn.innerText = 'see data structure';
			this.init();
		}			
	}

	addTogleViewEvent() {
		this.btn.addEventListener('click', this.onClick);
	}

	init(debug, isFirstInit) {
		this.addTogleViewEvent();
		if (isFirstInit) {
			this.createFireDataStructure();
			this.createFireSource();
		}
		this.calculateFirePropagation(debug);
		this.interval = setInterval(() => this.calculateFirePropagation(debug), 80);
	}
};


