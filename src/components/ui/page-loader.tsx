const PageLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background overflow-hidden">
      <div className="flex flex-col items-center gap-6">
        {/* Logo animé */}
        <div className="relative">
          <span className="text-primary font-black text-4xl md:text-5xl tracking-wider italic animate-pulse">
            SNUSPEDIA
          </span>
          {/* Glow effect */}
          <div className="absolute inset-0 blur-xl bg-primary/30 -z-10 animate-pulse" />
        </div>

        {/* Barre de chargement animée */}
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full animate-loading-bar" />
        </div>

        {/* Texte avec animation */}
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <span className="animate-fade-in">Chargement</span>
          <span className="flex gap-1">
            <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
            <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
            <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
          </span>
        </div>
      </div>

      {/* CSS for loading bar animation */}
      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
