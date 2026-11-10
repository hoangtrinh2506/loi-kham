import { To, useLocation, useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "./icons";

interface BackLinkProps {
  label: string;
  /** Destination; omit to go back in history (or home when there is none) */
  to?: To;
  className?: string;
}

export default function BackLink({
  label,
  to,
  className = "text-primary-dark",
}: BackLinkProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    if (to !== undefined) {
      navigate(to, { viewTransition: true });
    } else if (location.key === "default") {
      navigate("/", { viewTransition: true });
    } else {
      navigate(-1 as To, { viewTransition: true });
    }
  };

  return (
    <button
      type="button"
      onClick={goBack}
      className={`inline-flex items-center gap-1 min-h-11 self-start text-base font-semibold ${className}`}
    >
      <ChevronLeftIcon size={20} />
      <span>{label}</span>
    </button>
  );
}
