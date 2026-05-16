'use client';

export default function FloatingOrbs() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Orb 1 - Blue */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-500/10 dark:bg-blue-500/15 blur-[120px] animate-float" />
      {/* Orb 2 - Purple */}
      <div className="absolute bottom-[5%] right-[-5%] w-[400px] h-[400px] rounded-full bg-purple-500/8 dark:bg-purple-500/12 blur-[100px] animate-float-delayed" />
      {/* Orb 3 - Cyan */}
      <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-cyan-500/6 dark:bg-cyan-500/10 blur-[80px] animate-float-slow" />
      {/* Orb 4 - Pink */}
      <div className="absolute bottom-[30%] left-[10%] w-[350px] h-[350px] rounded-full bg-pink-500/6 dark:bg-pink-500/10 blur-[90px] animate-float" />
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, #0070f3 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
}
