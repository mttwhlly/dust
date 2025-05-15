import gsap from 'gsap'

export const handleDust = () => {
  gsap.to('.ProseMirror p', {
    duration: 1.2,
    opacity: 0,
    y: -40,
    ease: 'power2.out',
    onComplete: () => {
      editor.commands.clearContent()
    },
  })
}
