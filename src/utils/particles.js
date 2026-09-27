export const initParticles = () => {
  const container = document.getElementById('particles')
  if (!container) return
  
  const particleCount = 25
  const colors = ['#3b82f6', '#dc2626']
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')
    particle.className = 'particle'
    
    // Random properties
    const size = Math.random() * 4 + 2
    const left = Math.random() * 100
    const delay = Math.random() * 20
    const duration = Math.random() * 15 + 15
    const color = colors[Math.floor(Math.random() * colors.length)]
    
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`
    particle.style.left = `${left}%`
    particle.style.background = color
    particle.style.boxShadow = `0 0 ${size * 3}px ${color}`
    particle.style.animationDelay = `-${delay}s`
    particle.style.animationDuration = `${duration}s`
    
    container.appendChild(particle)
  }
}