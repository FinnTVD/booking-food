'use server'

import {putDataAuth} from '@/lib/putDataAuth'

export async function updateStatusTable(request) {
  const res = await putDataAuth(request)
  return res
}
