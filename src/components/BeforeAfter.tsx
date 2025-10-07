import { useId, useState } from 'react'

type Props = { beforeSrc?: string; afterSrc?: string }

export default function BeforeAfter({ beforeSrc = '/og-image.svg', afterSrc = '/og-image.svg' }: Props) {
	const id = useId()
	const [value, setValue] = useState(50)
	return (
		<section className="section">
			<div className="container">
				<h3 className="text-2xl font-semibold">Antes e depois</h3>
				<div className="relative mt-4 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
					<img src={beforeSrc} alt="Antes" className="absolute inset-0 h-full w-full object-cover" />
					<div className="absolute inset-0 overflow-hidden" style={{ width: `${value}%` }}>
						<img src={afterSrc} alt="Depois" className="h-full w-full object-cover" />
					</div>
				</div>
				<label htmlFor={id} className="mt-3 block text-sm text-slate-400">Arraste para comparar</label>
				<input
					id={id}
					type="range"
					min={0}
					max={100}
					value={value}
					onChange={(e) => setValue(Number(e.target.value))}
					className="mt-1 w-full"
				/>
			</div>
		</section>
	)
}
