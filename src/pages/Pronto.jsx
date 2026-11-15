import { Construction } from 'lucide-react'

export default function Pronto({ title, etapa }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-24 text-center">
      <Construction size={44} className="text-slate-400" />
      <h1 className="mt-4 text-xl font-bold text-navy-900">{title}</h1>
      <p className="mt-1 text-slate-500">Este módulo se desarrolla en la etapa {etapa}.</p>
    </div>
  )
}
