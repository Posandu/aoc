const inp = require("./inp.js");

const priorities = {};

const simpleAlphabet = "abcdefghijklmnopqrstuvwxyz".split``;
const capitalAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split``;

const alphabet = [...simpleAlphabet, ...capitalAlphabet];

alphabet.map((l, i) => (priorities[l] = i + 1));

const log = console.log;

const inSplit = inp.split`\n`;

let col = [];

inSplit.map((line) => {
	const len = line.length;
	const left = line.slice(0, len / 2);
	const right = line.slice(len / 2);

	const common = [...left].filter((l) => right.includes(l));

	col.push([...new Set(common)].flat());
});

let tot = 0;

col.map((l) => (tot += priorities[l]));
log(tot);
