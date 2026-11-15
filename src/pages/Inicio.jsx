import { ShoppingCart, ShoppingBasket, Handshake, CreditCard, Package, BarChart3, Wallet, AlertTriangle, History, Bell, TrendingUp } from 'lucide-react'
import { money, fmtDateTime, isThisMonth, stockLevel } from '../utils'

const ACTIONS = [
  { label: 'Nueva Compra', icon: ShoppingCart, to: 'compras', bg: 'bg-brand-blue' },
  { label: 'Nueva Venta', icon: ShoppingBasket, to: 'ventas', bg: 'bg-brand-green' },
  { label: 'Registrar Cobro', icon: Handshake, to: 'cobranzas', bg: 'bg-brand-orange' },
  { label: 'Registrar Pago', icon: CreditCard, to: 'pagos', bg: 'bg-brand-purple' },
  { label: 'Actualizar Stock', icon: Package, to: 'stock', bg: 'bg-brand-teal' },
  { label: 'Ver Reportes', icon: BarChart3, to: 'reportes', bg: 'bg-brand-dark' },
]

const BADGE = {
  Venta: 'bg-green-100 text-green-700',
  Compra: 'bg-blue-100 text-blue-700',
  Cobro: 'bg-orange-100 text-orange-700',
  Pago: 'bg-purple-100 text-purple-700',
}

export default function Inicio({ db, caja, go, user }) {
  const month = (t) => db.movements.filter((m) => m.type === t && isThisMonth(m.date)).reduce((s, m) => s + m.amount, 0)
  const alerts = db.products.filter((p) => stockLevel(p) !== 'ok').sort((a, b) => a.stock - b.stock)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between overflow-hidden rounded-xl bg-gradient-to-r from-sky-100 to-blue-50 px-6 py-6 md:py-8">
        <div>
          <h1 className="text-2xl font-bold text-navy-900 md:text-3xl">¡Bienvenido, {user}!</h1>
          <p className="mt-1 text-slate-600">Resumen de tu negocio hoy</p>
        </div>
        <div className="text-6xl md:text-7xl" aria-hidden>🏪</div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
        {ACTIONS.map(({ label, icon: Icon, to, bg }) => (
          <button key={to} onClick={() => go(to)} className={`${bg} flex h-28 flex-col items-center justify-center gap-2 rounded-xl px-2 text-center font-semibold text-white shadow-sm transition hover:brightness-110`}>
            <Icon size={34} />
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat title="Ventas del Mes" value={money(month('Venta'))} icon={<TrendingUp className="text-brand-green" />} />
        <Stat title="Compras del Mes" value={money(month('Compra'))} icon={<TrendingUp className="text-brand-blue" />} />
        <Stat title="Saldo en Caja" value={money(caja)} icon={<Wallet className="text-brand-orange" />} />
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-slate-600">Stock Bajo</div>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-2xl font-bold text-red-600">{alerts.length} productos</span>
            <AlertTriangle className="text-red-500" size={30} />
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <header className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold text-navy-900"><History size={20} /> Movimientos Recientes</h2>
          </header>
          <ul className="divide-y divide-slate-100">
            {db.movements.slice(0, 6).map((m) => (
              <li key={m.id} className="flex items-center gap-3 py-2.5 text-sm">
                <span className={`w-20 shrink-0 rounded-full px-3 py-1 text-center font-semibold ${BADGE[m.type]}`}>{m.type}</span>
                <span className="min-w-0 flex-1 truncate">{m.label}</span>
                <span className="hidden text-slate-500 sm:block">{fmtDateTime(m.date)}</span>
                <span className="w-24 text-right font-semibold">{money(m.amount)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <header className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold text-navy-900"><Bell size={20} className="text-amber-500" /> Alertas de Stock</h2>
            <button onClick={() => go('stock')} className="text-sm font-medium text-brand-blue">Ver stock →</button>
          </header>
          {alerts.length === 0 && <p className="py-6 text-center text-slate-500">Todo el stock está en orden.</p>}
          <ul className="divide-y divide-slate-100">
            {alerts.slice(0, 4).map((p) => (
              <li key={p.id} className="flex items-center gap-3 py-3">
                <span className="text-3xl">{p.emoji || '📦'}</span>
                <div className="flex-1">
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-sm text-red-600">Stock: {p.stock} u.</div>
                </div>
                <span className={`rounded-full px-4 py-1 text-sm font-semibold ${stockLevel(p) === 'critico' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-700'}`}>
                  {stockLevel(p) === 'critico' ? 'Crítico' : 'Bajo'}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

function Stat({ title, value, icon }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="text-slate-600">{title}</div>
      <div className="mt-1 flex items-center justify-between">
        <span className="text-2xl font-bold text-navy-900">{value}</span>
        {icon}
      </div>
    </div>
  )
}
