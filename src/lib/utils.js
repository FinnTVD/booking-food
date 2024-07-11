import {clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'
import {keys} from 'lodash'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function handleStatusOrder(status) {
  switch (status) {
    case 'processing':
      return 'Đang xử lý'
    case 'confirm':
      return 'Thành công'
    case 'done':
      return 'Hoàn tất'
    case 'cancel':
      return 'Đã huỷ'
    default:
      return 'Đang xử lý'
  }
}


export function formatToVND(price) {
  if (!price) return null
  let formattedNumber = Number(price).toLocaleString('vi-VN')
  formattedNumber += 'đ'
  return formattedNumber.replaceAll(',', '.')
}

export const convertStr2URL = (pickParams) => {
  if (!pickParams) return 
  let str = ''
  keys(pickParams).forEach((key) => {
    str += `${key}=${pickParams[key]}&`
  })
  str = str.slice(0, -1)
  return str
}

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd/MM/yyyy'
  return date ? format(new Date(date), fm) : ''
}