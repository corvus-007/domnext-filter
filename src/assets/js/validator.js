export const checkPhoneMask = value => {
  return /\(\d{3}\) \d{3}-\d{2}-\d{2}/g.test(value)
}
