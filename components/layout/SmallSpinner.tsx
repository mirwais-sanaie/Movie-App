function SmallSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-transparent" />
    </div>
  );
}

export default SmallSpinner;
