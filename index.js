const fs = require("fs");
const hljs = require("highlight.js/lib/common");

const outPath = "./.out";

// Get all folders starting with "d"
const dirs = fs.readdirSync("./").filter((f) => f.startsWith("d"));

// Get all files in each folder
const files = dirs.map((d) => ({
	d,
	f: fs.readdirSync(`./${d}`).map((f) => `${f}`),
}));

// Check if output folder exists
if (fs.existsSync(outPath))
	fs.rmSync(outPath, { recursive: true, force: true });
fs.mkdirSync(outPath);

const globCSS = `<style>pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#a1a19a;background:#002635}.hljs ::selection,.hljs::selection{background-color:#517f8d;color:#a1a19a}.hljs-comment{color:#6c8b91}.hljs-tag{color:#869696}.hljs-operator,.hljs-punctuation,.hljs-subst{color:#a1a19a}.hljs-operator{opacity:.7}.hljs-bullet,.hljs-deletion,.hljs-name,.hljs-selector-tag,.hljs-template-variable,.hljs-variable{color:#ff5a67}.hljs-attr,.hljs-link,.hljs-literal,.hljs-number,.hljs-symbol,.hljs-variable.constant_{color:#f08e48}.hljs-class .hljs-title,.hljs-title,.hljs-title.class_{color:#ffcc1b}.hljs-strong{font-weight:700;color:#ffcc1b}.hljs-addition,.hljs-code,.hljs-string,.hljs-title.class_.inherited__{color:#7fc06e}.hljs-built_in,.hljs-doctag,.hljs-keyword.hljs-atrule,.hljs-quote,.hljs-regexp{color:#14747e}.hljs-attribute,.hljs-function .hljs-title,.hljs-section,.hljs-title.function_,.ruby .hljs-property{color:#5dd7b9}.diff .hljs-meta,.hljs-keyword,.hljs-template-tag,.hljs-type{color:#9a70a4}.hljs-emphasis{color:#9a70a4;font-style:italic}.hljs-meta,.hljs-meta .hljs-keyword,.hljs-meta .hljs-string{color:#c43060}.hljs-meta .hljs-keyword,.hljs-meta-keyword{font-weight:700}h1 {}body {font-family: monospace;background: black;color: #7db478;max-width: 800px;margin: auto;padding: 19px;}h1 {font-size: 50px;}a {color: #1799cc;}a:hover {background: white;color: black;font-weight: 900;}details {background: #161515;padding: 15px;border-radius: 4px;font-size: 18px;}details:hover {background: #222;}.hljs {border-radius: 4px;}
ul {margin: 0;list-style: decimal-leading-zero;}</style>`;

// Create a file for each folder
files.forEach(({ d, f }) => {
	const out = fs.createWriteStream(`${outPath}/${d}.html`);
	const n = d.match(/\d+/)[0];

	out.write(`<html><head><title>${n}</title>
	
	${globCSS}

	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta charset="utf-8">
	<meta name="G_at:" content="${new Date().toISOString()}">
	
	</head><body><h1>Day ${n}</h1>
	
	<a href="https://adventofcode.com/2022/day/${n}">Link</a>
	<a href="/index.html">Index</a>
	`);

	const inp = require(`./${d}/inp.js`);

	out.write(`<h2>Input</h2>

    <details><summary>Click to expand</summary>

    <pre>${inp}</pre>
    </details>`);

	f.forEach((file) => {
		if (file === "inp.js") return;

		const code = fs.readFileSync(`./${d}/${file}`, "utf8");
		const part = file.match(/p(\d+)\.js/)[1];

		out.write(`<h2>Part ${part}</h2>`);

		const code_html = hljs.highlight(code, { language: "javascript" }).value;

		out.write(`<pre><code
		class="hljs javascript">${code_html}</code></pre>`);
	});

	out.write(`</body></html>`);

	out.end();
});

// Create index.html
const out = fs.createWriteStream(outPath + "/index.html");

out.write(`<html><head><title>Index</title>

${globCSS}

<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta charset="utf-8">
<meta name="G_at:" content="${new Date().toISOString()}">

</head><body>

<h1>Advent of Code 2022</h1>

<p> A collection of my solutions to the Advent of Code 2022. </p>

<p> <a href="https://adventofcode.com/2022">Link</a>

<a href="https://github.com/Posandu/aoc">Source</a> 

<img src="https://img.shields.io/github/last-commit/Posandu/aoc?style=flat-square" alt="Last Commit">

<a href="https://twitter.com/Posandu"><img src="https://img.shields.io/twitter/follow/Posandu?style=social" alt="Twitter Follow"></a>

<a href="https://buymeacoffee.com/Posandu"><img src="https://img.shields.io/badge/Donate-Buy%20Me%20A%20Coffee-orange" alt="Buy Me A Coffee"></a>
</p>

<br>





<ul>`);

files.forEach(({ d }) => {
	const n = d.match(/\d+/)[0];

	out.write(`
	<li> 
	<a href="${d}.html">Day ${n}</a>
		<a href="https://adventofcode.com/2022/day/${n}">Advent of Code</a>
	</li>
`);
});

out.write(`</body></html>`);
console.log(files);
