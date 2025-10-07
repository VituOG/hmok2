type Locale = 'pt-BR' | 'en'

const messages: Record<Locale, Record<string, string>> = {
	'pt-BR': {
		loadingTitle: 'Carregando Hone Optimizer',
		loadingCaption: 'Preparando desempenho máximo…',
		skip: 'Pular animação',
		ctaPrimary: 'Baixar agora',
		ctaSecondary: 'Ver recursos',
	},
	en: {
		loadingTitle: 'Loading Hone Optimizer',
		loadingCaption: 'Preparing maximum performance…',
		skip: 'Skip animation',
		ctaPrimary: 'Download now',
		ctaSecondary: 'View features',
	},
}

export function t(key: string, locale: Locale = 'pt-BR') {
	return messages[locale][key] ?? key
}

export function getUserLocale(): Locale {
	try {
		const lang = navigator.language
		if (lang.toLowerCase().startsWith('pt')) return 'pt-BR'
		return 'en'
	} catch {
		return 'pt-BR'
	}
}
