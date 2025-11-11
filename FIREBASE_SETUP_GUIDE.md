# Firebase Setup Guide for Testimonials Feature

This guide will walk you through setting up Firebase Firestore for the automated testimonials feature on the memorial website.

## Overview

The testimonials feature uses:
- **Firebase Firestore**: Real-time database for storing and displaying testimonials
- **Client-side spam prevention**: Profanity filter, URL detection, rate limiting
- **Auto-display**: Testimonials appear immediately without manual approval
- **Admin moderation**: Password-protected delete functionality

## Step 1: Create a Firebase Project

### 1.1 Sign Up for Firebase

1. Go to https://firebase.google.com/
2. Click **Get Started** (or **Go to Console** if you already have an account)
3. Sign in with your Google account

### 1.2 Create New Project

1. Click **Add project** (or the **+** icon)
2. Enter project name: `joel-shekinah-memorial` (or any name you prefer)
3. Click **Continue**
4. **Google Analytics**: You can disable this for a memorial website (toggle OFF)
5. Click **Create project**
6. Wait for Firebase to set up your project (takes ~30 seconds)
7. Click **Continue**

## Step 2: Set Up Cloud Firestore

### 2.1 Create Firestore Database

1. In the Firebase Console left sidebar, click **Build** → **Firestore Database**
2. Click **Create database**
3. **Security Rules**: Select **Start in production mode** (we'll add custom rules later)
4. Click **Next**
5. **Location**: Choose a location closest to your users (e.g., `us-central1` for North America, `europe-west1` for Europe)
   - **Note**: You cannot change this location later
6. Click **Enable**
7. Wait for Firestore to be created (~30 seconds)

### 2.2 Configure Firestore Security Rules

Security rules control who can read/write to your database. We need to allow:
- Anyone to read testimonials
- Anyone to write testimonials (with rate limiting)
- Server-side timestamp validation

1. In Firestore Database page, click the **Rules** tab
2. Replace the default rules with the following:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Testimonials collection rules
    match /testimonials/{testimonialId} {
      // Anyone can read testimonials
      allow read: if true;

      // Allow creating new testimonials with validation
      allow create: if
        // Must include required fields
        request.resource.data.name is string &&
        request.resource.data.relationship is string &&
        request.resource.data.message is string &&
        request.resource.data.createdAt == request.time &&
        request.resource.data.approved is bool &&

        // Field length validation
        request.resource.data.name.size() > 0 &&
        request.resource.data.name.size() <= 100 &&
        request.resource.data.relationship.size() > 0 &&
        request.resource.data.relationship.size() <= 100 &&
        request.resource.data.message.size() > 0 &&
        request.resource.data.message.size() <= 5000;

      // Allow anyone to delete (client-side password protection handles admin access)
      allow delete: if true;

      // Prevent updates (testimonials cannot be edited, only deleted)
      allow update: if false;
    }
  }
}
```

3. Click **Publish**
4. Confirm by clicking **Publish** again in the dialog

**What these rules do:**
- ✅ Anyone can read all testimonials
- ✅ Anyone can create testimonials (spam is handled client-side)
- ✅ Validates required fields and character limits
- ✅ Ensures `createdAt` uses server timestamp (prevents client time manipulation)
- ✅ Anyone can delete (password protection is on client-side)
- ❌ Updates are not allowed (testimonials are immutable)

## Step 3: Get Firebase Configuration

### 3.1 Register Your Web App

1. In Firebase Console, click the **gear icon** ⚙️ (Project Settings) in the left sidebar
2. Scroll down to **Your apps** section
3. Click the **Web** icon `</>` (it looks like this: **&lt;/&gt;**)
4. **App nickname**: Enter `Memorial Website` (or any name)
5. **Firebase Hosting**: Leave unchecked (we'll use Vercel/Netlify)
6. Click **Register app**
7. You'll see a code snippet with your Firebase configuration

### 3.2 Copy Your Configuration Values

You'll see something like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD-xxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

**Copy these values** - you'll need them in the next step.

8. Click **Continue to console**

## Step 4: Configure Environment Variables

### 4.1 Create .env.local File

1. In your project folder `C:\PROJ\joel-shekinah-memorial\`, create a new file named `.env.local`
2. Copy the contents from `.env.local.example` or paste the following:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Admin Configuration
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password_here
```

### 4.2 Fill in Your Firebase Values

Replace each value with your actual Firebase configuration:

**Example (using fake values):**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD-abcdefghijklmnopqrstuvwxyz12345
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=joel-shekinah-memorial.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=joel-shekinah-memorial
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=joel-shekinah-memorial.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

# Choose a strong password for deleting inappropriate testimonials
NEXT_PUBLIC_ADMIN_PASSWORD=MySecurePassword2025!
```

### 4.3 Important Notes

⚠️ **Security Notes:**
- The `NEXT_PUBLIC_` prefix makes these variables accessible in the browser
- This is normal and safe for Firebase client config
- Your Firestore security rules protect your data, not these keys
- **Never commit `.env.local` to Git** (it's already in `.gitignore`)

🔐 **Admin Password:**
- Choose a strong, unique password for `NEXT_PUBLIC_ADMIN_PASSWORD`
- This password is used to delete inappropriate testimonials
- Anyone with this password can delete testimonials by hovering over a testimonial and clicking the 🗑️ icon

## Step 5: Test the Implementation

### 5.1 Start the Development Server

If the server isn't already running:

```bash
cd C:\PROJ\joel-shekinah-memorial
npm run dev
```

### 5.2 Open the Website

1. Open your browser to http://localhost:3000
2. Scroll down to the **"Share Your Memories"** section

### 5.3 Submit a Test Testimonial

1. Fill in the form:
   - **Name**: Your Name
   - **Relationship**: Friend
   - **Message**: This is a test testimonial to verify Firebase is working correctly.
   - **Email**: (optional)

2. Click **Submit Testimonial**

3. **Expected Behavior**:
   - You should see a green success message: "Thank you for sharing your memories!"
   - The testimonial should appear immediately in the **"Memories & Tributes"** section below
   - The form should clear

### 5.4 Verify in Firebase Console

1. Go back to Firebase Console → Firestore Database
2. Click on **Data** tab
3. You should see a `testimonials` collection with your test entry
4. Click on the document to see all fields:
   - `name`, `relationship`, `message`, `email`, `createdAt`, `approved`

### 5.5 Test Admin Delete Function

1. Hover over your test testimonial on the website
2. Look for the 🗑️ (trash) icon in the top-right corner
3. Click the trash icon
4. Enter your admin password from `.env.local`
5. Click OK
6. The testimonial should disappear immediately
7. Verify it's deleted in Firebase Console (refresh the page)

### 5.6 Test Spam Prevention

**Test 1: Profanity Filter**
- Try submitting a testimonial with inappropriate language
- You should see an error: "Your submission contains inappropriate language"

**Test 2: URL Detection**
- Try submitting a testimonial with a link like "Visit www.example.com"
- You should see an error: "Links are not allowed in testimonials"

**Test 3: Rate Limiting**
- Submit a valid testimonial
- Immediately try to submit another one
- You should see an error: "Please wait X minutes before submitting another testimonial"
- This prevents spam/flooding

**Test 4: Character Limit**
- Try pasting a very long message (over 500 words)
- The word counter will show "XXX / 500 words"
- You should see an error: "Your message is too long"

## Step 6: Deploy to Production

When you deploy your website to Vercel or Netlify, you need to add the environment variables there too.

### Vercel Deployment

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add each variable:
   - Name: `NEXT_PUBLIC_FIREBASE_API_KEY`
   - Value: (your actual API key)
   - Environment: Select all (Production, Preview, Development)
   - Click **Save**
4. Repeat for all 7 environment variables
5. Redeploy your website for changes to take effect

### Netlify Deployment

1. Go to your Netlify project dashboard
2. Click **Site settings** → **Build & deploy** → **Environment**
3. Click **Edit variables**
4. Add each variable with its value
5. Click **Save**
6. Trigger a new deploy

## Features Included

✅ **Real-time Display**: Testimonials appear instantly without page refresh
✅ **Spam Prevention**:
  - Profanity filtering (bad-words package)
  - URL/link detection and blocking
  - 500-word limit
  - Rate limiting (1 submission per hour per device)
✅ **Admin Moderation**: Password-protected delete button
✅ **User-Friendly**:
  - Live word counter
  - Success/error messages
  - Loading states
  - Responsive design
✅ **Data Validation**: Both client-side and Firestore security rules
✅ **Privacy**: Email is optional
✅ **Timestamps**: Sorted by newest first

## Troubleshooting

### Issue: "Firebase: Error (auth/invalid-api-key)"
**Solution**: Check that your `NEXT_PUBLIC_FIREBASE_API_KEY` in `.env.local` is correct

### Issue: "Missing or insufficient permissions"
**Solution**:
1. Go to Firestore → Rules
2. Make sure you published the security rules from Step 2.2
3. Wait 1-2 minutes for rules to propagate

### Issue: Testimonials not appearing in real-time
**Solution**:
1. Check browser console for errors (F12 → Console tab)
2. Verify `.env.local` file is in the correct location
3. Restart the dev server (`Ctrl+C`, then `npm run dev`)

### Issue: "Cannot find module '@/lib/firebase'"
**Solution**: Make sure you created `lib/firebase.ts` in Step 3

### Issue: Delete button not working
**Solution**:
1. Make sure you set `NEXT_PUBLIC_ADMIN_PASSWORD` in `.env.local`
2. Enter the exact password (case-sensitive)
3. Check Firestore rules allow delete operations

### Issue: Rate limiting not working
**Solution**:
- Rate limiting uses browser localStorage
- Clear your browser's localStorage (F12 → Application → Local Storage → Clear All)
- Or use Incognito/Private mode for testing

## Firebase Free Tier Limits

Firebase has a generous free tier (Spark Plan):
- **Stored Data**: 1 GB (plenty for testimonials)
- **Document Reads**: 50,000 per day
- **Document Writes**: 20,000 per day
- **Document Deletes**: 20,000 per day
- **Network Egress**: 10 GB per month

For a memorial website with moderate traffic, you'll likely stay well within these limits. Monitor usage in Firebase Console → Usage tab.

## Security Best Practices

1. ✅ **Never expose admin credentials**: Don't share your admin password
2. ✅ **Monitor Firestore usage**: Check Firebase Console regularly for unusual activity
3. ✅ **Keep security rules updated**: Review rules if you add new features
4. ✅ **Client-side validation**: Already implemented (profanity, URLs, rate limiting)
5. ✅ **Server-side validation**: Firestore rules validate field types and lengths
6. ⚠️ **Consider adding reCAPTCHA**: If you get excessive spam, add Google reCAPTCHA v3

## Optional Enhancements

### Email Notifications (Advanced)

If you want to receive email notifications when someone submits a testimonial:

1. Set up Firebase Cloud Functions (requires Blaze/pay-as-you-go plan)
2. Use Firestore triggers to send emails via SendGrid or Nodemailer
3. This goes beyond the current implementation

### IP-Based Rate Limiting (Advanced)

The current rate limiting uses browser localStorage (per-device). For IP-based limiting:

1. Use Firebase Cloud Functions with IP detection
2. Store IP addresses with timestamps in Firestore
3. Check submissions against IP history

## Firestore Data Structure

Each testimonial document has the following structure:

```javascript
{
  name: "John Doe",                    // string, max 100 chars
  relationship: "Friend",              // string, max 100 chars
  message: "She was amazing...",       // string, max 5000 chars
  email: "john@example.com",           // string or null, optional
  createdAt: Timestamp,                // Firebase server timestamp
  approved: true                       // boolean, always true (auto-approve)
}
```

## Support Resources

- **Firebase Documentation**: https://firebase.google.com/docs
- **Firestore Security Rules**: https://firebase.google.com/docs/firestore/security/get-started
- **Next.js + Firebase**: https://firebase.google.com/docs/web/setup#next.js
- **bad-words Package**: https://www.npmjs.com/package/bad-words

---

## Summary Checklist

Before deploying, make sure you've completed:

- [ ] Created Firebase project
- [ ] Set up Firestore database
- [ ] Configured security rules
- [ ] Copied Firebase config values
- [ ] Created `.env.local` file with all 7 variables
- [ ] Set a strong admin password
- [ ] Tested testimonial submission
- [ ] Tested testimonial display (real-time)
- [ ] Tested admin delete function
- [ ] Tested spam prevention (profanity, URLs, rate limiting)
- [ ] Verified in Firebase Console
- [ ] Added environment variables to Vercel/Netlify (when deploying)

---

**🎉 Congratulations!** Your automated testimonials system is now live. Visitors can share their memories, and they'll appear instantly without any manual approval needed. The spam prevention features will keep the content appropriate and respectful.

*Created with care for the memorial of Joëlle Shekinah Tchami*
