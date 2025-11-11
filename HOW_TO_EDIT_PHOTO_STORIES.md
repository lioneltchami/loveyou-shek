# How to Edit Photo Stories and Memories

This guide explains how to add or edit the stories and memories that appear with each photo in the gallery.

---

## 📍 Location of Stories File

**File:** `data/photo-memories.json`

This file contains all the stories, years, and locations for every photo in the gallery.

---

## 📝 How to Edit a Story

### Step 1: Open the File
1. Open `data/photo-memories.json` in any text editor (VS Code, Notepad++, etc.)
2. Find the photo you want to edit by its filename

### Step 2: Edit the Story
Each photo has this structure:

```json
"IMG_8217.JPG": {
  "story_en": "The English version of the story goes here...",
  "story_fr": "La version française de l'histoire va ici...",
  "year": 2008,
  "location": "Buea, Cameroon"
}
```

**Fields explained:**
- `story_en`: The story in English
- `story_fr`: The story in French
- `year`: Optional - year the photo was taken (or `null`)
- `location`: Optional - where the photo was taken (or `null`)

### Step 3: Save and Reload
1. Save the file (`Ctrl + S`)
2. Refresh the website (if dev server is running)
3. Changes appear immediately!

---

## ✏️ Example: Adding a Real Story

### Before (Placeholder):
```json
"IMG_7587.jpg": {
  "story_en": "Joëlle and her mother together",
  "story_fr": "Joëlle et sa maman ensemble",
  "year": null,
  "location": null
}
```

### After (Real Memory):
```json
"IMG_7587.jpg": {
  "story_en": "This photo was taken during our last family vacation in Kribi in December 2023. Joëlle and her mother spent the whole afternoon on the beach, laughing and sharing stories. You can see the joy in their eyes - they had such a special bond. Her mother says this is one of her most treasured photographs.",
  "story_fr": "Cette photo a été prise lors de nos dernières vacances familiales à Kribi en décembre 2023. Joëlle et sa mère ont passé tout l'après-midi sur la plage, riant et partageant des histoires. On peut voir la joie dans leurs yeux - elles avaient un lien si spécial. Sa mère dit que c'est l'une de ses photographies les plus précieuses.",
  "year": 2023,
  "location": "Kribi, Cameroon"
}
```

---

## 🎨 Tips for Writing Good Stories

### ✅ DO:
- **Be specific**: Include dates, locations, occasions
- **Share emotions**: How did Joëlle feel? What was she thinking?
- **Add context**: What was happening in her life at that time?
- **Include quotes**: What did she say? What did others say?
- **Share memories**: What happened before/after this photo?

### ❌ DON'T:
- Keep it too short and generic
- Just describe what's in the photo (we can see that!)
- Forget to translate to French
- Make stories too long (2-4 sentences is good)

---

## 📖 Story Examples

### Good Story (Specific & Emotional):
```
"This was taken at her graduation in 2008. Papa was incredibly proud -
she was the first in our family to get a master's degree. He kept this
photo on his desk until the day he passed away. You could see the love
in his eyes that day. She told us later that his pride meant more to
her than the degree itself."
```

### Generic Story (Needs More):
```
"Joëlle with her father at graduation."
```

---

## 🌍 Adding New Photos (Future)

When you add new photos to the website later:

### Step 1: Add photo to `public/images/` folder

### Step 2: Add entry to `photo-memories.json`:
```json
"NEW_PHOTO.jpg": {
  "story_en": "Your English story here...",
  "story_fr": "Votre histoire en français ici...",
  "year": 2024,
  "location": "Douala, Cameroon"
}
```

### Step 3: Add photo to gallery component (PhotoGalleryEnhanced.tsx)

---

## 🔍 Finding Photo Filenames

Not sure which filename corresponds to which photo?

1. Open the website in browser
2. Right-click on a photo
3. Select "Inspect" or "Inspect Element"
4. Look for the `src="/images/family/FILENAME.jpg"` attribute
5. The filename is after the last `/`

---

## 🚫 What NOT to Change

**DO NOT change these:**
- The JSON structure (`{`, `}`, `:`, `,`)
- The field names (`story_en`, `story_fr`, `year`, `location`)
- The quotes around text
- The commas between entries

**Changing these will break the website!**

---

## ⚠️ Common Mistakes

### Mistake 1: Missing Comma
```json
"IMG_1.jpg": {
  "story_en": "Story here"
  "story_fr": "Histoire ici"  ❌ Missing comma after previous line
}
```

**Fix:**
```json
"IMG_1.jpg": {
  "story_en": "Story here",  ✅ Added comma
  "story_fr": "Histoire ici"
}
```

### Mistake 2: Unescaped Quotes
```json
"story_en": "She said "I'm happy""  ❌ Quotes inside quotes
```

**Fix:**
```json
"story_en": "She said \"I'm happy\""  ✅ Escaped with backslash
```
Or use single quotes:
```json
"story_en": "She said 'I'm happy'"  ✅ Single quotes inside
```

### Mistake 3: Wrong null format
```json
"year": "null"  ❌ Should not have quotes
```

**Fix:**
```json
"year": null  ✅ No quotes
```

---

## 📱 How Stories Appear on Website

### In Lightbox (Full View):
1. Click any photo in gallery
2. Photo opens in fullscreen
3. Below photo: Title and description
4. **"Read the Story" button** with book icon
5. Click to expand and see full story
6. Shows year and location if available
7. Bilingual - automatically shows correct language

### Features:
- ✅ Expandable/collapsible
- ✅ Beautiful design with icons
- ✅ Year displayed with calendar icon
- ✅ Location displayed with map pin icon
- ✅ Smooth animations
- ✅ Mobile-friendly

---

## 🎯 Quick Reference

| Field | Required? | Format | Example |
|-------|-----------|--------|---------|
| `story_en` | Yes | String | `"This was taken..."` |
| `story_fr` | Yes | String | `"Ceci a été pris..."` |
| `year` | No | Number or `null` | `2017` or `null` |
| `location` | No | String or `null` | `"Buea, Cameroon"` or `null` |

---

## 💡 Need Help?

If you break something while editing:

1. **Undo your changes** (Ctrl + Z)
2. **Copy the original from Git** if saved
3. **Check for syntax errors** with a JSON validator online
4. **Test on localhost** before pushing to production

---

## 🎉 You're Ready!

Now you can add beautiful, meaningful stories to all of Joëlle's photos!

**Remember:** The best stories are specific, emotional, and personal. Share the memories that made Joëlle special. 💚
