export function serialize (obj) {
  return Object.keys(obj).reduce(function (a, k) {
    let val = obj[k]
    if (val !== null && typeof val === 'object') {
      val = JSON.stringify(val)
    }
    a.push(k + '=' + encodeURIComponent(val))
    return a
  }, []).join('&')
}
