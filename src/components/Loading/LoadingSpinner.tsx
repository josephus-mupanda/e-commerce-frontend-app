const LoadingSpinner = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-orange-100 border-t-[#FF8533]"
        aria-label="Loading"
      />
    </div>
  );
};

export default LoadingSpinner;
