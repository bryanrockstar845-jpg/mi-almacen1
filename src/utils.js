export const money = (n) =>
  '$ ' + Math.round(n).toLocaleString('es-AR')

export const fmtDateTime = (iso) => {
  const d = new Date(iso)
  const p = (x) => String(x).padStart(2, '0')
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} - ${p(d.getHours())}:${p(d.getMinutes())}`
}

export const isThisMonth = (iso) => {
  const d = new Date(iso), n = new Date()
  return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear()
}

export const stockLevel = (p) =>
  p.stock <= Math.floor(p.min / 2) ? 'critico' : p.stock <= p.min ? 'bajo' : 'ok'
