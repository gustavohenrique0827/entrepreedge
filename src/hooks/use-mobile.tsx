
import * as React from "react"

// Define breakpoints matching common device sizes
export const BREAKPOINTS = {
  mobile: 640,  // smartphones
  tablet: 768,  // tablets
  laptop: 1024, // laptops
  desktop: 1280 // desktop
}

// Hook to check if viewport width is less than specified breakpoint
export function useIsBreakpoint(breakpoint: number) {
  const [isSmaller, setIsSmaller] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Initial check
    setIsSmaller(window.innerWidth < breakpoint)
    
    // Create media query
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    
    // Handler function
    const handleResize = () => {
      setIsSmaller(window.innerWidth < breakpoint)
    }
    
    // Modern event listener
    mql.addEventListener("change", handleResize)
    
    // Clean up
    return () => mql.removeEventListener("change", handleResize)
  }, [breakpoint])

  return isSmaller
}

// Convenience hooks for common breakpoints
export function useIsMobile() {
  return useIsBreakpoint(BREAKPOINTS.mobile)
}

export function useIsTablet() {
  return useIsBreakpoint(BREAKPOINTS.tablet)
}

export function useIsLaptop() {
  return useIsBreakpoint(BREAKPOINTS.laptop)
}

export function useIsDesktop() {
  return useIsBreakpoint(BREAKPOINTS.desktop)
}

// Hook to get current device type
export function useDeviceType() {
  const isMobile = useIsBreakpoint(BREAKPOINTS.mobile)
  const isTablet = useIsBreakpoint(BREAKPOINTS.tablet) && !isMobile
  const isLaptop = useIsBreakpoint(BREAKPOINTS.laptop) && !isTablet && !isMobile
  const isDesktop = useIsBreakpoint(BREAKPOINTS.desktop) && !isLaptop && !isTablet && !isMobile
  
  if (isMobile) return "mobile"
  if (isTablet) return "tablet"
  if (isLaptop) return "laptop"
  return "desktop"
}
