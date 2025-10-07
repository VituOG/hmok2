import { useEffect, useRef } from 'react'

type Stat = { label: string; value: number; suffix?: string; decimals?: number }

const STATS: Stat[] = [
	{ label: 'Tempo de boot', value: -45, suffix: '%' },
	{ label: 'Espaço liberado', value: 12, suffix: 'GB' },
	{ label: 'Apps otimizados', value: 150, suffix: '+' },
	{ label: 'Satisfação', value: 4.8, suffix: '★', decimals: 1 },
]

export default function StatsStrip() {
	return (
		<section aria-label="Métricas de desempenho" className="section">
			<div className="container grid grid-cols-2 gap-6 md:grid-cols-4">
				{STATS.map((s) => (
					<StatItem key={s.label} {...s} />
				))}
			</div>
		</section>
	)
}

function StatItem({ label, value, suffix, decimals = 0 }: Stat) {
	const ref = useRef<HTMLSpanElement>(null)
	useEffect(() => {
		const el = ref.current
		if (!el) return
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
		if (reduce.matches) {
			el.textContent = `${value.toFixed(decimals)}${suffix ?? ''}`
			return
		}
		let start = 0
		const end = value
		const startTs = performance.now()
		const duration = 1200
		const step = (ts: number) => {
			const p = Math.min(1, (ts - startTs) / duration)
			const cur = start + (end - start) * p
			el.textContent = `${cur.toFixed(decimals)}${suffix ?? ''}`
			if (p < 1) requestAnimationFrame(step)
		}
		requestAnimationFrame(step)
	}, [value, suffix])
	return (
		<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
			<span ref={ref} className="text-3xl font-semibold text-white" aria-label={label} />
			<p className="mt-2 text-sm text-slate-400">{label}</p>
		</div>
	)
}
