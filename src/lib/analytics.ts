export function track(event: string, data?: Record<string, unknown>) {
	// Trocar por seu provedor real (PostHog, GA4, etc.)
	try {
		console.debug('[analytics]', event, data)
	} catch {
		/* noop */
	}
}

export function trackDownloadClick(label: string) {
	track('download_click', { label, ts: Date.now() })
}
