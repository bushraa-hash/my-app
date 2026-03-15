import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function AddSummary({ session }) {
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const handleAddSummary = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    try {
      const { error } = await supabase
        .from('summaries')
        .insert([
          { 
            title, 
            subject, 
            description, 
            file_url: fileUrl || null,
            user_id: session.user.id
          }
        ])

      if (error) throw error
      
      navigate('/my-summaries')
    } catch (error) {
      setErrorMsg(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-8 border border-gray-100 rounded-2xl shadow-sm">
      <div className="mb-8 border-b pb-4">
        <h2 className="text-3xl font-bold text-gray-900">إضافة ملخص جديد</h2>
        <p className="text-gray-500 mt-2">شارك معرفتك وأضف ملخصك للمادة الدراسية ليفيد زملائك.</p>
      </div>

      {errorMsg && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleAddSummary} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">اسم المادة</label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="مثال: فيزياء 101"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">عنوان الملخص</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="مثال: ملخص قوانين الحركة"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">الوصف التفصيلي</label>
          <textarea
            required
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all custom-scrollbar flex-grow resize-none"
            placeholder="اكتب وصفاً مختصراً عما يحتويه هذا الملخص والفصل الدراسي..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">رابط الملف (اختياري)</label>
          <input
            type="url"
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="https://example.com/file.pdf"
            dir="ltr"
          />
          <p className="text-xs text-gray-500 mt-1">يمكنك إضافة رابط لملف PDF مخزن على Google Drive أو أي مكان آخر.</p>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t mt-6">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            إلغاء
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 flex items-center transition-colors disabled:opacity-70"
          >
            {loading ? 'جاري الحفظ...' : 'نشر الملخص'}
          </button>
        </div>
      </form>
    </div>
  )
}
