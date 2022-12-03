const inp = require("./inp.js");

const ppl = inp
	.split("\n\n")
	.map((p) =>
		p
			.trim()
			.split("\n")
			.map((e) => +e)
	)
	.map((p) => p.reduce((a, b) => a + b, 0));

// LArgest number
console.log(Math.max(...ppl));
