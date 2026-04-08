# QuizItNow Deployment Checklist

## ✅ Completed

- [x] Landing page created with animations
- [x] Code pushed to GitHub: https://github.com/subhasisofficial87-prog/quizitnow-landing
- [x] All app repositories exist on your GitHub account
- [x] Git configured and ready

## 📋 Next Steps

### Step 1: Enable GitHub Pages (5 minutes)
**Status:** ⏳ PENDING

Follow these steps to enable GitHub Pages:

1. Go to: https://github.com/subhasisofficial87-prog/quizitnow-landing/settings/pages
2. Look for **"Build and deployment"** section
3. Click the **"Source"** dropdown and select: **"Deploy from a branch"**
4. Select Branch: **"main"**
5. Select Folder: **"/ (root)"**
6. Click **"Save"**

**Wait 2-3 minutes** - GitHub will automatically:
- Build your landing page
- Deploy to: https://subhasisofficial87-prog.github.io/quizitnow-landing/

✅ You'll see a green checkmark when deployment is complete.

---

### Step 2: Update App Repositories (20 minutes)
**Status:** ⏳ PENDING

For each of your 5 app repositories, update the `vite.config.js` file:

#### App 1: cosmic-word-play
- Go to: https://github.com/subhasisofficial87-prog/cosmic-word-play
- Edit `vite.config.js`
- Add: `base: '/cosmic-word-play/',`
- Commit and push

#### App 2: zoomable-earth / Globe
- Go to: https://github.com/subhasisofficial87-prog/Globe (or zoomable-earth)
- Edit `vite.config.js`
- Add: `base: '/zoomable-earth/',`
- Commit and push

#### App 3: guess-my-neon ✅ ALREADY DONE
- Already has: `base: '/guess-my-neon/',`

#### App 4: quizitnow
- Go to your quizitnow repository
- Edit `vite.config.js`
- Add: `base: '/quizitnow/',`
- Commit and push

#### App 5: recipe-generator
- Go to your recipe-generator repository
- Edit `vite.config.js`
- Add: `base: '/recipe-generator/',`
- Commit and push

---

### Step 3: Add Apps as Git Submodules (10 minutes)
**Status:** ⏳ PENDING

Once all apps have the correct base path, add them as submodules:

```bash
cd "C:\Claude\QuizItNow-Landing"

# Add each app as a submodule
git submodule add https://github.com/subhasisofficial87-prog/cosmic-word-play.git public/cosmic-word-play
git submodule add https://github.com/subhasisofficial87-prog/Globe.git public/zoomable-earth
git submodule add https://github.com/subhasisofficial87-prog/guess-my-neon.git public/guess-my-neon
git submodule add https://github.com/subhasisofficial87-prog/quizitnow.git public/quizitnow
git submodule add https://github.com/subhasisofficial87-prog/recipe-generator.git public/recipe-generator

# Commit and push
git commit -m "Add app repositories as git submodules"
git push
```

---

### Step 4: Test Everything (5 minutes)
**Status:** ⏳ PENDING

Once submodules are added and all apps have the correct base paths:

1. Build locally:
   ```bash
   cd C:\Claude\QuizItNow-Landing
   npm run build
   ```

2. Verify dist/ folder contains:
   ```
   dist/
   ├── index.html
   ├── assets/
   ├── cosmic-word-play/
   ├── zoomable-earth/
   ├── guess-my-neon/
   ├── quizitnow/
   └── recipe-generator/
   ```

3. Test URLs (after GitHub Pages deployment):
   - https://subhasisofficial87-prog.github.io/quizitnow-landing/
   - https://subhasisofficial87-prog.github.io/quizitnow-landing/cosmic-word-play/
   - https://subhasisofficial87-prog.github.io/quizitnow-landing/zoomable-earth/
   - https://subhasisofficial87-prog.github.io/quizitnow-landing/guess-my-neon/
   - https://subhasisofficial87-prog.github.io/quizitnow-landing/quizitnow/
   - https://subhasisofficial87-prog.github.io/quizitnow-landing/recipe-generator/

---

## 🌐 Custom Domain Setup (Optional)

If you own **quizit now.com**, follow these steps:

1. Go to: https://github.com/subhasisofficial87-prog/quizitnow-landing/settings/pages
2. Scroll to **"Custom domain"**
3. Enter: `quizit now.com`
4. Click **"Save"**
5. Go to your domain registrar (GoDaddy, Namecheap, etc.)
6. Add these DNS records:
   ```
   Type: A
   Host: @
   Points to:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153
   ```
7. Wait 15-30 minutes for DNS to propagate
8. Return to GitHub Pages settings and verify the custom domain

---

## 📊 Status Overview

| Task | Status | Time | Link |
|------|--------|------|------|
| Landing page created | ✅ | Done | [View Repo](https://github.com/subhasisofficial87-prog/quizitnow-landing) |
| Code pushed to GitHub | ✅ | Done | [GitHub](https://github.com/subhasisofficial87-prog/quizitnow-landing) |
| Enable GitHub Pages | ⏳ | Now | [Settings](https://github.com/subhasisofficial87-prog/quizitnow-landing/settings/pages) |
| Update app configs | ⏳ | 20 min | Each repo |
| Add submodules | ⏳ | 10 min | Terminal |
| Test all apps | ⏳ | 5 min | Browser |
| Add custom domain | ⏳ | 30 min | Optional |

---

## 🆘 Troubleshooting

**GitHub Pages not deploying?**
- Wait 5 minutes after enabling
- Check the "Actions" tab for build status
- Clear browser cache

**Apps returning 404?**
- Verify `base: '/app-name/'` in vite.config.js
- Rebuild: `npm run build`
- Check dist/ folder structure

**Submodule issues?**
```bash
git submodule update --init --recursive
git submodule foreach git pull origin main
```

---

## 📞 Support Resources

- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Vite Config Guide](https://vitejs.dev/config/)
- [Git Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)

---

**Start with Step 1: Enable GitHub Pages** ➜ [Settings Page](https://github.com/subhasisofficial87-prog/quizitnow-landing/settings/pages)
