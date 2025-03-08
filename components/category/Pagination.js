import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

function Pagination({ pagination, handlePageChange, isRTL }) {
  if (!pagination || pagination.last_page <= 1) return null;

  const { current_page, last_page } = pagination;

  return (
    <div className="flex items-center justify-center gap-2 my-6">
      {/* زر الانتقال إلى أول صفحة */}
      <button
        onClick={() => handlePageChange(1)}
        disabled={current_page === 1}
        className="p-2 border rounded disabled:opacity-50"
      >
        {/* إذا كان RTL، استخدم أيقونة تشير لليمين، وإلا تشير لليسار */}
        {isRTL ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
      </button>

      {/* زر الصفحة السابقة */}
      <button
        onClick={() => handlePageChange(current_page - 1)}
        disabled={current_page === 1}
        className="p-2 border rounded disabled:opacity-50"
      >
        {isRTL ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      {/* أزرار الصفحات (1..last_page) */}
      {Array.from({ length: last_page }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 border rounded 
            ${page === current_page ? "bg-primaryGreen text-white" : ""}
          `}
        >
          {page}
        </button>
      ))}

      {/* زر الصفحة التالية */}
      <button
        onClick={() => handlePageChange(current_page + 1)}
        disabled={current_page === last_page}
        className="p-2 border rounded disabled:opacity-50"
      >
        {isRTL ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      {/* زر الانتقال إلى آخر صفحة */}
      <button
        onClick={() => handlePageChange(last_page)}
        disabled={current_page === last_page}
        className="p-2 border rounded disabled:opacity-50"
      >
        {isRTL ? <ChevronsLeft size={18} /> : <ChevronsRight size={18} />}
      </button>
    </div>
  );
}

export default Pagination;
