export default function Loading({ isLoading = true }) {
  if (!isLoading) return null;
  return (
    <div className="absolute flex items-center justify-center h-screen w-full z-loader inset-0 backdrop-blur z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-l-0 border-b-0 border-2 border-blue-600 drop-shadow-xl" />
    </div>
  );
}
