export default function LoadingSpinner() {
    return (
      <div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }