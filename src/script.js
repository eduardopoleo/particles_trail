import './style.css'

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
let hue = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

const mouse = {
  x: undefined,
  y: undefined
}

const particlesArray = []
window.addEventListener('click', (event) => {
  mouse.x = event.x
  mouse.y = event.y
  for (i=0; i < 30; i++) {
    particlesArray.push(new Particle())
  }
})

window.addEventListener('mousemove', (event) => {
  mouse.x = event.x
  mouse.y = event.y

  for (let i = 0; i < 5; i++) {
    particlesArray.push(new Particle())
  }
})

class Particle {
  constructor() {
    this.size = Math.random() * 15 + 1
    this.x = mouse.x
    this.y = mouse.y
    this.color = 'hsl(' + hue + ', 100%, 50%)'
    this.speedX = Math.random() * 3 - 1.5
    this.speedY = Math.random() * 3 - 1.5
  }

  update() {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.speedX = -this.speedX
    }

    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.speedY = -this.speedY
    }

    this.x += this.speedX
    this.y += this.speedY
    if (this.size >= 0.2) {
      this.size -= 0.1
    } 
  }

  draw() {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

const drawLine = (p1, p2) => {
  ctx.beginPath();
  ctx.moveTo(p1.x, p2.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.strokeStyle = p1.color
  ctx.stroke();
}

// const handleParticles = () => {
//   for (let i = 0; i < particlesArray.length; i++) {
//     const p1 = particlesArray[i]
//     p1.update()
//     p1.draw()

//     for (let j = i+ 1; j < particlesArray.length; j++) {
//       const p2 = particlesArray[j]
//       dx = p1.x - p2.x
//       dy = p1.y - p2.y
//       const distance = Math.sqrt(dx * dx + dy * dy)
//       console.log(distance)
//       if (distance < 100) {
//         drawLine(p1, p2)
//       }
//     }

//     if (p1.size <= 3) {
//       particlesArray.splice(i, 1)
//       i--
//       continue
//     }
//   }
// }

const handleParticles = () => {
  for (let a = 0; a < particlesArray.length; a++) {
    particlesArray[a].update()
    particlesArray[a].draw()
    if (particlesArray[a].size <= 3) {
      particlesArray.splice(a, 1)
      a--
      continue
    }

    for (let b = a; b < particlesArray.length; b++){
      let distance = Math.sqrt(((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
      +   ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y)));
      if  (distance < 110)
      {   
          ctx.strokeStyle=particlesArray[a].color;
          ctx.beginPath();
          ctx.lineWidth = 2;
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();

      }    
    }
  }  
}

const animate = () => {
  // a different effect when particles disappear
  ctx.clearRect(0,0, canvas.width, canvas.height)
  // ctx.fillStyle = 'rgba(0,0,0,0.02)'
  // ctx.fillRect(0,0, canvas.width, canvas.height)
  handleParticles()
  requestAnimationFrame(animate)
  hue += 5
}

animate()