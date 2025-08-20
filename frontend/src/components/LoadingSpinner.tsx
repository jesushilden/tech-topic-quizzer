export function LoadingSpinner() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Loading Tech Quiz
        </h2>
        <p className="text-gray-600">
          Generating questions for a random tech topic...
        </p>
      </div>
    </div>
  );
}
