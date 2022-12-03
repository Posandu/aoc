const inp = require("./inp.js");

const priorities = {};

const simpleAlphabet = "abcdefghijklmnopqrstuvwxyz".split``;
const capitalAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split``;

const alphabet = [...simpleAlphabet, ...capitalAlphabet];

alphabet.map((l, i) => (priorities[l] = i + 1));

const log = console.log;

const chunk = (a, n) =>
	[...Array(Math.ceil(a.length / n))].map((_, i) => a.slice(n * i, n + n * i));

// Split into 3 chunks
const inSplit = chunk(inp.split`\n`, 3);

let col = [];

inSplit.map((line) => {
	const common = [...line[0]].filter(
		(l) => line[1].includes(l) && line[2].includes(l)
	); // Bad code, but it works

	col.push([...new Set(common)].flat());
});

let tot = 0;

col.map((l) => (tot += priorities[l]));

log(tot);
