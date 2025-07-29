# Testing Guide for SRM Academia API Package

This guide explains how to test your package before publishing to npm.

## 🧪 Testing Commands

### 1. Basic Build Test

```bash
# Clean and rebuild
npm run clean && npm run build

# Check for TypeScript errors
npm run type-check
```

### 2. Package Verification

```bash
# Run comprehensive package verification
npm run verify

# Run detailed package tests
npm test
```

### 3. Integration Testing

```bash
# Test function signatures and basic functionality
node scripts/integration-test.js
```

## 📋 Pre-Publish Checklist

### ✅ Build Verification

- [ ] `npm run clean && npm run build` - No errors
- [ ] `npm run type-check` - No TypeScript errors
- [ ] All files compiled to `dist/` directory

### ✅ Package Structure

- [ ] `dist/src/index.js` exists and is valid
- [ ] `dist/src/index.d.ts` exists with proper types
- [ ] All module files compiled correctly

### ✅ Functionality Tests

- [ ] All exports available (`verifyUser`, `verifyPassword`, etc.)
- [ ] Function signatures correct
- [ ] TypeScript definitions match implementation

### ✅ Configuration

- [ ] `package.json` has all required fields
- [ ] `main` and `types` fields point to correct files
- [ ] `files` field includes only necessary files

## 🔍 What Each Test Does

### `npm run verify`

- Checks if dist folder exists
- Verifies main entry point and types
- Validates package.json configuration
- Tests package loading and exports

### `npm test`

- Comprehensive package testing
- Function signature validation
- Build output structure verification
- Common issues detection

### `node scripts/integration-test.js`

- Tests function availability
- Validates parameter acceptance
- Basic error handling verification
- Function call testing

## 🚨 Common Issues to Check

### Build Issues

- TypeScript compilation errors
- Missing dependencies
- Incorrect import paths

### Package Issues

- Missing exports
- Incorrect file paths in package.json
- Missing TypeScript definitions

### Function Issues

- Incorrect parameter types
- Missing return types
- Import/export mismatches

## 🧪 Manual Testing (Optional)

For thorough testing, you can manually test with real SRM credentials:

```javascript
const { verifyUser, getTimetable } = require("srm-academia-api");

// Test user verification
const userResult = await verifyUser("your-username");
console.log(userResult);

// Test with valid cookie
const timetableResult = await getTimetable("your-session-cookie");
console.log(timetableResult);
```

## 📦 Publishing Preparation

Before publishing, ensure:

1. **Version Update**: Update version in `package.json`
2. **Author Info**: Add your information to `package.json`
3. **Repository URLs**: Update GitHub links in `package.json`
4. **Documentation**: Verify README.md is complete
5. **License**: Ensure LICENSE file is included

## 🚀 Final Publishing Steps

```bash
# 1. Run all tests
npm test
npm run verify
node scripts/integration-test.js

# 2. Check what will be published
npm pack --dry-run

# 3. Publish to npm
npm publish
```

## 🔧 Troubleshooting

### Build Fails

- Check TypeScript errors: `npm run type-check`
- Verify all imports are correct
- Ensure all dependencies are installed

### Tests Fail

- Check if dist folder exists: `npm run build`
- Verify package.json configuration
- Check function exports in index.ts

### Integration Tests Fail

- Verify function signatures
- Check parameter types
- Ensure proper error handling

## 📝 Notes

- The integration tests use invalid credentials intentionally
- Real functionality testing requires valid SRM credentials
- All tests focus on package structure and type safety
- Manual testing with real data is recommended for final verification
