export default class Fire {
	constructor(fireWidth, fireHeight,fireCanvas) {
		this.firePixelArray = [];
		this.fireWidth = fireWidth;
		this.fireHeight = fireHeight;
		this.fireCanvas = document.getElementById(fireCanvas);
	}

	createFireDataStructure() {
		const numberOfPixels = this.fireWidth * this.fireHeight;
		for (let i = 0; i < numberOfPixels; i++) {
			this.firePixelArray[i] = 0;
		}
	}

	calculateFirePropagation() {

	}

	renderFire() {
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
				// elements and calcuated index for columns, as we have a linear array
				const tableCell = document.createElement('td');
				const divPixelIndex = document.createElement('div');
				const firePixelIndex = column + (this.fireWidth * rowIndex);
				// inserting content and style for each cell (also to its index label)
				divPixelIndex.classList.add('pixel-index');
				divPixelIndex.innerText = firePixelIndex;
				tableCell.innerText = this.firePixelArray[firePixelIndex];
				// rendering
				tableCell.appendChild(divPixelIndex);
				tableRow.appendChild(tableCell);
			};
			table.appendChild(tableRow);
		});
		this.fireCanvas.appendChild(table);
	}
	createFireSource() {
		//loop to add/update values only for the last row
		for (let column = 0; column <= this.fireWidth; column++) {
			const overFlowPixelIndex = this.fireWidth * this.fireHeight;
			const lastLinePixelsIndex = (overFlowPixelIndex - this.fireWidth) + column;
			this.firePixelArray[lastLinePixelsIndex] = 36;
		}

	}

	init() {
		this.createFireDataStructure();
		this.createFireSource();
		console.log(this.firePixelArray);
		this.renderFire();
	}
}
