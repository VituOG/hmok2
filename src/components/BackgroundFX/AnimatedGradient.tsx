import { memo } from 'react'

type Props = {
	className?: string
}

function AnimatedGradientBase({ className }: Props) {
	return (
		<div
			aria-hidden
			className={
				`pointer-events-none absolute inset-0 -z-10 animated-gradient opacity-[0.6]` +
				(className ? ` ${className}` : '')
			}
		/>
	)
}

export default memo(AnimatedGradientBase)
