import { useEffect, useState } from 'react'

export default function ThemeToggle() {
	const [theme, setTheme] = useState<'light' | 'dark'>(() => {
		if (typeof window === 'undefined') return 'light'
		const saved = localStorage.getItem('pulsex-theme') as 'light' | 'dark' | null
		if (saved) return saved
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	})

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme)
		localStorage.setItem('pulsex-theme', theme)
	}, [theme])

	return (
		<button
			className="theme-toggle"
			title={theme === 'dark' ? 'Tema escuro' : 'Tema claro'}
			onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
		>
			{theme === 'dark' ? (
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
					<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			) : (
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
					<circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
					<path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
				</svg>
			)}
		</button>
	)
}


