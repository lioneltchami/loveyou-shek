# Bug Fix Documentation - Hydration Error

## Date: 2025-11-10

## Issue Description
The application was throwing critical hydration errors in the browser console:
1. "In HTML, `<html>` cannot be a child of `<body>`"
2. "`<body>` cannot contain a nested `<html>`"
3. "TypeError: can't access property 'call', originalFactory is undefined"

## Root Cause
This was a **known bug in Next.js 15.5.6 when using Webpack** as the bundler. The issue does NOT occur when using Turbopack.

### Contributing Factors:
1. **error.tsx had `<html>` and `<body>` tags** - In Next.js App Router, error.tsx should NOT have these tags as they're already provided by layout.tsx. Only global-error.tsx should have them.
2. **Webpack bundler bug** - Next.js 15.5.6 has a known issue with error boundaries when using Webpack, causing the "originalFactory is undefined" error.
3. **Potential browser extension interference** - Browser extensions can modify the DOM and cause hydration mismatches.

## Fixes Applied

### 1. Removed HTML/Body Tags from error.tsx (Lines 33-106)
**File**: `app/error.tsx`

**Before**:
```tsx
return (
  <html>
    <body>
      <div className="min-h-screen...">
        {/* Error UI */}
      </div>
    </body>
  </html>
);
```

**After**:
```tsx
return (
  <div className="min-h-screen...">
    {/* Error UI */}
  </div>
);
```

### 2. Added suppressHydrationWarning to Body Tag
**File**: `app/layout.tsx` (Line 173)

**Change**:
```tsx
<body className="antialiased" suppressHydrationWarning>
```

This suppresses hydration warnings that can be caused by browser extensions modifying HTML attributes before React loads.

### 3. Switched to Turbopack
**Command Changed**: `npm run dev` → `npm run dev -- --turbo`

Turbopack doesn't have the Webpack bundler bug that causes the "originalFactory is undefined" error.

## How to Run the Application

### Development Server (Recommended):
```bash
npm run dev -- --turbo
```

This uses Turbopack which resolves the bundler-related issues.

### Alternative (Webpack):
```bash
npm run dev
```

This uses Webpack. The suppressHydrationWarning flag helps, but Turbopack is recommended for Next.js 15.5.6.

## Testing Recommendations

1. **Hard refresh the browser**: `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)
2. **Test in incognito mode**: To rule out browser extension interference
3. **Disable browser extensions**: VPN and other extensions can cause hydration issues even when not actively enabled
4. **Check console**: Should have no hydration errors or "originalFactory" errors

## References

- [Next.js GitHub Issue #43902](https://github.com/vercel/next.js/issues/43902) - originalFactory undefined with client components
- [Stack Overflow: Next.js 15 Hydration Errors](https://stackoverflow.com/questions/79244952/next-js-15-0-3-hydration-failed-because-the-server-rendered-html-didnt-match-t)
- [Next.js Docs: React Hydration Error](https://nextjs.org/docs/messages/react-hydration-error)

## Future Considerations

- Monitor Next.js updates for fixes to the Webpack bundler issue
- Consider permanently switching to Turbopack for development
- Add error boundary tests to catch similar issues early
