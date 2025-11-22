import { supabase } from './supabaseClient'

export const transactionService = {
  // Get all transactions
  async getTransactions(limit = 50) {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false })
        .limit(limit)

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Get transaction by ID
  async getTransactionById(id) {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('transaction_id', id)
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Create transaction
  async createTransaction(transaction) {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([transaction])
        .select()

      if (error) throw error
      return { success: true, data: data[0] }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Update transaction
  async updateTransaction(id, updates) {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .update(updates)
        .eq('transaction_id', id)
        .select()

      if (error) throw error
      return { success: true, data: data[0] }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Delete transaction
  async deleteTransaction(id) {
    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('transaction_id', id)

      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Subscribe to real-time transactions
  onTransactionsChange(callback) {
    return supabase
      .channel('transactions')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'transactions' },
        callback
      )
      .subscribe()
  },
}