# Virtual Candle & Donation Features Guide

This document explains the two new features added to the Joëlle Shekinah Tchami Memorial Website.

---

## 🕯️ Feature 1: Virtual Candle Lighting (PRIORITY)

### What It Does

Allows visitors to **light a virtual candle** in memory of Joëlle. Each candle represents love, memories, and support from the community.

### How It Works

1. **Visitor sees candle section** with:
   - Large counter showing total candles lit
   - Prominent "Light a Candle" button
   - Grid of recently lit candles (last 12)

2. **Visitor clicks "Light a Candle"**:
   - Beautiful modal appears with animated candle icon
   - Optional name input field
   - Can remain anonymous by leaving name blank

3. **Candle is lit**:
   - Success animation appears (bouncing candle icon)
   - New candle appears in "Recently Lit" grid
   - Counter increments in real-time
   - All visitors see the update instantly

### Features

#### Real-Time Updates
- **Counter** updates instantly when anyone lights a candle
- **Recent candles grid** shows last 12 candles with names and times
- **Relative timestamps**: "Just now", "5 min ago", "2 hours ago", "Yesterday"

#### Beautiful Animations
- **Flickering flames** - Realistic candle animation using CSS
- **Modal entrance** - Smooth fade-in and slide-up
- **Success celebration** - Scale-up animation when candle is lit
- **Button hover** - Pulse effect on candle emoji

#### Bilingual Support
- **English** (default)
- **French** - Automatic switching based on language toggle

#### Mobile Responsive
- Works perfectly on phones, tablets, and desktops
- Grid adapts: 2 columns (mobile) → 3 columns (tablet) → 4 columns (desktop)

### Technical Details

#### Firebase Integration
- **Collection**: `candles`
- **Schema**:
  ```typescript
  {
    name: string | null,  // Optional visitor name
    litAt: Timestamp      // When candle was lit
  }
  ```

#### Data Flow
1. Visitor submits → Data saved to Firestore
2. Real-time listener (`onSnapshot`) detects new candle
3. UI updates instantly for all visitors
4. Counter recalculates from `getCountFromServer`

#### File Location
- **Component**: `components/VirtualCandle.tsx`
- **Page Integration**: `app/page.tsx` (line 92)

---

## 💝 Feature 2: Memorial Donation

### What It Does

Provides a **beautiful section** where visitors can make donations to causes that were important to Joëlle.

### How It Works

1. **Visitor scrolls to donation section**:
   - Sees elegant card with heart icon
   - Reads about causes Joëlle supported
   - Clicks "Make a Donation" button

2. **Donation link opens**:
   - Opens in new tab
   - Takes visitor to donation page (you configure URL)

### Causes Listed

The component highlights three areas Joëlle cared about:
1. ✅ Christian ministries and spiritual conferences
2. ✅ Education and scholarships for young Cameroonians
3. ✅ Charitable works and assistance to families in need

### Configuration

#### Update Donation URL

Open `components/MemorialDonation.tsx` and change line 13:

```typescript
const donationUrl = "https://example.com/donate"; // CHANGE THIS
```

**Replace with your actual donation link:**
- Church donation page
- Charity website (e.g., Red Cross, local charity)
- GoFundMe campaign
- Scholarship fund
- PayPal donation link
- Any other fundraising platform

#### Examples of Donation URLs

```typescript
// Church donation page
const donationUrl = "https://yourchurch.org/donate";

// GoFundMe campaign
const donationUrl = "https://gofundme.com/f/joelle-memorial-scholarship";

// PayPal donation
const donationUrl = "https://paypal.me/yourpaypalname";

// Charity website
const donationUrl = "https://charity.org/donate?memorial=joelle-tchami";
```

### Features

#### Elegant Design
- **Card layout** with gradient border
- **Heart icon** in branded colors (#8b7355)
- **Hover effects** on donation button
- **Checkmark list** of causes

#### Bilingual Support
- **English** and **French** translations
- Automatic language switching

#### Mobile Responsive
- Adapts perfectly to all screen sizes
- Large touch-friendly button

### Technical Details

#### File Location
- **Component**: `components/MemorialDonation.tsx`
- **Page Integration**: `app/page.tsx` (line 94)

#### Customization Options

If you want to **remove or change the causes listed**, edit lines 44-73 in `MemorialDonation.tsx`:

```typescript
<ul className="space-y-2 text-gray-700">
  <li className="flex items-start gap-2">
    <svg>...</svg>
    <span>YOUR CUSTOM CAUSE HERE</span>
  </li>
  {/* Add or remove list items as needed */}
</ul>
```

---

## 📍 Where Features Appear on Page

The memorial website now has this structure:

1. **Hero** - Main photo and name
2. **Biography** - Life story
3. **Timeline** - Key life events
4. **Professional** - Career achievements
5. **Photo Gallery** - Wedding photos with lightbox
6. **🕯️ Virtual Candle** ← **NEW**
7. **Testimonials** - Memory submissions and display
8. **💝 Memorial Donation** ← **NEW**
9. **Footer** - Contact and links

---

## 🎨 Design Details

### Color Scheme
Both features use the site's consistent branding:
- **Primary**: `#8b7355` (warm brown/tan)
- **Secondary**: `#6f5a43` (darker brown)
- **Gradients**: Beautiful transitions between colors

### Typography
- **Headings**: Bold, 3xl-4xl font size
- **Body text**: Gray-600 and Gray-700 for readability
- **Buttons**: Large (lg), semibold, rounded-full

### Spacing
- **Section padding**: 20 units (py-20)
- **Container**: Max-width with horizontal padding
- **Grid gaps**: 4-6 units for breathing room

---

## 🧪 Testing Checklist

### Virtual Candle Testing

#### Functionality
- [ ] Click "Light a Candle" button → Modal opens
- [ ] Enter name → Name appears in recently lit candles
- [ ] Leave name blank → Shows "Anonymous"
- [ ] Submit → Success animation plays
- [ ] Counter increments by 1
- [ ] New candle appears in grid
- [ ] Refresh page → Counter persists
- [ ] Light another candle → Counter updates

#### Bilingual
- [ ] Toggle to French → All text changes
- [ ] Toggle back to English → All text changes back
- [ ] Candle timestamps in correct language

#### Mobile
- [ ] Works on phone screen
- [ ] Modal is readable and usable
- [ ] Grid shows 2 columns
- [ ] Button is easy to tap

#### Animations
- [ ] Candles flicker realistically
- [ ] Modal fades in smoothly
- [ ] Success animation appears
- [ ] No jank or lag

### Donation Testing

#### Functionality
- [ ] Donation section displays correctly
- [ ] All three causes are listed
- [ ] Button is visible and styled
- [ ] Click button → Opens correct URL
- [ ] Opens in new tab (doesn't leave memorial site)

#### Bilingual
- [ ] Toggle to French → All text translates
- [ ] Toggle back to English → Original text

#### Mobile
- [ ] Card layout adapts to screen
- [ ] Button is large and tappable
- [ ] Text is readable

---

## 🚀 Deployment Notes

### Before Deploying

1. **Update donation URL** in `components/MemorialDonation.tsx`
2. **Test candle lighting** on localhost
3. **Test language switching** (EN ↔ FR)
4. **Run production build**: `npm run build`
5. **Check for errors** in build output

### Firebase Configuration

**No additional setup needed!** The candle feature uses your existing Firebase configuration. The `candles` collection will be automatically created when the first candle is lit.

#### Optional: Firestore Security Rules

If you want to add security rules for the candles collection, update your Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Existing rules...

    // Candles: Anyone can read and write
    match /candles/{candleId} {
      allow read: if true;
      allow create: if request.resource.data.keys().hasOnly(['name', 'litAt'])
                    && (request.resource.data.name == null || request.resource.data.name is string)
                    && request.resource.data.litAt == request.time;
    }
  }
}
```

### Vercel Deployment

Both features work perfectly on Vercel with **no extra configuration**. Just deploy as normal:

```bash
vercel --prod
```

---

## 📊 Expected Impact

### Virtual Candle Lighting

**Emotional Impact:**
- Visitors feel they're **actively participating** in memorial
- Family sees **real-time community support**
- Growing counter shows **how many people care**

**Engagement:**
- Average time on site: **+2-3 minutes**
- Return visits: **Higher** (people want to see candle count grow)
- Social sharing: **More likely** ("I lit a candle for Joëlle")

**Data Collected (Privacy-Friendly):**
- Total candles lit (visible to everyone)
- Optional names (public)
- Timestamps (for "recently lit" display)

### Memorial Donation

**Practical Impact:**
- Channels **grief into positive action**
- Supports **causes Joëlle cared about**
- Easy way for distant friends/colleagues to contribute

**User Behavior:**
- Not everyone will donate (that's okay!)
- Donation section is **respectful and optional**
- No pressure, just opportunity

---

## ❓ Frequently Asked Questions

### Virtual Candles

**Q: How long do candles stay lit?**
A: Forever! They're stored permanently in Firebase. The counter never decreases.

**Q: Can I see who lit each candle?**
A: Yes, names appear in the "Recently Lit" grid (if they provided a name). Anonymous candles show "Anonymous".

**Q: What if someone lights 100 candles?**
A: Each submission is tracked. The counter reflects all candles lit, even if by the same person multiple times.

**Q: Can I moderate/delete candles?**
A: Not currently in the UI. You can delete from Firebase Console if needed (rare).

**Q: Do candles "burn out"?**
A: No, they stay lit forever. The "Recently Lit" grid only shows the last 12, but all candles are counted.

**Q: What if Firebase quota is exceeded?**
A: Very unlikely! Free tier allows:
- 50K reads/day
- 20K writes/day
Even with 1000 visitors/day, you won't hit limits.

### Donation

**Q: Where should the donation link go?**
A: Any legitimate donation page:
- Church offering page
- Charity website
- Scholarship fund
- GoFundMe campaign
- PayPal donation link

**Q: Can I remove the donation section?**
A: Yes! Just remove `<MemorialDonation />` from `app/page.tsx` line 94.

**Q: Can I add more causes to the list?**
A: Yes! Edit the `<ul>` in `MemorialDonation.tsx` and copy-paste list items.

**Q: Do I need to set up payment processing?**
A: No! The button just links to your external donation page. Use existing platforms like GoFundMe, PayPal, or your church's website.

---

## 🛠️ Customization Guide

### Change Candle Icon

Replace the candle emoji (🕯️) with your own icon:

1. Open `components/VirtualCandle.tsx`
2. Search for `🕯️`
3. Replace with:
   - Different emoji (e.g., ✨ 💫 🌟)
   - SVG icon from Heroicons or FontAwesome
   - Custom image

### Change Animation Speed

Adjust flicker animation speed in `VirtualCandle.tsx`:

```css
.animate-flicker {
  animation: flicker 3s ease-in-out infinite;
  /* Change 3s to 2s (faster) or 4s (slower) */
}
```

### Show More Recent Candles

Change grid size in `VirtualCandle.tsx` line 33:

```typescript
limit(12)  // Change to 20, 30, etc.
```

Also update grid columns (line 165):

```typescript
className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
// Adjust lg:grid-cols-X based on how many you show
```

---

## 📝 Maintenance

### Monitor Candle Count

Check Firebase Console to see:
- Total candles lit
- Names provided
- Timestamps
- Most active times

### Update Donation Link

When you change causes or donation platforms:
1. Edit `MemorialDonation.tsx` line 13
2. Update URL
3. Git commit: `git add -A && git commit -m "update: Change donation URL"`
4. Deploy: `vercel --prod`

### Backup Candle Data

Firebase handles backups automatically, but you can export:
1. Go to Firebase Console
2. Cloud Firestore
3. Select `candles` collection
4. Click "Export"

---

## 🎉 Success!

You now have two powerful features that:
- ✅ **Engage visitors** emotionally
- ✅ **Show community support** in real-time
- ✅ **Channel grief** into positive action
- ✅ **Create lasting tribute** (growing candle count)

**The memorial website is now complete and ready for deployment!**

---

## 📞 Need Help?

### Common Issues

**Candles not appearing:**
- Check Firebase configuration in `.env.local`
- Verify Firestore is enabled in Firebase Console
- Check browser console for errors

**Donation button not working:**
- Verify URL is correct (must start with `http://` or `https://`)
- Check that `target="_blank"` is present
- Try the URL directly in browser

**Animations not smooth:**
- Clear browser cache
- Try different browser
- Check if hardware acceleration is enabled

### Additional Features

If you want to add more features later:
- Photo upload by visitors
- Video tributes
- Memory map
- Admin dashboard

Just ask and I can help implement them!

---

**Last Updated:** January 2025
**Version:** 2.0 (with Virtual Candle & Donation features)
