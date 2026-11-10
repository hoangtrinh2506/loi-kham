import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function StrokeIcon({ size = 22, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="flex-none"
      {...props}
    >
      {children}
    </svg>
  );
}

export const SearchIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </StrokeIcon>
);

export const PhoneIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  </StrokeIcon>
);

export const AlertIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
    <path d="M12 9v4M12 17h.01" />
  </StrokeIcon>
);

export const ClockIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </StrokeIcon>
);

export const CameraIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </StrokeIcon>
);

export const MapPinIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </StrokeIcon>
);

export const DirectionsIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M3 11l19-9-9 19-2-8-8-2z" />
  </StrokeIcon>
);

export const GlobeIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
  </StrokeIcon>
);

export const LockIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </StrokeIcon>
);

export const ChevronLeftIcon = (props: IconProps) => (
  <StrokeIcon strokeWidth={2.2} {...props}>
    <path d="M15 18l-6-6 6-6" />
  </StrokeIcon>
);
