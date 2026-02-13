import { Link } from "react-router-dom";
import { PlusCircle, StickyNote } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#ffccd5]">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-[#ffe5ec] p-2 rounded-xl group-hover:bg-[#ffc2d1] transition-colors">
              <StickyNote size={22} className="text-[#c9184a]" />
            </div>
            <h1 className="text-2xl font-black text-[#c9184a] font-mono tracking-tighter">
              Note<span className="text-[#ff758f]">IT</span>
            </h1>
          </Link>

          <Link
            to="/create"
            className="flex items-center gap-2 bg-[#c9184a] hover:bg-[#a4133c] text-white px-5 py-2 rounded-full font-bold text-sm transition-all shadow-md shadow-[#ffb3c1]/50 active:scale-95"
          >
            <PlusCircle size={18} />
            <span>Create Note</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
