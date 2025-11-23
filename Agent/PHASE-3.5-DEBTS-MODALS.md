# 🎯 PHASE 3.5 - DEBTS MODALS ENHANCEMENT

## WHAT'S MISSING

Pages đã có nhưng chưa có:
- ❌ Modal Add Debt (ghi nợ mới)
- ❌ Modal Add Repayment (ghi tiền trả nợ)
- ❌ Buttons + Button handlers

---

## PART 1: CREATE ADD DEBT MODAL

### Create: `src/components/Dashboard/AddDebtModal.jsx`

```jsx
import { useState } from 'react'
import { Modal } from '../Common/Modal'
import { Input } from '../Common/Input'
import { CustomSelect } from '../Common/CustomSelect'
import { Textarea } from '../Common/Textarea'
import { Button } from '../Common/Button'

export const AddDebtModal = ({ isOpen, onClose, people, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    person_id: '',
    amount: '',
    description: '',
    period_tag: new Date().toISOString().substring(0, 7).replace('-', '').toUpperCase() + '01',
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.person_id) newErrors.person_id = 'Person is required'
    if (!formData.amount || parseFloat(formData.amount) <= 0) newErrors.amount = 'Amount must be > 0'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const debtData = {
      ledger_id: `DEB-${Date.now()}`,
      person_id: formData.person_id,
      sum_debt_initial: parseFloat(formData.amount),
      sum_debt: parseFloat(formData.amount),
      sum_repaid: 0,
      sum_back_on_debt: 0,
      status: 'OPEN',
      period_tag: formData.period_tag,
      notes: formData.description || null,
    }

    await onSubmit(debtData)
    
    setFormData({
      person_id: '',
      amount: '',
      description: '',
      period_tag: new Date().toISOString().substring(0, 7).replace('-', '').toUpperCase() + '01',
    })
    setErrors({})
    onClose()
  }

  const peopleOptions = people.map(p => ({
    value: p.person_id,
    label: p.name,
  }))

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Debt" size="full">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <CustomSelect
            label="Person"
            name="person_id"
            value={formData.person_id}
            onChange={handleChange}
            options={peopleOptions}
            error={errors.person_id}
            disabled={loading}
          />
          <Input
            label="Amount"
            name="amount"
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            error={errors.amount}
            placeholder="0.00"
            disabled={loading}
          />
        </div>

        <Textarea
          label="Description (Optional)"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="What is this debt for?"
          disabled={loading}
        />

        <div className="flex gap-3 pt-6 border-t border-gray-200">
          <Button
            type="submit"
            className="flex-1"
            loading={loading}
            disabled={loading}
          >
            Add Debt
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  )
}
```

---

## PART 2: CREATE ADD REPAYMENT MODAL

### Create: `src/components/Dashboard/AddRepaymentModal.jsx`

```jsx
import { useState } from 'react'
import { Modal } from '../Common/Modal'
import { Input } from '../Common/Input'
import { Textarea } from '../Common/Textarea'
import { Button } from '../Common/Button'

export const AddRepaymentModal = ({ isOpen, onClose, debtRecord, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    amount: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.amount || parseFloat(formData.amount) <= 0) newErrors.amount = 'Amount must be > 0'
    
    const remainingDebt = (debtRecord?.sum_debt || 0) - (debtRecord?.sum_repaid || 0)
    if (parseFloat(formData.amount) > remainingDebt) {
      newErrors.amount = `Cannot exceed remaining debt (${remainingDebt.toLocaleString('vi-VN')})`
    }
    
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const repaymentData = {
      amount: parseFloat(formData.amount),
      date: formData.date,
      notes: formData.notes || null,
      ledger_id: debtRecord.ledger_id,
    }

    await onSubmit(repaymentData)
    
    setFormData({
      amount: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
    })
    setErrors({})
    onClose()
  }

  const remainingDebt = (debtRecord?.sum_debt || 0) - (debtRecord?.sum_repaid || 0)

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Repayment" size="full">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-blue-900">
            <strong>Remaining Debt:</strong> {remainingDebt.toLocaleString('vi-VN')} đ
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Repayment Amount"
            name="amount"
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            error={errors.amount}
            placeholder="0.00"
            disabled={loading}
          />
          <Input
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <Textarea
          label="Notes (Optional)"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Payment details..."
          disabled={loading}
        />

        <div className="flex gap-3 pt-6 border-t border-gray-200">
          <Button
            type="submit"
            className="flex-1"
            loading={loading}
            disabled={loading}
          >
            Add Repayment
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  )
}
```

---

## PART 3: CREATE DEBT LINKED TRANSACTIONS SERVICE

### Create: `src/services/debtLinkedService.js`

```javascript
import { supabase } from './supabaseClient'

export const debtLinkedService = {
  // Create debt linked transaction (repayment)
  async addRepayment(repaymentData) {
    try {
      // Create transaction
      const txnData = {
        transaction_id: `TXN-${Date.now()}`,
        date: repaymentData.date,
        amount: repaymentData.amount,
        txn_type: 'EXPENSE', // Repayment recorded as negative
        from_account_id: null,
        to_account_id: null,
        category_id: null,
        notes: `Debt repayment for ${repaymentData.ledger_id}`,
        status: 'ACTIVE',
        period_tag: repaymentData.date.substring(0, 7).replace('-', '').toUpperCase() + repaymentData.date.substring(8),
      }

      const { data: txn, error: txnError } = await supabase
        .from('transactions')
        .insert([txnData])
        .select()

      if (txnError) throw txnError

      // Update debt ledger
      const { error: debtError } = await supabase
        .rpc('process_debt_repayment', {
          p_ledger_id: repaymentData.ledger_id,
          p_amount: repaymentData.amount,
        })

      if (debtError) throw debtError

      return { success: true, data: txn[0] }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Create new debt entry
  async addDebt(debtData) {
    try {
      const { data, error } = await supabase
        .from('debt_ledger')
        .insert([debtData])
        .select()

      if (error) throw error
      return { success: true, data: data[0] }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },
}
```

---

## PART 4: UPDATE DEBTS PAGE

### File: `src/pages/DebtsPage.jsx`

**Replace section with buttons:**

```jsx
// Find this:
<div>
  <h1 className="text-3xl font-bold text-gray-900">Debts</h1>
  <p className="text-gray-600 mt-2">Track money lent to friends & family</p>
</div>

// Replace with:
import { useState } from 'react'
import { AddDebtModal } from '../components/Dashboard/AddDebtModal'

export const DebtsPage = () => {
  const [debts, setDebts] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalDebt, setTotalDebt] = useState(0)
  const [totalRepaid, setTotalRepaid] = useState(0)
  const [people, setPeople] = useState([])
  const [addDebtOpen, setAddDebtOpen] = useState(false)
  const [selectedDebtForRepay, setSelectedDebtForRepay] = useState(null)
  const [addRepaymentOpen, setAddRepaymentOpen] = useState(false)

  // ... existing code ...

  const handleAddDebt = async (debtData) => {
    const result = await debtLinkedService.addDebt(debtData)
    if (result.success) {
      setAddDebtOpen(false)
    } else {
      alert(`Error: ${result.error}`)
    }
  }

  const handleAddRepayment = async (repaymentData) => {
    const result = await debtLinkedService.addRepayment(repaymentData)
    if (result.success) {
      setAddRepaymentOpen(false)
    } else {
      alert(`Error: ${result.error}`)
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Debts</h1>
            <p className="text-gray-600 mt-2">Track money lent to friends & family</p>
          </div>
          <Button onClick={() => setAddDebtOpen(true)}>
            + Add Debt
          </Button>
        </div>

        {/* ... rest of component ... */}
      </div>

      <AddDebtModal
        isOpen={addDebtOpen}
        onClose={() => setAddDebtOpen(false)}
        people={people}
        onSubmit={handleAddDebt}
        loading={loading}
      />

      {selectedDebtForRepay && (
        <AddRepaymentModal
          isOpen={addRepaymentOpen}
          onClose={() => setAddRepaymentOpen(false)}
          debtRecord={selectedDebtForRepay}
          onSubmit={handleAddRepayment}
          loading={loading}
        />
      )}
    </MainLayout>
  )
}
```

---

## PART 5: UPDATE DEBTS TABLE - ADD ACTION BUTTONS

### File: `src/components/Dashboard/DebtsTable.jsx`

**Find section with debt card and add action button:**

```jsx
// Find:
<span className={clsx(
  'px-3 py-1 rounded-full text-xs font-medium border',
  getStatusBadge(debt.status)
)}>
  {debt.status.replace('_', ' ')}
</span>

// Add after the status span:
<button
  onClick={() => onAddRepayment?.(debt)}
  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
>
  Add Repayment
</button>
```

---

## PART 6: FETCH PEOPLE DATA

### Update: `src/pages/DebtsPage.jsx`

**Add to useEffect:**

```jsx
useEffect(() => {
  const fetchPeople = async () => {
    try {
      const { data, error } = await supabase
        .from('people')
        .select('*')
        .order('name')
      
      if (error) throw error
      setPeople(data || [])
    } catch (error) {
      console.error('Error fetching people:', error)
    }
  }

  fetchPeople()
}, [])
```

---

## ✅ CHECKLIST

- [ ] Create `AddDebtModal.jsx` (PART 1)
- [ ] Create `AddRepaymentModal.jsx` (PART 2)
- [ ] Create `debtLinkedService.js` (PART 3)
- [ ] Update `DebtsPage.jsx` - Add buttons & modals (PART 4)
- [ ] Update `DebtsTable.jsx` - Add repayment button (PART 5)
- [ ] Update DebtsPage - Fetch people (PART 6)
- [ ] Test add debt modal
- [ ] Test add repayment modal
- [ ] Check debt updates correctly
- [ ] Commit & push

---

## EXPECTED FLOW

1. Click "+ Add Debt" button → Modal opens
2. Select person, enter amount, submit
3. Debt appears in list with OPEN status
4. Click "Add Repayment" on debt → Modal opens
5. Enter repayment amount (validate ≤ remaining)
6. Submit → Debt updates with progress

---

**Send to agent for Phase 3.5 implementation!** 🚀