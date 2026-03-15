import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import SummaryCard from '../components/SummaryCard'

export default function Home() {
  const [summaries, setSummaries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchSummaries()
  }, [])

  const fetchSummaries = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('summaries')
        .select(`
          *,
          profiles (name)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setSummaries(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-12">جاري تحميل الملخصات...</div>
  if (error) return <div className="text-red-500 text-center py-12">خطأ: {error}</div>

  return (
    <div>
      <div className="mb-8 text-center bg-indigo-50 rounded-2xl p-10">
        <h1 className="text-4xl font-extrabold text-indigo-900 mb-4">أهلاً بك في منصة مشاركة ملخصات الطلاب</h1>
        <p className="text-lg text-indigo-700 max-w-2xl mx-auto">
          المكان الأفضل لمشاركة واستكشاف الملخصات الدراسية مع زملائك. ابحث، شارك، واستفد.
        </p>
      </div>

      <div className="flex justify-between items-end mb-6">
        <h2 className="text-2xl font-bold text-gray-800">أحدث الملخصات</h2>
        <span className="text-gray-500 text-sm">{summaries.length} ملخص متوفر</span>
      </div>

      {summaries.length === 0 ? (
        <div className="text-center text-gray-500 py-12 border-2 border-dashed border-gray-200 rounded-xl">
          لا توجد ملخصات متاحة حالياً. كن أول من يضيف ملخصاً!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {summaries.map(summary => (
            <SummaryCard key={summary.id} summary={summary} />
          ))}
        </div>
      )}
    </div>
  )
}
