export default function AnimatedBackgroundShapes() {
  return (
    <div className="relative w-full max-w-lg">
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter opacity-70 animate-blob ease-in-out blur-xl"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter opacity-70 animate-blob animation-delay-2000 ease-in-out blur-xl"></div>
      <div className="absolute left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter opacity-70 animate-blob animation-delay-4000 ease-in-out blur-xl"></div>
    </div>
  );
}
