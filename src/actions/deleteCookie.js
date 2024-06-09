'use server'

import {cookies} from 'next/headers'

export async function deleteCookie(name) {
  cookies().delete(name)
}
