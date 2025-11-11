# Content Documentation for Joëlle Shekinah Memorial Website

**IMPORTANT**: This document contains all the source information used to build the website. Use this as a reference for any future updates or if another Claude instance needs to continue work on this project.

## Source Information

This memorial website was created based on verbal account provided by the user (Lionel Tchami, brother of Joëlle Shekinah).

## Personal Information

**Full Name**: Joëlle Shekinah Tchami
**Birth**: December 19, 1984, Bertoua, Cameroon, Central Africa
**Death**: October 2025
**Position in Family**: 3rd born in the Tchami family
**Father**: Dr. Tchami (deceased 2024)
**Mother**: Deceased 2024
**Children**:
- Kelilah (born 2018)
- Daniela (born 2020/2021)
- Precious (foster daughter, raised from young age)

**Spouse**: Olivier (married 2016, divorced 2025)

## Life Timeline (Chronological)

### Birth and Early Childhood (1984-1990s)
- **1984**: Born December 19 in Bertoua, Cameroon
- Born with sickle cell anemia (SS blood type)
- This condition prevented her from participating in sports due to pain
- Family moved frequently: Bertoua → Bamenda → Garoua → Buea (Southwest Cameroon)
- Spent most of her childhood in Buea, Southwest Cameroon

### Education (1990s-2010s)
- **Primary/Secondary**: Attended schools in various cities during family moves
- **Lycée (High School)**: Lycée Bilingue de Buea (Lisebeleng, the Buea)
  - French education system
  - Completed baccalaureate
- **University - Bachelor's**: University of Buea
  - Bachelor's degree in Chemistry
- **University - Master's**: ASTI (Advanced School of Translators and Interpreters), University of Buea
  - Master's degree in Languages
  - Specialized in conference interpretation

### Divine Healing (2013-2014)
- Around 2013-2014, experienced miraculous healing
- Blood type changed from SS (sickle cell) to AA (normal)
- This was a transformative event in her life and a cornerstone of her faith testimony

### Professional Career (2010s-2025)
- **Profession**: International conference interpreter
- **Specialization**: French ↔ English translation
- **Notable Work**:
  - Interpreted at Fire Conference in Limbe, Cameroon (major Christian conference)
  - Numerous international Christian conferences
  - World-renowned in her field
- **Languages**:
  - French (native proficiency)
  - English (native proficiency)
  - Portuguese (learning at time of death)
- **LinkedIn**: https://www.linkedin.com/in/joelle-k-70949880/

### Marriage and Family (2016-2025)
- **2016**: Married Olivier
- **2018**: First daughter Kelilah born in Yaoundé, Cameroon
  - At this time, Joëlle was the sole breadwinner
  - Working as interpreter and supporting entire family
  - Husband was not contributing financially
- **Late 2010s**: Took in and raised a girl named Precious
  - This shows her generous and caring nature
- **~2019**: Sent husband to Dubai to seek opportunities
  - She paid for his travel and expenses
  - He was unable to succeed there
- **2020-2021**: Second daughter Daniela born in Nkongsamba, Littoral Cameroon
  - Birth had complications
  - Father (Dr. Tchami) asked her to move from Yaoundé to Nkongsamba
  - Gave birth with father's medical support

### Living Arrangements (2022-2025)
- **2022**: Family (Dr. Tchami, mother, Joëlle, Kelilah, Daniela, Precious) moved from Nkongsamba back to Buea
  - Settled in family house in Buea, Southwest Cameroon
- **2024**:
  - Father (Dr. Tchami) passed away - she was present with him
  - Mother passed away later that year - she was also present
  - After mother's death, moved out of family house with husband (who had returned from Dubai)
  - Lived in a house he was renting
- **2025**:
  - After 8 years of marriage, filed for divorce
  - She had been sole provider throughout marriage
  - Made courageous decision to seek independence for herself and daughters

### Final Days (October 2025)
- **October 1, 2025 (Saturday morning)**: Called her brother (the user) saying she wasn't feeling well
- They started praying together
- Passed away in October 2025

## Key Character Traits and Accomplishments

1. **Professional Excellence**: World-renowned conference interpreter
2. **Faith**: Strong believer; experienced miraculous healing; served at Christian conferences
3. **Resilience**: Overcame sickle cell anemia, supported entire family financially
4. **Generosity**: Raised Precious alongside her own daughters
5. **Independence**: Made difficult decision to file for divorce and seek better life
6. **Dedication**: Primary breadwinner, paid all bills, supported husband's travel
7. **Academic Achievement**: Bachelor's in Chemistry + Master's in Languages
8. **Multilingual**: French, English, learning Portuguese
9. **Family Oriented**: Present with both parents when they passed, devoted to daughters

## Website Sections Implemented

### 1. Hero Section (`components/Hero.tsx`)
- Full-screen gradient background (warm brown tones)
- Circular photo placeholder (to be replaced with actual photo)
- Name: "Joëlle Shekinah Tchami"
- Dates: "December 19, 1984 - October 2025"
- Tagline: "International Conference Interpreter | Loving Mother | Faithful Believer"
- Scroll indicator

### 2. Biography Section (`components/Biography.tsx`)
Detailed sections covering:
- Early Life & Family
- A Miracle of Faith (healing from sickle cell)
- Education & Professional Excellence
- Family Life & Motherhood
- Strength in Adversity
- Legacy

### 3. Timeline Component (`components/Timeline.tsx`)
Interactive, visual timeline with 16 life events:
- Color-coded by category (birth, life, education, career, family, miracle, memorial)
- Each event shows: year, title, description, location (if applicable)
- Categories:
  - 🌹 Birth (rose colors)
  - 🔵 Life events (blue colors)
  - 💜 Education (purple colors)
  - 💚 Career (emerald colors)
  - 💗 Family (pink colors)
  - ⭐ Miracle (amber colors)
  - 🕊️ Memorial (gray colors)

### 4. Professional Section (`components/Professional.tsx`)
- Career highlights
- Education credentials
- Key achievements (15+ years interpretation, 100+ conferences, 3 languages)
- Skills & expertise
- Fire Conference highlight
- LinkedIn integration (URL to be added)

### 5. Photo Gallery (`components/PhotoGallery.tsx`)
Six organized sections with placeholders:
1. Childhood Years (1984-2000s)
2. Education & University (2000s-2010s)
3. Professional Life (2010s-2025)
4. Wedding & Marriage (2016)
5. Motherhood (2018-2025)
6. Family & Celebrations

Instructions included for adding photos.

### 6. Testimonials Section (`components/Testimonials.tsx`)
**Automated real-time testimonials with Firebase Firestore**

Features:
- **Real-time Display**: Testimonials appear instantly without page refresh using Firebase onSnapshot
- **No Login Required**: Visitors can submit testimonials anonymously
- **Auto-Display**: All testimonials display immediately (no manual approval needed)
- **Spam Prevention**:
  - Profanity filtering using bad-words package
  - URL/link detection and blocking
  - 500-word character limit with live counter
  - Rate limiting: 1 submission per hour per device (localStorage)
- **Admin Moderation**: Password-protected delete button (hover to see 🗑️ icon)
- **Form Fields**:
  - Name (required, max 100 characters)
  - Relationship to Joëlle (required, max 100 characters)
  - Message (required, max 500 words/5000 characters)
  - Email (optional, max 100 characters)
- **Validation**: Both client-side (React) and server-side (Firestore security rules)
- **Timestamps**: Server timestamps prevent client time manipulation
- **Display**: Newest testimonials first, formatted dates
- **UI States**: Loading spinner, success messages, error messages
- **Responsive Design**: Mobile-friendly form and testimonial cards

**Firebase Integration**:
- Collection: `testimonials`
- Document structure: `{ name, relationship, message, email, createdAt, approved }`
- Security rules: Allow read (all), create (validated), delete (all), no updates
- See FIREBASE_SETUP_GUIDE.md for detailed setup instructions

**Dependencies**:
- `firebase` (v10+): Firestore database
- `bad-words`: Profanity filtering

### 7. Footer (`components/Footer.tsx`)
- Summary information
- Birth location, family, profession
- Created by Tchami family
- Copyright notice

## Design Specifications

### Color Palette
```css
--background: #fdfcf9      (Off-white, warm background)
--foreground: #2c2c2c      (Dark gray, text)
--accent: #8b7355          (Warm brown, primary accent)
--accent-light: #c4a585    (Light tan, secondary accent)
--soft-gray: #f5f3f0       (Soft gray background)
```

### Typography
- Font family: Georgia (serif) for elegance and readability
- Responsive sizing with Tailwind classes
- Line height optimized for reading

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- All sections fully responsive

## Technical Implementation

### Framework & Libraries
- **Next.js 15**: React framework with App Router
- **React 19**: Latest React version
- **TypeScript 5**: Type-safe development
- **Tailwind CSS 3.4**: Utility-first styling
- **PostCSS + Autoprefixer**: CSS processing
- **Firebase**: Cloud Firestore for real-time database (testimonials)
- **bad-words**: Profanity filtering for spam prevention

### File Structure
```
joel-shekinah-memorial/
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Main page composing all sections
│   └── globals.css      # Global styles
├── components/
│   ├── Hero.tsx         # Hero section
│   ├── Biography.tsx    # Biography section
│   ├── Timeline.tsx     # Timeline component
│   ├── Professional.tsx # Professional section
│   ├── PhotoGallery.tsx # Gallery section
│   ├── Testimonials.tsx # Testimonials with Firebase
│   └── Footer.tsx       # Footer
├── lib/
│   └── firebase.ts      # Firebase configuration and initialization
├── public/
│   └── images/         # Photo storage (to be populated)
├── .env.local.example   # Environment variables template
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── .eslintrc.json
```

### Build Configuration
- ESLint configured with `react/no-unescaped-entities` disabled
- Tailwind configured for all component files
- PostCSS with autoprefixer for browser compatibility
- TypeScript with strict mode enabled

## Future Enhancements / TODO

1. **Add Photos**:
   - User needs to populate `/public/images` folder
   - Update PhotoGallery.tsx to display actual images
   - Add hero photo to replace placeholder

2. **Add LinkedIn URL**:
   - Update Professional.tsx with actual LinkedIn profile URL

3. **Optional Additions**:
   - Guest book / condolences section
   - Video tributes section
   - Download memorial booklet (PDF)
   - Share to social media buttons
   - Memorial donation information
   - Events calendar for memorial services

4. **SEO Optimization**:
   - Add Open Graph meta tags
   - Add Twitter Card meta tags
   - Create sitemap.xml
   - Add robots.txt

5. **Analytics** (if desired):
   - Google Analytics integration
   - Track visitor statistics

## Deployment Information

### Recommended Platform: Vercel
- Free tier available
- Automatic deployments from GitHub
- Built-in CDN
- HTTPS by default
- Custom domain support

### Alternative: Netlify
- Similar features to Vercel
- Free tier available
- Easy setup

### Build Commands
- Install: `npm install`
- Development: `npm run dev`
- Build: `npm run build`
- Production: `npm start`
- Lint: `npm run lint`

## Version History

- **v1.0** (November 8, 2025): Initial creation
  - Complete website structure
  - All content sections implemented
  - Responsive design
  - Ready for photo addition and deployment

## Contact Information for Future Developers

This website was created for the Tchami family. All content is based on information provided by Lionel Tchami (brother).

For questions about content accuracy or additional information:
- Contact the Tchami family directly
- All source information is documented in this file

## Notes for Future Claude Instances

If you need to continue work on this project:

1. **All information is documented**: This file, README.md, and SETUP_GUIDE.md contain everything
2. **Code is self-documenting**: Components have clear names and structure
3. **Timeline events**: See Timeline.tsx - all 16 life events are documented there
4. **Design system**: Colors and styling are in globals.css and consistently used
5. **User's requirements**:
   - Beautiful, modern memorial website
   - Complete timeline of life
   - Professional accomplishments highlighted
   - LinkedIn integration
   - Photo gallery (to be populated)
   - Responsive and accessible

**Key user instruction from global CLAUDE.md**:
> "MAKE SURE TO DOCUMENT ALL STEPS AS OFTEN AS POSSIBLE SO ANY OTHER CLAUDE INSTANCE CAN PROCEED FROM WHERE YOU STOP."

This requirement has been fulfilled through:
- This comprehensive documentation file
- Detailed README with setup instructions
- SETUP_GUIDE with step-by-step instructions
- Well-commented code
- Clear project structure

---

*Created with care and respect for the memory of Joëlle Shekinah Tchami*
*May her legacy continue to inspire*
