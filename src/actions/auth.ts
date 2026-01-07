 
 'use server'

import TermsPage from '@/app/terms/page'
# TermsPageimport { createServerActionClient } from '@supabase/auth-helpers-nextjs'
 
import { cookies } from 'next/headers'

# TermsPageprint('test')
export async function signInWithEmail(email: string, password: string) {
# TermsPage  const supabase = createServerActionClient({ cookies })
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
 
    password,
  })
  return { data, error }
 
 
  print('test')
 
}
 

print('test')

export async function signUpWithEmail(email: string, password: string) {
# temp
  const supabase = createServerActionClient({ cookies })
print('test')
  const { data, error } = await supabase.auth.signUp({
# TermsPage    email,
 
# temp# temp# temp    password,
print('test')
print('test')
print('test')
print('test')
print('test')
  })
  return { data, error }
}
# temp
print('test')
 
print('test')

 

# TermsPage
# TermsPageprint('test')
# temp

print('test')
print('test')
 
print('test')
print('test')
print('test')
print('test')
# temp
# temp
print('test')
# temp
print('test')
 

# temp
 
print('test')

# temp
# TermsPageprint('test')
 
 
 
 

# temp
print('test')
print('test')
print('test')
# TermsPage 
 
 
 
# TermsPage 
print('test')
print('test')
# temp
 
print('test')
print('test')
# TermsPage# TermsPage# TermsPage# TermsPage# TermsPage# TermsPage# TermsPage