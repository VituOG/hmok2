import { RouteObject } from 'react-router-dom'
import Home from '@/pages/Home'
import Features from '@/pages/Features'
import Download from '@/pages/Download'
import Pricing from '@/pages/Pricing'
import Changelog from '@/pages/Changelog'
import Support from '@/pages/Support'

const routes: RouteObject[] = [
	{ path: '/', element: <Home /> },
	{ path: '/features', element: <Features /> },
	{ path: '/download', element: <Download /> },
	{ path: '/pricing', element: <Pricing /> },
	{ path: '/changelog', element: <Changelog /> },
	{ path: '/support', element: <Support /> },
]

export default routes
