import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Editor from './components/editor'
import DustButton from './components/dust-button'
import './App.css'

function App() {

  // const isOnline = navigator.onLine

  // if (isOnline) {
  //   return (
  //     <div className="h-screen grid place-items-center text-center text-gray-600">
  //       <p>Please disconnect from the internet to use Dust.</p>
  //     </div>
  //   )
  // }

 const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Let go of what no longer serves you.</p>',
  })

  return (
    <div className="w-screen h-screen p-8 bg-neutral-100 text-gray-800 mx-auto flex flex-col items-center justify-center">
      {editor && (
        <div className="max-w-2xl w-full mx-auto">
          <Editor editor={editor} />
          <DustButton editor={editor} />
        </div>
      )}
    </div>
  )
}

export default App
