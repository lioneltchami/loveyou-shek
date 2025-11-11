# 🔥 Fix: Firestore Security Rules for Candles

## The Problem

You're getting this error:
```
Error lighting candle. Please try again.
```

**Cause:** Firebase Firestore security rules are blocking writes to the `candles` collection.

By default, Firestore **denies all reads and writes** for security. You need to explicitly allow access.

---

## ✅ Quick Fix (5 Minutes)

### Step 1: Go to Firebase Console

1. Open https://console.firebase.google.com
2. Select your project
3. Click **"Firestore Database"** in left menu
4. Click the **"Rules"** tab at the top

### Step 2: Update Security Rules

You'll see rules that look like this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Testimonials rules (existing)
    match /testimonials/{testimonialId} {
      allow read: if true;
      allow create: if true;
    }
  }
}
```

**Add the candles rules** below your existing testimonials rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // EXISTING: Testimonials rules
    match /testimonials/{testimonialId} {
      allow read: if true;
      allow create: if true;
    }

    // NEW: Candles rules - ADD THIS
    match /candles/{candleId} {
      // Anyone can read candles
      allow read: if true;

      // Anyone can light a candle (create)
      allow create: if request.resource.data.keys().hasOnly(['name', 'litAt'])
                    && (request.resource.data.name == null || request.resource.data.name is string)
                    && request.resource.data.litAt == request.time;
    }
  }
}
```

### Step 3: Publish Rules

1. Click **"Publish"** button at the top
2. Wait for "Rules published successfully" message

### Step 4: Test

1. Go back to http://localhost:3000
2. Refresh the page
3. Try lighting a candle again
4. **It should work now!** ✅

---

## 🔒 What These Rules Do

### Candles Collection Rules Explained:

```javascript
allow read: if true;
```
- **Anyone can READ** (view) candles
- Needed for: Counter display, recent candles grid

```javascript
allow create: if request.resource.data.keys().hasOnly(['name', 'litAt'])
```
- **Anyone can CREATE** (light) candles
- **But only with specific fields**: `name` and `litAt`
- Prevents malicious users from adding extra fields

```javascript
&& (request.resource.data.name == null || request.resource.data.name is string)
```
- **Name must be null** (anonymous) **OR a string**
- Prevents invalid data types

```javascript
&& request.resource.data.litAt == request.time;
```
- **Timestamp must be current time**
- Prevents backdating or future-dating candles
- Uses server timestamp for accuracy

### Security Benefits:
- ✅ No authentication required (public memorial)
- ✅ Anyone can light candles
- ✅ No one can edit/delete candles (no `update` or `delete` rules)
- ✅ No arbitrary data can be added
- ✅ Timestamps are accurate and can't be faked

---

## 🛠️ Alternative: Permissive Rules (Testing Only)

If you just want to test quickly and don't care about security yet:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // WARNING: For testing only! Allows all access.
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**⚠️ WARNING:** This allows **anyone to read/write/delete EVERYTHING** in your Firestore. Only use for testing, never in production!

---

## 📋 Complete Rules Example

Here's a complete Firestore rules file with both testimonials and candles:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Testimonials Collection
    match /testimonials/{testimonialId} {
      // Anyone can read testimonials
      allow read: if true;

      // Anyone can create testimonials
      allow create: if request.resource.data.keys().hasOnly(['name', 'relationship', 'message', 'email', 'createdAt', 'approved'])
                    && request.resource.data.name is string
                    && request.resource.data.relationship is string
                    && request.resource.data.message is string
                    && request.resource.data.createdAt == request.time
                    && request.resource.data.approved == true;

      // Only authenticated users can delete (admin)
      allow delete: if request.auth != null;
    }

    // Candles Collection
    match /candles/{candleId} {
      // Anyone can read candles
      allow read: if true;

      // Anyone can light a candle (create)
      allow create: if request.resource.data.keys().hasOnly(['name', 'litAt'])
                    && (request.resource.data.name == null || request.resource.data.name is string)
                    && request.resource.data.litAt == request.time;
    }
  }
}
```

---

## 🧪 Testing Your Rules

### Test in Firebase Console

1. Go to **Firestore Database** → **Rules** tab
2. Click **"Rules Playground"** button (top right)
3. Select **"candles"** collection
4. Choose **"create"** operation
5. Click **"Run"**
6. Should show: **"✅ Allowed"**

### Test on Website

1. Open http://localhost:3000
2. Open browser DevTools (F12)
3. Go to **Console** tab
4. Try lighting a candle
5. Check for errors

**If you see:**
- ✅ "Candle lit" success animation → **WORKING!**
- ❌ "Missing or insufficient permissions" → Rules not updated
- ❌ "PERMISSION_DENIED" → Rules not published

---

## 🚨 Common Errors

### Error: "Missing or insufficient permissions"

**Problem:** Firestore rules don't allow writes to candles collection

**Solution:** Follow Step 2 above - add candles rules

### Error: "PERMISSION_DENIED: Missing or insufficient permissions"

**Problem:** Rules updated but not published

**Solution:** Click "Publish" button in Firebase Console

### Error: "FirebaseError: Invalid document reference"

**Problem:** Firebase configuration is incorrect

**Solution:** Check `.env.local` file has correct Firebase credentials

### Counter shows 0, no recent candles

**Problem:** Rules don't allow reads

**Solution:** Make sure `allow read: if true;` is in candles rules

---

## 📱 After Fixing

Once rules are updated:

1. ✅ Candles can be lit
2. ✅ Counter shows total
3. ✅ Recent candles display
4. ✅ Real-time updates work
5. ✅ All visitors can participate

---

## 🔐 Production Security Notes

These rules are **safe for production** because:

- ✅ **Read access**: Public (appropriate for memorial)
- ✅ **Write access**: Create only (can't edit/delete)
- ✅ **Data validation**: Strict field requirements
- ✅ **Timestamp accuracy**: Server-side validation
- ✅ **No authentication needed**: Removes friction for visitors
- ✅ **Spam protection**: Limited to 2 fields, no arbitrary data

### Potential Abuse & Mitigation:

**What if someone spams candles?**
- Firebase has built-in rate limiting
- You can manually delete spam from Firebase Console
- For stricter control, add Firebase App Check (optional)

**What if someone adds inappropriate names?**
- You can delete individual candles from Firebase Console
- Consider adding a profanity filter (optional)
- Most visitors will be respectful on a memorial site

---

## 🆘 Still Not Working?

### Check These:

1. **Firebase configuration** in `.env.local`:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   ```

2. **Rules published**:
   - Must click "Publish" button
   - Wait for confirmation message

3. **Browser console**:
   - Open DevTools (F12)
   - Check Console tab for errors
   - Look for red error messages

4. **Internet connection**:
   - Firebase needs internet to work
   - Check if other Firebase features work (testimonials)

### Still Stuck?

1. Try the **"Permissive Rules"** section above (testing only)
2. Check browser console for **exact error message**
3. Share the error message for specific help

---

## ✅ Success Checklist

After fixing, you should be able to:

- [ ] Light a candle with your name
- [ ] Light a candle anonymously
- [ ] See counter increment
- [ ] See your candle in "Recently Lit" grid
- [ ] See timestamp ("Just now", "5 min ago", etc.)
- [ ] Refresh page and counter persists
- [ ] Toggle language and candle feature works in both EN/FR

**All checked?** Your Virtual Candle feature is working perfectly! 🕯️✨

---

**Last Updated:** January 2025
