import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ from '@/components/FAQ'

export default function Features() {
	return (
		<main>
			<Navbar />
			<section className="section">
				<div className="container">
					<h1 className="text-3xl font-semibold">Todos os recursos</h1>
					<ul className="mt-6 space-y-3 text-slate-300">
						<li id="clean">Limpeza inteligente</li>
						<li id="startup">Gerenciador de inicialização</li>
						<li id="defrag">Desfragmentação (HDD)</li>
						<li id="turbo">Modo Turbo</li>
					</ul>
				</div>
			</section>
			<FAQ />
			<Footer />
		</main>
	)
}
