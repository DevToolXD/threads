import type { ReactNode, SVGProps } from "react";

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & { size?: number; title?: string };

function Svg({
  size = 24,
  title,
  viewBox = "0 0 24 24",
  children,
  ...rest
}: IconProps & { viewBox?: string; children?: ReactNode }) {
  return (
    <svg
      role="img"
      aria-label={title}
      aria-hidden={title ? undefined : true}
      width={size}
      height={size}
      viewBox={viewBox}
      {...rest}
    >
      {children}
    </svg>
  );
}

/** Threads "@" logo mark (viewBox from the live site). */
export function ThreadsLogo({ size = 24, ...rest }: IconProps) {
  return (
    <Svg size={size} title="Threads" viewBox="0 0 375.61 375.61" fill="currentColor" {...rest}>
      <path d="M267.149,173.742c-.469-54.261-29.885-86.958-79.575-86.958-33.166,0-61.058,15.001-75.708,38.909l32.111,22.384c8.321-13.126,19.806-24.025,40.901-24.025,23.791,0,36.096,13.243,39.612,37.854-11.485-1.758-22.97-2.695-34.807-2.695-64.223,0-94.459,29.064-94.459,67.504,0,39.143,30.236,62.113,74.77,62.113,48.87,0,78.052-32.932,90.005-73.715,12.423,5.625,20.978,18.751,20.978,38.44,0,52.738-60.824,81.45-112.39,81.45-76.059,0-125.75-49.925-125.75-131.141,0-99.498,65.746-163.252,154.111-163.252,59.301,0,88.599,26.017,108.522,60.941l32.815-22.97C316.605,33.342,268.204.997,195.543.997,79.755.997,1,83.15,1,202.337c0,108.991,77.114,172.276,168.995,172.276,75.942,0,152.705-44.3,152.705-120.125,0-39.612-22.736-65.863-55.55-80.747ZM168.588,249.332c-16.759,0-31.525-7.969-31.525-22.619,0-23.087,28.361-30.119,56.136-30.119,10.548,0,20.861.703,30.002,2.696-6.563,30.002-26.017,50.042-54.613,50.042Z" />
    </Svg>
  );
}

export function HomeIcon({ active, ...p }: IconProps & { active?: boolean }) {
  return (
    <Svg title="홈" {...p}>
      {active ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="currentColor"
          d="M9.18887 1.96827C10.8324 0.653482 13.1676 0.65348 14.8111 1.96827L21.1235 7.01815C22.3096 7.96701 23 9.40357 23 10.9225V18C23 20.7614 20.7614 23 18 23H6C3.23858 23 1 20.7614 1 18V10.9225C1 9.40357 1.69045 7.96701 2.87652 7.01815L9.18887 1.96827Z"
        />
      ) : (
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          d="M10.4357 3.5298C11.3766 2.77712 12.6234 2.77712 13.5643 3.5298L19.8767 8.57969C20.5951 9.15442 21 9.98856 21 10.9225V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V10.9225C3 9.98856 3.40492 9.15442 4.12333 8.57969L10.4357 3.5298Z"
        />
      )}
    </Svg>
  );
}

export function PlusIcon(p: IconProps) {
  return (
    <Svg title="만들기" {...p}>
      <path
        fill="currentColor"
        d="M12 2C12.5523 2 13 2.44772 13 3V11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H13V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H11V3C11 2.44772 11.4477 2 12 2Z"
      />
    </Svg>
  );
}

export function SearchIcon({ active, ...p }: IconProps & { active?: boolean }) {
  return (
    <Svg title="검색" {...p}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 1C16.5228 1 21 5.47715 21 11C21 13.4013 20.1529 15.6043 18.7422 17.3281L22.707 21.293C23.0976 21.6835 23.0976 22.3165 22.707 22.707C22.3165 23.0976 21.6835 23.0976 21.293 22.707L17.3281 18.7422C15.6043 20.1529 13.4013 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1ZM11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3Z"
        stroke={active ? "currentColor" : undefined}
        strokeWidth={active ? 1 : undefined}
      />
    </Svg>
  );
}

export function MessageIcon(p: IconProps) {
  return (
    <Svg title="메시지" viewBox="0 0 22 20" {...p}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5996 9.9625e-07C15.7031 9.9625e-07 16.5914 -0.000958957 17.3086 0.057621C18.0372 0.117151 18.6774 0.243311 19.2695 0.544921C20.2103 1.02428 20.9757 1.78968 21.4551 2.73047L21.5605 2.9541C21.7877 3.48344 21.8903 4.05359 21.9424 4.69141C22.001 5.40857 22 6.29682 22 7.40039V12.5996C22 13.7032 22.001 14.5914 21.9424 15.3086C21.8903 15.9464 21.7876 16.5166 21.5605 17.0459L21.4551 17.2695C20.9757 18.2103 20.2103 18.9757 19.2695 19.4551C18.6774 19.7567 18.0372 19.8829 17.3086 19.9424C16.5914 20.001 15.7031 20 14.5996 20H7.40039C6.29689 20 5.40854 20.001 4.69141 19.9424C4.05366 19.8903 3.4834 19.7877 2.9541 19.5605L2.73047 19.4551C1.78972 18.9757 1.02427 18.2103 0.544919 17.2695C0.243289 16.6774 0.117159 16.0373 0.057619 15.3086C-0.000973027 14.5914 1.00856e-06 13.7032 1.00856e-06 12.5996V7.40039C1.00856e-06 6.29683 -0.000970028 5.40857 0.057619 4.69141C0.117149 3.96274 0.243299 3.32264 0.544919 2.73047C1.02427 1.78971 1.78973 1.02429 2.73047 0.544921C3.32262 0.243291 3.96277 0.117161 4.69141 0.057621C5.40854 -0.000968955 6.29689 9.9625e-07 7.40039 9.9625e-07H14.5996ZM2 12.5996C2 13.736 2.00041 14.5287 2.05078 15.1455C2.10022 15.7506 2.19298 16.099 2.32715 16.3623C2.6147 16.9265 3.07353 17.3853 3.6377 17.6729L3.74121 17.7217C3.99241 17.8298 4.32523 17.906 4.85449 17.9492C5.47126 17.9996 6.26405 18 7.40039 18H14.5996C15.7359 18 16.5287 17.9996 17.1455 17.9492C17.7505 17.8998 18.0989 17.807 18.3623 17.6729C18.9265 17.3853 19.3853 16.9265 19.6728 16.3623L19.7217 16.2588C19.8298 16.0076 19.906 15.6748 19.9492 15.1455C19.9996 14.5287 20 13.736 20 12.5996V7.77246L11.5263 12.8574C11.2097 13.0474 10.8137 13.0474 10.4971 12.8574L2 7.75879V12.5996ZM7.40039 2C6.26405 2 5.47126 2.00041 4.85449 2.05078C4.24943 2.10023 3.90103 2.19298 3.6377 2.32715C3.07354 2.61473 2.6147 3.07352 2.32715 3.6377C2.19299 3.90104 2.10022 4.2494 2.05078 4.85449C2.0362 5.03305 2.02597 5.22637 2.01856 5.43848L2.02637 5.44238L11.0117 10.833L19.9805 5.45117C19.973 5.23408 19.9641 5.0366 19.9492 4.85449C19.906 4.32513 19.8298 3.99244 19.7217 3.74121L19.6728 3.6377C19.3853 3.07349 18.9265 2.61472 18.3623 2.32715C18.0989 2.193 17.7506 2.10022 17.1455 2.05078C16.5287 2.00042 15.7359 2 14.5996 2H7.40039Z"
      />
    </Svg>
  );
}

const HEART_OUTLINE =
  "M16.5 2C14.8335 2 13.2217 2.70703 12 3.93652C10.7783 2.70704 9.1665 2 7.5 2C3.3785 2 0.5 5.08423 0.5 9.5C0.5 14.1284 4.84516 19.4619 11.311 22.7719C11.5267 22.8827 11.7633 22.9379 12 22.9379C12.2367 22.9379 12.4733 22.8827 12.689 22.7719C19.1548 19.4619 23.5 14.1284 23.5 9.5C23.5 5.08423 20.6217 2 16.5 2ZM12 20.8764C6.30767 17.8962 2.5 13.3467 2.5 9.5C2.5 6.15893 4.4625 4 7.5 4C9.5 4 11.25 5.75 12 7.5C12.75 5.75 14.5 4 16.5 4C19.5377 4 21.5 6.15893 21.5 9.5C21.5 13.3467 17.6923 17.8962 12 20.8764Z";
const HEART_FILLED =
  "M16.5 2C14.8335 2 13.2217 2.70703 12 3.93652C10.7783 2.70704 9.1665 2 7.5 2C3.3785 2 0.5 5.08423 0.5 9.5C0.5 14.1284 4.84516 19.4619 11.311 22.7719C11.5267 22.8827 11.7633 22.9379 12 22.9379C12.2367 22.9379 12.4733 22.8827 12.689 22.7719C19.1548 19.4619 23.5 14.1284 23.5 9.5C23.5 5.08423 20.6217 2 16.5 2Z";

export function HeartIcon({ filled, ...p }: IconProps & { filled?: boolean }) {
  return (
    <Svg title={filled ? "좋아요 취소" : "좋아요"} {...p}>
      <path fill="currentColor" d={filled ? HEART_FILLED : HEART_OUTLINE} />
    </Svg>
  );
}

export function ProfileIcon({ active, ...p }: IconProps & { active?: boolean }) {
  return (
    <Svg title="프로필" {...p}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9997 1C15.0373 1 17.4997 3.46244 17.4997 6.5C17.4997 9.53756 15.0373 12 11.9997 12C8.9622 11.9998 6.49967 9.53745 6.49967 6.5C6.49967 3.46255 8.9622 1.00018 11.9997 1ZM11.9997 3C10.0668 3.00018 8.49967 4.56711 8.49967 6.5C8.49967 8.43289 10.0668 9.99982 11.9997 10C13.9327 10 15.4997 8.433 15.4997 6.5C15.4997 4.567 13.9327 3 11.9997 3Z"
        stroke={active ? "currentColor" : undefined}
        strokeWidth={active ? 1 : undefined}
      />
      <path
        fill="currentColor"
        d="M11.9997 14C16.9121 14 21.0591 17.2609 22.4538 21.7002C22.6193 22.2271 22.3263 22.7886 21.7995 22.9541C21.2727 23.1194 20.7111 22.8266 20.5456 22.2998C19.4022 18.6603 16.0038 16 11.9997 16C7.99569 16.0001 4.5971 18.6603 3.45377 22.2998C3.28818 22.8266 2.72671 23.1196 2.19986 22.9541C1.67323 22.7884 1.38015 22.2269 1.54557 21.7002C2.94019 17.2609 7.0873 14.0001 11.9997 14Z"
      />
    </Svg>
  );
}

export function InsightsIcon(p: IconProps) {
  return (
    <Svg title="인사이트" {...p}>
      <rect x="2" y="2" width="20" height="20" rx="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path
        fill="currentColor"
        d="M7.5 13C8.05229 13 8.5 13.4477 8.5 14V17C8.5 17.5523 8.05229 18 7.5 18C6.94772 18 6.5 17.5523 6.5 17V14C6.5 13.4477 6.94772 13 7.5 13ZM12 6C12.5523 6 13 6.44772 13 7V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V7C11 6.44772 11.4477 6 12 6ZM16.5 10C17.0523 10 17.5 10.4477 17.5 11V17C17.5 17.5523 17.0523 18 16.5 18C15.9477 18 15.5 17.5523 15.5 17V11C15.5 10.4477 15.9477 10 16.5 10Z"
      />
    </Svg>
  );
}

export function MenuIcon(p: IconProps) {
  return (
    <Svg title="더 보기" {...p}>
      <path
        fill="currentColor"
        d="M19.25 16C19.9404 16 20.5 16.5596 20.5 17.25C20.5 17.9404 19.9404 18.5 19.25 18.5H4.25C3.55964 18.5 3 17.9404 3 17.25C3 16.5596 3.55964 16 4.25 16H19.25ZM19.25 6C19.9404 6 20.5 6.55964 20.5 7.25C20.5 7.94036 19.9404 8.5 19.25 8.5H4.25C3.55964 8.5 3 7.94036 3 7.25C3 6.55964 3.55964 6 4.25 6H19.25Z"
      />
    </Svg>
  );
}

export function MoreIcon(p: IconProps) {
  return (
    <Svg title="더 보기" {...p}>
      <circle cx="5" cy="12" r="1.6" fill="currentColor" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <circle cx="19" cy="12" r="1.6" fill="currentColor" />
    </Svg>
  );
}

export function CommentIcon(p: IconProps) {
  return (
    <Svg title="댓글" {...p}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
      />
    </Svg>
  );
}

export function RepostIcon({ active, ...p }: IconProps & { active?: boolean }) {
  return (
    <Svg title="리포스트" {...p}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth={active ? 2.4 : 2}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7H8a4 4 0 0 0-4 4v1M5 17h11a4 4 0 0 0 4-4v-1M16 3.5 19.5 7 16 10.5M8 13.5 4.5 17 8 20.5"
      />
    </Svg>
  );
}

export function ShareIcon(p: IconProps) {
  return (
    <Svg title="공유하기" {...p}>
      <line x1="22" y1="3" x2="9.218" y2="10.083" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <polygon
        points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function VerifiedBadge({ size = 14 }: { size?: number }) {
  return (
    <svg role="img" aria-label="인증된 계정" width={size} height={size} viewBox="0 0 40 40" className="shrink-0">
      <path
        fill="#0095f6"
        d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Z"
      />
      <path
        fill="#fff"
        d="m13.349 20.456 4.455 4.56 9.02-9.275-1.37-1.37-7.65 7.869-3.09-3.16-1.365 1.376Z"
      />
    </svg>
  );
}

export function CloseIcon(p: IconProps) {
  return (
    <Svg title="닫기" {...p}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        d="M5 5l14 14M19 5 5 19"
      />
    </Svg>
  );
}

export function ChevronLeftIcon(p: IconProps) {
  return (
    <Svg title="뒤로" {...p}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 4 7 12l8 8"
      />
    </Svg>
  );
}

export function ImageIcon(p: IconProps) {
  return (
    <Svg title="이미지" {...p}>
      <rect x="2.5" y="3.5" width="19" height="17" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="9" cy="9.5" r="1.8" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="m3 17 5.5-5 4 3.5 3-2.5L21 17" />
    </Svg>
  );
}

export function PersonPlusIcon(p: IconProps) {
  return (
    <Svg title="팔로우" {...p}>
      <circle cx="10" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M2.5 21c.9-4 3.7-6 7.5-6M18 14v7M14.5 17.5h7" />
    </Svg>
  );
}
