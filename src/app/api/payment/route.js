export async function POST(req) {
  const body = await req.json()
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

  const urlencoded = new URLSearchParams()
  urlencoded.append('vpc_AccessCode', '6BEB2546')
  urlencoded.append('vpc_Version', '2')
  urlencoded.append('vpc_Command', 'queryDR')
  urlencoded.append('vpc_Merchant', 'TESTONEPAY')
  urlencoded.append('vpc_Password', 'op123456')
  urlencoded.append('vpc_MerchTxnRef', body.vpc_MerchTxnRef)
  urlencoded.append('vpc_User', 'op01')
  urlencoded.append('vpc_SecureHash', body.vpc_SecureHash)

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  }

  const responsive = await fetch(
    'https://mtf.onepay.vn/msp/api/v1/vpc/invoices/queries',
    requestOptions,
  )

  const data = await responsive.text()
  return Response.json(data)
}
