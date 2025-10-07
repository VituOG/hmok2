import { siteConfig } from '@/lib/config'

export default function Footer() {
	return (
		<footer className="mt-24 border-t border-white/10 py-10 text-sm text-slate-400" role="contentinfo">
			<div className="container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
				<p>© {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.</p>
				<div className="flex flex-wrap items-center gap-4">
					<span className="rounded-full bg-white/5 px-3 py-1">{siteConfig.version}</span>
					<span className="rounded-full bg-white/5 px-3 py-1">Feito com ♡</span>
				</div>
			</div>
		</footer>
	)
}
