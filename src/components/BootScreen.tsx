import { useEffect, useMemo, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { getUserLocale, t } from '@/lib/i18n'
import AnimatedGradient from './BackgroundFX/AnimatedGradient'

const SESSION_KEY = 'pulsex:splash:seen'

export default function BootScreen() {
	const navigate = useNavigate()
	const [done, setDone] = useState(false)
	const locale = useMemo(getUserLocale, [])

	useEffect(() => {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
		const seen = sessionStorage.getItem(SESSION_KEY)
		if (seen) {
			setDone(true)
			return
		}
		const duration = reduced.matches ? 400 : 2200
		const timer = setTimeout(() => {
			setDone(true)
			sessionStorage.setItem(SESSION_KEY, '1')
		}, duration)
		return () => clearTimeout(timer)
	}, [])

	if (done) return <Outlet />

	return (
		<div
			role="dialog"
			aria-label={t('loadingTitle', locale)}
			className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0f1a]"
		>
			<AnimatedGradient className="opacity-50" />
			<div className="container relative mx-auto flex max-w-xl flex-col items-center text-center">
				<h1 className="visually-hidden">{t('loadingTitle', locale)}</h1>
				<Logo />
				<p className="mt-6 text-slate-300">{t('loadingCaption', locale)}</p>
				<div
					className="mt-6 h-2 w-full overflow-hidden rounded-full bg-white/10"
					aria-hidden
				>
					<div
						className="h-full w-0 rounded-full bg-cyan-300"
						style={{ animation: 'progress 2.2s ease forwards' }}
					/>
				</div>
				<button
					type="button"
					className="btn-secondary mt-6"
					onClick={() => {
						sessionStorage.setItem(SESSION_KEY, '1')
						setDone(true)
					}}
				>
					{t('skip', locale)}
				</button>
			</div>
		</div>
	)
}

function Logo() {
	return (
		<div className="glow-pulse select-none">
			<svg
				width="120"
				height="120"
				viewBox="0 0 120 120"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden
			>
				<defs>
					<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
						<stop offset="0%" stopColor="#6ee7ff" />
						<stop offset="100%" stopColor="#a78bfa" />
					</linearGradient>
				</defs>
				<circle cx="60" cy="60" r="52" stroke="url(#g)" strokeWidth="6" />
				<path d="M40 68h40" stroke="url(#g)" strokeWidth="8" strokeLinecap="round" />
				<path d="M48 50h24" stroke="#6ee7ff" strokeWidth="6" strokeLinecap="round" />
			</svg>
		</div>
	)
}
