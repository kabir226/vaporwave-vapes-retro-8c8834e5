import { Zap } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden">
      {/* Cercle de chargement avec dégradé tournant */}
      <div className="relative w-24 h-24">
        {/* Bordure tournante avec dégradé */}
        <div 
          className="absolute inset-0 rounded-full animate-spin"
          style={{
            background: 'conic-gradient(from 0deg, #ff00ff, #00ffff, #ff00ff)',
            animationDuration: '1.5s',
          }}
        />
        {/* Cercle intérieur noir */}
        <div className="absolute inset-1 rounded-full bg-[#0a0a0a]" />
        {/* Icône Zap au centre */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Zap className="w-10 h-10 text-white animate-pulse" fill="currentColor" />
        </div>
      </div>

      {/* Texte d'initialisation */}
      <p 
        className="mt-8 text-sm tracking-[0.3em] uppercase"
        style={{
          fontFamily: "'Orbitron', monospace",
          color: '#00ffff',
        }}
      >
        Initialisation du système...
      </p>
    </div>
  );
};

export default PageLoader;
