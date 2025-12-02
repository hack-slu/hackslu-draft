import { useState, useEffect } from 'react';

export const useParticles = (particleCount = 50) => {
  const [particles, setParticles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Initialize particles
  useEffect(() => {
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
    }));
    setParticles(newParticles);
  }, [particleCount]);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prevParticles =>
        prevParticles.map(particle => {
          let { x, y, speedX, speedY } = particle;

          // Calculate distance from mouse
          const dx = x - mousePos.x;
          const dy = y - mousePos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Mouse push radius
          const pushRadius = 150;

          // If particle is within push radius, apply force
          if (distance < pushRadius && distance > 0) {
            const force = (pushRadius - distance) / pushRadius;
            const pushStrength = force * force * 2;
            
            // Calculate push direction (away from mouse)
            const angle = Math.atan2(dy, dx);
            
            // Apply push force
            speedX += Math.cos(angle) * pushStrength;
            speedY += Math.sin(angle) * pushStrength;
          }

          // Apply friction to slow down particles gradually
          speedX *= 0.95;
          speedY *= 0.95;

          // Add slight random drift to keep particles moving
          speedX += (Math.random() - 0.5) * 0.1;
          speedY += (Math.random() - 0.5) * 0.1;

          // Limit max speed
          const maxSpeed = 3;
          const currentSpeed = Math.sqrt(speedX * speedX + speedY * speedY);
          if (currentSpeed > maxSpeed) {
            speedX = (speedX / currentSpeed) * maxSpeed;
            speedY = (speedY / currentSpeed) * maxSpeed;
          }

          // Update position
          x += speedX;
          y += speedY;

          // Bounce off edges
          if (x < 0) {
            x = 0;
            speedX = Math.abs(speedX);
          }
          if (x > window.innerWidth) {
            x = window.innerWidth;
            speedX = -Math.abs(speedX);
          }
          if (y < 0) {
            y = 0;
            speedY = Math.abs(speedY);
          }
          if (y > window.innerHeight) {
            y = window.innerHeight;
            speedY = -Math.abs(speedY);
          }

          return { ...particle, x, y, speedX, speedY };
        })
      );
    };

    const interval = setInterval(animateParticles, 1000 / 60); // 60 FPS
    return () => clearInterval(interval);
  }, [mousePos]);

  return particles;
};

// Particle component for rendering
export const ParticleEffect = ({ particles }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-blue-500/30"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
        />
      ))}
    </div>
  );
};