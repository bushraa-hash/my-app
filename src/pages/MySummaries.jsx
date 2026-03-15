import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import SummaryCard from '../components/SummaryCard'
import { Link } from 'react-router-dom'

export default function MySummaries({ session }) {
  const [summaries, setSummaries] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    fetchMySummaries()
  }, [session])

  const fetchMySummaries = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('summaries')
        .select(`
          *,
          profiles (name)
        `)
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setSummaries(data)
    } catch (error) {
      setErrorMsg(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("هل أنت متأكد من رغبتتك بحذف هذا الملخص؟")
    if (!confirmDelete) return

    try {
      const { error } = await supabase
        .from('summaries')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      setSummaries(summaries.filter(s => s.id !== id))
    } catch (error) {
      alert("حدث خطأ أثناء الحذف: " + error.message)
    }
  }

  if (loading) return <div className="text-center py-12">جاري تحميل ملخصاتي...</div>
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8 pb-4 border-b">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ملخصاتي الشخصية</h1>
          <p className="text-gray-500">إدارة الملخصات التي قمت برفعها ومشاركتها مع زملائك.</p>
        </div>
        <Link 
          to="/add-summary" 
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          + أضف ملخصاً
        </Link>
      </div>

      {errorMsg && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {errorMsg}
        </div>
      )}

      {summaries.length === 0 ? (
        <div className="text-center bg-white p-12 rounded-xl border border-gray-100 shadow-sm">
          <div className="text-indigo-200 mb-4 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">لم تقم بإضافة أي ملخصات بعد</h3>
          <p className="text-gray-500 mb-6">ابدأ الآن بمشاركة معرفتك وإفادة زملائك.</p>
          <Link to="/add-summary" className="text-indigo-600 font-medium hover:underline">
            إضافة ملخصك الأول
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {summaries.map(summary => (
            <SummaryCard 
              key={summary.id} 
              summary={summary} 
              isOwner={true}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
