import { Search } from 'lucide-react';

export const SearchBar = ({ value, onChange }) => {
  return (
    <div className="w-full max-w-xl mx-auto mb-10">
      <div className="relative group">
        {/* Glow effect on focus */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-400/20 via-purple-500/20 to-purple-400/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-all duration-500" />

        {/* Main search container */}
        <div className="relative bg-white/90 backdrop-blur-xl border border-purple-100/50 rounded-2xl shadow-xl shadow-purple-500/5 hover:shadow-purple-500/10 transition-all duration-300 group-focus-within:shadow-purple-500/15 group-focus-within:border-purple-300/50">
          <div className="flex items-center px-5 py-4">
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 mr-3 group-focus-within:from-purple-200 group-focus-within:to-purple-100 transition-all duration-300">
              <Search className="w-4 h-4 text-purple-500" />
            </div>
            <input
              type="text"
              placeholder="Search by title or category..."
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 outline-none text-base font-light tracking-wide"
            />
            {value && (
              <button
                onClick={() => onChange('')}
                className="p-2 rounded-lg hover:bg-purple-50 text-purple-400 hover:text-purple-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
