# 🎬 PHASE 2 QUICKSTART - TRANSACTIONS

## FILE READY: PHASE-2-TRANSACTIONS-GUIDE

---

## WHAT AGENT NEEDS TO DO

### Part 1-3: Create 3 New Components
- `Modal.jsx` - Reusable modal dialog
- `Select.jsx` - Dropdown component
- `Textarea.jsx` - Multi-line text input

### Part 4: Create AddTransactionModal
- Form with date, amount, type, accounts, notes
- Form validation
- Submit to Supabase

### Part 5: Create TransactionsTable
- Display all transactions
- Type-based colors
- Amount sign (+ or -)
- Delete button
- Format currency & dates

### Part 6: Update DashboardPage
- Real-time transaction fetch
- Subscribe to real-time updates
- Add Transaction button
- Summary cards (Balance, Spending, Income)

### Part 7: Update constants
- Add TRANSACTION_TYPES

### Part 8: Create TransactionsPage
- Full transaction list
- Dedicated page for all transactions

### Part 9: Update App.jsx
- Add route `/transactions`
- Import TransactionsPage
- Add protected route

---

## FILES TO CREATE/UPDATE

**New Files (5):**
1. `src/components/Common/Modal.jsx`
2. `src/components/Common/Select.jsx`
3. `src/components/Common/Textarea.jsx`
4. `src/components/Dashboard/AddTransactionModal.jsx`
5. `src/components/Dashboard/TransactionsTable.jsx`
6. `src/pages/TransactionsPage.jsx`

**Update Files (3):**
1. `src/pages/DashboardPage.jsx` (replace entire)
2. `src/utils/constants.js` (replace entire)
3. `src/App.jsx` (add import + route)

---

## TOTAL TIME: ~30 min

---

## TESTING CHECKLIST

After agent completes:

- [ ] npm run dev starts without errors
- [ ] Dashboard shows "+ Add Transaction" button
- [ ] Summary cards display (Balance, Spending, Income)
- [ ] Click button → Modal opens
- [ ] Modal has: date, amount, type, account(s), notes fields
- [ ] Form validation works (try submit empty)
- [ ] Submit form → Transaction appears in table
- [ ] Real-time: Table updates instantly
- [ ] Delete button works
- [ ] Navigate to /transactions → Full list page
- [ ] No console errors (F12)

---

## EXPECTED UI

**Dashboard:**
```
[+ Add Transaction]
┌─────────────────────────────┐
│ Total Balance    │ Spending │ Income │
│ 15.2M           │ 2.4M     │ 50M    │
└─────────────────────────────┘

┌─ Recent Transactions ─────────────┐
│ Date  │ Type     │ Amount          │
│ Today │ EXPENSE  │ -45,000 đ       │
│ Yest  │ INCOME   │ +50,000,000 đ   │
└─────────────────────────────────────┘
```

**Modal (Add Transaction):**
```
┌─ Add Transaction ──────────┐
│ Date: [picker]             │
│ Amount: [input]            │
│ Type: [dropdown]           │
│ Account: [select]          │
│ Notes: [textarea]          │
│ [Add] [Cancel]             │
└────────────────────────────┘
```

**Transactions Table:**
```
Date  │ Type     │ From    │ To   │ Amount
───────────────────────────────────────────
Today │ EXPENSE  │ Shinhan │ -    │ -45,000
Yest  │ INCOME   │ -       │ Main │ +50,000,000
```

---

## AFTER PHASE 2

Agent will:
1. Create all components
2. Update existing files
3. Test full flow
4. Screenshot dashboard + modal
5. Commit & push
6. Report ready for Phase 3

**Phase 3:** Accounts page, Debts, Cashback management

---

**Download PHASE-2-TRANSACTIONS-GUIDE and send to agent!** 🚀