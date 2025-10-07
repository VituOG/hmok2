/**
 * PULSEX - Performance Configuration
 * Otimizações de performance para melhorar a experiência do usuário
 */

// Configurações de performance
export const PERFORMANCE_CONFIG = {
  // Debounce delays
  DEBOUNCE_DELAY: 150,
  THROTTLE_DELAY: 100,
  
  // Animation durations
  ANIMATION_DURATION: {
    FAST: 150,
    NORMAL: 250,
    SLOW: 350,
  },
  
  // Intersection Observer options
  INTERSECTION_OPTIONS: {
    threshold: 0.1,
    rootMargin: '50px',
  },
  
  // Lazy loading
  LAZY_LOAD_DISTANCE: 100,
  
  // Cache settings
  CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 hours
}

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

// Throttle utility
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0
  
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      func(...args)
    }
  }
}

// Performance monitoring
export class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map()
  
  startTimer(name: string): () => void {
    const start = performance.now()
    return () => {
      const duration = performance.now() - start
      if (!this.metrics.has(name)) {
        this.metrics.set(name, [])
      }
      this.metrics.get(name)!.push(duration)
      
      // Log slow operations
      if (duration > 100) {
        console.warn(`Slow operation detected: ${name} took ${duration.toFixed(2)}ms`)
      }
    }
  }
  
  getAverageTime(name: string): number {
    const times = this.metrics.get(name)
    if (!times || times.length === 0) return 0
    return times.reduce((a, b) => a + b, 0) / times.length
  }
  
  getMetrics(): Record<string, number> {
    const result: Record<string, number> = {}
    for (const [name] of this.metrics) {
      result[name] = this.getAverageTime(name)
    }
    return result
  }
}

// Lazy loading utility
export function createLazyLoader() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement
          const src = target.dataset.src
          if (src) {
            target.setAttribute('src', src)
            target.removeAttribute('data-src')
            observer.unobserve(target)
          }
        }
      })
    },
    PERFORMANCE_CONFIG.INTERSECTION_OPTIONS
  )
  
  return {
    observe: (element: HTMLElement) => observer.observe(element),
    unobserve: (element: HTMLElement) => observer.unobserve(element),
  }
}

// Resource preloader
export function preloadResource(url: string, type: 'image' | 'script' | 'style' = 'image') {
  return new Promise((resolve, reject) => {
    if (type === 'image') {
      const img = new Image()
      img.onload = () => resolve(url)
      img.onerror = () => reject(new Error(`Failed to preload image: ${url}`))
      img.src = url
    } else if (type === 'script') {
      const script = document.createElement('script')
      script.onload = () => resolve(url)
      script.onerror = () => reject(new Error(`Failed to preload script: ${url}`))
      script.src = url
      document.head.appendChild(script)
    } else if (type === 'style') {
      const link = document.createElement('link')
      link.onload = () => resolve(url)
      link.onerror = () => reject(new Error(`Failed to preload style: ${url}`))
      link.rel = 'stylesheet'
      link.href = url
      document.head.appendChild(link)
    }
  })
}

// Memory management
export function cleanupEventListeners() {
  // Remove event listeners that might cause memory leaks
  const elements = document.querySelectorAll('[data-event-cleanup]')
  elements.forEach(element => {
    element.removeAttribute('data-event-cleanup')
  })
}

// Performance optimization for animations
export function optimizeAnimations() {
  // Disable animations for users who prefer reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-fast', '0s')
    document.documentElement.style.setProperty('--transition-normal', '0s')
    document.documentElement.style.setProperty('--transition-slow', '0s')
  }
}

// Initialize performance optimizations
export function initPerformanceOptimizations() {
  // Optimize animations
  optimizeAnimations()
  
  // Listen for preference changes
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', optimizeAnimations)
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', cleanupEventListeners)
  
  console.log('🚀 Performance optimizations initialized')
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor()
