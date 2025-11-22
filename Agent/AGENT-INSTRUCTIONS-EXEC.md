# 🤖 AGENT EXECUTION INSTRUCTIONS

## FOR AGENT (Copy this entire section)

---

## MISSION: Build Money Flow React App - Auth Phase

**Objective:** Setup React app with Supabase authentication, Tailwind CSS, and test complete auth flow (Signup → Email Confirmation → Login → Dashboard)

**Tech Stack:**
- React 18 + Vite
- Supabase Auth + PostgreSQL
- Tailwind CSS
- React Router v6

**Duration:** ~20-30 minutes
**Difficulty:** Moderate (follow instructions exactly)

---

## REFERENCE DOCUMENT: COMPLETE-AGENT-GUIDE

All code is in file: **COMPLETE-AGENT-GUIDE**
- Download it
- Follow PART 1 → PART 15 in order
- Copy-paste every code section exactly

---

## STEP-BY-STEP EXECUTION

### STEP 1: Initialize Project (5 min)

**Command:**
```bash
mkdir money-flow-web
cd money-flow-web
git init
git config user.name "Money Flow Dev"
git config user.email "dev@moneyflow.local"
git checkout -b develop
git checkout -b feature/auth-setup
```

**Verify:**
```bash
git branch
# Should show:
# * feature/auth-setup
#   develop
```

### STEP 2: Create Vite React (5 min)

**Command:**
```bash
npm create vite@latest . -- --template react
npm install
npm run dev
```

**Verify:**
- Terminal shows: "Local: http://localhost:5173/"
- Browser opens automatically
- Vite React demo page visible

**Screenshot:** Take screenshot of Vite welcome page

### STEP 3: Install Dependencies (3 min)

**Command (copy exactly):**
```bash
npm install \
  @supabase/supabase-js \
  react-router-dom \
  tailwindcss \
  postcss \
  autoprefixer \
  clsx \
  tailwind-merge
```

**Verify:**
```bash
npm list
# Check packages installed successfully
```

### STEP 4: Setup Tailwind (2 min)

**Command:**
```bash
npx tailwindcss init -p
```

**Verify:**
- Files created: `tailwind.config.js`, `postcss.config.js`
- Check they exist in project root

### STEP 5: Create Environment File (2 min)

**Create file:** `.env.local` in project root

**Content:**
```
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
```

**Where to get values:**
1. Go to Supabase Dashboard
2. Select project: money-flow
3. Settings → API
4. Copy "Project URL" → VITE_SUPABASE_URL
5. Copy "anon public" key → VITE_SUPABASE_ANON_KEY

**Verify:**
- File exists: `.env.local`
- Not in git (should be in .gitignore)

### STEP 6: Create Folder Structure (2 min)

**Command:**
```bash
mkdir -p src/{components,pages,services,hooks,layouts,utils,styles}
mkdir -p src/components/{Auth,Dashboard,Navigation,Common}
```

**Verify:**
```bash
ls -la src/components/
# Should show: Auth, Dashboard, Navigation, Common
```

### STEP 7: Copy All Files from COMPLETE-AGENT-GUIDE (10 min)

Go through **COMPLETE-AGENT-GUIDE** and create files in order:

#### FILES TO CREATE (33 total):

**Configuration Files:**
1. `tailwind.config.js` (PART 3.1)
2. `postcss.config.js` (PART 3.2)

**Utility Files:**
3. `src/styles/globals.css` (PART 5.1)
4. `src/utils/constants.js` (PART 5.2)
5. `src/utils/validation.js` (PART 5.3)
6. `src/utils/formatting.js` (PART 5.4)

**Service Files:**
7. `src/services/supabaseClient.js` (PART 6.1)
8. `src/services/authService.js` (PART 6.2)
9. `src/services/transactionService.js` (PART 6.3)
10. `src/services/accountService.js` (PART 6.4)

**Hook Files:**
11. `src/hooks/useAuth.js` (PART 7.1)

**Layout Files:**
12. `src/layouts/AuthLayout.jsx` (PART 8.1)
13. `src/layouts/MainLayout.jsx` (PART 8.2)

**Common Component Files:**
14. `src/components/Common/Button.jsx` (PART 9.1)
15. `src/components/Common/Input.jsx` (PART 9.2)
16. `src/components/Common/Card.jsx` (PART 9.3)
17. `src/components/Common/LoadingSpinner.jsx` (PART 9.4)

**Auth Component Files:**
18. `src/components/Auth/LoginForm.jsx` (PART 10.1)
19. `src/components/Auth/SignupForm.jsx` (PART 10.2)
20. `src/components/Auth/AuthLayout.jsx` (PART 10.3)

**Navigation Component Files:**
21. `src/components/Navigation/Navbar.jsx` (PART 11.1)
22. `src/components/Navigation/Sidebar.jsx` (PART 11.2)

**Page Files:**
23. `src/pages/LoginPage.jsx` (PART 12.1)
24. `src/pages/SignupPage.jsx` (PART 12.2)
25. `src/pages/DashboardPage.jsx` (PART 12.3)
26. `src/pages/NotFoundPage.jsx` (PART 12.4)

**Root Files:**
27. `src/App.jsx` (PART 13.1)
28. `src/main.jsx` (PART 13.2)
29. `index.html` (PART 13.3 - UPDATE existing)

**Env Example:**
30. `.env.local.example` (PART 2.2)

**Git Configuration:**
31. `.gitignore` (PART 2.3)

**After all files:**
32. Update `tailwind.config.js` with theme (PART 3.1)
33. Update `package.json` scripts (PART 14.1)

**How to create each file:**
- Open editor (VS Code)
- File → New File → name file (include path)
- Copy code from COMPLETE-AGENT-GUIDE
- Paste exactly (do NOT modify)
- Save

**Verify:**
```bash
find src -type f -name "*.jsx" -o -name "*.js" | wc -l
# Should show: ~25 files
```

### STEP 8: Update index.html (1 min)

**File:** `index.html` (exists, update it)

**Replace entire content with code from PART 13.3**

### STEP 9: Update package.json (1 min)

**File:** `package.json` (exists, update scripts section)

**Replace scripts with code from PART 14.1**

### STEP 10: Verify All Files Created (2 min)

**Command:**
```bash
# Check file count
find src -type f \( -name "*.jsx" -o -name "*.js" \) | sort

# Should output ~25 files like:
# src/App.jsx
# src/components/Auth/AuthLayout.jsx
# src/components/Auth/LoginForm.jsx
# ... (more files)
# src/utils/validation.js
```

**If any file missing:**
- Recheck COMPLETE-AGENT-GUIDE
- Create it before proceeding

### STEP 11: Commit to Git (1 min)

**Command:**
```bash
git add .
git commit -m "feat: complete auth setup with tailwind and routing"
git log --oneline
# Should show your commit
```

### STEP 12: Start Dev Server (1 min)

**Command:**
```bash
npm run dev
```

**Verify:**
- Terminal shows: "Local: http://localhost:5173/"
- Page opens in browser
- Check console for errors (press F12)

### STEP 13: Test Login Page (2 min)

**What to do:**
1. Browser should show **Login page** (blue gradient background)
2. Verify elements exist:
   - ✅ "Money Flow" title
   - ✅ "Sign in to your account" subtitle
   - ✅ Email input field
   - ✅ Password input field
   - ✅ "Sign In" button
   - ✅ "Sign up" link

**Screenshot:** Take screenshot of login page

**If blank or error:**
- Check console (F12)
- Check if .env.local has correct keys
- Check src/App.jsx imports

### STEP 14: Test Signup Page (2 min)

**What to do:**
1. Click "Sign up" link on login page
2. Should redirect to `/signup`
3. Verify elements exist:
   - ✅ "Create Account" title
   - ✅ "Join Money Flow" subtitle
   - ✅ Name input field
   - ✅ Email input field
   - ✅ Password input field
   - ✅ Confirm Password input field
   - ✅ "Create Account" button
   - ✅ "Sign in" link

**Screenshot:** Take screenshot of signup page

### STEP 15: Test Form Validation (2 min)

**Test on Signup:**
1. Click "Create Account" without entering data
2. Should see error messages:
   - ✅ "Name is required"
   - ✅ "Email is required"
   - ✅ "Password is required"
   - ✅ "Passwords do not match"

**Test on Signup:**
1. Enter email: `invalid-email`
2. Click "Create Account"
3. Should see: "Invalid email format"

**Test on Signup:**
1. Enter password: `short`
2. Click "Create Account"
3. Should see: "Password must be at least 8 characters"

**Screenshot:** Take screenshot of validation errors

### STEP 16: Test Full Signup Flow (3 min)

**What to do:**
1. Go to signup page
2. Fill form with valid data:
   - Name: `Test User`
   - Email: `test@example.com` (unique, not real)
   - Password: `TestPassword123`
   - Confirm Password: `TestPassword123`
3. Click "Create Account"

**Expected behavior:**
- ✅ Button shows loading state (disabled)
- ✅ Success message appears: "Account created! Please check your email..."
- ✅ After 3 seconds, redirects to login page

**Screenshot:** Take screenshot of success message

### STEP 17: Test Login (2 min)

**What to do:**
1. You should now be on login page
2. Enter credentials:
   - Email: `test@example.com`
   - Password: `TestPassword123`
3. Click "Sign In"

**Expected behavior:**
- ✅ Button shows loading state
- ✅ After authentication, redirects to `/dashboard`

**Note:** You might see auth error if email not confirmed (this is expected in development)

### STEP 18: Test Dashboard (2 min)

**What to do:**
1. If login succeeds, you should see dashboard page
2. Verify elements exist:
   - ✅ Sidebar on left with menu items
   - ✅ Navbar on top with user email + Sign Out button
   - ✅ "Welcome, test@example.com!" heading
   - ✅ 3 summary cards (Balance, Spending, Cashback)
   - ✅ Recent Transactions section

**Screenshot:** Take screenshot of dashboard

### STEP 19: Test Logout (1 min)

**What to do:**
1. Click "Sign Out" button in navbar
2. Should redirect to login page

**Screenshot:** Take screenshot after logout

### STEP 20: Check Console for Errors (1 min)

**What to do:**
1. Press F12 to open DevTools
2. Go to Console tab
3. Should be NO red error messages
4. Check Network tab - no 5xx errors

**Screenshot:** Take screenshot of console (clean)

---

## ✅ FINAL VERIFICATION

Before reporting, check:

- [ ] All 33 files created successfully
- [ ] npm install completed without errors
- [ ] .env.local configured with real Supabase keys
- [ ] npm run dev starts without errors
- [ ] Login page displays correctly
- [ ] Signup page displays correctly
- [ ] Form validation works
- [ ] Signup creates account (or shows auth error - OK for now)
- [ ] Can navigate to dashboard (if auth succeeds)
- [ ] Sign out works and redirects to login
- [ ] No console errors (F12)
- [ ] Git commit successful

---

## 📸 SCREENSHOTS TO PROVIDE

1. Vite welcome page (initial state)
2. Login page
3. Signup page
4. Form validation errors
5. Signup success message
6. Dashboard (if auth works)
7. Console (dev tools, clean)
8. Git log (showing commit)

---

## 🚨 TROUBLESHOOTING

### Issue: "Cannot find module '@supabase/supabase-js'"
**Solution:** Run `npm install @supabase/supabase-js` again

### Issue: "VITE_SUPABASE_URL is undefined"
**Solution:** Check `.env.local` exists in project root with correct format

### Issue: "Tailwind styles not applied"
**Solution:** Check `src/styles/globals.css` is imported in `src/main.jsx`

### Issue: "Module not found: Cannot find module './App'"
**Solution:** Check all import paths use correct case (case-sensitive on Linux/Mac)

### Issue: Auth errors on signup/login
**Solution:** Normal in development. Check browser console for specific error messages.

### Issue: "Failed to connect to Supabase"
**Solution:** Verify .env.local has correct VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

### Issue: Blank page
**Solution:** Check F12 console for errors, check if React root element exists in index.html

---

## 📝 FINAL REPORT FORMAT

After completing all steps, provide:

```
✅ MONEY FLOW AUTH SETUP - COMPLETE

Setup Status:
- Files: 33/33 created ✅
- Dependencies: 8/8 installed ✅
- Environment: .env.local configured ✅
- Dev Server: Running on http://localhost:5173 ✅

Testing Results:
- Login page: ✅ Renders correctly
- Signup page: ✅ Renders correctly
- Form validation: ✅ Works as expected
- Auth flow: ✅ (Signup → Dashboard → Logout)
- Dashboard: ✅ Displays user info
- Console errors: 0 ✅
- Git commits: 1 ✅

Screenshots attached:
1. [Login page]
2. [Signup page]
3. [Dashboard]
4. [Console clean]

Notes:
- [Any issues encountered]
- [Any modifications made]
- [Ready for next phase]
```

---

## 🎯 WHAT'S NEXT (After Agent Reports Success)

1. I will review screenshots
2. Verify all components working
3. Start Phase 2: Dashboard Enhancement
   - Fetch real transactions from DB
   - Real-time updates
   - Add transaction form
   - Account management

---

**Ready to execute! 🚀**

Begin with Step 1 and follow through Step 20.
Report back with results and screenshots.