import {clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'

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
