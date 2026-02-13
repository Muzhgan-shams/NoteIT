import { ZapIcon, Clock, RefreshCw } from "lucide-react";

const RateLimitedUI = () => {
  // Function to refresh the page
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Container with soft Pink Stationery glow */}
      <div className="relative overflow-hidden bg-[#fffcf2] border border-pink-200 rounded-3xl shadow-xl shadow-pink-100/50">
        {/* Soft decorative background blurs in Pink */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-200/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-rose-200/20 blur-3xl rounded-full" />

        <div className="flex flex-col md:flex-row items-center p-8 relative z-10">
          {/* Icon Section with Pink Pulse Effect */}
          <div className="flex-shrink-0 relative mb-6 md:mb-0 md:mr-8">
            <div className="absolute inset-0 bg-pink-400 rounded-full animate-ping opacity-10" />
            <div className="relative bg-gradient-to-br from-pink-100 to-rose-50 p-6 rounded-2xl border border-pink-200 shadow-inner">
              <ZapIcon className="size-10 text-pink-500 fill-pink-500/10" />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <h3 className="text-2xl font-black tracking-tight text-pink-900 uppercase font-serif italic">
                Slow Down, Love
              </h3>
              <div className="badge border-pink-300 text-pink-600 badge-outline font-bold px-3 py-3">
                Rate Limit
              </div>
            </div>

            <p className="text-lg font-medium text-pink-800/80 leading-relaxed italic">
              You're moving a bit too fast! Take a deep breath while we prepare
              your space.
            </p>

            <div className="mt-6 flex flex-wrap justify-center md:justify-start items-center gap-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-pink-400">
                <Clock size={16} className="animate-pulse" />
                <span>Available again in a few seconds</span>
              </div>

              {/* Functional Refresh Button */}
              <button
                onClick={handleRefresh}
                className="btn bg-pink-500 hover:bg-pink-600 border-none text-white rounded-full px-8 shadow-lg hover:scale-105 transition-all flex items-center gap-2"
              >
                <RefreshCw size={16} />
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;
