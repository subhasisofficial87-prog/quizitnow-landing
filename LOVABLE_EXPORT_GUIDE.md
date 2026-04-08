# 🚀 Exporting from Lovable & Deploying to QuizItNow

## Step-by-Step Guide

Your 5 apps are built in Lovable. We'll export each one and deploy to QuizItNow.

---

## 📋 Apps to Export (In Order)

1. cosmic-word-play
2. zoomable-earth (Globe)
3. guess-my-neon ✅ (Already deployed)
4. quizitnow
5. recipe-generator

---

## 🔧 For Each App - Export from Lovable

### Step 1: Open Lovable

Go to: https://lovable.dev/projects

Find your first app (e.g., "cosmic-word-play")

### Step 2: Export the App

1. Click the **app name** to open it
2. Look for **"Export"** or **"Download"** button (usually top-right)
3. Select **"Export as React"** or **"Download as ZIP"**
4. Save the exported file to your computer

### Step 3: Extract Files

1. Extract the ZIP file
2. You should see a folder with:
   ```
   src/
   public/
   package.json
   vite.config.js
   index.html
   ```

### Step 4: Update vite.config.js

**Edit the vite.config.js and add the base path:**

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/cosmic-word-play/',  // ← ADD THIS for cosmic-word-play
  plugins: [react()],
})
```

**Base paths for each app:**
- cosmic-word-play: `base: '/cosmic-word-play/'`
- zoomable-earth: `base: '/zoomable-earth/'`
- guess-my-neon: `base: '/guess-my-neon/'`
- quizitnow: `base: '/quizitnow/'`
- recipe-generator: `base: '/recipe-generator/'`

### Step 5: Build the App

```bash
cd path/to/extracted-app

npm install
npm run build
```

Wait for build to complete. You should see:
```
✓ built in X.XXs
```

### Step 6: Copy Built Files

After build completes:

```bash
# Copy the entire dist folder to landing page
cp -r dist/* C:\Claude\QuizItNow-Landing\public\cosmic-word-play\
```

**Or manually:**
1. Open the app's `dist/` folder
2. Select all files inside
3. Copy to: `C:\Claude\QuizItNow-Landing\public\cosmic-word-play\`

---

## 📊 Complete Process for All 5 Apps

### App 1: Cosmic Word Play

```bash
# 1. Extract from Lovable
cd C:\Users\YourUsername\Downloads\cosmic-word-play

# 2. Update vite.config.js (add base path)

# 3. Install and build
npm install
npm run build

# 4. Copy to landing page
cp -r dist/* C:\Claude\QuizItNow-Landing\public\cosmic-word-play\
```

### App 2: Zoomable Earth (Globe)

```bash
cd C:\Users\YourUsername\Downloads\zoomable-earth

# Update vite.config.js with: base: '/zoomable-earth/'

npm install
npm run build

cp -r dist/* C:\Claude\QuizItNow-Landing\public\zoomable-earth\
```

### App 3: Guess My Neon ✅

**Already done!** This one is already in the dist/ folder.

### App 4: QuizItNow

```bash
cd C:\Users\YourUsername\Downloads\quizitnow

# Update vite.config.js with: base: '/quizitnow/'

npm install
npm run build

cp -r dist/* C:\Claude\QuizItNow-Landing\public\quizitnow\
```

### App 5: Recipe Generator

```bash
cd C:\Users\YourUsername\Downloads\recipe-generator

# Update vite.config.js with: base: '/recipe-generator/'

npm install
npm run build

cp -r dist/* C:\Claude\QuizItNow-Landing\public\recipe-generator\
```

---

## ⚡ Quick Summary

For **EACH** of the 5 apps:

1. ✅ Export from Lovable as React ZIP
2. ✅ Extract the ZIP file
3. ✅ Update `vite.config.js` → Add `base: '/app-name/'`
4. ✅ Run `npm install && npm run build`
5. ✅ Copy `dist/*` to `C:\Claude\QuizItNow-Landing\public\app-name\`

Then:

6. ✅ Rebuild landing page: `npm run build`
7. ✅ Commit and push to GitHub
8. ✅ GitHub Actions deploys automatically

---

## 🎯 Expected Folder Structure (After Copying)

```
C:\Claude\QuizItNow-Landing\public\
├── cosmic-word-play/
│   ├── index.html
│   └── assets/
├── zoomable-earth/
│   ├── index.html
│   └── assets/
├── guess-my-neon/
│   ├── index.html
│   └── assets/
├── quizitnow/
│   ├── index.html
│   └── assets/
└── recipe-generator/
    ├── index.html
    └── assets/
```

Each folder should have `index.html` and an `assets/` folder with CSS and JS files.

---

## 🔍 Verify Each App Works

After copying files for each app:

```bash
# From landing page directory
npm run build

# Check dist/ folder
ls dist/cosmic-word-play/
# Should see: index.html, assets/

ls dist/zoomable-earth/
# Should see: index.html, assets/

# And so on...
```

---

## 🚀 Final Deployment

Once all apps are copied:

```bash
cd C:\Claude\QuizItNow-Landing

# Rebuild landing page with all app files
npm run build

# Verify everything is there
ls dist/

# Commit and push
git add .
git commit -m "Deploy all 5 apps from Lovable exports

- Export cosmic-word-play from Lovable
- Export zoomable-earth from Lovable
- Export quizitnow from Lovable
- Export recipe-generator from Lovable
- Copy all built files to public/app-name/
- Update landing page build with all apps"

git push origin main
```

---

## 📊 What Happens Next

1. GitHub Actions automatically triggers
2. Builds entire platform (2-3 minutes)
3. Deploys to GitHub Pages
4. All apps become accessible at their subpaths!

**Your platform will be live at:**
```
https://quizit now.com/
├── /cosmic-word-play/
├── /zoomable-earth/
├── /guess-my-neon/
├── /quizitnow/
└── /recipe-generator/
```

---

## 🆘 Troubleshooting

### ❌ "Module not found" after exporting from Lovable

**Solution:**
- Lovable exports may use different dependencies
- Run: `npm install` to ensure all packages are installed
- Check `package.json` for any missing dependencies

### ❌ "vite.config.js not found"

**Solution:**
- Lovable exports should include vite.config.js
- If missing, create one:
  ```javascript
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'

  export default defineConfig({
    base: '/app-name/',
    plugins: [react()],
  })
  ```

### ❌ Build fails

**Solution:**
- Clear node_modules: `rm -rf node_modules`
- Clear cache: `npm cache clean --force`
- Reinstall: `npm install`
- Try build again: `npm run build`

### ❌ dist/ folder is empty after build

**Solution:**
- Ensure vite.config.js is correct
- Check for build errors in console output
- Verify package.json has build script
- Try: `npm run build -- --force`

---

## ✅ Checklist

For each app:
- [ ] Exported from Lovable
- [ ] ZIP file extracted
- [ ] vite.config.js updated with base path
- [ ] `npm install` completed
- [ ] `npm run build` successful
- [ ] dist/ folder created with index.html
- [ ] Files copied to public/app-name/
- [ ] Landing page rebuilt

Final step:
- [ ] All apps copied to public/
- [ ] Landing page `npm run build` successful
- [ ] Committed and pushed to GitHub
- [ ] GitHub Actions deploying

---

## 📞 Need Help?

If you get stuck:

1. **Can't find export button?**
   - Look for: Menu → Export, Download, or Code
   - Or: Top-right corner for "..." (more options)

2. **Don't know the app names in Lovable?**
   - Go to https://lovable.dev/projects
   - List will show all your projects
   - Names should match: cosmic-word-play, etc.

3. **Build errors?**
   - Read the error message carefully
   - Usually it's missing dependencies
   - Run: `npm install` again

---

## 🎬 Ready to Start?

Follow these steps for each app:

1. Open Lovable project
2. Export as React ZIP
3. Extract to a folder
4. Update vite.config.js
5. Build: `npm install && npm run build`
6. Copy dist/* to public/app-name/
7. Repeat for all 5 apps

**Then tell me when you're done, and I'll:**
- Rebuild the landing page
- Commit and push to GitHub
- Deploy everything live!

---

**Time estimate:** 30-45 minutes (depending on file sizes)

**Result:** Complete QuizItNow platform with all 5 apps! 🚀
