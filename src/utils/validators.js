export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePhoneNumber = (phone) => {
  const re = /^(\+62|0)[0-9]{9,12}$/
  return re.test(phone)
}

export const validateSuratNumber = (number) => {
  // Format: SM/001/XI/2025 atau SK/001/XI/2025
  const re = /^(SM|SK)\/\d{3}\/[A-Z]{1,2}\/\d{4}$/
  return re.test(number)
}

export const validateFormData = (data, requiredFields) => {
  const errors = {}
  
  requiredFields.forEach(field => {
    if (!data[field] || data[field].trim() === '') {
      errors[field] = `${field} harus diisi`
    }
  })
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}