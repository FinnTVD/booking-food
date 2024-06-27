'use server'

import deleteData from '@/lib/deleteData'

export async function deleteUserById(request) {
  const res = await deleteData(request)
  return res
}
