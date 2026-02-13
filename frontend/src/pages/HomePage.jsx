import React from "react";
import api from "../lib/axios";

import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import RateLimitedUI from "../components/RateLimit";
import NotFound from "../components/NotFound";
import { LoaderIcon } from "lucide-react";

const HomePage = () => {
  const [isRateLimit, setIsRateLimit] = React.useState(false);
  const [notes, setNotes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        // console.log(res.data);s
        setNotes(res.data);
        setIsRateLimit(false);
      } catch (error) {
        console.error("Error fetching notes", error);
        if (error.response.status === 429) {
          setIsRateLimit(true);
        } else {
          toast.error("Failed fetching notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* 1. Priority: If Rate Limited, show this first */}
      {isRateLimit && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {/* 2. Secondary: If still fetching data, show ONLY the loader */}
        {loading ? (
          <div className=" flex justify-center items-center min-h-[400px]text-center text-pink-800 py-10 font-serif italic animate-pulse">
            <LoaderIcon className="animate-spin size-10 text-pink-400" />{" "}
            Gathering your thoughts...
          </div>
        ) : (
          /* 3. Final: Only check notes once loading is FALSE */
          <>
            {!isRateLimit && notes.length === 0 && <NotFound />}

            {!isRateLimit && notes.length > 0 && (
              <div className="m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map((note) => (
                  <NoteCard key={note._id} note={note} setNotes={setNotes} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
