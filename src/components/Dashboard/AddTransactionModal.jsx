import React, { useState } from 'react'
import { Modal } from '../Common/Modal'
import { Input } from '../Common/Input'
import { Select } from '../Common/Select'
import { Textarea } from '../Common/Textarea'
import { Button } from '../Common/Button'
import { TabGroup } from '../Common/TabGroup'
import { TRANSACTION_TYPES } from '../../utils/constants'

export const AddTransactionModal = ({ isOpen, onClose, accounts, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    txn_type: TRANSACTION_TYPES.EXPENSE,
    from_account_id: '',
    to_account_id: '',
    category_id: '',
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
    if (!formData.date) newErrors.date = 'Date is required'
    if (!formData.amount || parseFloat(formData.amount) <= 0) newErrors.amount = 'Amount must be > 0'
    if (!formData.txn_type) newErrors.txn_type = 'Transaction type is required'
    if (!formData.category_id) newErrors.category_id = 'Category is required'
    
    if (formData.txn_type === TRANSACTION_TYPES.TRANSFER) {
      if (!formData.from_account_id) newErrors.from_account_id = 'From account required'
      if (!formData.to_account_id) newErrors.to_account_id = 'To account required'
      if (formData.from_account_id === formData.to_account_id) {
        newErrors.to_account_id = 'From and To accounts cannot be same'
      }
    } else if (formData.txn_type === TRANSACTION_TYPES.EXPENSE) {
      if (!formData.from_account_id) newErrors.from_account_id = 'Account required'
    } else if (formData.txn_type === TRANSACTION_TYPES.INCOME) {
      if (!formData.to_account_id) newErrors.to_account_id = 'Account required'
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

    // Create transaction payload with category_id
    let txnPayload = {
      date: formData.date,
      amount: parseFloat(formData.amount),
      txn_type: formData.txn_type,
      category_id: formData.category_id,
      transaction_id: `TXN-${Date.now()}`,
      status: 'ACTIVE',
      period_tag: formData.date.substring(0, 7).replace('-', '').toUpperCase() + formData.date.substring(8),
      notes: formData.notes || null,
      person_id: null,
    }

    // Set from_account_id and to_account_id based on type
    if (formData.txn_type === TRANSACTION_TYPES.TRANSFER) {
      txnPayload.from_account_id = formData.from_account_id
      txnPayload.to_account_id = formData.to_account_id
    } else if (formData.txn_type === TRANSACTION_TYPES.EXPENSE) {
      txnPayload.from_account_id = formData.from_account_id
      txnPayload.to_account_id = null
    } else if (formData.txn_type === TRANSACTION_TYPES.INCOME) {
      txnPayload.from_account_id = null
      txnPayload.to_account_id = formData.to_account_id
    }

    await onSubmit(txnPayload)
    
    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      amount: '',
      txn_type: TRANSACTION_TYPES.EXPENSE,
      from_account_id: '',
      to_account_id: '',
      category_id: '',
      notes: '',
    })
    setErrors({})
    onClose()
  }

  const accountOptions = accounts.map(acc => ({
    value: acc.account_id,
    label: `${acc.account_name} (${acc.balance.toLocaleString('vi-VN')})`,
  }))

  const categoryOptions = [
    { value: 'FOOD', label: 'Food & Dining' },
    { value: 'SHOPPING', label: 'Shopping' },
    { value: 'TRANSPORT', label: 'Transportation' },
    { value: 'ENTERTAINMENT', label: 'Entertainment' },
    { value: 'UTILITIES', label: 'Utilities' },
    { value: 'HEALTHCARE', label: 'Healthcare' },
    { value: 'EDUCATION', label: 'Education' },
    { value: 'TRAVEL', label: 'Travel' },
    { value: 'CASHBACK', label: 'Cashback' },
    { value: 'REFUND', label: 'Refund' },
    { value: 'SALARY', label: 'Salary' },
    { value: 'GIFT', label: 'Gift' },
    { value: 'OTHER', label: 'Other' },
  ]


  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Transaction" size="xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            error={errors.date}
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

        <TabGroup
          value={formData.txn_type}
          onChange={e => setFormData(f => ({...f, txn_type: e.target.value }))}
          options={[
            { value: 'EXPENSE', label: 'Expense' },
            { value: 'INCOME', label: 'Income' },
            { value: 'TRANSFER', label: 'Transfer' }
          ]}
        />

        {[TRANSACTION_TYPES.EXPENSE, TRANSACTION_TYPES.TRANSFER].includes(formData.txn_type) && (
          <Select
            label="From Account"
            name="from_account_id"
            value={formData.from_account_id}
            onChange={handleChange}
            options={accountOptions}
            error={errors.from_account_id}
            disabled={loading}
          />
        )}

        {[TRANSACTION_TYPES.INCOME, TRANSACTION_TYPES.TRANSFER].includes(formData.txn_type) && (
          <Select
            label="To Account"
            name="to_account_id"
            value={formData.to_account_id}
            onChange={handleChange}
            options={accountOptions}
            error={errors.to_account_id}
            disabled={loading}
          />
        )}

        <Select
          label="Category"
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          options={categoryOptions}
          error={errors.category_id}
          disabled={loading}
        />

        <Textarea
          label="Notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Optional notes..."
          disabled={loading}
        />

        <div className="flex gap-2 pt-4">
          <Button
            type="submit"
            className="flex-1"
            loading={loading}
            disabled={loading}
          >
            Add Transaction
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