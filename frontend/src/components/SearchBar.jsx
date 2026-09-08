import { Search } from "lucide-react";

function SearchBar({ searchText, setSearchText }) {
    return (
        <div className="max-w-sm mb-8">
            <form role="search" onSubmit={(e) => e.preventDefault()}>
                <div className="flex items-center border border-slate-800 rounded-2xl p-1 bg-slate-900 focus-within:border-blue-500 transition-all">
                    <label htmlFor="search" className="sr-only">Search</label>
                    <input type="search" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search..." className="flex-1 bg-transparent px-3 py-2 text-white placeholder-slate-500 focus:outline-none" />
                    <button type="submit" className="bg-blue-600 hover:bg-blue-500 rounded-xl px-3 py-2 transition-all">
                        <Search className="w-4 h-4 text-white"></Search>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SearchBar;