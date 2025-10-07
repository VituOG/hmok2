import { memo, useEffect } from 'react'

type Props = { className?: string }

function GlowBlobsBase({ className }: Props) {
	useEffect(() => {
		const mediaReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
		const isMobile = window.matchMedia('(max-width: 768px)')
		if (mediaReduce.matches || isMobile.matches) return
		const onScroll = () => {
			const y = window.scrollY || 0
			document.documentElement.style.setProperty('--scrollY', String(y))
		}
		window.addEventListener('scroll', onScroll, { passive: true })
		onScroll()
		return () => window.removeEventListener('scroll', onScroll)
	}, [])
	return (
		<div
			aria-hidden
			className={
				`pointer-events-none absolute inset-0 -z-10 ${className ?? ''}`
			}
			style={{
				mixBlendMode: 'screen',
				filter: 'blur(40px) saturate(1.2)',
			}}
		>
			<div
				className="absolute -top-24 left-1/4 h-[420px] w-[420px] rounded-full"
				style={{
					background:
						'radial-gradient(circle at 50% 50%, rgba(167,139,250,0.55), transparent 60%)',
					transform:
						'translateZ(0) translateY(calc(var(--scrollY, 0px) * 0.02))',
				}}
			/>
			<div
				className="absolute bottom-0 right-1/5 h-[520px] w-[520px] rounded-full"
				style={{
					background:
						'radial-gradient(circle at 50% 50%, rgba(34,211,238,0.45), transparent 60%)',
					transform:
						'translateZ(0) translateY(calc(var(--scrollY, 0px) * -0.02))',
				}}
			/>
		</div>
	)
}

export default memo(GlowBlobsBase)
