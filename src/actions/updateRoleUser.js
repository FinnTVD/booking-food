'use server'

import {putDataAuth} from '@/lib/putDataAuth'

export async function updateRoleUser(request) {
  const res = await putDataAuth(request)
  return res
}
