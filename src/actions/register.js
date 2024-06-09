'use server'

import postData from '@/lib/postData'

export const register = async (values) => {
  const res = await postData(values)
  return res
}
