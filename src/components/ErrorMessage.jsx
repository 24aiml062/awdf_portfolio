function ErrorMessage({ message, onRetry }) {
  return (
    <div style={{ padding: '15px', background: '#3b1212', border: '1px solid #731e1e', borderRadius: '6px', margin: '15px 0' }}>
      <p style={{ color: '#ff6b6b', margin: '0 0 10px 0' }}>Error: {message}</p>
      {onRetry && (
        <button onClick={onRetry} style={{ background: '#731e1e' }}>
          Retry
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
