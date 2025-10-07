// Função auto-executável com verificação de DOM
(function() {
	// Função para inicializar quando o DOM estiver pronto
	function init() {
		// Verificação de segurança adicional
		if (!document.body) {
			console.error('document.body não está disponível, tentando novamente...')
			setTimeout(init, 100)
			return
		}
		
		console.log('DOM pronto, inicializando...')
		
		// Boot Screen
		(function () {
			// Check if user is logged in and should see boot screen
			const shouldShowBoot = localStorage.getItem('pulsex_show_boot') === 'true'
			const userData = localStorage.getItem('pulsex_user') || sessionStorage.getItem('pulsex_user')
			
			if (!shouldShowBoot || !userData) {
				// No boot screen needed, remove overlay
				const bootOverlay = document.querySelector('.boot')
				if (bootOverlay) {
					bootOverlay.remove()
				}
				return
			}
			
			// Clear the flag
			localStorage.removeItem('pulsex_show_boot')
			
			// Parse user data
			let user
			try {
				user = JSON.parse(userData)
			} catch (e) {
				console.error('Invalid user data:', e)
				return
			}
			
			// Show welcome message for new users
			if (user.isNewUser) {
				const welcomeMsg = document.querySelector('.boot .welcome')
				if (welcomeMsg) {
					welcomeMsg.textContent = `Bem-vindo, ${user.name || user.email}!`
				}
			}
			
			const overlay = document.querySelector('.boot')
			const skipBtn = overlay?.querySelector('.skip')
			const progressBar = overlay?.querySelector('.bar .fill')
			
			if (!overlay || !skipBtn || !progressBar) return
			
			// Set accessibility attributes
			overlay.setAttribute('role', 'dialog')
			overlay.setAttribute('aria-modal', 'true')
			overlay.setAttribute('aria-label', 'Tela de inicialização do PulseX')
			
			// Focus management
			skipBtn.focus()
			
			// Prevent body scrolling
			if (document.body) {
				document.body.classList.add('boot-open')
			}
			
			// Progress bar animation
			const duration = 3000 // 3 seconds
			const startTime = performance.now()
			
			function updateProgress(currentTime) {
				const elapsed = currentTime - startTime
				const progress = Math.min(elapsed / duration, 1)
				
				progressBar.style.width = `${progress * 100}%`
				
				if (progress < 1) {
					requestAnimationFrame(updateProgress)
				} else {
					// Animation complete
					setTimeout(() => {
						overlay.classList.add('fade-out')
						setTimeout(() => {
							overlay.remove()
							if (document.body) {
								document.body.classList.remove('boot-open')
							}
							
							// Show welcome toast for new users
							if (user.isNewUser) {
								showToast('Bem-vindo ao PulseX!', 'Sua conta foi criada com sucesso. Comece a otimizar seu PC!', 'success', 8000)
							} else {
								showToast('Bem-vindo de volta!', 'Login realizado com sucesso', 'success')
							}
						}, 500)
					}, 500)
				}
			}
			
			// Start progress animation
			requestAnimationFrame(updateProgress)
			
			// Skip button functionality
			skipBtn.addEventListener('click', (e) => {
				e.preventDefault()
				e.stopPropagation()
				console.log('Skip button clicked')
				
				overlay.classList.add('fade-out')
				setTimeout(() => {
					overlay.remove()
					if (document.body) {
						document.body.classList.remove('boot-open')
					}
				}, 500)
			})
			
			// ESC key to skip
			document.addEventListener('keydown', (e) => {
				if (e.key === 'Escape' && overlay.parentNode) {
					console.log('ESC key pressed')
					
					overlay.classList.add('fade-out')
					setTimeout(() => {
						overlay.remove()
						if (document.body) {
							document.body.classList.remove('boot-open')
						}
					}, 500)
				}
			})
		})()

		// Navbar scroll state
		(function () {
			const header = document.querySelector('.site-header')
			if (!header) return
			const onScroll = () => {
				header.classList.toggle('scrolled', (window.scrollY || 0) > 8)
			}
			window.addEventListener('scroll', onScroll, { passive: true })
			onScroll()

			// Destaca link ativo nas páginas estáticas
			try {
				const path = location.pathname.replace(/\\+/g, '/').split('/').pop() || 'index.html'
				document.querySelectorAll('.nav-links a, .app-tabbar a').forEach((a) => {
					const href = a.getAttribute('href')
					if (!href) return
					const hrefFile = href.split('/').pop()
					const isActive = hrefFile === path || (path === 'index.html' && (href === '/' || hrefFile === 'index.html'))
					if (isActive) {
						a.setAttribute('aria-current', 'page')
					}
				})
			} catch {}
		})()

		// Mobile menu
		(function () {
			const btn = document.getElementById('menu-toggle')
			const panel = document.getElementById('mobile-menu')
			if (!btn || !panel) return
			panel.setAttribute('aria-hidden', 'true')
			const focusable = () => panel.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')
			const openMenu = () => {
				panel.removeAttribute('aria-hidden')
				panel.dataset.state = 'opening'
				panel.removeAttribute('hidden')
				btn.setAttribute('aria-expanded', 'true')
				if (document.body) document.body.classList.add('menu-open')
				const onOpened = () => {
					panel.removeAttribute('data-state')
					panel.removeEventListener('animationend', onOpened)
				}
				panel.addEventListener('animationend', onOpened)
				const f = focusable()
				if (f.length) /** @type {HTMLElement} */(f[0]).focus()
			}
			const closeMenu = () => {
				panel.dataset.state = 'closing'
				panel.setAttribute('aria-hidden', 'true')
				btn.setAttribute('aria-expanded', 'false')
				if (document.body) document.body.classList.remove('menu-open')
				const onClosed = () => {
					panel.setAttribute('hidden', '')
					panel.removeAttribute('data-state')
					panel.removeEventListener('animationend', onClosed)
				}
				panel.addEventListener('animationend', onClosed)
			}
			btn.addEventListener('click', () => {
				const isOpen = panel.hasAttribute('hidden') === false
				isOpen ? closeMenu() : openMenu()
			})
			panel.addEventListener('keydown', (e) => {
				if (e.key !== 'Tab') return
				const items = focusable()
				if (!items.length) return
				const first = items[0]
				const last = items[items.length - 1]
				if (e.shiftKey && document.activeElement === first) {
					e.preventDefault()
					/** @type {HTMLElement} */(last).focus()
				} else if (!e.shiftKey && document.activeElement === last) {
					e.preventDefault()
					/** @type {HTMLElement} */(first).focus()
				}
			})
			panel.addEventListener('click', (e) => {
				const target = e.target
				if (target instanceof HTMLAnchorElement) {
					closeMenu()
				}
			})
			// Fechar com ESC
			document.addEventListener('keydown', (e) => {
				if (e.key === 'Escape' && panel.hasAttribute('hidden') === false) {
					e.preventDefault()
					closeMenu()
					btn.focus()
				}
			})
			// Clique fora fecha o menu
			document.addEventListener('click', (e) => {
				if (panel.hasAttribute('hidden')) return
				const target = e.target
				if (!(target instanceof Node)) return
				if (!panel.contains(target) && target !== btn) {
					closeMenu()
				}
			})
		})()

		// Count-up stats
		(function () {
			const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
			const els = document.querySelectorAll('.stat-value')
			const animate = (el) => {
				const target = parseFloat(el.getAttribute('data-count') || '0')
				const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10)
				const suffix = el.getAttribute('data-suffix') || ''
				if (reduce) {
					el.textContent = target.toFixed(decimals) + suffix
					return
				}
				const start = 0
				const startTs = performance.now()
				const duration = 1200
				const step = (ts) => {
					const p = Math.min(1, (ts - startTs) / duration)
					const cur = start + (target - start) * p
					el.textContent = cur.toFixed(decimals) + suffix
					if (p < 1) requestAnimationFrame(step)
				}
				requestAnimationFrame(step)
			}
			if ('IntersectionObserver' in window) {
				const io = new IntersectionObserver((entries, obs) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							animate(entry.target)
							obs.unobserve(entry.target)
						}
					})
				}, { threshold: 0.4 })
				els.forEach((el) => io.observe(el))
			} else {
				els.forEach((el) => animate(el))
			}
		})()

		// Before/After range
		(function () {
			const range = document.getElementById('ba-range')
			const after = document.getElementById('ba-after')
			if (!range || !after) return
			range.addEventListener('input', () => {
				after.style.width = range.value + '%'
			})
		})()

		// Parallax scroll var (disabled on mobile/reduced)
		(function () {
			const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
			const mobile = window.matchMedia('(max-width: 768px)').matches
			if (reduce || mobile) return
			const onScroll = () => {
				document.documentElement.style.setProperty('--scrollY', String(window.scrollY || 0))
			}
			window.addEventListener('scroll', onScroll, { passive: true })
			onScroll()
		})()

		// Footer year
		(function () {
			const y = document.getElementById('year')
			if (y) y.textContent = String(new Date().getFullYear())
		})()

		// Auth Modal System
		(function () {
			const modal = document.getElementById('auth-modal')
			const openBtn = document.getElementById('nav-login')
			const closeBtn = document.getElementById('auth-close')
			const tabs = document.querySelectorAll('.auth-tab')
			const forms = document.querySelectorAll('.auth-form')
			
			if (!modal || !openBtn) return

			// Open modal
			openBtn.addEventListener('click', () => {
				modal.removeAttribute('hidden')
				document.body.classList.add('modal-open')
				// Focus first input
				const activeForm = modal.querySelector('.auth-form:not([hidden])')
				const firstInput = activeForm?.querySelector('input')
				if (firstInput) firstInput.focus()
			})

			// Close modal
			const closeModal = () => {
				modal.setAttribute('hidden', '')
				document.body.classList.remove('modal-open')
			}
			
			closeBtn.addEventListener('click', closeModal)
			
			// Close on overlay click
			modal.addEventListener('click', (e) => {
				if (e.target === modal) closeModal()
			})

			// Close on ESC
			document.addEventListener('keydown', (e) => {
				if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
					closeModal()
				}
			})

			// Tab switching
			tabs.forEach(tab => {
				tab.addEventListener('click', () => {
					const target = tab.dataset.tab
					
					// Update active tab
					tabs.forEach(t => t.classList.remove('active'))
					tab.classList.add('active')
					
					// Show/hide forms
					forms.forEach(form => {
						form.hidden = form.dataset.tab !== target
					})
					
					// Focus first input of active form
					const activeForm = modal.querySelector(`[data-tab="${target}"]`)
					const firstInput = activeForm?.querySelector('input')
					if (firstInput) firstInput.focus()
				})
			})

			// Form submissions
			forms.forEach(form => {
				form.addEventListener('submit', async (e) => {
					e.preventDefault()
					
					const submitBtn = form.querySelector('.auth-submit')
					const btnText = submitBtn.querySelector('.btn-text')
					const btnLoading = submitBtn.querySelector('.btn-loading')
					
					// Show loading state
					submitBtn.classList.add('loading')
					
					try {
						// Simulate API call
						await new Promise(resolve => setTimeout(resolve, 1500))
						
						// Success
						showToast('Sucesso!', 'Operação realizada com sucesso.', 'success')
						closeModal()
						
						// Reset forms
						forms.forEach(f => f.reset())
						
					} catch (error) {
						// Error
						showToast('Erro!', 'Algo deu errado. Tente novamente.', 'error')
					} finally {
						// Hide loading state
						submitBtn.classList.remove('loading')
					}
				})
			})
		})()

		// Dark Mode Toggle
		(function () {
			const toggle = document.getElementById('theme-toggle')
			const sunIcon = toggle?.querySelector('.sun-icon')
			const moonIcon = toggle?.querySelector('.moon-icon')
			
			if (!toggle) return

			// Check saved theme
			const savedTheme = localStorage.getItem('theme') || 'light'
			document.documentElement.setAttribute('data-theme', savedTheme)
			updateThemeIcon(savedTheme)

			toggle.addEventListener('click', () => {
				const currentTheme = document.documentElement.getAttribute('data-theme')
				const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
				
				document.documentElement.setAttribute('data-theme', newTheme)
				localStorage.setItem('theme', newTheme)
				updateThemeIcon(newTheme)
				
				showToast('Tema alterado!', `Mudou para modo ${newTheme === 'dark' ? 'escuro' : 'claro'}`, 'info')
			})

			function updateThemeIcon(theme) {
				if (theme === 'dark') {
					sunIcon.hidden = true
					moonIcon.hidden = false
				} else {
					sunIcon.hidden = false
					moonIcon.hidden = true
				}
			}
		})()

		// Toast Notification System
		(function () {
			const container = document.getElementById('toast-container')
			
			window.showToast = function(title, message, type = 'info', duration = 5000) {
				const toast = document.createElement('div')
				toast.className = `toast ${type}`
				toast.innerHTML = `
					<div class="toast-header">
						<span class="toast-title">${title}</span>
						<button class="toast-close" aria-label="Fechar">×</button>
					</div>
					<div class="toast-message">${message}</div>
				`
				
				container.appendChild(toast)
				
				// Close button
				const closeBtn = toast.querySelector('.toast-close')
				closeBtn.addEventListener('click', () => removeToast(toast))
				
				// Auto remove
				setTimeout(() => removeToast(toast), duration)
				
				// Remove after animation
				setTimeout(() => {
					if (toast.parentNode) {
						toast.style.animation = 'toast-out 0.3s ease forwards'
						setTimeout(() => removeToast(toast), 300)
					}
				}, duration - 300)
			}
			
			function removeToast(toast) {
				if (toast.parentNode) {
					toast.remove()
				}
			}
		})()

		// Scroll Animations
		(function () {
			const observerOptions = {
				threshold: 0.1,
				rootMargin: '0px 0px -50px 0px'
			}
			
			const observer = new IntersectionObserver((entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible')
					}
				})
			}, observerOptions)
			
			// Add fade-in class to elements
			const elements = document.querySelectorAll('.section, .card, .stat-card')
			elements.forEach(el => {
				el.classList.add('fade-in')
				observer.observe(el)
			})
		})()

		// Search System
		(function () {
			// Add search input to header
			const header = document.querySelector('.site-header .nav')
			if (header) {
				const searchContainer = document.createElement('div')
				searchContainer.className = 'search-container'
				searchContainer.innerHTML = `
					<input type="search" placeholder="Buscar..." class="search-input" id="search-input">
					<div class="search-results" id="search-results" hidden></div>
				`
				
				// Insert before nav-links
				const navLinks = header.querySelector('.nav-links')
				if (navLinks) {
					navLinks.parentNode.insertBefore(searchContainer, navLinks)
				}
			}
			
			// Search functionality
			const searchInput = document.getElementById('search-input')
			if (searchInput) {
				let searchTimeout
				
				searchInput.addEventListener('input', (e) => {
					clearTimeout(searchTimeout)
					searchTimeout = setTimeout(() => {
						const query = e.target.value.trim()
						if (query.length > 2) {
							performSearch(query)
						} else {
							hideSearchResults()
						}
					}, 300)
				})
				
				// Close search on outside click
				document.addEventListener('click', (e) => {
					if (!e.target.closest('.search-container')) {
						hideSearchResults()
					}
				})
			}
			
			function performSearch(query) {
				// Simple search implementation
				const results = []
				const sections = document.querySelectorAll('.section')
				
				sections.forEach(section => {
					const text = section.textContent.toLowerCase()
					if (text.includes(query.toLowerCase())) {
						const title = section.querySelector('h2, h3')?.textContent || 'Seção'
						results.push({ title, element: section })
					}
				})
				
				showSearchResults(results, query)
			}
			
			function showSearchResults(results, query) {
				const resultsContainer = document.getElementById('search-results')
				if (!resultsContainer) return
				
				if (results.length === 0) {
					resultsContainer.innerHTML = '<div class="search-no-results">Nenhum resultado encontrado</div>'
				} else {
					resultsContainer.innerHTML = results.map(result => 
						`<div class="search-result" data-target="${result.title}">${result.title}</div>`
					).join('')
					
					// Add click handlers
					resultsContainer.querySelectorAll('.search-result').forEach(result => {
						result.addEventListener('click', () => {
							const targetTitle = result.dataset.target
							const targetSection = Array.from(document.querySelectorAll('.section')).find(section => 
								section.querySelector('h2, h3')?.textContent === targetTitle
							)
							
							if (targetSection) {
								targetSection.scrollIntoView({ behavior: 'smooth' })
								hideSearchResults()
								searchInput.value = ''
							}
						})
					})
				}
				
				resultsContainer.removeAttribute('hidden')
			}
			
			function hideSearchResults() {
				const resultsContainer = document.getElementById('search-results')
				if (resultsContainer) {
					resultsContainer.setAttribute('hidden', '')
				}
			}
		})()

		// Performance Monitoring
		(function () {
			// Monitor page load performance
			window.addEventListener('load', () => {
				setTimeout(() => {
					const perfData = performance.getEntriesByType('navigation')[0]
					if (perfData) {
						console.log('Performance Metrics:', {
							loadTime: perfData.loadEventEnd - perfData.loadEventStart,
							domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
							totalTime: perfData.loadEventEnd - perfData.navigationStart
						})
					}
				}, 0)
			})
			
			// Monitor scroll performance
			let scrollCount = 0
			let scrollTimeout
			
			window.addEventListener('scroll', () => {
				scrollCount++
				clearTimeout(scrollTimeout)
				
				scrollTimeout = setTimeout(() => {
					if (scrollCount > 100) {
						console.warn('High scroll events detected:', scrollCount)
					}
					scrollCount = 0
				}, 1000)
			}, { passive: true })
		})()

		// Error Tracking
		(function () {
			window.addEventListener('error', (e) => {
				console.error('JavaScript Error:', {
					message: e.message,
					filename: e.filename,
					lineno: e.lineno,
					colno: e.colno,
					error: e.error
				})
			})
			
			window.addEventListener('unhandledrejection', (e) => {
				console.error('Unhandled Promise Rejection:', e.reason)
			})
		})()

		// PWA Support
		(function () {
			// Add to home screen prompt
			let deferredPrompt
			
			window.addEventListener('beforeinstallprompt', (e) => {
				e.preventDefault()
				deferredPrompt = e
				
				// Show install button or banner
				showToast('Instalar App', 'Clique para instalar o PulseX no seu dispositivo', 'info', 10000)
			})
			
			// Service Worker registration (apenas em http/https)
			if ('serviceWorker' in navigator && /^https?:/.test(window.location.protocol)) {
				navigator.serviceWorker.register('./public/sw.js')
					.then(registration => {
						console.log('SW registered:', registration)
					})
					.catch(error => {
						console.log('SW registration failed:', error)
					})
			}
		})()

		// Touch Gestures for Mobile
		(function () {
			if ('ontouchstart' in window) {
				let startX, startY, startTime
				
				document.addEventListener('touchstart', (e) => {
					startX = e.touches[0].clientX
					startY = e.touches[0].clientY
					startTime = Date.now()
				})
				
				document.addEventListener('touchend', (e) => {
					if (!startX || !startY) return
					
					const endX = e.changedTouches[0].clientX
					const endY = e.changedTouches[0].clientY
					const endTime = Date.now()
					
					const deltaX = endX - startX
					const deltaY = endY - startY
					const deltaTime = endTime - startTime
					
					// Swipe detection
					if (deltaTime < 500 && Math.abs(deltaX) > 50 && Math.abs(deltaY) < 100) {
						if (deltaX > 0) {
							// Swipe right - could open menu
							console.log('Swipe right detected')
						} else {
							// Swipe left - could close menu
							console.log('Swipe left detected')
						}
					}
					
					// Reset
					startX = startY = startTime = null
				})
			}
		})()

		// Lazy Loading Enhancement
		(function () {
			const lazyElements = document.querySelectorAll('img[loading="lazy"], .card, .stat-card')
			
			const lazyObserver = new IntersectionObserver((entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						entry.target.classList.add('lazy-loaded')
						
						// For images, load src if data-src exists
						if (entry.target.tagName === 'IMG' && entry.target.dataset.src) {
							entry.target.src = entry.target.dataset.src
							entry.target.removeAttribute('data-src')
						}
						
						lazyObserver.unobserve(entry.target)
					}
				})
			}, { threshold: 0.1 })
			
			lazyElements.forEach(el => lazyObserver.observe(el))
		})()

		// Keyboard Navigation Enhancement
		(function () {
			// Enhanced tab navigation
			document.addEventListener('keydown', (e) => {
				if (e.key === 'Tab') {
					document.body.classList.add('keyboard-navigation')
				}
			})
			
			document.addEventListener('mousedown', () => {
				document.body.classList.remove('keyboard-navigation')
			})
			
			// Skip to content
			const skipLink = document.querySelector('.skip-link')
			if (skipLink) {
				skipLink.addEventListener('click', (e) => {
					e.preventDefault()
					const main = document.getElementById('main')
					if (main) {
						main.focus()
						main.scrollIntoView({ behavior: 'smooth' })
					}
				})
			}
		})()

		// Debounced Scroll Handler
		(function () {
			function debounce(func, wait) {
				let timeout
				return function executedFunction(...args) {
					const later = () => {
						clearTimeout(timeout)
						func(...args)
					}
					clearTimeout(timeout)
					timeout = setTimeout(later, wait)
				}
			}
			
			const debouncedScroll = debounce(() => {
				// Update scroll-based animations
				const scrollY = window.scrollY
				document.documentElement.style.setProperty('--scrollY', String(scrollY))
			}, 16) // ~60fps
			
			window.addEventListener('scroll', debouncedScroll, { passive: true })
		})()

		// Local Storage Utilities
		(function () {
			window.storage = {
				set: (key, value) => {
					try {
						localStorage.setItem(key, JSON.stringify(value))
					} catch (e) {
						console.warn('Failed to save to localStorage:', e)
					}
				},
				get: (key, defaultValue = null) => {
					try {
						const item = localStorage.getItem(key)
						return item ? JSON.parse(item) : defaultValue
					} catch (e) {
						console.warn('Failed to read from localStorage:', e)
						return defaultValue
					}
				},
				remove: (key) => {
					try {
						localStorage.removeItem(key)
					} catch (e) {
						console.warn('Failed to remove from localStorage:', e)
					}
				}
			}
		})()

		// Favorites System
		(function () {
			const favorites = storage.get('favorites', [])
			
			window.addToFavorites = function(item) {
				if (!favorites.includes(item)) {
					favorites.push(item)
					storage.set('favorites', favorites)
					showToast('Adicionado!', 'Item adicionado aos favoritos', 'success')
				}
			}
			
			window.removeFromFavorites = function(item) {
				const index = favorites.indexOf(item)
				if (index > -1) {
					favorites.splice(index, 1)
					storage.set('favorites', favorites)
					showToast('Removido!', 'Item removido dos favoritos', 'info')
				}
			}
		})()

		console.log('🎉 Todas as funcionalidades foram inicializadas com sucesso!')

		// Marca o body como carregado para liberar a opacidade inicial (evita tela preta)
		try { document.body.classList.add('loaded') } catch {}
	}

	// Filter System for Features
	(function () {
		const filterTabs = document.querySelectorAll('.filter-tab')
		const filterInput = document.getElementById('filter-search')
		const featuresGrid = document.getElementById('features-grid')
		const featureCards = document.querySelectorAll('.card[data-filter]')
		
		if (!filterTabs.length || !featuresGrid) return

		let currentFilter = 'all'
		let currentSearch = ''

		// Filter tabs
		filterTabs.forEach(tab => {
			tab.addEventListener('click', () => {
				const filter = tab.dataset.filter
				
				// Update active tab
				filterTabs.forEach(t => t.classList.remove('active'))
				tab.classList.add('active')
				
				currentFilter = filter
				applyFilters()
			})
		})

		// Search input
		if (filterInput) {
			filterInput.addEventListener('input', (e) => {
				currentSearch = e.target.value.toLowerCase().trim()
				applyFilters()
			})
		}

		function applyFilters() {
			featureCards.forEach(card => {
				const filters = card.dataset.filter.split(' ')
				const title = card.querySelector('h3')?.textContent.toLowerCase() || ''
				const description = card.querySelector('p')?.textContent.toLowerCase() || ''
				const text = `${title} ${description}`
				
				// Check filter match
				const filterMatch = currentFilter === 'all' || filters.includes(currentFilter)
				
				// Check search match
				const searchMatch = !currentSearch || text.includes(currentSearch)
				
				// Show/hide card
				if (filterMatch && searchMatch) {
					card.style.display = 'block'
					card.classList.add('fade-in')
					setTimeout(() => card.classList.add('visible'), 100)
				} else {
					card.style.display = 'none'
					card.classList.remove('visible')
				}
			})
			
			// Show no results message if needed
			const visibleCards = Array.from(featureCards).filter(card => 
				card.style.display !== 'none'
			)
			
			let noResults = document.getElementById('no-results')
			if (visibleCards.length === 0) {
				if (!noResults) {
					noResults = document.createElement('div')
					noResults.id = 'no-results'
					noResults.className = 'no-results'
					noResults.innerHTML = `
						<div class="no-results-content">
							<h3>Nenhum resultado encontrado</h3>
							<p>Tente ajustar os filtros ou a busca</p>
						</div>
					`
					featuresGrid.appendChild(noResults)
				}
				noResults.style.display = 'block'
			} else if (noResults) {
				noResults.style.display = 'none'
			}
		}

		// Initialize filters
		applyFilters()
	})()

	// User Authentication System
	(function () {
		const loginBtn = document.getElementById('nav-login')
		const userMenu = document.getElementById('user-menu')
		const userToggle = document.getElementById('user-toggle')
		const userDropdown = document.getElementById('user-dropdown')
		const userName = document.getElementById('user-name')
		const userEmail = document.getElementById('user-email')
		const logoutBtn = document.getElementById('logout-btn')
		
		// Check login status on page load
		function checkLoginStatus() {
			const userData = localStorage.getItem('pulsex_user') || sessionStorage.getItem('pulsex_user')
			
			if (userData) {
				try {
					const user = JSON.parse(userData)
					if (user.loggedIn) {
						// User is logged in
						showUserMenu(user)
						return true
					}
				} catch (e) {
					// Invalid data, clear it
					localStorage.removeItem('pulsex_user')
					sessionStorage.removeItem('pulsex_user')
				}
			}
			
			// User is not logged in
			showLoginButton()
			return false
		}
		
		function showUserMenu(user) {
			loginBtn.style.display = 'none'
			userMenu.removeAttribute('hidden')
			
			// Update user info
			userName.textContent = user.name || user.email.split('@')[0]
			userEmail.textContent = user.email
		}
		
		function showLoginButton() {
			loginBtn.style.display = 'block'
			userMenu.setAttribute('hidden', '')
		}
		
		// Toggle user dropdown
		if (userToggle) {
			userToggle.addEventListener('click', () => {
				const isExpanded = userToggle.getAttribute('aria-expanded') === 'true'
				userToggle.setAttribute('aria-expanded', !isExpanded)
				userDropdown.hidden = isExpanded
			})
		}
		
		// Close dropdown when clicking outside
		document.addEventListener('click', (e) => {
			if (!userMenu?.contains(e.target)) {
				userToggle?.setAttribute('aria-expanded', 'false')
				userDropdown?.setAttribute('hidden', '')
			}
		})
		
		// Logout functionality
		if (logoutBtn) {
			logoutBtn.addEventListener('click', () => {
							// Clear user data
			localStorage.removeItem('pulsex_user')
			sessionStorage.removeItem('pulsex_user')
				
				// Show success message
				showToast('Logout realizado', 'Você foi desconectado com sucesso', 'info')
				
				// Update UI
				showLoginButton()
				
				// Redirect to login page after a short delay
					setTimeout(() => {
						window.location.href = './login.html'
					}, 1500)
			})
		}
		
		// Initialize
		checkLoginStatus()
	})()

	// Download Progress System
	(function () {
		const downloadBtn = document.getElementById('download-btn')
		const progressContainer = document.getElementById('progress-container')
		const progressFill = document.getElementById('progress-fill')
		const progressText = document.getElementById('progress-text')
		
		if (!downloadBtn) return

		downloadBtn.addEventListener('click', async () => {
			// Show loading state
			downloadBtn.classList.add('loading')
			progressContainer.removeAttribute('hidden')
			
			try {
				// Simulate download process
				await simulateDownload()
				
				// Success - redirect to download page
				showToast('Download concluído!', 'Redirecionando para a página de download...', 'success')
				setTimeout(() => {
					window.location.href = './download.html'
				}, 1500)
				
			} catch (error) {
				// Error
				showToast('Erro no download', 'Tente novamente em alguns instantes', 'error')
				downloadBtn.classList.remove('loading')
				progressContainer.setAttribute('hidden', '')
			}
		})

		async function simulateDownload() {
			const steps = [
				{ progress: 10, text: 'Verificando sistema...', delay: 800 },
				{ progress: 25, text: 'Preparando arquivos...', delay: 1200 },
				{ progress: 45, text: 'Baixando componentes...', delay: 1500 },
				{ progress: 70, text: 'Verificando integridade...', delay: 1000 },
				{ progress: 90, text: 'Finalizando...', delay: 800 },
				{ progress: 100, text: 'Download concluído!', delay: 500 }
			]

			for (const step of steps) {
				await new Promise(resolve => setTimeout(resolve, step.delay))
				
				// Update progress
				progressFill.style.width = `${step.progress}%`
				progressText.textContent = step.text
				
				// Add progress animation
				progressFill.style.transition = 'width 0.5s ease'
			}
		}
	})()

	// Tenta inicializar imediatamente
	if (document.readyState === 'loading') {
		// Se ainda está carregando, aguarda
		document.addEventListener('DOMContentLoaded', init)
	} else {
		// Se já carregou, inicializa imediatamente
		init()
	}
})()
