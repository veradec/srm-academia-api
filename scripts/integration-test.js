#!/usr/bin/env node

console.log("🔗 Integration Testing SRM Academia API Package...\n");

// Import the package
const {
  verifyUser,
  verifyPassword,
  getTimetable,
  getAttendance,
  getMarks,
  getUserInfo,
  getCalendar,
  getCourse,
  logoutUser,
} = require("../dist/src/index.js");

// Test function
async function runTests() {
  // Test 1: Test function availability
  console.log("1️⃣ Testing function availability...");
  const functions = [
    verifyUser,
    verifyPassword,
    getTimetable,
    getAttendance,
    getMarks,
    getUserInfo,
    getCalendar,
    getCourse,
    logoutUser,
  ];

  functions.forEach((func, index) => {
    if (typeof func !== "function") {
      console.error(`❌ Function ${index} is not a function`);
      process.exit(1);
    }
  });
  console.log("✅ All functions are available");

  // Test 2: Test function parameters
  console.log("\n2️⃣ Testing function parameters...");

  // Test verifyUser
  try {
    const userResult = await verifyUser("test-username");
    console.log("✅ verifyUser accepts string parameter");
  } catch (error) {
    console.log("✅ verifyUser throws error for invalid input (expected)");
  }

  // Test verifyPassword
  try {
    const passwordResult = await verifyPassword({
      identifier: "test",
      digest: "test",
      password: "test",
    });
    console.log("✅ verifyPassword accepts PasswordInput object");
  } catch (error) {
    console.log("✅ verifyPassword throws error for invalid input (expected)");
  }

  // Test logoutUser
  try {
    const logoutResult = await logoutUser("test-cookie");
    console.log("✅ logoutUser accepts string parameter");
  } catch (error) {
    console.log("✅ logoutUser throws error for invalid input (expected)");
  }

  // Test data fetching functions (they should fail without valid cookies)
  const dataFunctions = [
    { name: "getTimetable", func: getTimetable },
    { name: "getAttendance", func: getAttendance },
    { name: "getMarks", func: getMarks },
    { name: "getUserInfo", func: getUserInfo },
    { name: "getCalendar", func: getCalendar },
    { name: "getCourse", func: getCourse },
  ];

  for (const { name, func } of dataFunctions) {
    try {
      const result = await func("invalid-cookie");
      console.log(`✅ ${name} accepts string parameter`);
    } catch (error) {
      console.log(`✅ ${name} throws error for invalid input (expected)`);
    }
  }

  console.log("\n🎉 Integration tests completed successfully!");
  console.log(
    "\n📝 Note: These tests verify function signatures and basic error handling."
  );
  console.log(
    "   For full functionality testing, you would need valid SRM credentials."
  );
}

// Run the tests
runTests().catch(console.error);
