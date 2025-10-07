import { createContext, useCallback, useContext, useMemo, useState } from 'react'

type ToastType = 'success' | 'error' | 'warning' | 'info'
type Toast = { id: number; message: string; type: ToastType; duration: number }

type ToastContextValue = {
	showToast: (message: string, type?: ToastType, duration?: number) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export function useToast() {
	const ctx = useContext(ToastContext)
	if (!ctx) throw new Error('useToast must be used within ToastProvider')
	return ctx
}

export default function ToastProvider({ children }: { children: React.ReactNode }) {
	const [toasts, setToasts] = useState<Toast[]>([])

	const showToast = useCallback((message: string, type: ToastType = 'info', duration = 5000) => {
		const id = Date.now() + Math.random()
		setToasts((prev) => [...prev, { id, message, type, duration }])
		window.setTimeout(() => {
			setToasts((prev) => prev.filter((t) => t.id !== id))
		}, duration)
	}, [])

	const value = useMemo(() => ({ showToast }), [showToast])

	return (
		<ToastContext.Provider value={value}>
			{children}
			<div className="toast-container">
				{toasts.map((t) => (
					<div key={t.id} className={`toast ${t.type}`}>
						<span className="toast-icon" aria-hidden>
							{t.type === 'success' ? '✅' : t.type === 'error' ? '❌' : t.type === 'warning' ? '⚠️' : 'ℹ️'}
						</span>
						<span className="toast-message">{t.message}</span>
						<button className="toast-close" onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}>×</button>
					</div>
				))}
			</div>
		</ToastContext.Provider>
	)
}


