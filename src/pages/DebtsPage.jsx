import React, { useState, useEffect } from 'react'
import { Card } from '../components/Common/Card'
import { MainLayout } from '../layouts/MainLayout'
import { DebtsTable } from '../components/Dashboard/DebtsTable'
import { debtService } from '../services/debtService'
import { debtLinkedService } from '../services/debtLinkedService'
import { formatCurrency } from '../utils/formatting'
import { Button } from '../components/Common/Button'
import { AddDebtModal } from '../components/Dashboard/AddDebtModal'
import { AddRepaymentModal } from '../components/Dashboard/AddRepaymentModal'
import { supabase } from '../services/supabaseClient'

export const DebtsPage = () => {
  const [debts, setDebts] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalDebt, setTotalDebt] = useState(0)
  const [totalRepaid, setTotalRepaid] = useState(0)
  const [people, setPeople] = useState([])
  const [addDebtOpen, setAddDebtOpen] = useState(false)
  const [selectedDebtForRepay, setSelectedDebtForRepay] = useState(null)
  const [addRepaymentOpen, setAddRepaymentOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const result = await debtService.getDebts()
        if (result.success) {
          setDebts(result.data || [])
          
          // Calculate totals
          const debt = (result.data || []).reduce((sum, d) => sum + (d.sum_debt || 0), 0)
          const repaid = (result.data || []).reduce((sum, d) => sum + (d.sum_repaid || 0), 0)
          
          setTotalDebt(debt)
          setTotalRepaid(repaid)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

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

  useEffect(() => {
    const subscription = debtService.onDebtsChange((payload) => {
      console.log('Debt update:', payload)
      setDebts(prev => {
        if (payload.eventType === 'INSERT') {
          return [...prev, payload.new]
        } else if (payload.eventType === 'UPDATE') {
          return prev.map(d => d.ledger_id === payload.new.ledger_id ? payload.new : d)
        } else if (payload.eventType === 'DELETE') {
          return prev.filter(d => d.ledger_id !== payload.old.ledger_id)
        }
        return prev
      })
    })

    return () => subscription?.unsubscribe?.()
  }, [])

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

  const handleAddRepaymentClick = (debt) => {
    setSelectedDebtForRepay(debt)
    setAddRepaymentOpen(true)
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

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-gray-600 text-sm font-medium">Total Debt</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">
              {formatCurrency(totalDebt)}
            </p>
          </Card>

          <Card>
            <h3 className="text-gray-600 text-sm font-medium">Total Repaid</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {formatCurrency(totalRepaid)}
            </p>
          </Card>
        </div>

        {/* Debts List */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Debt Ledger</h2>
          <DebtsTable 
            debts={debts} 
            loading={loading} 
            onAddRepayment={handleAddRepaymentClick}
          />
        </Card>
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