import { useState } from 'react'
import { Plus, Trash2, Search } from 'lucide-react'
import { money, stockLevel } from '../utils'

const EMPTY = { name: '', barcode: '', category: '', cost: '', price: '', stock: '', min: '5' }

export default function Stock({ db, setProducts }) {
  const [q, setQ] = useState('')
  const [form, setForm] = useState(null)

  const list = db.products.filter((p) =>
    [p.name, p.code, p.barcode, p.category].join(' ').toLowerCase().includes(q.toLowerCase()))

  const save = (e) => {
    e.preventDefault()
    const n = db.products.length + 1
    setProducts((ps) => [...ps, {
      id: Date.now(), code: `PROD-${String(n).padStart(3, '0')}`, emoji: '📦',
      name: form.name, barcode: form.barcode, category: form.category,
      cost: +form.cost, price: +form.price, stock: +form.stock, min: +form.min,
    }])
    setForm(null)
  }

  const adjust = (id, d) => setProducts((ps) => ps.map((p) => (p.id === id ? { ...p, stock: Math.max(0, p.stock + d) } : p)))
  const remove = (id) => confirm('¿Eliminar este producto?') && setProducts((ps) => ps.filter((p) => p.id !== id))

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-xl font-bold text-navy-900">Stock</h1>
        <div className="relative ml-auto min-w-[200px] flex-1 md:max-w-xs">
          <Search size={18} className="absolute left-3 top-2.5 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar producto" className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 outline-none focus:border-brand-blue" />
        </div>
        <button onClick={() => setForm(EMPTY)} className="flex items-center gap-2 rounded-lg bg-brand-teal px-4 py-2 font-semibold text-white"><Plus size={18} /> Agregar producto</button>
      </div>

      {form && (
        <form onSubmit={save} className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
          {[['name', 'Nombre'], ['barcode', 'Código de barras'], ['category', 'Categoría'], ['cost', 'Costo'], ['price', 'Precio de venta'], ['stock', 'Stock actual'], ['min', 'Stock mínimo']].map(([k, label]) => (
            <label key={k} className="text-sm text-slate-600">
              {label}
              <input required={k !== 'barcode' && k !== 'category'} type={['cost', 'price', 'stock', 'min'].includes(k) ? 'number' : 'text'} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800" />
            </label>
          ))}
          <div className="flex items-end gap-2">
            <button className="rounded-lg bg-brand-green px-4 py-2 font-semibold text-white">Guardar producto</button>
            <button type="button" onClick={() => setForm(null)} className="rounded-lg border px-4 py-2">Cancelar</button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>{['Producto', 'Código', 'Costo', 'Precio', 'Stock', 'Estado', ''].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {list.map((p) => {
              const lv = stockLevel(p)
              return (
                <tr key={p.id}>
                  <td className="px-4 py-3 font-medium">{p.emoji} {p.name}<div className="text-xs text-slate-500">{p.category}</div></td>
                  <td className="px-4 py-3 text-slate-500">{p.barcode || p.code}</td>
                  <td className="px-4 py-3">{money(p.cost)}</td>
                  <td className="px-4 py-3">{money(p.price)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => adjust(p.id, -1)} className="rounded border px-2">−</button>
                      <span className="w-8 text-center font-semibold">{p.stock}</span>
                      <button onClick={() => adjust(p.id, 1)} className="rounded border px-2">+</button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${lv === 'critico' ? 'bg-red-100 text-red-600' : lv === 'bajo' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                      {lv === 'critico' ? 'Crítico' : lv === 'bajo' ? 'Bajo' : 'OK'}
                    </span>
                  </td>
                  <td className="px-4 py-3"><button aria-label="Eliminar" onClick={() => remove(p.id)} className="text-red-500"><Trash2 size={18} /></button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
