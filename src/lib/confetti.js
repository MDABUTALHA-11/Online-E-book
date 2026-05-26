/**
 * Spawns a bursts of colorful HTML particles around the clicked button.
 * @param {React.MouseEvent | MouseEvent} e - The click event object
 */
export const triggerConfetti = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  
  // Create 35 particles
  for (let i = 0; i < 35; i++) {
    const particle = document.createElement('div');
    particle.className = 'pointer-events-none z-[9999]';
    
    // Curated theme colors (Teal, Orange, Navy, Emerald, Purple)
    const colors = ['#14B8A6', '#F97316', '#0F172A', '#22C55E', '#8B5CF6', '#3B82F6'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Custom styling
    particle.style.backgroundColor = color;
    particle.style.width = `${4 + Math.random() * 8}px`;
    particle.style.height = `${4 + Math.random() * 8}px`;
    particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    particle.style.position = 'fixed';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    document.body.appendChild(particle);
    
    // Physics variables
    const angle = Math.random() * Math.PI * 2;
    const velocity = 3 + Math.random() * 8;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity - 4; // slight upward bias
    const spin = (Math.random() - 0.5) * 20;
    
    let currentX = x;
    let currentY = y;
    let currentVx = vx;
    let currentVy = vy;
    let currentSpin = 0;
    let opacity = 1;
    
    const animate = () => {
      currentX += currentVx;
      currentY += currentVy;
      currentVy += 0.35; // gravity
      currentVx *= 0.98;  // drag
      currentSpin += spin;
      opacity -= 0.022;   // fade out
      
      particle.style.left = `${currentX}px`;
      particle.style.top = `${currentY}px`;
      particle.style.opacity = opacity;
      particle.style.transform = `scale(${opacity}) rotate(${currentSpin}deg)`;
      
      if (opacity > 0) {
        requestAnimationFrame(animate);
      } else {
        particle.remove();
      }
    };
    
    requestAnimationFrame(animate);
  }
};
