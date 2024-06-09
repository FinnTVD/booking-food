export default async function postData({
  api,
  body,
  headers = {
    'Content-Type': 'application/json',
  },
}) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}${api}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      // throw new Error('Failed to fetch data')
      return res.json()
    }

    return res.json()
  } catch (error) {
    console.log(`${process.env.NEXT_PUBLIC_API}${api}`)
  }
}
