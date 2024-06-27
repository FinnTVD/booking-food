'use server'

import {putDataAuth} from '@/lib/putDataAuth'

export async function updateStatusOrderById(request) {
  const res = await putDataAuth(request)
  return res
}
