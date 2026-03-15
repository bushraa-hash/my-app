import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function Navbar({ session }) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-indigo-600">
              مكتبة الملخصات
            </Link>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">الرئيسية</Link>
            
            {session ? (
              <>
                <Link to="/add-summary" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">إضافة ملخص</Link>
                <Link to="/my-summaries" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">ملخصاتي</Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-md font-medium transition-colors"
                >
                  تسجيل خروج
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">تسجيل دخول</Link>
                <Link to="/register" className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md font-medium transition-colors">
                  إنشاء حساب
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
