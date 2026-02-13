import { PenSquareIcon, Trash2Icon, Paperclip } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Discard this thought? 🌸")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      toast.success("Note removed");
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="group relative block transition-transform duration-300 hover:-rotate-1 hover:scale-[1.02]"
    >
      {/* The "Tape" effect at the top */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-pink-200/50 backdrop-blur-sm z-10 rounded-sm rotate-2 shadow-sm border border-white/30" />

      <div className="h-full bg-[#fffcf2] p-6 shadow-[5px_5px_0px_0px_rgba(244,172,183,0.3)] border border-pink-100 rounded-sm relative overflow-hidden">
        {/* Notebook Lines Decorative Element */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-pink-200/30" />

        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-pink-900 font-serif decoration-pink-200 decoration-2 underline-offset-4 group-hover:underline">
              {note.title}
            </h3>
            <Paperclip className="size-4 text-pink-300 -rotate-45" />
          </div>

          <p className="text-pink-800/80 font-medium leading-relaxed line-clamp-4 flex-grow italic mb-4">
            {note.content}
          </p>

          <div className="flex justify-between items-center pt-3 border-t border-dashed border-pink-200">
            <span className="text-[10px] uppercase tracking-tighter text-pink-400 font-bold">
              {formatDate(new Date(note.createdAt))}
            </span>

            <div className="flex gap-1">
              <div className="p-1.5 text-pink-300 group-hover:text-pink-500 transition-colors">
                <PenSquareIcon className="size-4" />
              </div>
              <button
                className="p-1.5 text-pink-200 hover:text-red-400 transition-colors"
                onClick={(e) => handleDelete(e, note._id)}
              >
                <Trash2Icon className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
