import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState } from 'react'

export default function Pricing() {
	const [annual, setAnnual] = useState(true)
	return (
		<main>
			<Navbar />
			<section className="section">
				<div className="container">
					<div className="flex items-center justify-between">
						<h1 className="text-3xl font-semibold">Preços</h1>
						<label className="flex items-center gap-2 text-sm">
							<span>Mensal</span>
							<input type="checkbox" checked={annual} onChange={(e) => setAnnual(e.target.checked)} aria-label="Cobrança anual com 10% off" />
							<span>Anual (10% off)</span>
						</label>
					</div>
					<div className="mt-6 grid gap-6 md:grid-cols-3">
						<Card title="Free" price={annual ? 'R$0' : 'R$0'} features={["Limpeza básica","Atualizações manuais"]} cta="Começar"/>
						<Card title="Pro" highlight price={annual ? 'R$89/ano' : 'R$9/mês'} features={["Limpeza profunda","Modo Turbo","Suporte prioritário"]} cta="Assinar"/>
						<Card title="Enterprise" price={annual ? 'Sob consulta' : 'Sob consulta'} features={["Licenciamento volume","Suporte dedicado"]} cta="Contato"/>
					</div>
				</div>
			</section>
			<Footer />
		</main>
	)
}

type CardProps = { title: string; price: string; features: string[]; cta: string; highlight?: boolean }
function Card({ title, price, features, cta, highlight }: CardProps) {
	return (
		<div className={`rounded-2xl border p-6 ${highlight ? 'border-cyan-300/50 bg-cyan-300/10' : 'border-white/10 bg-white/[0.03]'}`}>
			<h3 className="text-xl font-semibold">{title}</h3>
			<p className="mt-2 text-3xl font-bold">{price}</p>
			<ul className="mt-4 space-y-2 text-sm text-slate-300">
				{features.map((f) => (
					<li key={f}>• {f}</li>
				))}
			</ul>
			<button className="btn-primary mt-6 w-full">{cta}</button>
		</div>
	)
}
