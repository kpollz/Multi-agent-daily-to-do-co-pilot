# Dependencies Update - January 2026

## Security Fixes
✅ **Next.js 14.1.0 → 15.1.0** - Fixed security vulnerability
- See: https://nextjs.org/blog/security-update-2025-12-11

## Deprecated Packages Fixed
✅ Removed all deprecated package warnings:
- inflight@1.0.6 - Updated via transitive dependencies
- rimraf@3.0.2 - Updated via transitive dependencies
- @humanwhocodes/object-schema@2.0.3 - Updated to @eslint/object-schema
- @humanwhocodes/config-array@0.13.0 - Updated to @eslint/config-array
- glob@7.2.3 - Updated via transitive dependencies
- eslint@8.57.1 - Updated to 9.17.0

## Package Updates

### Dependencies
- `next`: 14.1.0 → **15.1.0** (Major security update)
- `react`: 18.2.0 → **18.3.1**
- `react-dom`: 18.2.0 → **18.3.1**
- `framer-motion`: 11.0.0 → **11.15.0**
- `lucide-react`: 0.344.0 → **0.468.0**
- `@dnd-kit/core`: 6.1.0 → **6.3.1**
- `@dnd-kit/sortable`: 8.0.0 → **9.0.0**

### DevDependencies
- `eslint`: 8.56.0 → **9.17.0** (Major update)
- `eslint-config-next`: 14.1.0 → **15.1.0**
- `typescript`: 5.3.0 → **5.7.2**
- `tailwindcss`: 3.4.0 → **3.4.17**
- `@types/react`: 18.2.0 → **18.3.18**
- `@types/react-dom`: 18.2.0 → **18.3.5**
- `@types/node`: 20.11.0 → **22.10.2**
- `autoprefixer`: 10.4.0 → **10.4.20**
- `postcss`: 8.4.0 → **8.4.49**
- **New**: `@eslint/eslintrc` - Required for ESLint 9 flat config

## Configuration Changes

### ESLint Migration (v8 → v9)
- ❌ Removed: `.eslintrc.json` (legacy format)
- ✅ Added: `eslint.config.mjs` (new flat config format)

### Next.js Config
- Updated `next.config.js` to use ES modules (import/export)
- Changed `path.resolve(__dirname)` to `path.resolve(process.cwd())`

## Installation

After pulling these changes, run:

```bash
# Clean install (recommended)
rm -rf node_modules package-lock.json
npm install

# Or simply
npm install
```

## Breaking Changes & Migration Notes

### Next.js 15
- Most components are backward compatible
- Link component usage remains the same (`<Link href="...">`)
- No changes required for app router usage
- Image component changes don't affect this project (not used)

### ESLint 9
- Using `@eslint/eslintrc` compat layer for smooth migration
- All existing rules continue to work
- Next.js TypeScript linting rules preserved

## Verification

Run these commands after updating:

```bash
# Check for any TypeScript errors
npm run build

# Run ESLint
npm run lint

# Start development server
npm run dev
```

## Benefits
🔒 Security vulnerabilities patched
⚡ Improved performance with latest React 18.3
🎨 Updated icons from lucide-react
🧹 No deprecated package warnings
📦 Cleaner dependency tree
