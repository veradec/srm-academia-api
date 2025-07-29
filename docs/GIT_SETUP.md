# Git Setup Guide for SRM Academia API

This guide explains how to set up and use Git for this project.

## 🚀 Initial Setup

### 1. Initialize Git Repository
```bash
git init
```

### 2. Add Remote Repository (Optional)
```bash
# Replace with your actual repository URL
git remote add origin https://github.com/yourusername/srm-academia-api.git
```

### 3. Configure Git (if not already done)
```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

## 📁 Git Ignore Configuration

The `.gitignore` file is configured to exclude:

- **Dependencies**: `node_modules/`
- **Build outputs**: `dist/`, `build/`
- **Environment files**: `.env*`
- **IDE files**: `.vscode/`, `.idea/`
- **OS files**: `.DS_Store`, `Thumbs.db`
- **Logs**: `*.log`
- **Cache files**: Various cache directories

## 🔄 Git Workflow

### Initial Commit
```bash
# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: SRM Academia API package

- Complete TypeScript implementation
- Organized type system
- Comprehensive testing suite
- Production-ready npm package"
```

### Development Workflow
```bash
# Create a new branch for features
git checkout -b feature/new-feature

# Make your changes
# ... edit files ...

# Add changes
git add .

# Commit changes
git commit -m "feat: add new feature description"

# Push to remote
git push origin feature/new-feature
```

### Release Workflow
```bash
# Update version in package.json
npm version patch  # or minor/major

# Build and test
npm run clean && npm run build && npm test

# Commit version bump
git add package.json
git commit -m "chore: bump version to v1.0.1"

# Create release tag
git tag v1.0.1

# Push changes and tags
git push origin main
git push origin v1.0.1
```

## 📋 Commit Message Convention

Use conventional commit messages:

```
type(scope): description

[optional body]

[optional footer]
```

### Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples:
```bash
git commit -m "feat(auth): add logout functionality"
git commit -m "fix(types): resolve TypeScript compilation errors"
git commit -m "docs(readme): update installation instructions"
git commit -m "test(integration): add comprehensive test suite"
```

## 🌿 Branch Strategy

### Main Branches
- `main`: Production-ready code
- `develop`: Development branch

### Feature Branches
- `feature/feature-name`: New features
- `fix/bug-description`: Bug fixes
- `docs/documentation`: Documentation updates

### Release Branches
- `release/v1.0.0`: Release preparation

## 🔧 Git Hooks (Optional)

### Pre-commit Hook
Create `.git/hooks/pre-commit`:
```bash
#!/bin/sh
npm run type-check
npm test
```

### Pre-push Hook
Create `.git/hooks/pre-push`:
```bash
#!/bin/sh
npm run clean && npm run build && npm test
```

Make hooks executable:
```bash
chmod +x .git/hooks/pre-commit
chmod +x .git/hooks/pre-push
```

## 📦 Publishing Workflow

### Before Publishing to npm
```bash
# 1. Ensure all tests pass
npm test

# 2. Build the package
npm run build

# 3. Verify package
npm run verify

# 4. Update version
npm version patch

# 5. Commit version bump
git add package.json
git commit -m "chore: bump version for npm publish"

# 6. Create tag
git tag v$(node -p "require('./package.json').version")

# 7. Push changes
git push origin main
git push origin --tags

# 8. Publish to npm
npm publish
```

## 🔍 Useful Git Commands

### Status and Logs
```bash
git status                    # Check repository status
git log --oneline            # View commit history
git log --graph --oneline    # View commit history with graph
```

### Branch Management
```bash
git branch                   # List branches
git branch -a                # List all branches (including remote)
git checkout -b new-branch   # Create and switch to new branch
git branch -d branch-name    # Delete local branch
```

### Stashing
```bash
git stash                    # Stash changes
git stash pop                # Apply and remove last stash
git stash list               # List stashes
```

### Remote Management
```bash
git remote -v                # View remote repositories
git fetch origin             # Fetch updates from remote
git pull origin main         # Pull and merge changes
```

## 🚨 Important Notes

1. **Never commit sensitive data**: API keys, passwords, etc.
2. **Always test before committing**: Run `npm test`
3. **Use meaningful commit messages**: Follow conventional commits
4. **Keep commits atomic**: One logical change per commit
5. **Update documentation**: When adding new features

## 📚 Additional Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [Git Best Practices](https://git-scm.com/book/en/v2) 