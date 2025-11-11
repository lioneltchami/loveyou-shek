# Troubleshooting Guide

## Common Issues & Fixes

### Error: "Cannot find module './778.js'" or similar module errors

**Cause**: Corrupted Next.js build cache

**Fix**:
```bash
# Stop the dev server (Ctrl+C)
rm -rf .next
npm run dev
```

**Alternative fix** (if above doesn't work):
```bash
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

---

### Port Already in Use

**Error**: "Port 3000 is in use"

**Fix**:
```bash
# Find the process
netstat -ano | findstr ":3000"

# Kill it (replace PID with actual number)
taskkill //F //PID [PID_NUMBER]

# Restart server
npm run dev
```

---

### Website Not Loading / Blank Page

**Fix**:
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
npm run dev
```

---

### Form Submissions Not Working

**Check**:
1. Did you add your Web3Forms access key in `components/Testimonials.tsx`?
2. Is your access key verified?
3. Check browser console for errors (F12)

**Fix**:
- Verify access key is correct (no extra spaces)
- Test with Web3Forms dashboard

---

### Build Errors After Making Changes

**Fix**:
```bash
# Clean build
rm -rf .next
npm run build
```

If errors persist:
```bash
# Full reinstall
rm -rf node_modules .next package-lock.json
npm install
npm run build
```

---

### Changes Not Showing Up

**Try**:
1. Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Restart dev server

---

### TypeScript Errors

**Fix**:
```bash
# Check for errors
npm run build

# If errors about types:
rm -rf node_modules package-lock.json
npm install
```

---

## Quick Fixes Checklist

When something goes wrong:

- [ ] Try hard refresh in browser (`Ctrl+Shift+R`)
- [ ] Restart dev server (`Ctrl+C` then `npm run dev`)
- [ ] Clear .next cache (`rm -rf .next`)
- [ ] Check browser console for errors (F12)
- [ ] Verify all files are saved
- [ ] Check for syntax errors in code

---

## Getting Help

1. Check this troubleshooting guide
2. Review error messages carefully
3. Check browser console (F12) for detailed errors
4. Review the setup guides (README.md, WEB3FORMS_SETUP.md)

---

**Last Updated**: November 2025
