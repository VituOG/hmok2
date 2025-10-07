import { useState } from 'react'

type QA = { q: string; a: string }

const ITEMS: QA[] = [
	{ q: 'Como funciona a limpeza inteligente?', a: 'Varremos caches e temporários com segurança, preservando seus dados.' },
	{ q: 'É compatível com Windows 10/11?', a: 'Sim, totalmente suportado em Windows 10 e 11 (x64).' },
	{ q: 'Tenho garantia?', a: 'Sim, 7 dias de garantia no plano Pro.' },
]

export default function FAQ() {
	return (
		<section className="section">
			<div className="container">
				<h3 className="text-2xl font-semibold">Perguntas frequentes</h3>
				<div className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03]">
					{ITEMS.map((it) => (
						<Item key={it.q} {...it} />
						))}
				</div>
			</div>
		</section>
	)
}

function Item({ q, a }: QA) {
	const [open, setOpen] = useState(false)
	return (
		<div>
			<button
				className="flex w-full items-center justify-between p-4 text-left hover:bg-white/5"
				aria-expanded={open}
				onClick={() => setOpen((v) => !v)}
			>
				<span className="font-medium">{q}</span>
				<span aria-hidden>{open ? '−' : '+'}</span>
			</button>
			{open && <div className="px-4 pb-4 text-slate-400">{a}</div>}
		</div>
	)
}
