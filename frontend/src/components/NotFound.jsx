import { PencilLine, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-6 max-w-md mx-auto text-center animate-fade-in">
      {/* Icon with Soft Pink Background */}
      <div className="bg-pink-100 rounded-full p-10 shadow-inner ring-4 ring-pink-50">
        <PencilLine className="size-12 text-pink-500" />
      </div>

      <div className="space-y-2">
        <h3 className="text-3xl font-bold text-pink-900 font-serif">
          No notes yet
        </h3>
        <p className="text-pink-700/70 text-lg">
          Your creative space is empty. Write down your first thought and let it
          bloom!
        </p>
      </div>

      {/* Button */}
      <Link
        to="/create"
        className="btn bg-pink-500 hover:bg-pink-600 border-none text-white px-8 rounded-full shadow-lg transition-all hover:scale-105"
      >
        <PlusCircle className="size-5 mr-2" />
        Create Your First Note
      </Link>
    </div>
  );
};

export default NotFound;
