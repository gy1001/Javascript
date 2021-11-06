export function getCurrentAuthority() {
  return ['admin']
}

export function check(authority) {
  return getCurrentAuthority().some((item) => authority.includes(item))
}

export function isLogin() {
  const current = getCurrentAuthority()
  return current && current[0] !== 'guest'
}
