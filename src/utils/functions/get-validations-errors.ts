import { ValidationError } from 'yup'

interface Errors {
  [Key: string]: string
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErros: Errors = {}
  if (!err.inner) return {}
  err.inner.forEach(error => {
    const path = error.path ?? 'error'
    validationErros[path] = '❗️'
  })
  return validationErros
}
