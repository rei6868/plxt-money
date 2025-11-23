import React, { useState, useEffect } from 'react'
import { Card } from '../components/Common/Card'
import { MainLayout } from '../layouts/MainLayout'
import { DebtsTable } from '../components/Dashboard/DebtsTable'
import { debtService } from '../services/debtService'
import { formatCurrency } from '../utils/formatting'

export const DebtsPage = () => {
  const [debts, setDebts] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalDebt, setTotalDebt] = useState(0)
  const [totalRepaid, setTotalRepaid] = useState(0)

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

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Debts</h1>
          <p className="text-gray-600 mt-2">Track money lent to friends & family</p>
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
          <DebtsTable debts={debts} loading={loading} />
        </Card>
      </div>
    </MainLayout>
  )
}