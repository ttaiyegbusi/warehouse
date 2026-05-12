export default function Skel({ w, h = 16, className = "" }) {
  return <div className={`skeleton ${className}`} style={{ width: w, height: h }} />;
}
