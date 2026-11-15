import { useState, useEffect } from 'react'
import { Calendar, ChevronDown, UserCircle, Database, Calculator } from 'lucide-react'
import Sidebar from './components/Sidebar'
import Inicio from './pages/Inicio'
import Ventas from './pages/Ventas'
import Stock from './pages/Stock'
import Pronto from './pages/Pronto'
import { seed } from './seed'
import { money } from './utils'

const KEY = 'mi-almacen-db-v1'
const USER = 'Brian'

const load = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || seed } catch { return seed }
}

const PRONTO = {
  compras: ['Compras', 2], cobranzas: ['Cobranzas', 3], pagos: ['Pagos', 3],
  caja: ['Caja', 3], reportes: ['Reportes', 4], config: ['Configuración', 4],
}

export default function App() {
  const [page, setPage] = useState('inicio')
  const [db, setDb] = useState(load)

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(db)) }, [db])

  const setProducts = (fn) => setDb((d) => ({ ...d, products: fn(d.products) }))

  // Una venta descuenta stock y registra el ingreso (flujo: ventas → inventario → caja).
  const sell = (items, method, total) =>
    setDb((d) => ({
      ...d,
      products: d.products.map((p) => {
        const i = items.find((x) => x.id === p.id)
        return i ? { ...p, stock: p.stock - i.qty } : p
      }),
      movements: [
        { id: Date.now(), type: 'Venta', label: `N° ${String(d.nextSale).padStart(6, '0')} (${method})`, date: new Date().toISOString(), amount: total },
        ...d.movements,
      ],
      nextSale: d.nextSale + 1,
    }))

  const sign = { Venta: 1, Cobro: 1, Compra: -1, Pago: -1 }
  const caja = db.movements.reduce((s, m) => s + sign[m.type] * m.amount, 150000)

  const today = new Date().toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="flex h-screen">
      <Sidebar page={page} go={setPage} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between px-5 py-3 md:px-6">
          <div className="flex items-center gap-2 text-slate-600"><Calendar size={20} /> <span className="capitalize">{today}</span></div>
          <div className="flex items-center gap-2 font-medium"><UserCircle size={30} /> {USER} <ChevronDown size={16} /></div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 pb-24 md:px-6 md:pb-6">
          {page === 'inicio' && <Inicio db={db} caja={caja} go={setPage} user={USER} />}
          {page === 'ventas' && <Ventas db={db} sell={sell} />}
          {page === 'stock' && <Stock db={db} setProducts={setProducts} />}
          {PRONTO[page] && <Pronto title={PRONTO[page][0]} etapa={PRONTO[page][1]} />}
        </main>

        <footer className="hidden items-center justify-between border-t border-slate-200 bg-slate-100 px-6 py-3 text-sm text-slate-600 md:flex">
          <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-green-500" /> Sistema conectado</span>
          <span className="flex items-center gap-2"><Calculator size={18} /> Caja actual: <b className="text-navy-900">{money(caja)}</b></span>
          <span className="flex items-center gap-2"><Database size={18} /> Base de datos: Local</span>
        </footer>
      </div>
    </div>
  )
}
