import { Home, ShoppingCart, ShoppingBasket, Handshake, CreditCard, Calculator, Package, BarChart3, Settings, LogOut, Store } from 'lucide-react'

export const NAV = [
  { id: 'inicio', label: 'Inicio', icon: Home },
  { id: 'compras', label: 'Compras', icon: ShoppingCart },
  { id: 'ventas', label: 'Ventas', icon: ShoppingBasket },
  { id: 'cobranzas', label: 'Cobranzas', icon: Handshake },
  { id: 'pagos', label: 'Pagos', icon: CreditCard },
  { id: 'caja', label: 'Caja', icon: Calculator },
  { id: 'stock', label: 'Stock', icon: Package },
  { id: 'reportes', label: 'Reportes', icon: BarChart3 },
  { id: 'config', label: 'Configuración', icon: Settings },
]

export default function Sidebar({ page, go }) {
  return (
    <>
      <aside className="hidden md:flex w-60 shrink-0 flex-col bg-navy-900 text-white">
        <div className="flex items-center gap-3 px-5 py-5">
          <Store size={34} />
          <div>
            <div className="text-xl font-bold leading-tight">Mi Almacén</div>
            <div className="text-[11px] text-slate-300">Gestión simple y eficiente</div>
          </div>
        </div>
        <nav className="mt-2 flex-1 space-y-1 px-3">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => go(id)}
              className={`flex w-full items-center gap-4 rounded-lg px-4 py-3 text-left text-[15px] font-medium transition-colors ${
                page === id ? 'bg-brand-blue' : 'text-slate-200 hover:bg-navy-700'
              }`}
            >
              <Icon size={22} /> {label}
            </button>
          ))}
        </nav>
        <button className="m-3 flex items-center gap-3 border-t border-white/10 px-4 py-4 text-slate-200 hover:text-white">
          <LogOut size={20} /> Cerrar sesión
        </button>
      </aside>

      <nav className="md:hidden fixed bottom-0 inset-x-0 z-20 flex overflow-x-auto bg-navy-900 text-white">
        {NAV.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => go(id)}
            className={`flex min-w-[72px] flex-1 flex-col items-center gap-1 px-2 py-2 text-[11px] ${
              page === id ? 'bg-brand-blue' : 'text-slate-300'
            }`}
          >
            <Icon size={20} /> {label}
          </button>
        ))}
      </nav>
    </>
  )
}
