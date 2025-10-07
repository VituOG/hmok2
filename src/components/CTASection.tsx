import { Link } from 'react-router-dom'

export default function CTASection() {
	return (
		<section className="section">
			<div className="container flex flex-col items-center rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-10 text-center">
				<h3 className="text-2xl font-semibold">Pronto para destravar desempenho?</h3>
				<Link to="/download" className="btn-primary mt-4">Baixar agora</Link>
			</div>
		</section>
	)
}
