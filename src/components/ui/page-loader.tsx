const PageLoader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background overflow-hidden">
      {/* Cercle de chargement simple */}
      <div className="w-12 h-12 rounded-full border-4 border-muted border-t-primary animate-spin" />
      
      {/* Texte */}
      <p className="mt-6 text-muted-foreground text-sm tracking-widest uppercase font-medium">
        Chargement...
      </p>
    </div>
  );
};

export default PageLoader;
