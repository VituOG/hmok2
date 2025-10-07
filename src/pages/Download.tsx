import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { trackDownloadClick } from '@/lib/analytics'

export default function Download() {
	const href = '/downloads/pulsex-setup.exe'
	return (
		<main>
			<Navbar />
			<section className="section">
				<div className="container">
					<h1 className="text-3xl font-semibold">Download</h1>
					<p className="mt-2 text-slate-400">Compatível com Windows 10/11 (x64).</p>
					<a
						href={href}
						className="btn-primary mt-6 inline-flex"
						download
						onClick={() => trackDownloadClick('windows_exe')}
					>
						Baixar PulseX
					</a>
					<div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">
						<p>Checksum (SHA256): <code className="break-all">0000000000000000000000000000000000000000000000000000000000000000</code></p>
						<p className="mt-2">Requisitos: 2 GB RAM, 200 MB de espaço, Internet para atualizações.</p>
						<ol className="mt-2 list-decimal pl-5">
							<li>Baixe o instalador.</li>
							<li>Execute como administrador.</li>
							<li>Siga as instruções na tela.</li>
						</ol>
					</div>
				</div>
			</section>
			<Footer />
		</main>
	)
}
