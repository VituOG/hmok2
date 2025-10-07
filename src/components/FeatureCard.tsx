type Props = {
	title: string
	description: string
	icon?: React.ReactNode
}

export default function FeatureCard({ title, description, icon }: Props) {
	return (
		<article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-md transition hover:shadow-lg">
			<div className="mb-4 h-10 w-10 text-cyan-300">{icon}</div>
			<h3 className="text-lg font-semibold">{title}</h3>
			<p className="mt-2 text-sm text-slate-400">{description}</p>
		</article>
	)
}
