import { ref } from 'vue'
import { supabase } from '../lib/supabase.js'

const session = ref(null)
let booted = false

function boot() {
  if (booted) return
  booted = true
  supabase.auth.getSession().then(({ data }) => { session.value = data.session })
  supabase.auth.onAuthStateChange((_, s) => { session.value = s })
}

export function useAuth() {
  boot()
  return {
    session,
    get isAuth() { return !!session.value },
    signIn: (email, password) => supabase.auth.signInWithPassword({ email, password }),
    signOut: () => supabase.auth.signOut(),
  }
}
