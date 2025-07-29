#!/bin/bash

# Git Workflow Script for SRM Academia API
# Usage: ./scripts/git-workflow.sh [command] [options]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Function to run tests
run_tests() {
    print_info "Running tests..."
    npm run clean && npm run build && npm test
    print_status "Tests completed successfully"
}

# Function to create a feature branch
create_feature() {
    if [ -z "$1" ]; then
        print_error "Feature name is required"
        echo "Usage: $0 feature <feature-name>"
        exit 1
    fi
    
    feature_name=$1
    branch_name="feature/$feature_name"
    
    print_info "Creating feature branch: $branch_name"
    git checkout -b "$branch_name"
    print_status "Feature branch created: $branch_name"
}

# Function to commit changes
commit_changes() {
    if [ -z "$1" ]; then
        print_error "Commit message is required"
        echo "Usage: $0 commit <message>"
        exit 1
    fi
    
    message=$1
    
    print_info "Adding all changes..."
    git add .
    
    print_info "Committing changes..."
    git commit -m "$message"
    print_status "Changes committed successfully"
}

# Function to prepare for release
prepare_release() {
    if [ -z "$1" ]; then
        print_error "Version type is required (patch|minor|major)"
        echo "Usage: $0 release <patch|minor|major>"
        exit 1
    fi
    
    version_type=$1
    
    print_info "Running tests before release..."
    run_tests
    
    print_info "Updating version ($version_type)..."
    npm version "$version_type"
    
    version=$(node -p "require('./package.json').version")
    
    print_info "Committing version bump..."
    git add package.json
    git commit -m "chore: bump version to v$version"
    
    print_info "Creating release tag..."
    git tag "v$version"
    
    print_status "Release prepared: v$version"
    print_info "Next steps:"
    echo "  1. git push origin main"
    echo "  2. git push origin v$version"
    echo "  3. npm publish"
}

# Function to show status
show_status() {
    print_info "Git Status:"
    git status --short
    
    echo ""
    print_info "Recent Commits:"
    git log --oneline -5
}

# Function to show help
show_help() {
    echo "Git Workflow Script for SRM Academia API"
    echo ""
    echo "Usage: $0 [command] [options]"
    echo ""
    echo "Commands:"
    echo "  test                    Run all tests"
    echo "  feature <name>          Create a new feature branch"
    echo "  commit <message>        Commit all changes with message"
    echo "  release <type>          Prepare for release (patch|minor|major)"
    echo "  status                  Show git status and recent commits"
    echo "  help                    Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 test"
    echo "  $0 feature add-new-api"
    echo "  $0 commit 'feat: add new authentication method'"
    echo "  $0 release patch"
    echo "  $0 status"
}

# Main script logic
case "$1" in
    "test")
        run_tests
        ;;
    "feature")
        create_feature "$2"
        ;;
    "commit")
        commit_changes "$2"
        ;;
    "release")
        prepare_release "$2"
        ;;
    "status")
        show_status
        ;;
    "help"|"--help"|"-h"|"")
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        echo ""
        show_help
        exit 1
        ;;
esac 