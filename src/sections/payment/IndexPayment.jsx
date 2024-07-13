'use client'
import Link from 'next/link'
import {useEffect} from 'react'
import {pickBy} from 'lodash'
import CryptoJS from 'crypto-js'
import {convertStr2URL} from '@/lib/utils'
import {createOrder} from '@/actions/createOrder'
import {putSheet} from '@/actions/putSheet'
const IndexPayment = ({searchParams, dataTable}) => {
  const responsiveCode = searchParams?.vpc_TxnResponseCode

  useEffect(() => {
    const callApi = async () => {
      const res = await fetch('/api/payment', {
        method: 'POST',
        body: JSON.stringify({
          vpc_AccessCode: '6BEB2546',
          vpc_Command: 'queryDR',
          vpc_MerchTxnRef: searchParams?.vpc_MerchTxnRef,
          vpc_Merchant: 'TESTONEPAY',
          vpc_Password: 'op123456',
          vpc_User: 'op01',
          vpc_Version: '2',
          vpc_SecureHash: handleSecureHash(),
        }),
      })
      const data = await res.json()
      return data
    }
    callApi()
      .then((res) => {
        const list = res.toString().split('&')
        let code
        list?.forEach((e) => {
          if (e?.includes('vpc_TxnResponseCode')) {
            code = Number(e?.slice(e.length - 1))
          }
        })
        return code
      })
      .then((code) => {
        responsiveCode
        const dataForm = JSON.parse(
          window?.localStorage?.getItem('formDataPayment'),
        )
        const formdata = new FormData()
        formdata.append('entry.1056944520', dataForm?.name)
        formdata.append('entry.1803996443', dataForm?.email)
        formdata.append('entry.594050415', dataForm?.phone)
        formdata.append('entry.835067757', dataForm.note)
        formdata.append('entry.964051301', dataForm?.time)
        formdata.append('entry.377556313', dataForm?.date)
        formdata.append('entry.763171905', dataForm?.user)
        formdata.append('entry.1520761440', dataForm?.table)

        if (dataForm && searchParams?.vpc_MerchTxnRef && code === 0) {
          formdata.append('entry.246438652', 'Done')
          putSheet({
            method: 'POST',
            body: formdata,
            mode: 'no-cors',
          }).then((res) => {
            if (res === 200) {
              console.log("done");
            }
          })
          // const request = {
          //   api: `/orders`,
          //   token: token,
          //   body: JSON.stringify(body),
          // }
          // createOrder(request)
          //   .then((res) => {
          //     console.log('🚀 ~ .then ~ res:', res)
          //   })
          //   .catch((error) => {
          //     console.log('🚀 ~ createOrder ~ error:', error)
          //   })
          window.localStorage.removeItem('formDataPayment')
        }
        // // nếu thánh toán thất bại sẽ đẩy data về form thất bại
        if (dataForm && searchParams?.vpc_MerchTxnRef && code !== 0) {
          formdata.append('entry.246438652', 'Failed')
          putSheet({
            method: 'POST',
            body: formdata,
            mode: 'no-cors',
          })
        }
      })
  }, [])
  const generateParams = (pickVpc = false) => {
    const reqParam = {
      vpc_AccessCode: '6BEB2546',
      vpc_Command: 'queryDR',
      vpc_MerchTxnRef: searchParams?.vpc_MerchTxnRef,
      vpc_Merchant: 'TESTONEPAY',
      vpc_Password: 'op123456',
      vpc_User: 'op01',
      vpc_Version: '2',
    }
    if (pickVpc) {
      const pickParams = pickBy(
        reqParam,
        (_, key) => key.startsWith('vpc_') || key.startsWith('user_'),
      )
      return convertStr2URL(pickParams)
    }
    return convertStr2URL(reqParam)
  }
  const handleSecureHash = () => {
    const paramsGenerate = generateParams(true)
    const secretWordArray = CryptoJS.enc.Hex.parse(
      '6D0870CDE5F24F34F3915FB0045120DB',
    )
    const hash = CryptoJS.HmacSHA256(paramsGenerate, secretWordArray)
    const vpc_SecureHash = hash.toString(CryptoJS.enc.Hex).toUpperCase()
    return vpc_SecureHash
  }

  return (
    <div className='w-[60%] h-[60%] max-md:w-[91.46667rem] flex flex-col justify-center items-center p-[1.5rem] bg-white shadow-btn rounded-[1.25rem] gap-y-[3rem]'>
      <div
        className={`${
          searchParams?.vpc_TxnResponseCode === '0'
            ? 'bg-green-500'
            : 'bg-red-500'
        } w-[5rem] h-[5rem] max-md:w-[16rem] max-md:h-[16rem] rounded-full flex items-center justify-center`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='2.5'
          stroke='white'
          className='w-[3.5rem] h-[3.5rem] max-md:w-[6.5rem] max-md:h-[6.5rem]'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M4.5 12.75l6 6 9-13.5'
          />
        </svg>
      </div>
      <h1
        className={`${
          searchParams?.vpc_TxnResponseCode === '0'
            ? 'text-secondary-green-600'
            : 'text-red-500'
        } text-[2rem] font-heavitas leading-[1] font-normal max-md:text-[4.5rem]`}
      >
        {searchParams?.vpc_TxnResponseCode === '0'
          ? 'Payment Successfully!'
          : 'Payment failed!'}
      </h1>
      <h2
        className={`${
          searchParams?.vpc_TxnResponseCode === '0'
            ? 'text-secondary-green-600'
            : 'text-red-500 hidden'
        } text-[1rem] font-heavitas leading-normal font-normal text-center max-lg:text-[1.7rem] max-lg:w-[90%] max-md:text-[3.5rem] max-md:w-full max-md:leading-[1.6]`}
      >
        Please check your email.
        <br /> We have sent the instant confirmation. Chat us any time for help.
      </h2>
      <Link
        href={'/'}
        className='text-[1.25rem] font-heavitas text-primary-70 font-normal leading-[1] w-fit px-[2rem] py-[1rem] flex justify-center rounded-[0.5rem] border border-solid border-primary-70 hover:bg-primary-70 max-md:text-[4.25rem] max-md:py-[4rem] max-md:px-[8rem] hover:text-white transition-all duration-500 hover:scale-[1.1] active:scale-95'
      >
        Back Home
      </Link>
    </div>
  )
}

export default IndexPayment
