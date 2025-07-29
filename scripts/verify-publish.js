#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

console.log("🔍 Verifying package for npm publish...\n");

// Check if dist folder exists
if (!fs.existsSync("dist")) {
  console.error('❌ dist folder not found. Run "npm run build" first.');
  process.exit(1);
}

// Check if main entry point exists
const mainFile = path.join("dist", "src", "index.js");
if (!fs.existsSync(mainFile)) {
  console.error("❌ Main entry point not found:", mainFile);
  process.exit(1);
}

// Check if types exist
const typesFile = path.join("dist", "src", "index.d.ts");
if (!fs.existsSync(typesFile)) {
  console.error("❌ TypeScript definitions not found:", typesFile);
  process.exit(1);
}

// Check package.json
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));

// Verify essential fields
const requiredFields = [
  "name",
  "version",
  "main",
  "types",
  "description",
  "author",
  "license",
];
const missingFields = requiredFields.filter((field) => !packageJson[field]);

if (missingFields.length > 0) {
  console.error("❌ Missing required fields in package.json:", missingFields);
  process.exit(1);
}

// Check if files field is configured
if (!packageJson.files || !Array.isArray(packageJson.files)) {
  console.error('❌ "files" field not configured in package.json');
  process.exit(1);
}

// Test loading the package
try {
  const packageExports = require("../dist/src/index.js");
  const expectedExports = [
    "verifyUser",
    "verifyPassword",
    "getTimetable",
    "getAttendance",
    "getMarks",
    "getUserInfo",
    "getCalendar",
    "getCourse",
  ];

  const missingExports = expectedExports.filter(
    (exportName) => !(exportName in packageExports)
  );

  if (missingExports.length > 0) {
    console.error("❌ Missing exports:", missingExports);
    process.exit(1);
  }

  console.log("✅ All exports found");
} catch (error) {
  console.error("❌ Failed to load package:", error.message);
  process.exit(1);
}

console.log("\n✅ Package verification completed successfully!");
console.log("\n📦 Package details:");
console.log(`   Name: ${packageJson.name}`);
console.log(`   Version: ${packageJson.version}`);
console.log(`   Main: ${packageJson.main}`);
console.log(`   Types: ${packageJson.types}`);
console.log(`   License: ${packageJson.license}`);

console.log("\n🚀 Ready for npm publish!");
console.log("   Run: npm publish");
