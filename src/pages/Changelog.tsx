import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const ITEMS = [
	{ v: 'v1.0.0', date: '2025-08-20', notes: ['feat: primeira versão do site', 'perf: animações leves', 'a11y: suporta prefers-reduced-motion'] },
]

export default function Changelog() {
	return (
		<main>
			<Navbar />
			<section className="section">
				<div className="container">
					<h1 className="text-3xl font-semibold">Changelog</h1>
					<ol className="mt-6 space-y-4">
						{ITEMS.map((it) => (
							<li key={it.v} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
								<header className="flex items-center justify-between">
									<time className="text-slate-400">{it.date}</time>
									<span className="rounded-full bg-white/5 px-3 py-1">{it.v}</span>
								</header>
								<ul className="mt-3 list-disc pl-6 text-slate-300">
									{it.notes.map((n) => (
										<li key={n}>{n}</li>
									))}
								</ul>
							</li>
						))}
					</ol>
				</div>
			</section>
			<Footer />
		</main>
	)
}
