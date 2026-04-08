# ✅ STEP 2: Update Each App's vite.config.js

## 🎯 Goal
Update each of your 5 app repositories with the correct `base` path so they can be served under QuizItNow subpaths.

**Estimated time:** 20 minutes (4 minutes per app)

---

## 📋 Apps to Update

| # | App Name | Repository | Base Path | Status |
|---|----------|-----------|-----------|--------|
| 1 | Cosmic Word Play | cosmic-word-play | `/cosmic-word-play/` | ⏳ TODO |
| 2 | Zoomable Earth | Globe | `/zoomable-earth/` | ⏳ TODO |
| 3 | Guess My Neon | guess-my-neon | `/guess-my-neon/` | ✅ DONE |
| 4 | QuizItNow | quizitnow | `/quizitnow/` | ⏳ TODO |
| 5 | Recipe Generator | recipe-generator | `/recipe-generator/` | ⏳ TODO |

---

## 🔄 Process for Each App

Each app follows the same pattern:

### Step A: Open the Repository
### Step B: Find vite.config.js
### Step C: Add Base Path
### Step D: Commit and Push

Let me walk you through each one...

---

# 🔨 APP #1: Cosmic Word Play

## Step A: Open Repository
👉 https://github.com/subhasisofficial87-prog/cosmic-word-play

---

## Step B: Find vite.config.js

On the repository page, you'll see files listed. Look for **`vite.config.js`**

Click on it to open and view the contents.

---

## Step C: Edit the File

### Option 1: Edit in GitHub (Easier for beginners)

1. Click the **pencil icon** ✏️ (top right of the file)
2. The file opens in edit mode

### Option 2: Edit locally (If you have the file on your computer)

```bash
# If you have cosmic-word-play cloned locally
cd path/to/cosmic-word-play
# Edit vite.config.js and add base path
```

---

## Current File (Before)

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // ... rest of config
})
```

---

## What to Add

**Add this line** after `defineConfig({`:

```javascript
base: '/cosmic-word-play/',
```

---

## File After Update

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/cosmic-word-play/',  // ← ADD THIS LINE
  plugins: [react()],
  // ... rest of config
})
```

---

## Step D: Commit and Push

### If editing in GitHub:

1. Scroll down to "Commit changes" section
2. **Commit message:** Enter:
   ```
   Add base path configuration for QuizItNow integration
   ```
3. Click **"Commit changes"**

### If editing locally:

```bash
cd path/to/cosmic-word-play
git add vite.config.js
git commit -m "Add base path configuration for QuizItNow integration"
git push origin main
```

---

## ✅ Verification

After committing:
- You'll see the file updated in the repo
- Status shows: **Changes committed** ✅

---

---

# 🔨 APP #2: Zoomable Earth (Globe)

## Step A: Open Repository
👉 https://github.com/subhasisofficial87-prog/Globe

---

## Step B: Find vite.config.js
Click on **`vite.config.js`**

---

## Step C: Edit - Add Base Path

```javascript
base: '/zoomable-earth/',  // ← ADD THIS LINE
```

**Before:**
```javascript
export default defineConfig({
  plugins: [react()],
})
```

**After:**
```javascript
export default defineConfig({
  base: '/zoomable-earth/',  // ← ADD THIS LINE
  plugins: [react()],
})
```

---

## Step D: Commit and Push

**Commit message:**
```
Add base path configuration for QuizItNow integration
```

Click **"Commit changes"**

---

---

# 🔨 APP #3: Guess My Neon ✅

## Status: ALREADY DONE ✓

This one is already configured with:
```javascript
base: '/guess-my-neon/',
```

**No action needed!** ✅

---

---

# 🔨 APP #4: QuizItNow

## Step A: Open Repository
👉 https://github.com/subhasisofficial87-prog/quizitnow

---

## Step B: Find vite.config.js
Click on **`vite.config.js`**

---

## Step C: Edit - Add Base Path

```javascript
base: '/quizitnow/',  // ← ADD THIS LINE
```

**Before:**
```javascript
export default defineConfig({
  plugins: [react()],
})
```

**After:**
```javascript
export default defineConfig({
  base: '/quizitnow/',  // ← ADD THIS LINE
  plugins: [react()],
})
```

---

## Step D: Commit and Push

**Commit message:**
```
Add base path configuration for QuizItNow integration
```

Click **"Commit changes"**

---

---

# 🔨 APP #5: Recipe Generator

## Step A: Open Repository
👉 https://github.com/subhasisofficial87-prog/recipe-generator

---

## Step B: Find vite.config.js
Click on **`vite.config.js`**

---

## Step C: Edit - Add Base Path

```javascript
base: '/recipe-generator/',  // ← ADD THIS LINE
```

**Before:**
```javascript
export default defineConfig({
  plugins: [react()],
})
```

**After:**
```javascript
export default defineConfig({
  base: '/recipe-generator/',  // ← ADD THIS LINE
  plugins: [react()],
})
```

---

## Step D: Commit and Push

**Commit message:**
```
Add base path configuration for QuizItNow integration
```

Click **"Commit changes"**

---

## ✅ Completion Checklist

After updating all 5 apps:

- [ ] App #1 - Cosmic Word Play - Updated ✅
- [ ] App #2 - Zoomable Earth (Globe) - Updated ✅
- [ ] App #3 - Guess My Neon - Already done ✅
- [ ] App #4 - QuizItNow - Updated ✅
- [ ] App #5 - Recipe Generator - Updated ✅

---

## 🎯 What This Accomplishes

By adding the `base` path to each app:

✅ Assets load from correct paths
✅ Images, CSS, JS files work properly
✅ Apps can be served under subpaths
✅ QuizItNow integration will work correctly

**Without this:** Apps would break when accessed from subpaths

---

## 📊 Summary

| Step | App | Base Path | Action |
|------|-----|-----------|--------|
| 1 | Cosmic Word Play | `/cosmic-word-play/` | Edit + Commit |
| 2 | Zoomable Earth | `/zoomable-earth/` | Edit + Commit |
| 3 | Guess My Neon | `/guess-my-neon/` | ✅ Already done |
| 4 | QuizItNow | `/quizitnow/` | Edit + Commit |
| 5 | Recipe Generator | `/recipe-generator/` | Edit + Commit |

---

## ⏱️ Time Estimates

- App #1: 3-4 minutes
- App #2: 3-4 minutes
- App #3: 0 minutes (already done)
- App #4: 3-4 minutes
- App #5: 3-4 minutes

**Total: ~15-20 minutes**

---

## ✨ Next Steps

Once all 5 apps are updated:

**Go to:** STEP_3_ADD_SUBMODULES.md

In Step 3, you'll add all 5 apps as git submodules to the landing page so they all deploy together.

---

## 🆘 Need Help?

**Quick links:**

- Cosmic Word Play: https://github.com/subhasisofficial87-prog/cosmic-word-play
- Zoomable Earth: https://github.com/subhasisofficial87-prog/Globe
- Guess My Neon: https://github.com/subhasisofficial87-prog/guess-my-neon ✅
- QuizItNow: https://github.com/subhasisofficial87-prog/quizitnow
- Recipe Generator: https://github.com/subhasisofficial87-prog/recipe-generator

---

**Status: READY TO UPDATE APP CONFIGS** ✅

When you've completed updating all 5 apps, reply with "STEP 2 DONE" and I'll guide you to Step 3!
