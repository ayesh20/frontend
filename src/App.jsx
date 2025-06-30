import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductCard from './components/productCard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminPage from './pages/adminPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <>
      <div className="w-full h-full flex justify-center items-center">

<Routes parth="/">
    <Route path="/admin" element={<AdminPage></AdminPage>}></Route>


</Routes>
      cd

        </div>
    </>
    </BrowserRouter>
  )
}

export default App
