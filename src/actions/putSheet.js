'use server'


export async function putSheet(request) {
  const res = await fetch(
    'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfyJq3cwdztaqWBLn9s99mtgJDQjSpgeawb1RzhEAPnfXv8-Q/formResponse',
    request,
  )
  return res.status
}
