import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState } from 'react'

export default function Support() {
	const [status, setStatus] = useState<'idle'|'sent'>('idle')
	return (
		<main>
			<Navbar />
			<section className="section">
				<div className="container grid gap-10 md:grid-cols-2">
					<div>
						<h1 className="text-3xl font-semibold">Suporte</h1>
						<form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setStatus('sent') }}>
							<div>
								<label className="block text-sm">Nome</label>
								<input className="mt-1 w-full rounded-lg bg-white/5 p-3 outline-none ring-1 ring-white/10 focus:ring-cyan-300" required />
							</div>
							<div>
								<label className="block text-sm">Email</label>
								<input type="email" className="mt-1 w-full rounded-lg bg-white/5 p-3 outline-none ring-1 ring-white/10 focus:ring-cyan-300" required />
							</div>
							<div>
								<label className="block text-sm">Categoria</label>
								<select className="mt-1 w-full rounded-lg bg-white/5 p-3 outline-none ring-1 ring-white/10 focus:ring-cyan-300">
									<option>Instalação</option>
									<option>Licença</option>
									<option>Desempenho</option>
								</select>
							</div>
							<div>
								<label className="block text-sm">Mensagem</label>
								<textarea className="mt-1 h-28 w-full rounded-lg bg-white/5 p-3 outline-none ring-1 ring-white/10 focus:ring-cyan-300" />
							</div>
							<button className="btn-primary">Enviar</button>
							{status === 'sent' && <p className="text-ok mt-2 text-sm">Mensagem enviada!</p>}
						</form>
					</div>
					<div>
						<h2 className="text-2xl font-semibold">Base de conhecimento</h2>
						<div className="mt-4 space-y-3">
							<article className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
								<h3 className="font-medium">Verificar requisitos mínimos</h3>
								<p className="text-sm text-slate-400">Confirme memória, disco e versão do Windows.</p>
							</article>
							<article className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
								<h3 className="font-medium">Limpeza segura</h3>
								<p className="text-sm text-slate-400">Arquivos pessoais não são alterados.</p>
							</article>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</main>
	)
}
