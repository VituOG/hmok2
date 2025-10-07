import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { siteConfig } from '@/lib/config'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false)
	const [open, setOpen] = useState(false)
	const panelRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const onScroll = () => setScrolled((window.scrollY || 0) > 8)
		window.addEventListener('scroll', onScroll, { passive: true })
		onScroll()
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	useEffect(() => {
		if (!open) return
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setOpen(false)
		}
		document.addEventListener('keydown', onKey)
		return () => document.removeEventListener('keydown', onKey)
	}, [open])

	useEffect(() => {
		document.body.classList.toggle('menu-open', open)
		return () => document.body.classList.remove('menu-open')
	}, [open])

	return (
		<header
			className={`fixed inset-x-0 top-0 z-40 transition ${
				scrolled ? 'bg-[var(--surface)]/80 backdrop-blur supports-[backdrop-filter]:bg-[var(--surface)]/60' : 'bg-transparent'
			}`}
			role="banner"
		>
			<nav className="container flex h-16 items-center justify-between" aria-label="Primary">
				<Link to="/" className="font-semibold">
					{siteConfig.name}
				</Link>
				<div className="hidden gap-6 md:flex">
					<NavLink to="/" className={({ isActive }) => isActive ? 'text-cyan-300' : 'text-slate-300 hover:text-white'}>Home</NavLink>
					<NavLink to="/features" className={({ isActive }) => isActive ? 'text-cyan-300' : 'text-slate-300 hover:text-white'}>Recursos</NavLink>
					<NavLink to="/download" className={({ isActive }) => isActive ? 'text-cyan-300' : 'text-slate-300 hover:text-white'}>Download</NavLink>
					<NavLink to="/pricing" className={({ isActive }) => isActive ? 'text-cyan-300' : 'text-slate-300 hover:text-white'}>Preços</NavLink>
					<NavLink to="/changelog" className={({ isActive }) => isActive ? 'text-cyan-300' : 'text-slate-300 hover:text-white'}>Changelog</NavLink>
					<NavLink to="/support" className={({ isActive }) => isActive ? 'text-cyan-300' : 'text-slate-300 hover:text-white'}>Suporte</NavLink>
				</div>
				<div className="hidden items-center gap-3 md:flex">
					<ThemeToggle />
					<Link to="/download" className="btn-primary">Baixar agora</Link>
				</div>
				<button
					className="md:hidden rounded-lg p-2 ring-1 ring-white/10"
					aria-expanded={open}
					aria-controls="mobile-menu"
					onClick={() => setOpen((v) => !v)}
				>
					<span className="sr-only">Abrir menu</span>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2"/>
					</svg>
				</button>
			</nav>
			{/* Mobile panel */}
			{open && (
				<div id="mobile-menu" ref={panelRef} className="md:hidden bg-[var(--surface)]/95 backdrop-blur">
					<div className="container py-3">
						<div className="flex flex-col gap-3 text-lg">
							<NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
							<NavLink to="/features" onClick={() => setOpen(false)}>Recursos</NavLink>
							<NavLink to="/download" onClick={() => setOpen(false)}>Download</NavLink>
							<NavLink to="/pricing" onClick={() => setOpen(false)}>Preços</NavLink>
							<NavLink to="/changelog" onClick={() => setOpen(false)}>Changelog</NavLink>
							<NavLink to="/support" onClick={() => setOpen(false)}>Suporte</NavLink>
							<Link to="/download" className="btn-primary mt-2 w-full" onClick={() => setOpen(false)}>Baixar agora</Link>
						</div>
					</div>
				</div>
			)}
		</header>
	)
}
