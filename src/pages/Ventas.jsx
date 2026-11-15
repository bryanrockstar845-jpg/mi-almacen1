import { useState, useEffect, useRef } from 'react'
import { Plus, Minus, Trash2, ScanBarcode } from 'lucide-react'
import { money } from '../utils'

const METHODS = ['Efectivo', 'Transferencia', 'Tarjeta']

export default function Ventas({ db, sell }) {
  const [cart, setCart] = useState([])
  const [q, setQ] = useState('')
  const [method, setMethod] = useState('Efectivo')
  const [msg, setMsg] = useState('')
  const input = useRef(null)

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)

  const add = (p) => {
    if (p.stock <= 0) return setMsg(`Sin stock de ${p.name}`)
    setCart((c) => {
      const f = c.find((i) => i.id === p.id)
      if (f) return c.map((i) => (i.id === p.id ? { ...i, qty: Math.min(i.qty + 1, p.stock) } : i))
      return [...c, { id: p.id, name: p.name, price: p.price, qty: 1, max: p.stock }]
    })
    setMsg('')
  }

  // El lector de códigos de barras (modo teclado HID) escribe el código y envía Enter.
  const submit = (e) => {
    e.preventDefault()
    const t = q.trim().toLowerCase()
    if (!t) return
    const p = db.products.find((x) => x.barcode === t || x.code.toLowerCase() === t) ||
      db.products.find((x) => x.name.toLowerCase().includes(t))
    p ? add(p) : setMsg(`No se encontró "${q}"`)
    setQ('')
  }

  const changeQty = (id, d) =>
    setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: Math.max(1, Math.min(i.max, i.qty + d)) } : i)))

  const cobrar = () => {
    if (!cart.length) return
    sell(cart, method, total)
    setCart([])
    setMsg('Venta registrada')
    input.current?.focus()
  }

  const cancelar = () => { setCart([]); setQ(''); setMsg('') }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'F12') { e.preventDefault(); cobrar() }
      if (e.key === 'Escape') cancelar()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  useEffect(() => input.current?.focus(), [])

  return (
    <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h1 className="mb-3 text-xl font-bold text-navy-900">Nueva venta</h1>
        <form onSubmit={submit} className="relative">
          <ScanBarcode className="absolute left-3 top-3 text-slate-400" />
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Escaneá el código o buscá por nombre"
            className="w-full rounded-lg border border-slate-300 py-3 pl-11 pr-3 outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-200"
          />
        </form>
        {msg && <p className="mt-2 text-sm text-slate-600">{msg}</p>}

        <div className="mt-4 divide-y divide-slate-100">
          {cart.length === 0 && <p className="py-10 text-center text-slate-500">Escaneá un producto para empezar.</p>}
          {cart.map((i) => (
            <div key={i.id} className="flex items-center gap-3 py-3">
              <div className="flex-1">
                <div className="font-semibold">{i.name}</div>
                <div className="text-sm text-slate-500">{money(i.price)} c/u</div>
              </div>
              <div className="flex items-center gap-2">
                <button aria-label="Quitar uno" onClick={() => changeQty(i.id, -1)} className="rounded-md border p-1.5"><Minus size={16} /></button>
                <span className="w-6 text-center font-semibold">{i.qty}</span>
                <button aria-label="Agregar uno" onClick={() => changeQty(i.id, 1)} className="rounded-md border p-1.5"><Plus size={16} /></button>
              </div>
              <div className="w-24 text-right font-semibold">{money(i.price * i.qty)}</div>
              <button aria-label="Eliminar" onClick={() => setCart((c) => c.filter((x) => x.id !== i.id))} className="text-red-500"><Trash2 size={18} /></button>
            </div>
          ))}
        </div>
      </section>

      <section className="h-fit rounded-xl border border-slate-200 bg-white p-5">
        <div className="text-slate-600">Total</div>
        <div className="text-4xl font-bold text-navy-900">{money(total)}</div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {METHODS.map((m) => (
            <button key={m} onClick={() => setMethod(m)} className={`rounded-lg border px-2 py-2 text-sm font-medium ${method === m ? 'border-brand-blue bg-blue-50 text-brand-blue' : 'border-slate-300'}`}>{m}</button>
          ))}
        </div>
        <button onClick={cobrar} disabled={!cart.length} className="mt-4 w-full rounded-lg bg-brand-green py-3 text-lg font-bold text-white disabled:opacity-40">
          Cobrar (F12)
        </button>
        <button onClick={cancelar} className="mt-2 w-full rounded-lg border border-slate-300 py-2 font-medium text-slate-600">
          Cancelar (Esc)
        </button>
      </section>
    </div>
  )
}
