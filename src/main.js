import { gsap } from 'https://cdn.skypack.dev/gsap'

if (navigator.onLine) {
  document.body.innerHTML = `<div style="text-align: center; padding-top: 4rem;"><h1 class="dust-caps">Dust only works offline</h1><span class="dust-caps">✕</span><h2 class="dust-caps">Disconnect and refresh to write</h2></div>`
}

customElements.define('dust-editor', class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="wrapper">
        <div class="header">
            <h1 class="dust-caps">DUST</h1>
            <button id="release" class="dust-caps">✕</button>
        </div>
        <div id="editor" contenteditable="true"></div>
      </div>
    `
    
    // Get the editor element
    const editor = this.querySelector('#editor');
    
    // Focus the editor when the component is connected
    setTimeout(() => {
      editor.focus();
    }, 100);
    
    // Add event listeners
    this.querySelector('#release').addEventListener('click', () => {
      this.dust();
      
      // Re-focus the editor after dust animation starts
      setTimeout(() => {
        editor.focus();
      }, 50);
    });
    
    // Ensure editor keeps focus when clicking elsewhere in the component
    this.addEventListener('click', (e) => {
      // Don't interfere if clicking the release button
      if (e.target.id !== 'release' && e.target !== editor) {
        editor.focus();
        
        // Set cursor at the end of the text
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(editor);
        range.collapse(false); // collapse to end
        selection.removeAllRanges();
        selection.addRange(range);
        
        e.preventDefault();
      }
    });
    
    // Prevent losing focus when user clicks on particles during animation
    editor.addEventListener('blur', (e) => {
      // Only prevent blur if it's during an animation
      if (this.querySelector('.dust-char')) {
        setTimeout(() => {
          editor.focus();
        }, 10);
      }
    });
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
      span.style.pointerEvents = 'none' // Prevent particles from capturing clicks
      
      editor.appendChild(span)
      particles.push(span)
    })
    
    // Apply wind effect to all particles
    const timeline = gsap.timeline({
      onComplete: () => {
        // Clean up particles after animation
        particles.forEach(span => span.remove())
        
        // Make sure editor is still focused after animation completes
        editor.focus();
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