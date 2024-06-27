export default async function getData(request) {
  try {
    const res = await fetch(`${process.env.API}${request?.api}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        tags: [request?.tags],
      },
    })

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      // throw new Error('Failed to fetch data')
      console.log(`${process.env.API}${api}`)
      return null
    }
    return res.json()
  } catch (error) {
    console.log(`fetch failed: ${process.env.API}${api}`)
  }
}
