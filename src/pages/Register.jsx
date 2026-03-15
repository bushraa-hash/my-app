import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    setSuccessMsg('')

    // 1. Sign up user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        }
      }
    })

    if (error) {
      setErrorMsg(error.message)
      setLoading(false)
      return
    }

    if (data.user) {
      // 2. Insert into profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          { id: data.user.id, name, email }
        ])
        
      if (profileError) {
        // Not critical if they are already signed up, but good to show
        console.error("Error creating profile:", profileError)
      }

      setSuccessMsg('تم إنشاء الحساب بنجاح! جاري تحويلك للصفحة الرئيسية...')
      setTimeout(() => navigate('/'), 2000)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 border border-gray-100 rounded-2xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">إنشاء حساب جديد</h2>
        <p className="text-gray-500">انضم لمنصة تفاعل الطلاب وشارك ملخصاتك</p>
      </div>

      {errorMsg && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm">
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-6 text-sm">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="أحمد محمد"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="you@example.com"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="••••••••"
            dir="ltr"
          />
          <p className="text-xs text-gray-500 mt-1">يجب أن تتكون من 6 أحرف على الأقل</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-70"
        >
          {loading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        لديك حساب بالفعل؟{' '}
        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
          تسجيل الدخول
        </Link>
      </div>
    </div>
  )
}
