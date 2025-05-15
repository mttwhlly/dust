// src/components/Editor.jsx
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function Editor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Write something and let it go…</p>',
  })

  return (
    <div className="prose max-w-none">
      <EditorContent editor={editor} className="p-4" />
    </div>
  )
}
