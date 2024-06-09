'use server'

import {cookies} from 'next/headers'

export async function setCookie(
  data = {
    name: null,
    value: null,
  },
) {
  cookies().set(data.name, data.value)
}
