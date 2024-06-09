import {create} from 'zustand'
const useStore = create((set) => ({
  jwt: null,
  infoUser: null,
  setInfoUser: (data) => {
    set((state) => {
      return {
        ...state,
        infoUser: data,
      }
    })
  },
  setJwt: (data) => {
    set((state) => {
      return {
        ...state,
        jwt: data,
      }
    })
  },
}))
export default useStore
