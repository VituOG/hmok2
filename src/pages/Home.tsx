import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import FeatureCard from '@/components/FeatureCard'
import StatsStrip from '@/components/StatsStrip'
import CTASection from '@/components/CTASection'
import FAQ from '@/components/FAQ'
import Testimonial from '@/components/Testimonial'
import BeforeAfter from '@/components/BeforeAfter'
import PerformanceSimulator from '@/components/PerformanceSimulator'
import AnimatedCounters from '@/components/AnimatedCounters'

export default function Home() {
	return (
		<main>
			<Navbar />
			<Hero />
			<AnimatedCounters />
			<StatsStrip />
			<section id="features" className="section">
				<div className="container">
					<h3 className="text-2xl font-semibold">Recursos principais</h3>
					<div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
						<FeatureCard title="Limpeza Inteligente" description="Remove arquivos temporários e cache oculto." />
						<FeatureCard title="Gerenciador de Inicialização" description="Desativa apps que atrasam o boot." />
						<FeatureCard title="Desfragmentação" description="Melhora acesso a disco (HDD)." />
						<FeatureCard title="Modo Turbo" description="Prioriza jogos e apps pesados." />
					</div>
				</div>
			</section>

			<PerformanceSimulator />

			<BeforeAfter />

			<section className="section">
				<div className="container grid gap-6 md:grid-cols-3">
					<Testimonial name="Ana" role="Android 12" quote="Meu celular liga muito mais rápido agora!" />
					<Testimonial name="Carlos" role="Android 11" quote="Liberei 15 GB em poucos minutos." />
					<Testimonial name="Rafa" role="Android 13" quote="O modo turbo ajuda nos jogos." />
				</div>
			</section>

			<FAQ />
			<CTASection />
			<Footer />
		</main>
	)
}
