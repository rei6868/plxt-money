import React, { useState, useEffect } from 'react'
import { Card } from '../components/Common/Card'
import { Button } from '../components/Common/Button'
import { MainLayout } from '../layouts/MainLayout'
import { AddTransactionModal } from '../components/Dashboard/AddTransactionModal'
import { TransactionsTable } from '../components/Dashboard/TransactionsTable'
import { transactionService } from '../services/transactionService'
import { accountService } from '../services/accountService'

export const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([])
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const txnResult = await transactionService.getTransactions(100)
        if (txnResult.success) {
          setTransactions(txnResult.data || [])
        }

        const accResult = await accountService.getAccounts()
        if (accResult.success) {
          setAccounts(accResult.data || [])
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const subscription = transactionService.onTransactionsChange((payload) => {
      setTransactions(prev => {
        if (payload.eventType === 'INSERT') {
          return [payload.new, ...prev]
        } else if (payload.eventType === 'UPDATE') {
          return prev.map(t => t.transaction_id === payload.new.transaction_id ? payload.new : t)
        } else if (payload.eventType === 'DELETE') {
          return prev.filter(t => t.transaction_id !== payload.old.transaction_id)
        }
        return prev
      })
    })

    return () => subscription?.unsubscribe?.()
  }, [])

  const handleAddTransaction = async (txnData) => {
    const result = await transactionService.createTransaction(txnData)
    if (result.success) {
      setModalOpen(false)
    } else {
      alert(`Error: ${result.error}`)
    }
  }

  const handleDeleteTransaction = async (txnId) => {
    if (confirm('Are you sure?')) {
      const result = await transactionService.deleteTransaction(txnId)
      if (!result.success) {
        alert(`Error: ${result.error}`)
      }
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
            <p className="text-gray-600 mt-2">Manage all your transactions</p>
          </div>
          <Button onClick={() => setModalOpen(true)}>
            + Add Transaction
          </Button>
        </div>

        <Card>
          <TransactionsTable
            transactions={transactions}
            onDelete={handleDeleteTransaction}
            loading={loading}
          />
        </Card>
      </div>

      <AddTransactionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        accounts={accounts}
        onSubmit={handleAddTransaction}
        loading={loading}
      />
    </MainLayout>
  )
}