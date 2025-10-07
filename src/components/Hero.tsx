import AnimatedGradient from './BackgroundFX/AnimatedGradient'
import GlowBlobs from './BackgroundFX/GlowBlobs'
import { Link } from 'react-router-dom'

export default function Hero() {
	return (
		<section className="section relative min-h-[90vh] md:min-h-[200vh]">
			<AnimatedGradient />
			<GlowBlobs />
			<div className="container relative z-10 flex flex-col items-center pt-28 text-center">
				<h2 className="heading-hero">Acelere o seu PC com um clique</h2>
				<p className="sub-hero mt-4 max-w-2xl">
					Limpeza profunda, inicialização mais rápida e desempenho estável — tudo em minutos.
				</p>
				<div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
					<Link to="/download" className="btn-primary">Baixar agora</Link>
					<a href="#features" className="btn-secondary">Ver recursos</a>
				</div>
				<div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-300">
					<span className="rounded-full bg-white/5 px-3 py-1">+2M de downloads</span>
					<span className="rounded-full bg-white/5 px-3 py-1">Compatível com Windows 10/11</span>
				</div>
			</div>
		</section>
	)
}
