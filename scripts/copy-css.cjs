const fs = require("fs");
const path = require("path");

const componentsSrcDir = path.join(__dirname, "..", "src", "components");
const componentsOutDir = path.join(
  __dirname,
  "..",
  "lib",
  "styles",
  "components"
);
const stylesSrcDir = path.join(__dirname, "..", "src", "styles");
const stylesOutDir = path.join(__dirname, "..", "lib", "styles");

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else if (entry.name.endsWith(".css")) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (fs.existsSync(componentsSrcDir)) {
  copyDir(componentsSrcDir, componentsOutDir);
  console.log("CSS files copied to lib/styles/components");
} else {
  console.warn("components folder not found");
}

if (fs.existsSync(stylesSrcDir)) {
  copyDir(stylesSrcDir, stylesOutDir);
  console.log("CSS files copied to lib/styles");
} else {
  console.warn("styles folder not found");
}
