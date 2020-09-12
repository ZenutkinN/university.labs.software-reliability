const NvpMvVoiting = (arrOfInputs, epsilon) => {
	const agreementMatrix = getAgreementMatrix(arrOfInputs, epsilon);
	const newAgreementMatrix = getEquivalentMatrix(agreementMatrix);

	return getCorrectVersionSet(newAgreementMatrix, arrOfInputs);
};

module.exports = NvpMvVoiting;

function getAgreementMatrix(arrOfInputs, epsilon) {
	const agreementMatrix = [];

	arrOfInputs.forEach((Xi) => {
		const row = [];

		arrOfInputs.forEach((Xj) => {
			if (Math.abs(Xi - Xj) <= epsilon) {
				row.push(1);
			} else {
				row.push(0);
			}
		});

		agreementMatrix.push(row);
	});

	return agreementMatrix;
}

function getEquivalentMatrix(agreementMatrix) {
	if (isEquivalentMatrix(agreementMatrix)) return agreementMatrix;

	const newAgreementMatrix = applyBooleanComposition(agreementMatrix);

	return getEquivalentMatrix(newAgreementMatrix);
}

function isEquivalentMatrix(agreementMatrix) {
	return (
		isReflexivity(agreementMatrix) &&
		isSemmetricity(agreementMatrix) &&
		isTransitivity(agreementMatrix)
	);
}

function isReflexivity(agreementMatrix) {
	return agreementMatrix.every((elem, idx, matrix) => matrix[idx][idx] === 1);
}

function isSemmetricity(agreementMatrix) {
	return agreementMatrix.every((matrixRow, i, matrix) => {
		return matrixRow.every((empty1, j) => matrix[i][j] === matrix[j][i]);
	});
}

function isTransitivity(agreementMatrix) {
	return agreementMatrix.every((matrixRow, i, matrix) => {
		return matrixRow.every((empty1, j) => {
			return matrix.every((empty2, k) => {
				const Rik = matrix[i][k];
				const Rkj = matrix[k][j];
				const Rij = matrix[i][j];

				if (Rik === 1 && Rkj === 1) return Rij === 1;

				return true;
			});
		});
	});
}

function applyBooleanComposition(agreementMatrix) {
	return unionBooleanMatrix(agreementMatrix, multBooleanMatrix(agreementMatrix));
}

function multBooleanMatrix(agreementMatrix) {
	const matrixRank = agreementMatrix.length;
	const newMatrix = [];

	for (let i = 0; i < matrixRank; i++) {
		const row = [];

		for (let j = 0; j < matrixRank; j++) {
			const operands = [];

			for (let k = 0; k < matrixRank; k++) {
				const Rik = agreementMatrix[i][k];
				const Rkj = agreementMatrix[k][j];
				operands.push(Rik & Rkj);
			}

			const Rij = operands.reduce((acc, operand) => acc | operand);
			row.push(Rij);
		}

		newMatrix.push(row);
	}

	return newMatrix;
}

function unionBooleanMatrix(A, B) {
	return A.map((row, i) => row.map((empty, j) => A[i][j] | B[i][j]));
}

function getCorrectVersionSet(agreementMatrix, arrOfInputs) {
	const analizData = getAnalizMatrixData(agreementMatrix);
	const dif = Math.ceil((agreementMatrix.length + 1) / 2);
	const correctVersionIdx = analizData.filter((elem) => elem.numOfOne >= dif)[0].onePos;

	return arrOfInputs.filter((empty, idx) => correctVersionIdx.includes(idx));
}

function getAnalizMatrixData(agreementMatrix) {
	return agreementMatrix.map((row, rowNum) => {
		const onePos = [];
		let numOfOne = 0;

		row.forEach((elem, pos) => {
			if (elem === 1) {
				numOfOne++;
				onePos.push(pos);
			}
		});

		return { numOfOne, onePos };
	});
}

// const matrix = [
// 	[1, 1, 0, 0, 0],
// 	[1, 1, 0, 0, 1],
// 	[0, 0, 1, 1, 0],
// 	[0, 0, 1, 1, 0],
// 	[0, 1, 0, 0, 1],
// ];

// console.log(NvpMvVoiting([1.5531, 1.5533, 1.5544, 1.5546, 1.5537], 0.0005));
