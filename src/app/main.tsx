import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom'
import routes from './routes'
import '@/styles/globals.css'
import ToastProvider from '@/components/ToastProvider'

const router = createBrowserRouter(routes)


function UsabilityRoot({ children }: { children: React.ReactNode }) {
	return (
		<ToastProvider>
			<ScrollToTop />
			<A11yAnnouncer />
			{children}
		</ToastProvider>
	)
}

function ScrollToTop() {
	const location = useLocation()
	React.useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [location.pathname])
	return null
}

function A11yAnnouncer() {
	const location = useLocation()
	const [message, setMessage] = React.useState('')
	React.useEffect(() => {
		const title = document.title || 'Página'
		setMessage(`Navegou para ${title}`)
	}, [location.pathname])
	return (
		<div aria-live="polite" aria-atomic="true" className="sr-only">{message}</div>
	)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<UsabilityRoot>
			<RouterProvider router={router} />
		</UsabilityRoot>
	</React.StrictMode>,
)
