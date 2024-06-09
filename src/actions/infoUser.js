'use server'

import getDataAuth from '@/lib/getDataAuth'

export const infoUser = async (values) => {
  const res = await getDataAuth(values)
  return res
}
