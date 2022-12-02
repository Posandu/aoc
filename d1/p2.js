const inp = require('./inp.js');

const ppl = inp.split("\n\n").map((p) =>
	p
		.trim()
		.split("\n")
		.map((e) => +e)
).map((p) => p.reduce((a, b) => a + b, 0));

// Top 3
const top3 = ppl.sort((a, b) => b - a).slice(0, 3);

// Top 3 sum
console.log(top3.reduce((a, b) => a + b, 0));