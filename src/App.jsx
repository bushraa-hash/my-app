import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './supabaseClient'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AddSummary from './pages/AddSummary'
import MySummaries from './pages/MySummaries'

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center h-screen">جاري التحميل...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar session={session} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!session ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!session ? <Register /> : <Navigate to="/" />} />
          <Route path="/add-summary" element={session ? <AddSummary session={session} /> : <Navigate to="/login" />} />
          <Route path="/my-summaries" element={session ? <MySummaries session={session} /> : <Navigate to="/login" />} />
        </Routes>
      </main>
      <footer className="bg-white border-t py-6 text-center text-gray-500 text-sm mt-auto">
        &copy; {new Date().getFullYear()} منصة مشاركة ملخصات الطلاب. جميع الحقوق محفوظة.
      </footer>
    </div>
  )
}

export default App
