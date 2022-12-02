const inp = require("./inp")

const score = {
	X: 1,
	Y: 2,
	Z: 3,
	Draw: 3,
	Won: 6,
	Lost: 0,
};

const log = console.log;

// A, X - Rock
// B, Y - Paper
// C, Z - Scissors

const winOP = "AZ|BX|CY".split("|");
const loseOP = "AY|BZ|CX".split("|");

let Totscore = 0;

inp.split("\n").forEach((line) => {
	const [a, b] = line.split(" ");

	if (winOP.includes(a + b)) {
		Totscore += score.Lost;

		log("Add 0 to score");
	} else if (loseOP.includes(a + b)) {
		Totscore += score.Won;

        log("Add 6 to score");
    } else {
        Totscore += score.Draw;

        log("Add 3 to score");
    }

	Totscore += score[b];

	log("Add " + score[b]);
});

console.log(Totscore); // 13682
