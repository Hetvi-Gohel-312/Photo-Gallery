import { Heart, Search, Camera } from 'lucide-react';

export const Navbar = ({ favoritesCount, searchValue, onSearchChange }) => {
  return (
    <nav className="fixed inset-x-4 top-4 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-white/60 bg-white/70 backdrop-blur-3xl shadow-[0_32px_80px_-40px_rgba(15,23,42,0.18)]">
          <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#8B5CF6]/10 text-[#8B5CF6] shadow-[0_18px_40px_-28px_rgba(139,92,246,0.4)]">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-500">Fashion Gallery</p>
                <h1 className="text-base font-semibold tracking-tight text-slate-950">Hetvi's Luxury Edit</h1>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 min-w-0">
              <div className="relative rounded-[28px] border border-slate-200/70 bg-white/60 shadow-sm shadow-slate-900/10 transition-all duration-300 focus-within:border-[#8B5CF6] focus-within:ring-1 focus-within:ring-[#8B5CF6]/20">
                <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                  <Search className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search fashion by title or category..."
                  value={searchValue}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full rounded-[28px] border-none bg-transparent py-3 pl-12 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-500 outline-none"
                />
              </div>
            </div>

            {/* Favorites */}
            <div className="inline-flex items-center gap-2 rounded-[28px] border border-slate-200/70 bg-white/65 px-4 py-3 shadow-sm shadow-slate-900/10">
              <Heart className="w-4 h-4 text-[#8B5CF6]" />
              <span className="text-sm font-semibold text-slate-700">{favoritesCount}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
