// Simple 3D tilt effect without external libraries
export const initTilt = (element) => {
  if (!element) return
  
  let rect = null
  let centerX = 0
  let centerY = 0
  
  const handleMouseMove = (e) => {
    if (!rect) rect = element.getBoundingClientRect()
    centerX = rect.left + rect.width / 2
    centerY = rect.top + rect.height / 2
    
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    
    const rotateX = (mouseY / (rect.height / 2)) * -8
    const rotateY = (mouseX / (rect.width / 2)) * 8
    
    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
  }
  
  const handleMouseLeave = () => {
    element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
    rect = null
  }
  
  element.addEventListener('mousemove', handleMouseMove)
  element.addEventListener('mouseleave', handleMouseLeave)
  
  // Cleanup function
  return () => {
    element.removeEventListener('mousemove', handleMouseMove)
    element.removeEventListener('mouseleave', handleMouseLeave)
  }
}