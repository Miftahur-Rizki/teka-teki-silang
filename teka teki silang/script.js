const clues = {
  across: [
      { number: 1, question: "Tempat untuk menulis atau meletakkan benda", answer: "MEJA", row: 0, col: 0 },
      { number: 3, question: "Alat untuk bekerja dan belajar secara digital", answer: "KOMPUTER", row: 0, col: 5 },
      { number: 5, question: "Ekspresi kreativitas manusia dalam berbagai bentuk", answer: "SENI", row: 2, col: 1 },
      { number: 7, question: "Tempat tinggal yang umum", answer: "RUMAH", row: 4, col: 0 },
      { number: 9, question: "Lembaran yang berisi tulisan atau gambar", answer: "BUKU", row: 6, col: 2 }
  ],
  down: [
      { number: 1, question: "Nama dagang atau label suatu produk", answer: "MEREK", row: 0, col: 0 },
      { number: 2, question: "Bentuk ekspresi kreatif seperti lukisan atau musik", answer: "SENI", row: 0, col: 2 },
      { number: 4, question: "Alat pembayaran dalam bentuk kertas atau logam", answer: "UANG", row: 1, col: 4 },
      { number: 6, question: "Semua yang ada di sekitar kita dan tidak dibuat oleh manusia", answer: "ALAM", row: 3, col: 5 },
      { number: 8, question: "Perasaan atau keinginan akan sesuatu yang diharapkan", answer: "HARAP", row: 5, col: 3 }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  createGrid();
  populateQuestions();
});

function createGrid() {
  const crosswordContainer = document.querySelector(".grid");
  const filledCells = {}; // Track cells that are part of answers

  for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 13; j++) {
          const cell = document.createElement("div");
          cell.className = "cell";
          cell.dataset.row = i;
          cell.dataset.col = j;

          const cellNumber = getCellNumber(i, j);
          if (cellNumber) {
              const numberSpan = document.createElement("span");
              numberSpan.className = "cell-number";
              numberSpan.textContent = cellNumber;
              cell.appendChild(numberSpan);
          }

          const isAnswerCell = isActiveCell(i, j);
          if (isAnswerCell) {
              const input = document.createElement("input");
              input.maxLength = 1;
              input.dataset.answer = getAnswerForCell(i, j);
              cell.appendChild(input);

              // Mark cell as filled if it's part of an answer
              filledCells[`${i},${j}`] = true;
          } else {
              // Mark cell as blank if it's not part of any answer
              cell.classList.add("blank");
          }

          crosswordContainer.appendChild(cell);
      }
  }
}

function getCellNumber(row, col) {
  const allClues = [...clues.across, ...clues.down];
  const clue = allClues.find(c => c.row === row && c.col === col);
  return clue ? clue.number : null;
}

function isActiveCell(row, col) {
  return clues.across.some(clue => row === clue.row && col >= clue.col && col < clue.col + clue.answer.length) ||
         clues.down.some(clue => col === clue.col && row >= clue.row && row < clue.row + clue.answer.length);
}

function getAnswerForCell(row, col) {
  for (const clue of clues.across) {
      if (row === clue.row && col >= clue.col && col < clue.col + clue.answer.length) {
          return clue.answer[col - clue.col];
      }
  }
  for (const clue of clues.down) {
      if (col === clue.col && row >= clue.row && row < clue.row + clue.answer.length) {
          return clue.answer[row - clue.row];
      }
  }
  return "";
}

function populateQuestions() {
  const acrossQuestions = document.getElementById("across-questions");
  const downQuestions = document.getElementById("down-questions");

  clues.across.forEach(clue => {
      const li = document.createElement("li");
      li.textContent = `${clue.number}. ${clue.question}`;
      acrossQuestions.appendChild(li);
  });

  clues.down.forEach(clue => {
      const li = document.createElement("li");
      li.textContent = `${clue.number}. ${clue.question}`;
      downQuestions.appendChild(li);
  });
}

function checkAnswers() {
  let score = 0;
  const inputs = document.querySelectorAll('.cell input');
  const maxScore = inputs.length;

  inputs.forEach(input => {
      const answer = input.dataset.answer.toUpperCase();
      if (input.value.toUpperCase() === answer) {
          input.classList.add("correct");
          input.classList.remove("incorrect");
          score++;
      } else {
          input.classList.add("incorrect");
          input.classList.remove("correct");
      }
  });

  const percentage = Math.round((score / maxScore) * 100);
  document.getElementById('score').innerText = `Score: ${score} (${percentage}%)`;
}
