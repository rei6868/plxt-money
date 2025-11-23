import React, { useState } from 'react'
import { Modal } from '../Common/Modal'
import { Input } from '../Common/Input'
import { Select } from '../Common/Select'
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
          <Select
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