import { ArrowLeftIcon, PencilLine, Sparkles } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Don't forget to fill in both fields! ✨");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note captured in your heart (and database)!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response?.status === 429) {
        toast.error("Slow down! Your thoughts are racing 💀", {
          duration: 4000,
          icon: "💖",
        });
      } else {
        toast.error("Failed to create note. Try again, love.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF5F7]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header Navigation */}
          <Link
            to={"/"}
            className="group flex items-center text-pink-600 font-medium hover:text-pink-800 transition-all font-serif italic mb-8"
          >
            <div className="bg-white p-2 rounded-full shadow-sm mr-3 group-hover:shadow-md transition-all">
              <ArrowLeftIcon className="size-5" />
            </div>
            Back to My Notes
          </Link>

          {/* Main Stationery Card */}
          <div className="relative bg-[#fffcf2] shadow-2xl rounded-sm border border-pink-100 overflow-hidden">
            {/* The "Margin" Line - Matching Detail Page */}
            <div className="absolute left-10 top-0 bottom-0 w-[2px] bg-pink-100/60" />

            <div className="pl-14 pr-8 py-10 md:pl-20 md:pr-16 md:py-16">
              <div className="flex items-center gap-3 mb-10">
                <div className="bg-pink-100 p-2.5 rounded-xl">
                  <PencilLine className="text-pink-500 size-5" />
                </div>
                <h2 className="text-2xl font-bold text-pink-900 font-serif italic">
                  New Thought
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Title Input - Borderless & Serif */}
                <div className="form-control w-full">
                  <label className="label pt-0 pb-1 px-2">
                    <span className="label-text text-pink-400 font-bold uppercase tracking-widest text-[9px]">
                      Note Title
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Give your thought a name..."
                    className="w-full bg-transparent border-none focus:ring-0 text-xl font-serif font-bold text-pink-900 placeholder:text-pink-100 p-2 transition-all"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Content Textarea - Borderless & Medium Weight */}
                <div className="form-control w-full">
                  <label className="label pt-0 pb-1 px-2">
                    <span className="label-text text-pink-400 font-bold uppercase tracking-widest text-[9px]">
                      Your Story
                    </span>
                  </label>
                  <textarea
                    placeholder="Write your heart out..."
                    className="w-full bg-transparent border-none focus:ring-0 text-lg text-pink-800/80 leading-relaxed min-h-[400px] p-2 font-medium resize-none placeholder:text-pink-100 transition-all"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                {/* Submit Section */}
                <div className="pt-8 border-t border-dashed border-pink-100 flex justify-end">
                  <button
                    type="submit"
                    className="btn h-14 px-12 bg-pink-500 hover:bg-pink-600 border-none text-white rounded-full shadow-lg transition-all active:scale-95 flex items-center min-w-[180px]"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner loading-sm mr-3"></span>
                        <span className="font-medium">Sealing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="size-5 mr-2" />
                        <span className="font-medium">Save Note</span>
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

export default CreatePage;
