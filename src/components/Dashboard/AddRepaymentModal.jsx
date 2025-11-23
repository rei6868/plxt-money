import React, { useState } from 'react'
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