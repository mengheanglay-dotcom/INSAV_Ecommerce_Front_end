import { Link } from "react-router-dom";
export default function SectionHeading({ eyebrow, title, link = "Shop all" }) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {link && (
        <Link className="text-link" to="/products">
          {link} <span>→</span>
        </Link>
      )}
    </div>
  );
}
