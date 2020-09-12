const Heap = require('./Heap');

module.exports = class MinHeap extends Heap {
	pairIsInCorrectOrder(firstElement, secondElement) {
		return this.compare.lessThanOrEqual(firstElement, secondElement);
	}
};
