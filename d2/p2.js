const inp = require("./inp").split("\n");

const o = {
	A: { X: 3, Y: 6, Z: 0 },
	B: { X: 0, Y: 3, Z: 6 },
	C: { X: 6, Y: 0, Z: 3 },
};

const Scr = { X: 1, Y: 2, Z: 3 };

const h = {
	A: { X: "Z", Y: "X", Z: "Y" },
	B: { X: "X", Y: "Y", Z: "Z" },
	C: { X: "Y", Y: "Z", Z: "X" },
};

let score = 0;

for (const line of inp) {
	let [a, b] = line.split(" ");
	b = h[a][b];
	score += o[a][b] + Scr[b];
}

console.log(score);
