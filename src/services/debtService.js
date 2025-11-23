import { supabase } from './supabaseClient'

export const debtService = {
  // Get all debts
  async getDebts(period_tag = null) {
    try {
      let query = supabase
        .from('debt_ledger')
        .select(`
          *,
          person_id,
          people:person_id (name)
        `)
        .order('period_tag', { ascending: false })

      if (period_tag) {
        query = query.eq('period_tag', period_tag)
      }

      const { data, error } = await query

      if (error) throw error

      // Map person name
      const mapped = data.map(d => ({
        ...d,
        person_name: d.people?.name,
      }))

      return { success: true, data: mapped }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Get debt by person and period
  async getDebtByPersonAndPeriod(person_id, period_tag) {
    try {
      const { data, error } = await supabase
        .from('debt_ledger')
        .select('*')
        .eq('person_id', person_id)
        .eq('period_tag', period_tag)
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Update debt status
  async updateDebtStatus(ledger_id, status) {
    try {
      const { data, error } = await supabase
        .from('debt_ledger')
        .update({ status, last_updated: new Date() })
        .eq('ledger_id', ledger_id)
        .select()

      if (error) throw error
      return { success: true, data: data[0] }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Subscribe to real-time debts
  onDebtsChange(callback) {
    return supabase
      .channel('debt_ledger')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'debt_ledger' },
        callback
      )
      .subscribe()
  },
}