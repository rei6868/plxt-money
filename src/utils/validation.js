export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePassword = (password) => {
  return password.length >= 8
}

export const validatePasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword
}

export const validateRequired = (value) => {
  return value && value.trim().length > 0
}