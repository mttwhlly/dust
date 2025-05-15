import gsap from 'gsap'

export default function DustButton({ editor }) {
  const handleDust = () => {
    const content = editor.getText()
    const container = document.createElement('div')
    container.className = 'absolute top-0 left-0 w-full h-full pointer-events-none z-50'
    container.style.fontSize = '1.25rem'
    container.style.fontFamily = 'serif'

    document.body.appendChild(container)

    content.split('').forEach((char, i) => {
      const span = document.createElement('span')
      span.innerText = char
      span.style.position = 'absolute'
      span.style.left = `${10 + i * 12}px`
      span.style.top = '50%'
      container.appendChild(span)

      gsap.to(span, {
        duration: 1 + Math.random(),
        x: Math.random() * 100 - 50,
        y: -Math.random() * 100,
        rotation: Math.random() * 360,
        opacity: 0,
        ease: 'power2.out',
        delay: i * 0.01,
        onComplete: () => span.remove(),
      })
    })

    editor.commands.clearContent()
  }

  return (
    <button
      onClick={handleDust}
      className="mt-6 bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded shadow"
    >
      Dust
    </button>
  )
}

