import { useContext } from 'react'
import MailContext from '../context/MailContext'

export const useMail = () => {
  const context = useContext(MailContext)
  
  if (!context) {
    throw new Error('useMail harus digunakan dalam MailContextProvider')
  }
  
  return context
}

export default useMail