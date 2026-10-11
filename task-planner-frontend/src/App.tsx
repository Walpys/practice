import {  RouterProvider } from 'react-router-dom'

import './App.css'
import { router } from './routes'

function App() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <RouterProvider router={router} />
    </div>
  )
}

export default App