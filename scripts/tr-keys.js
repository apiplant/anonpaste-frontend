const fs = require('fs');

const TARGET_FILE = './src/translation/index.tsx';
const file = fs.readFileSync(TARGET_FILE).toString();
const lines = file.split('\n');
const start = lines.findIndex(l =>  l === '// KEYS');
const end = lines.findIndex(l =>  l === '// \\ KEYS');
const constants = lines.slice(start, end).map((l, i) => l.replace(/".*"/, `"${i.toString(36)}"`));
lines.splice(start, end-start, ...constants);
fs.writeFileSync(TARGET_FILE, lines.join('\n'));