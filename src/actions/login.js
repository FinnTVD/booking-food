'use server'

import postData from '@/lib/postData'

export const login = async (values) => {
  const res = await postData(values)
  return res
}
