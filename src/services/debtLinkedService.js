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