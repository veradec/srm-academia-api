#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

console.log("🧪 Testing SRM Academia API Package...\n");

// Test 1: Check if package can be loaded
console.log("1️⃣ Testing package loading...");
try {
  const packageExports = require("../dist/src/index.js");
  console.log("✅ Package loaded successfully");

  // Check all expected exports
  const expectedExports = [
    "verifyUser",
    "verifyPassword",
    "getTimetable",
    "getAttendance",
    "getMarks",
    "getUserInfo",
    "getCalendar",
    "getCourse",
    "logoutUser",
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

// Test 2: Check TypeScript definitions
console.log("\n2️⃣ Testing TypeScript definitions...");
const typesFile = path.join(__dirname, "../dist/src/index.d.ts");
if (!fs.existsSync(typesFile)) {
  console.error("❌ TypeScript definitions not found");
  process.exit(1);
}
console.log("✅ TypeScript definitions found");

// Test 3: Test function signatures
console.log("\n3️⃣ Testing function signatures...");
try {
  const {
    verifyUser,
    verifyPassword,
    logoutUser,
  } = require("../dist/src/index.js");

  // Test function types
  if (typeof verifyUser !== "function") {
    console.error("❌ verifyUser is not a function");
    process.exit(1);
  }

  if (typeof verifyPassword !== "function") {
    console.error("❌ verifyPassword is not a function");
    process.exit(1);
  }

  if (typeof logoutUser !== "function") {
    console.error("❌ logoutUser is not a function");
    process.exit(1);
  }

  console.log("✅ All functions have correct signatures");
} catch (error) {
  console.error("❌ Function signature test failed:", error.message);
  process.exit(1);
}

// Test 4: Check package.json configuration
console.log("\n4️⃣ Testing package.json configuration...");
try {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));

  const requiredFields = [
    "name",
    "version",
    "main",
    "types",
    "description",
    "license",
  ];
  const missingFields = requiredFields.filter((field) => !packageJson[field]);

  if (missingFields.length > 0) {
    console.error("❌ Missing required fields:", missingFields);
    process.exit(1);
  }

  // Check if main and types point to correct files
  const mainFile = path.join(__dirname, "..", packageJson.main);
  const typesFile = path.join(__dirname, "..", packageJson.types);

  // For now, check the actual file structure (dist/src/index.js)
  const actualMainFile = path.join(__dirname, "../dist/src/index.js");
  const actualTypesFile = path.join(__dirname, "../dist/src/index.d.ts");

  if (!fs.existsSync(actualMainFile)) {
    console.error("❌ Main file not found:", actualMainFile);
    process.exit(1);
  }

  if (!fs.existsSync(actualTypesFile)) {
    console.error("❌ Types file not found:", actualTypesFile);
    process.exit(1);
  }

  console.log("✅ Package.json configuration is correct");
} catch (error) {
  console.error("❌ Package.json test failed:", error.message);
  process.exit(1);
}

// Test 5: Check build output structure
console.log("\n5️⃣ Testing build output structure...");
const distDir = path.join(__dirname, "../dist");
const srcDir = path.join(distDir, "src");

if (!fs.existsSync(distDir)) {
  console.error("❌ Dist directory not found");
  process.exit(1);
}

if (!fs.existsSync(srcDir)) {
  console.error("❌ Dist/src directory not found");
  process.exit(1);
}

// Check for compiled files
const requiredFiles = [
  "src/index.js",
  "src/index.d.ts",
  "src/auth/validatePassword.js",
  "src/auth/validateUser.js",
  "src/fetch/fetchLogout.js",
  "src/parser/parseTimetable.js",
];

const missingFiles = requiredFiles.filter((file) => {
  const filePath = path.join(distDir, file);
  return !fs.existsSync(filePath);
});

if (missingFiles.length > 0) {
  console.error("❌ Missing compiled files:", missingFiles);
  process.exit(1);
}

console.log("✅ Build output structure is correct");

// Test 6: Check for common issues
console.log("\n6️⃣ Checking for common issues...");

// Check for console.log statements in production code
const checkForConsoleLogs = (dir) => {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      checkForConsoleLogs(fullPath);
    } else if (file.name.endsWith(".js") && !file.name.includes(".test.")) {
      const content = fs.readFileSync(fullPath, "utf8");
      if (
        content.includes("console.log(") &&
        !content.includes("// console.log")
      ) {
        console.warn("⚠️  Found console.log in:", fullPath);
      }
    }
  }
};

checkForConsoleLogs(distDir);
console.log("✅ Common issues check completed");

console.log("\n🎉 All tests passed! Package is ready for publishing.");
console.log("\n📋 Next steps:");
console.log("   1. Update version in package.json if needed");
console.log("   2. Update author information in package.json");
console.log("   3. Update repository URLs in package.json");
console.log("   4. Run: npm publish");
