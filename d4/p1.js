const inp = require("./inp");

const data = inp.split`\n`;

let n = 0;

for (let i = 0; i < data.length; i++) {
	const items = data[i].split`,`;

	const [A, EA] = items[0].split("-");
	const [B, EB] = items[1].split("-");

	n += (+A <= +B && +EB <= +EA) || (+B <= +A && +EA <= +EB) ? 1 : 0;
}

console.log(n);
