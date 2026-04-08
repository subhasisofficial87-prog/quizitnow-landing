# GitHub Setup Guide for QuizItNow

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `quizitnow-landing`
3. Choose settings:
   - **Description:** "QuizItNow - Landing page with animated hero and app navigation"
   - **Public/Private:** Choose based on your preference
   - **DO NOT** initialize with README (we already have one)
   - **DO NOT** add .gitignore (we already have one)
4. Click "Create repository"

## Step 2: Push Code to GitHub

After creating the repository, you'll see instructions. Follow them or run these commands:

```bash
cd C:\Claude\QuizItNow-Landing

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/quizitnow-landing.git

# Rename branch to main (if needed)
git branch -M main

# Push code
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 3: Set Up Individual App Repositories

For each of your 5 apps (cosmic-word-play, zoomable-earth, guess-my-neon, quizitnow, recipe-generator), you need to:

### For each app repository:

1. Create GitHub repository with the app name
2. Update the app's `vite.config.js` to set the correct base path:

```javascript
export default {
  base: '/[app-name]/',  // e.g., '/cosmic-word-play/'
  // ... rest of config
}
```

3. Add to the landing page as a git submodule (from landing repo):

```bash
cd C:\Claude\QuizItNow-Landing
git submodule add https://github.com/YOUR_USERNAME/cosmic-word-play.git public/cosmic-word-play
git submodule add https://github.com/YOUR_USERNAME/zoomable-earth.git public/zoomable-earth
git submodule add https://github.com/YOUR_USERNAME/guess-my-neon.git public/guess-my-neon
git submodule add https://github.com/YOUR_USERNAME/quizitnow.git public/quizitnow
git submodule add https://github.com/YOUR_USERNAME/recipe-generator.git public/recipe-generator

# Commit submodules
git commit -m "Add app repositories as submodules"
git push
```

## Step 4: Set Up GitHub Actions Workflow

1. Create `.github/workflows/build-deploy.yml` in the landing repo
2. Use the template provided (see BUILD_DEPLOY.yml in this directory)
3. This will:
   - Build the landing page + all sub-apps
   - Deploy to GitHub Pages
   - Run on every push

## Step 5: Enable GitHub Pages

1. Go to repository Settings → Pages
2. Set:
   - **Source:** Deploy from a branch
   - **Branch:** main
   - **Folder:** / (root)
3. Add custom domain (quizit now.com) if you own it
4. Wait for deployment to complete

## Step 6: Update Each App's Vite Config

For each app (cosmic-word-play, zoomable-earth, etc.):

```javascript
// vite.config.js
export default defineConfig({
  base: '/cosmic-word-play/',  // Change per app
  plugins: [react()],
  build: {
    outDir: 'dist',
  }
})
```

---

## Commands Summary

```bash
# From landing repo directory
cd C:\Claude\QuizItNow-Landing

# Initialize and push
git remote add origin https://github.com/YOUR_USERNAME/quizitnow-landing.git
git branch -M main
git push -u origin main

# Add app submodules
git submodule add https://github.com/YOUR_USERNAME/cosmic-word-play.git public/cosmic-word-play
git submodule add https://github.com/YOUR_USERNAME/zoomable-earth.git public/zoomable-earth
git submodule add https://github.com/YOUR_USERNAME/guess-my-neon.git public/guess-my-neon
git submodule add https://github.com/YOUR_USERNAME/quizitnow.git public/quizitnow
git submodule add https://github.com/YOUR_USERNAME/recipe-generator.git public/recipe-generator

# Commit and push
git commit -m "Add app repositories as submodules"
git push
```

---

## What's Next?

After GitHub setup is complete:

1. Test local build: `npm run build`
2. Deploy landing page to GitHub Pages
3. For each app:
   - Update its `vite.config.js` with correct base path
   - Push to its GitHub repository
   - It will automatically be included in the landing page builds
4. Verify all apps work at their subpaths (quizit now.com/cosmic-word-play, etc.)

---

## Troubleshooting

**Submodules not updating?**
```bash
git submodule update --remote --merge
```

**Want to update an app?**
```bash
cd public/cosmic-word-play
git pull origin main
cd ../..
git add public/cosmic-word-play
git commit -m "Update cosmic-word-play"
git push
```

**Apps not showing at subpaths?**
- Check that each app's `vite.config.js` has correct `base: '/app-name/'`
- Clear browser cache
- Rebuild: `npm run build`
