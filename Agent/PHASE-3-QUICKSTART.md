# 🎯 PHASE 3 QUICKSTART - ACCOUNTS & DEBTS

## FILE READY: PHASE-3-ACCOUNTS-DEBTS-GUIDE

---

## SCOPE: 7 FILES

### New Components (2):
1. `AccountsTable.jsx` - Display all accounts
2. `DebtsTable.jsx` - Display debts with progress

### New Services (1):
3. `debtService.js` - Debts API calls

### Update Services (1):
4. `accountService.js` - Enhanced accounts API

### New Pages (2):
5. `AccountsPage.jsx` - Full accounts page
6. `DebtsPage.jsx` - Full debts page

### Update Routing (1):
7. `App.jsx` - Add /accounts & /debts routes

---

## FEATURES

✅ Accounts table with:
- Account name & ID
- Type (Credit Card, Bank, Wallet)
- Current balance
- Credit limit
- Cashback rate
- Active status

✅ Summary cards:
- Total balance across all accounts
- Total credit limits

✅ Debts list with:
- Person name & period
- Debt status (OPEN, PARTIAL, FULLY_REPAID, OVERDUE)
- Progress bar (% repaid)
- Initial debt amount
- Total repaid
- Remaining amount
- Back on debt

✅ Real-time updates (Supabase subscriptions)

---

## NEW ROUTES

```
/accounts → AccountsPage
/debts → DebtsPage
```

Added to sidebar automatically:
- Accounts link (already in Sidebar)
- Debts link (already in Sidebar)

---

## WHAT AGENT NEEDS TO DO

1. **Create 2 table components** (copy-paste PART 1-2)
2. **Update accountService** (PART 3)
3. **Create debtService** (PART 4)
4. **Create AccountsPage** (PART 5)
5. **Create DebtsPage** (PART 6)
6. **Add routes in App.jsx** (PART 7)
7. **Test all pages & links**
8. **Commit & push**

---

## TESTING

- [ ] npm run dev (no errors)
- [ ] Click "Accounts" → table loads ✓
- [ ] Summary cards show totals ✓
- [ ] Click "Debts" → debt list loads ✓
- [ ] Progress bars display ✓
- [ ] Status badges show colors ✓
- [ ] Real-time updates work ✓
- [ ] Navigate sidebar links work ✓

---

## TIME ESTIMATE

~30-40 minutes total

---

## COMMIT MESSAGE

```
git commit -m "feat: add accounts and debts pages with real-time updates"
```

---

## NEXT PHASE

Phase 4: Cashback management page

---

**Download PHASE-3-ACCOUNTS-DEBTS-GUIDE and deploy!** 🚀