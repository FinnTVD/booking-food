'use server'

import {postDataAuth} from '@/lib/postDataAuth'

export async function createOrder(request) {
  const res = await postDataAuth(request)
  return res
}
