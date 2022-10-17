const validateRegisterInput = (
  username,
  email,
  gender,
  password,
  confirmPassword
) => {
  const errors = {}
  if (username.trim() === '') {
    errors.username = 'Username must not be empty'
  }
  if (email.trim() === '') {
    errors.email = 'Email must not be empty'
  } else {
    const regEx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address'
    }
  }
  if (gender.trim() === '') {
    errors.gender = 'Please select gender'
  }
  if (password === '') {
    errors.password = 'Password must not empty'
  }

  if (confirmPassword === '') {
    errors.confirmPassword = 'Repeated password must not empty'
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords must match'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}

const validateLoginInput = (username, password) => {
  const errors = {}
  if (username.trim() === '') {
    errors.username = 'Username must not be empty'
  }
  if (password.trim() === '') {
    errors.password = 'Password must not be empty'
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}

module.exports = {
  validateRegisterInput,
  validateLoginInput,
}
