import { useAuth } from './useAuth'
import { ROLES } from '../utils/constants'

export const useRole = () => {
  const { userRole } = useAuth()

  return {
    role: userRole,
    isSekretarisKantor: userRole === ROLES.SEKRETARIS_KANTOR,
    isKetua: userRole === ROLES.KETUA,
    isSekretarisPengurus: userRole === ROLES.SEKRETARIS_PENGURUS,
    isKabag: userRole === ROLES.KABAG
  }
}

export default useRole