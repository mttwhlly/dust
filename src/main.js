import { gsap } from 'https://cdn.skypack.dev/gsap'

// if (navigator.onLine) {
//   document.body.innerHTML = `<h1 style="text-align: center; padding-top: 4rem;">Dust only works offline. Disconnect to write.</h1>`
// }

customElements.define('dust-editor', class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="wrapper">
        <button id="release">DUST</button>
        <div id="editor" contenteditable="true">Write something worth letting go…</div>
      </div>
    `
    this.querySelector('#release').addEventListener('click', () => this.dust())
  }

  dust() {
    const editor = this.querySelector('#editor')
    const text = editor.innerText.trim()
    const editorRect = editor.getBoundingClientRect()
    editor.innerHTML = ''
    
    // Create particles for each character
    const particles = []
    
    text.split('').forEach((char, i) => {
      if (char === ' ') return // Skip spaces
      
      const span = document.createElement('span')
      span.textContent = char
      span.className = 'dust-char'
      
      // Position at original text location
      const xPos = 20 + (i * 12) % (editorRect.width - 40)
      const yPos = 20 + Math.floor((i * 12) / (editorRect.width - 40)) * 20
      
      span.style.position = 'absolute'
      span.style.left = `${xPos}px`
      span.style.top = `${yPos}px`
      span.style.opacity = '1'
      span.style.color = '#333'
      span.style.fontFamily = 'inherit'
      span.style.fontSize = 'inherit'
      
      editor.appendChild(span)
      particles.push(span)
    })
    
    // Apply wind effect to all particles
    const timeline = gsap.timeline({
      onComplete: () => {
        // Clean up particles after animation
        particles.forEach(span => span.remove())
      }
    })
    
    particles.forEach((span, i) => {
      // Stagger the start times slightly
      const delay = i * 0.01
      
      // Wind direction (mostly rightward and upward)
      const windX = 100 + Math.random() * 300
      const windY = -50 - Math.random() * 150
      const rotation = 180 + Math.random() * 540
      
      // Variable speeds for particles
      const duration = 1.5 + Math.random() * 1.5
      
      // Add slight wobble to the path
      const wobbleX = Math.random() * 30 - 15
      const wobbleY = Math.random() * 30 - 15
      
      // Create a more natural dust movement with multiple animations
      timeline.to(span, {
        duration: duration * 0.3,
        x: wobbleX,
        y: wobbleY,
        opacity: 0.9,
        scale: Math.random() * 0.5 + 0.8,
        ease: 'power1.in',
        delay: delay
      }, 0)
      .to(span, {
        duration: duration * 0.7,
        x: windX,
        y: windY,
        opacity: 0,
        scale: Math.random() * 0.3 + 0.2,
        rotation: rotation,
        ease: "power2.out",
      }, `<${duration * 0.2}`)
    })
  }
})