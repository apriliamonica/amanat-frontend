import { createContext } from 'react'

const AuthContext = createContext({
  userRole: null,
  isLoggedIn: false,
  handleLogout: () => {}
})

export default AuthContext