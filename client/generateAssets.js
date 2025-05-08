// generateAssets.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, "src", "assets");
const outputFile = path.join(assetsDir, "assets.js");

function toCamelCase(filename) {
  return filename
    .replace(/\.[^/.]+$/, "") // remove extension
    .replace(/[_-](\w)/g, (_, c) => c.toUpperCase()) // convert _x or -x to X
    .replace(/^[A-Z]/, (match) => match.toLowerCase()); // lowercase first letter
}

const files = fs.readdirSync(assetsDir);

const importLines = [];
const objectLines = [];

files.forEach((file, index) => {
  const ext = path.extname(file);
  const isImage = [".svg", ".png", ".jpg", ".jpeg", ".gif", ".webp"].includes(
    ext
  );
  if (!isImage) return;

  const key = toCamelCase(file);
  const importName = `${key}Img`;
  importLines.push(`import ${importName} from './${file}';`);
  objectLines.push(`  ${key}: ${importName},`);
});

const content = `${importLines.join("\n")}

const assets = {
${objectLines.join("\n")}
};

export default assets;
`;

fs.writeFileSync(outputFile, content);
console.log(`✅  assets.js generated with ${objectLines.length} entries!`);
