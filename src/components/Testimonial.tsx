type Props = {
	name: string
	role?: string
	quote: string
}

export default function Testimonial({ name, role, quote }: Props) {
	return (
		<figure className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-md">
			<blockquote className="text-slate-300">“{quote}”</blockquote>
			<figcaption className="mt-4 text-sm text-slate-400">
				{name} {role ? `— ${role}` : ''}
			</figcaption>
		</figure>
	)
}
