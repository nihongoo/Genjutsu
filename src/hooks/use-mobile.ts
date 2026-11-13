import * as React from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener('change', onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return !!isMobile
}

type ViewportMode = 'mobile' | 'desktop' | null

const VIEWPORT_QUERIES = [
  '(max-width: 768px)',
  '(pointer: coarse) and (max-height: 500px)',
]

function subscribeViewportMode(onChange: () => void) {
  const queries = VIEWPORT_QUERIES.map((query) => window.matchMedia(query))
  queries.forEach((query) => query.addEventListener('change', onChange))
  return () => {
    queries.forEach((query) => query.removeEventListener('change', onChange))
  }
}

function getViewportMode(): ViewportMode {
  return VIEWPORT_QUERIES.some((query) => window.matchMedia(query).matches)
    ? 'mobile'
    : 'desktop'
}

function getServerViewportMode(): ViewportMode {
  return null
}

export function useViewportMode(): ViewportMode {
  return React.useSyncExternalStore(subscribeViewportMode, getViewportMode, getServerViewportMode)
}
