# Contributing to Harmony Care

Thank you for contributing to Harmony Care! This guide will help you understand our development workflow, coding standards, and best practices.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Link Pattern Best Practices](#link-pattern-best-practices)
- [Common Pitfalls](#common-pitfalls)
- [Code Quality Tools](#code-quality-tools)
- [Pull Request Process](#pull-request-process)

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 10+
- Git

### Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd harmony-website
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up Git hooks (Husky):

   ```bash
   pnpm prepare
   ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

## Development Workflow

### Branch Strategy

- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - Feature branches
- `fix/*` - Bug fix branches

### Before Committing

Our pre-commit hooks will automatically run:

- **lint-staged**: ESLint and Prettier on staged files
- **lint:links**: Custom nested link checker
- **test**: Vitest test suite

If any check fails, the commit will be blocked. Fix the issues before committing.

### Running Checks Manually

```bash
# TypeScript type checking
pnpm check

# ESLint
pnpm lint
pnpm lint:fix  # Auto-fix issues

# Nested link checker
pnpm lint:links

# Tests
pnpm test

# Format code
pnpm format
```

## Link Pattern Best Practices

### ✅ Correct: Using Link Component

```tsx
import { Link } from "wouter";

// Simple text link
<Link href="/pricing" className="text-primary hover:underline">
  View Pricing
</Link>

// Link with complex content (no nested anchor)
<Link href="/demo" className="block p-4 hover:bg-accent">
  <h3>Schedule Demo</h3>
  <p>Book your consultation today</p>
</Link>
```

### ❌ Incorrect: Nested Anchor Tags

```tsx
// DON'T: Never nest <a> inside <Link>
<Link href="/pricing">
  <a className="text-primary">View Pricing</a>  {/* ❌ Nested anchor! */}
</Link>

// DON'T: Never nest <Link> inside <a>
<a href="/pricing">
  <Link href="/pricing">View Pricing</Link>  {/* ❌ Nested link! */}
</a>
```

### Button Wrapping Patterns

#### ✅ Correct: Link Wrapping Button

```tsx
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

// Link wrapping Button is acceptable
<Link href="/demo">
  <Button className="bg-primary">Schedule Demo</Button>
</Link>;
```

#### ⚠️ Alternative: Button with onClick Navigation

```tsx
// For programmatic navigation
<Button onClick={() => (window.location.href = "/demo")}>Schedule Demo</Button>;

// Or with wouter's useLocation hook
const [, setLocation] = useLocation();
<Button onClick={() => setLocation("/demo")}>Schedule Demo</Button>;
```

### Navigation and Footer Components

Always use the reusable components for consistency:

```tsx
import Navigation from "@/components/Navigation";
import { Footer } from "@/components/Footer";

function MyPage() {
  return (
    <>
      <Navigation />
      <main>{/* Page content */}</main>
      <Footer />
    </>
  );
}
```

## Common Pitfalls

### 1. Nested Interactive Elements

**Problem**: React doesn't allow nested interactive elements (links, buttons).

**Solution**: Only use one interactive element at a time. If you need a clickable card, make the entire card a Link:

```tsx
// ✅ Good
<Link href="/article/123" className="block p-4 hover:bg-accent">
  <h3>Article Title</h3>
  <p>Article description</p>
</Link>

// ❌ Bad
<div className="p-4">
  <Link href="/article/123">
    <h3>Article Title</h3>
  </Link>
  <Link href="/article/123">Read more →</Link>  {/* Duplicate link */}
</div>
```

### 2. External Links

For external links, use plain `<a>` tags (not `<Link>`):

```tsx
// ✅ Good: External link
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  External Site
</a>

// ❌ Bad: Using Link for external URLs
<Link href="https://example.com">External Site</Link>
```

### 3. Hash Links and Anchors

For same-page navigation (hash links), use plain `<a>` tags:

```tsx
// ✅ Good: Hash link
<a href="#features" className="text-primary">
  Jump to Features
</a>

// ❌ Bad: Using Link for hash navigation
<Link href="#features">Jump to Features</Link>
```

## Code Quality Tools

### ESLint

We use ESLint with TypeScript and jsx-a11y plugins to catch common issues:

- **jsx-a11y/no-noninteractive-element-interactions**: Warns about click handlers on non-interactive elements
- **jsx-a11y/no-static-element-interactions**: Warns about static elements with event handlers
- **@typescript-eslint/no-unused-vars**: Catches unused variables

### Custom Nested Link Checker

Our custom script (`pnpm lint:links`) scans all `.tsx` and `.jsx` files for:

- `<Link>` components containing `<a>` tags
- `<Link>` components wrapping `<Button>` (warns, doesn't fail)

This runs automatically in:

- Pre-commit hooks
- CI/CD pipeline
- Manual execution: `pnpm lint:links`

### Prettier

Code formatting is handled by Prettier with these rules:

- 2-space indentation
- Single quotes
- Trailing commas
- Semicolons

Run `pnpm format` to format all files.

## Pull Request Process

### PR Checklist

Before submitting a pull request, ensure:

- [ ] All tests pass (`pnpm test`)
- [ ] TypeScript compiles without errors (`pnpm check`)
- [ ] ESLint passes (`pnpm lint`)
- [ ] No nested link issues (`pnpm lint:links`)
- [ ] Code is formatted (`pnpm format`)
- [ ] New features have tests
- [ ] Documentation is updated if needed
- [ ] Commit messages are clear and descriptive

### PR Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

How has this been tested?

## Screenshots (if applicable)

Add screenshots for UI changes

## Checklist

- [ ] Tests pass
- [ ] Linters pass
- [ ] Documentation updated
```

### Code Review Guidelines

Reviewers should check for:

- **Functionality**: Does the code work as intended?
- **Link Patterns**: No nested links or interactive elements?
- **TypeScript**: Proper types, no `any` usage?
- **Tests**: Adequate test coverage?
- **Performance**: No obvious performance issues?
- **Accessibility**: Semantic HTML, ARIA labels where needed?

## Questions?

If you have questions or need help:

- Check existing issues and discussions
- Ask in pull request comments
- Contact the maintainers

Thank you for contributing! 🎉
