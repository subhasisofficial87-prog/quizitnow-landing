# App Configuration Updates

For each of your 5 apps to work correctly under QuizItNow.com subpaths, you need to update their `vite.config.js` file to include the correct base path.

## App 1: Cosmic Word Play

**File to edit:** `vite.config.js` in cosmic-word-play repository

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

## App 2: Zoomable Earth

**File to edit:** `vite.config.js` in zoomable-earth repository

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/zoomable-earth/',  // ← ADD THIS LINE
  plugins: [react()],
  // ... rest of config
})
```

---

## App 3: Guess My Neon (Pi-Games)

**File to edit:** `C:\Claude\Pi Games\vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/guess-my-neon/',  // ← ADD THIS LINE
  plugins: [react()],
  // ... rest of config
})
```

---

## App 4: QuizItNow

**File to edit:** `vite.config.js` in quizitnow repository

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/quizitnow/',  // ← ADD THIS LINE
  plugins: [react()],
  // ... rest of config
})
```

---

## App 5: Recipe Generator

**File to edit:** `vite.config.js` in recipe-generator repository

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/recipe-generator/',  // ← ADD THIS LINE
  plugins: [react()],
  // ... rest of config
})
```

---

## Why This is Important

The `base` configuration in Vite tells the app where it will be served from. Without this:

- ❌ Assets (images, CSS, JS) will fail to load (404 errors)
- ❌ Relative links will break
- ❌ Routing won't work correctly
- ❌ Apps won't work at their subpaths

With the correct `base` configuration:

- ✅ All assets load from the correct paths
- ✅ Links and routing work properly
- ✅ Apps can be served under different subpaths
- ✅ Each app can be deployed independently

---

## Testing the Configuration

After updating each app's config, test it locally:

```bash
# Build the app
npm run build

# Check the dist folder
# - All CSS/JS files should have correct paths
# - Assets should load without 404 errors

# Deploy to GitHub
git add vite.config.js
git commit -m "Add base path configuration for QuizItNow integration"
git push origin main
```

---

## Quick Reference Table

| App | Base Path |
|-----|-----------|
| Cosmic Word Play | `/cosmic-word-play/` |
| Zoomable Earth | `/zoomable-earth/` |
| Guess My Neon | `/guess-my-neon/` |
| QuizItNow | `/quizitnow/` |
| Recipe Generator | `/recipe-generator/` |

---

## Integration with Landing Page

Once all apps have the correct base path configuration:

1. The landing page submodules will automatically include their builds
2. When landing page is built, all sub-apps are built with correct paths
3. Deploying landing page also deploys all sub-apps
4. Users can navigate from landing page to any app seamlessly

---

## Support

If assets still don't load after updating configs:

1. Clear browser cache (Ctrl+Shift+Delete)
2. Check browser console for 404 errors
3. Verify the `base` path matches the subpath in the URL
4. Rebuild: `npm run build`
5. Check the generated `dist/` folder structure
