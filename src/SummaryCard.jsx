export default function SummaryCard({ summary, isOwner, onDelete, onEdit }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('ar-EG', options)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full mb-2">
              {summary.subject}
            </span>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{summary.title}</h3>
            <p className="text-sm text-gray-500">
              بواسطة: {summary.profiles?.name || 'مستخدم مجهول'} • {formatDate(summary.created_at)}
            </p>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6 line-clamp-3">
          {summary.description}
        </p>

        <div className="flex items-center justify-between border-t pt-4">
          {summary.file_url ? (
            <a
              href={summary.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 font-medium hover:text-indigo-800 flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              تحميل الملف
            </a>
          ) : (
            <span className="text-gray-400 text-sm">نص فقط</span>
          )}

          {isOwner && (
            <div className="flex gap-2">
              <button
                onClick={() => onDelete(summary.id)}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                حذف
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
