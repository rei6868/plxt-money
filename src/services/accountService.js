import { supabase } from './supabaseClient'

export const accountService = {
  // Get all accounts
  async getAccounts() {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .eq('is_active', true)
        .order('account_name')

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Get account by ID
  async getAccountById(id) {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .eq('account_id', id)
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Get total balance across all accounts
  async getTotalBalance() {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .select('balance')
        .eq('is_active', true)

      if (error) throw error

      const total = data.reduce((sum, acc) => sum + acc.balance, 0)
      return { success: true, total }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Subscribe to account changes
  onAccountsChange(callback) {
    return supabase
      .channel('accounts')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'accounts' },
        callback
      )
      .subscribe()
  },
}