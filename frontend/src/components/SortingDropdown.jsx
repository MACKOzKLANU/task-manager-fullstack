function SortingDropdown({ isDropdownOpen, setIsDropdownOpen, sortBy, setSortBy }) {
    const sortLabels = {
        'date-desc': 'Newest first',
        'date-asc': 'Oldest first',
        'name-asc': 'Name A-Z',
        'name-desc': 'Name Z-A',
    };
    
    return (
        <div className="mb-5 relative">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="bg-blue-600 hover:bg-blue-500 rounded-xl px-3 py-2 transition-all">{sortLabels[sortBy]}</button>
            {isDropdownOpen &&
                <div className="mt-2 flex z-50 absolute flex-col border border-slate-800 rounded-2xl p-1 bg-slate-900 transition-all w-48">
                    <button onClick={() => { setSortBy('date-desc'); setIsDropdownOpen(false); }} className="bg-slate-800 rounded-2xl p-1 text-white hover:bg-slate-700 transition-all w-full mb-1">
                        Newest first
                    </button>
                    <button onClick={() => { setSortBy('date-asc'); setIsDropdownOpen(false); }} className="bg-slate-800 rounded-2xl p-1 text-white hover:bg-slate-700 transition-all w-full mb-1">
                        Oldest first
                    </button>
                    <button onClick={() => { setSortBy('name-asc'); setIsDropdownOpen(false); }} className="bg-slate-800 rounded-2xl p-1 text-white hover:bg-slate-700 transition-all w-full mb-1">
                        Name A-Z
                    </button>
                    <button onClick={() => { setSortBy('name-desc'); setIsDropdownOpen(false); }} className="bg-slate-800 rounded-2xl p-1 text-white hover:bg-slate-700 transition-all w-full mb-1">
                        Name Z-A
                    </button>
                </div>}
        </div>
    )
}

export default SortingDropdown;