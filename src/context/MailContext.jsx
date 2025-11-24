import { createContext, useState } from 'react'

const MailContext = createContext({
  mails: [],
  setMails: () => {},
  selectedMail: null,
  setSelectedMail: () => {}
})

export const MailContextProvider = ({ children }) => {
  const [mails, setMails] = useState([])
  const [selectedMail, setSelectedMail] = useState(null)

  const value = {
    mails,
    setMails,
    selectedMail,
    setSelectedMail
  }

  return (
    <MailContext.Provider value={value}>
      {children}
    </MailContext.Provider>
  )
}

export default MailContext
