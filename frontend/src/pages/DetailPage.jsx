import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { Paperclip } from "lucide-react";
import {
  ArrowLeftIcon,
  LoaderIcon,
  Trash2Icon,
  SaveIcon,
  Heart,
} from "lucide-react";

const DetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error("Failed to fetch your note 🌸");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to discard this thought?"))
      return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note drifted away...");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("A thought needs both a title and a body!");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Changes saved beautifully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF5F7] flex items-center justify-center">
        <LoaderIcon className="animate-spin size-12 text-pink-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF5F7] pb-12">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <Link
              to="/"
              className="group flex items-center text-pink-600 font-medium hover:text-pink-800 transition-all font-serif italic text-lg"
            >
              <div className="bg-white p-2 rounded-full shadow-sm mr-3 group-hover:shadow-md transition-all">
                <ArrowLeftIcon className="h-5 w-5" />
              </div>
              Back to Collection
            </Link>

            <button
              onClick={handleDelete}
              className="btn btn-ghost text-pink-300 hover:text-red-500 hover:bg-red-50 rounded-full px-4"
            >
              <Trash2Icon className="h-4 w-4 mr-2" />
              Delete
            </button>
          </div>

          <div className="relative bg-[#fffcf2] shadow-2xl rounded-sm border border-pink-100 overflow-hidden">
            <div className="absolute left-10 top-0 bottom-0 w-[2px] bg-pink-100/60" />

            <div className="pl-14 pr-8 py-10 md:pl-20 md:pr-16 md:py-16">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Heart className="text-pink-400 fill-pink-400 size-4" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-pink-400 font-bold">
                    Editing Thought
                  </span>
                </div>
                <Paperclip className="size-5 text-pink-200 -rotate-45" />
              </div>

              <form className="space-y-8">
                <div className="form-control">
                  <label className="label pt-0 pb-1 px-2">
                    <span className="label-text text-pink-200 font-bold uppercase tracking-widest text-[9px]">
                      Title
                    </span>
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-none focus:ring-0 text-3xl font-serif font-bold text-pink-900 placeholder:text-pink-100 p-2"
                    value={note.title}
                    onChange={(e) =>
                      setNote({ ...note, title: e.target.value })
                    }
                  />
                </div>

                <div className="form-control">
                  <label className="label pt-0 pb-1 px-2">
                    <span className="label-text text-pink-200 font-bold uppercase tracking-widest text-[9px]">
                      Content
                    </span>
                  </label>
                  <textarea
                    className="w-full bg-transparent border-none focus:ring-0 text-lg text-pink-800/80 leading-relaxed min-h-[400px] p-2 font-medium resize-none"
                    value={note.content}
                    onChange={(e) =>
                      setNote({ ...note, content: e.target.value })
                    }
                  />
                </div>

                <div className="flex justify-end pt-8 border-t border-dashed border-pink-100">
                  <button
                    className="btn h-12 bg-pink-500 hover:bg-pink-600 border-none text-white px-10 rounded-full shadow-lg transition-all hover:scale-105 flex items-center min-w-[180px]"
                    disabled={saving}
                    onClick={handleSave}
                  >
                    {saving ? (
                      <>
                        <span className="loading loading-spinner loading-sm mr-2"></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <SaveIcon className="size-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
