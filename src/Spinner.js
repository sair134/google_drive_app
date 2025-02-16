export default function Spinner({ bg, message }) {
    return (
      <div
        className="spin-page"
        style={{ background: bg ? bg : "rgba(0, 0, 0, 0.3)" }}
      >
        <div className="spinner"></div>
        {message && <p>Uploading {message} %</p>}
      </div>
    );
  }
  