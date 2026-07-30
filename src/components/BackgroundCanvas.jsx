import { useEffect, useRef } from 'react';

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    let mouse = {
      x: null,
      y: null,
      radius: 150
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
        this.mass = size;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        // Boundary collision
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
          this.directionX = -this.directionX * 0.9;
          this.x = Math.max(this.size, Math.min(canvas.width - this.size, this.x));
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
          this.directionY = -this.directionY * 0.9;
          this.y = Math.max(this.size, Math.min(canvas.height - this.size, this.y));
        }

        // Mouse interaction
        if (mouse.x && mouse.y) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            let force = (mouse.radius - distance) / mouse.radius;
            let angle = Math.atan2(dy, dx);
            let acceleration = force * 3;
            this.directionX -= Math.cos(angle) * acceleration;
            this.directionY -= Math.sin(angle) * acceleration;
          }
        }

        this.directionX *= 0.99;
        this.directionY *= 0.99;

        const minSpeed = 0.1;
        const maxSpeed = 3;
        const speed = Math.sqrt(this.directionX * this.directionX + this.directionY * this.directionY);
        if (speed > maxSpeed) {
          this.directionX = (this.directionX / speed) * maxSpeed;
          this.directionY = (this.directionY / speed) * maxSpeed;
        } else if (speed > 0 && speed < minSpeed) {
          this.directionX = (this.directionX / speed) * minSpeed;
          this.directionY = (this.directionY / speed) * minSpeed;
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    // Handle collision between particles
    function resolveCollision(p1, p2) {
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < p1.size + p2.size) {
        const nx = dx / distance;
        const ny = dy / distance;
        const kx = p2.directionX - p1.directionX;
        const ky = p2.directionY - p1.directionY;
        const relativeVelocity = kx * nx + ky * ny;

        if (relativeVelocity > 0) return;

        const impulse = (2 * relativeVelocity) / (p1.mass + p2.mass);
        p1.directionX += impulse * p2.mass * nx;
        p1.directionY += impulse * p2.mass * ny;
        p2.directionX -= impulse * p1.mass * nx;
        p2.directionY -= impulse * p1.mass * ny;

        // Prevent overlap
        const overlap = p1.size + p2.size - distance;
        const shiftX = (overlap / 2) * nx;
        const shiftY = (overlap / 2) * ny;
        p1.x -= shiftX;
        p1.y -= shiftY;
        p2.x += shiftX;
        p2.y += shiftY;
      }
    }

    function init() {
      particles = [];
      let numberOfParticles = Math.floor((canvas.height * canvas.width) / 2000);
      numberOfParticles = Math.max(numberOfParticles, 300);

      const columns = Math.ceil(Math.sqrt(numberOfParticles * (canvas.width / canvas.height)));
      const rows = Math.ceil(numberOfParticles / columns);
      const cellWidth = canvas.width / columns;
      const cellHeight = canvas.height / rows;

      for (let i = 0; i < numberOfParticles; i++) {
        const col = i % columns;
        const row = Math.floor(i / columns);
        const gridX = col * cellWidth + cellWidth / 2;
        const gridY = row * cellHeight + cellHeight / 2;
        const offsetX = (Math.random() - 0.5) * cellWidth * 0.8;
        const offsetY = (Math.random() - 0.5) * cellHeight * 0.8;

        let size = Math.random() * 2 + 1;
        let x = Math.max(size, Math.min(canvas.width - size, gridX + offsetX));
        let y = Math.max(size, Math.min(canvas.height - size, gridY + offsetY));
        let directionX = (Math.random() - 0.5) * 2;
        let directionY = (Math.random() - 0.5) * 2;
        let color = 'rgba(107, 114, 128, 0.6)';

        particles.push(new Particle(x, y, directionX, directionY, size, color));
      }
    }

    function connectLines() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          resolveCollision(particles[a], particles[b]);

          if (distance < 100) {
            let opacity = 1 - distance / 100;
            let distToMouseA = mouse.x && mouse.y ? Math.sqrt(Math.pow(mouse.x - particles[a].x, 2) + Math.pow(mouse.y - particles[a].y, 2)) : 1000;
            let distToMouseB = mouse.x && mouse.y ? Math.sqrt(Math.pow(mouse.x - particles[b].x, 2) + Math.pow(mouse.y - particles[b].y, 2)) : 1000;

            if (distToMouseA < mouse.radius || distToMouseB < mouse.radius) {
              ctx.strokeStyle = `rgba(239, 68, 68, ${opacity})`; // Red lines near cursor
            } else {
              ctx.strokeStyle = `rgba(107, 114, 128, ${opacity})`; // Gray lines elsewhere
            }

            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      connectLines();
      animationFrameId = requestAnimationFrame(animate);
    }

    init();
    animate();

    const handleResize = () => {
      resize();
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
}
