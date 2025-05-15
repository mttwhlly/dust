import { EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function Editor({ editor }) {
  return (
    <div className="relative text-xl font-serif prose dark:prose-invert max-w-none rounded">
      <EditorContent editor={editor} />
    </div>
  )
}
