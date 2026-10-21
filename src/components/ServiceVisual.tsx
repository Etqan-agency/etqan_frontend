import { canonicalServiceSlug } from "@/lib/data";

/**
 * Brand illustration for a service, drawn in SVG instead of stock photography: an ETQAN-navy stage with a
 * stylised product mockup per discipline. Fills its parent at any aspect ratio: the mockup scales to fit inside it
 * and the stage (backdrop, glows, dots) extends past the artboard to cover the rest.
 */

const NAVY = "#151934";
const INK = "#0d1026";
const PRIMARY = "#034c88";
const SKY = "#4dc1e3";
const BLUE = "#2a7bc0";
const PAPER = "#f6f8fb";
const MIST = "#e9eff6";
const LINE = "#c9d5e3";

export default function ServiceVisual({ slug, title, className = "" }: { slug: string; title: string; className?: string }) {
  const id = `sv-${canonicalServiceSlug(slug)}`;
  const Scene = SCENES[canonicalServiceSlug(slug)] ?? WebScene;
  return (
    <svg viewBox="60 60 720 470" preserveAspectRatio="xMidYMid meet" role="img" aria-label={title} className={`absolute inset-0 h-full w-full ${className}`}>
      <defs>
        <radialGradient id={`${id}-glow1`} gradientUnits="userSpaceOnUse" cx="640" cy="90" r="480">
          <stop offset="0" stopColor={SKY} stopOpacity="0.45" />
          <stop offset="1" stopColor={SKY} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-glow2`} gradientUnits="userSpaceOnUse" cx="80" cy="570" r="560">
          <stop offset="0" stopColor={PRIMARY} stopOpacity="0.9" />
          <stop offset="1" stopColor={PRIMARY} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-brand`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={PRIMARY} />
          <stop offset="1" stopColor={SKY} />
        </linearGradient>
        <pattern id={`${id}-dots`} width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#fff" fillOpacity="0.08" />
        </pattern>
        <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#000" floodOpacity="0.35" />
        </filter>
      </defs>
      {[NAVY, `url(#${id}-glow2)`, `url(#${id}-glow1)`, `url(#${id}-dots)`].map((fill) => (
        <rect key={fill} x="-1600" y="-1200" width="4000" height="3000" fill={fill} />
      ))}
      <Scene id={id} />
    </svg>
  );
}

type SceneProps = { id: string };

/** Browser window with a landing-page layout, and a code editor floating over it. */
function WebScene({ id }: SceneProps) {
  return (
    <g>
      <g filter={`url(#${id}-shadow)`}>
        <rect x="90" y="96" width="560" height="380" rx="14" fill={PAPER} />
        <path d="M90 110a14 14 0 0 1 14-14h532a14 14 0 0 1 14 14v26H90z" fill={MIST} />
        <circle cx="114" cy="116" r="5" fill="#ff6b6b" />
        <circle cx="132" cy="116" r="5" fill="#ffc94d" />
        <circle cx="150" cy="116" r="5" fill="#4cd07d" />
        <rect x="250" y="107" width="240" height="18" rx="9" fill="#fff" />
        {/* page nav */}
        <rect x="118" y="160" width="60" height="10" rx="5" fill={NAVY} />
        <rect x="420" y="161" width="34" height="8" rx="4" fill={LINE} />
        <rect x="466" y="161" width="34" height="8" rx="4" fill={LINE} />
        <rect x="512" y="161" width="34" height="8" rx="4" fill={LINE} />
        <rect x="562" y="156" width="64" height="18" rx="9" fill={NAVY} />
        {/* hero */}
        <rect x="118" y="214" width="230" height="20" rx="6" fill={NAVY} />
        <rect x="118" y="244" width="180" height="20" rx="6" fill={NAVY} />
        <rect x="118" y="280" width="210" height="8" rx="4" fill={LINE} />
        <rect x="118" y="296" width="170" height="8" rx="4" fill={LINE} />
        <rect x="118" y="322" width="110" height="30" rx="15" fill={`url(#${id}-brand)`} />
        <rect x="380" y="200" width="246" height="160" rx="12" fill={`url(#${id}-brand)`} />
        <circle cx="560" cy="246" r="26" fill="#fff" fillOpacity="0.25" />
        <path d="M380 330l70-56 52 40 40-28 84 54v8a12 12 0 0 1-12 12H392a12 12 0 0 1-12-12z" fill="#fff" fillOpacity="0.22" />
        {/* cards */}
        {[118, 290, 462].map((x) => (
          <g key={x}>
            <rect x={x} y="384" width="160" height="72" rx="10" fill="#fff" stroke={MIST} />
            <rect x={x + 14} y="398" width="24" height="24" rx="7" fill={MIST} />
            <rect x={x + 14} y="432" width="100" height="7" rx="3.5" fill={LINE} />
          </g>
        ))}
      </g>
      {/* code editor */}
      <g filter={`url(#${id}-shadow)`}>
        <rect x="470" y="300" width="260" height="210" rx="12" fill={INK} stroke="#fff" strokeOpacity="0.08" />
        <circle cx="490" cy="320" r="4" fill="#fff" fillOpacity="0.2" />
        <circle cx="504" cy="320" r="4" fill="#fff" fillOpacity="0.2" />
        <circle cx="518" cy="320" r="4" fill="#fff" fillOpacity="0.2" />
        {[
          [0, 0, 40, SKY], [0, 46, 90, "#fff"],
          [1, 16, 60, BLUE], [1, 82, 70, "#fff"],
          [2, 32, 50, SKY], [2, 88, 96, BLUE],
          [3, 32, 120, "#fff"],
          [4, 32, 70, BLUE], [4, 108, 40, SKY],
          [5, 16, 36, SKY],
          [6, 0, 24, "#fff"],
          [7, 0, 56, BLUE], [7, 62, 100, "#fff"],
        ].map(([row, x, w, c], i) => (
          <rect key={i} x={490 + Number(x)} y={344 + Number(row) * 20} width={Number(w)} height="7" rx="3.5" fill={String(c)} fillOpacity={c === "#fff" ? 0.35 : 0.9} />
        ))}
        <rect x="490" y="484" width="2" height="12" fill={SKY} />
      </g>
    </g>
  );
}

/** Two phones: a list screen and a card/grid screen. */
function MobileScene({ id }: SceneProps) {
  const phone = (x: number, y: number, screen: React.ReactNode) => (
    <g filter={`url(#${id}-shadow)`}>
      <rect x={x} y={y} width="200" height="410" rx="34" fill={INK} stroke="#fff" strokeOpacity="0.12" />
      <rect x={x + 10} y={y + 10} width="180" height="390" rx="26" fill={PAPER} />
      <rect x={x + 72} y={y + 20} width="56" height="14" rx="7" fill={INK} />
      {screen}
    </g>
  );
  const ax = 190;
  const ay = 110;
  const bx = 420;
  const by = 70;
  return (
    <g>
      {phone(bx, by, (
        <g>
          <rect x={bx + 26} y={by + 56} width="80" height="12" rx="6" fill={NAVY} />
          <rect x={bx + 26} y={by + 80} width="148" height="110" rx="16" fill={`url(#${id}-brand)`} />
          <path d={`M${bx + 40} ${by + 168}l26-26 20 16 30-34 44 44`} fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {[0, 1].map((r) => [0, 1].map((c) => (
            <g key={`${r}${c}`}>
              <rect x={bx + 26 + c * 78} y={by + 204 + r * 78} width="70" height="70" rx="14" fill="#fff" stroke={MIST} />
              <circle cx={bx + 46 + c * 78} cy={by + 226 + r * 78} r="10" fill={r === c ? SKY : MIST} />
              <rect x={bx + 36 + c * 78} y={by + 250 + r * 78} width="40" height="6" rx="3" fill={LINE} />
            </g>
          )))}
          <rect x={bx + 70} y={by + 382} width="60" height="5" rx="2.5" fill={NAVY} fillOpacity="0.5" />
        </g>
      ))}
      {phone(ax, ay, (
        <g>
          <circle cx={ax + 40} cy={ay + 64} r="14" fill={`url(#${id}-brand)`} />
          <rect x={ax + 62} y={ay + 54} width="70" height="9" rx="4.5" fill={NAVY} />
          <rect x={ax + 62} y={ay + 68} width="50" height="6" rx="3" fill={LINE} />
          <rect x={ax + 26} y={ay + 96} width="148" height="34" rx="17" fill="#fff" stroke={MIST} />
          <circle cx={ax + 46} cy={ay + 113} r="6" fill="none" stroke={LINE} strokeWidth="2.5" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={ax + 26} y={ay + 146 + i * 54} width="148" height="44" rx="12" fill="#fff" stroke={MIST} />
              <rect x={ax + 36} y={ay + 154 + i * 54} width="28" height="28" rx="8" fill={i === 0 ? SKY : MIST} />
              <rect x={ax + 74} y={ay + 158 + i * 54} width="72" height="7" rx="3.5" fill={NAVY} fillOpacity="0.8" />
              <rect x={ax + 74} y={ay + 172 + i * 54} width="48" height="6" rx="3" fill={LINE} />
            </g>
          ))}
          <rect x={ax + 10} y={ay + 352} width="180" height="48" fill="#fff" />
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx={ax + 46 + i * 36} cy={ay + 372} r="7" fill={i === 0 ? PRIMARY : LINE} />
          ))}
        </g>
      ))}
    </g>
  );
}

/** Admin dashboard: sidebar, stat tiles, an area chart and a table. */
function SoftwareScene({ id }: SceneProps) {
  const x = 80;
  const y = 90;
  return (
    <g filter={`url(#${id}-shadow)`}>
      <defs>
        <linearGradient id={`${id}-area`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={SKY} stopOpacity="0.45" />
          <stop offset="1" stopColor={SKY} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x={x} y={y} width="640" height="420" rx="14" fill={PAPER} />
      <path d={`M${x + 14} ${y}h126v420H${x + 14}a14 14 0 0 1-14-14V${y + 14}a14 14 0 0 1 14-14z`} fill={INK} />
      <rect x={x + 22} y={y + 26} width="22" height="22" rx="6" fill={`url(#${id}-brand)`} />
      <rect x={x + 52} y={y + 33} width="60" height="8" rx="4" fill="#fff" fillOpacity="0.8" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          {i === 1 && <rect x={x + 12} y={y + 78 + i * 38} width="116" height="30" rx="8" fill="#fff" fillOpacity="0.08" />}
          <rect x={x + 24} y={y + 88 + i * 38} width="10" height="10" rx="3" fill={i === 1 ? SKY : "#fff"} fillOpacity={i === 1 ? 1 : 0.3} />
          <rect x={x + 44} y={y + 89 + i * 38} width={[56, 70, 48, 62, 52, 40][i]} height="8" rx="4" fill="#fff" fillOpacity={i === 1 ? 0.9 : 0.3} />
        </g>
      ))}
      {/* header */}
      <rect x={x + 164} y={y + 28} width="140" height="12" rx="6" fill={NAVY} />
      <rect x={x + 520} y={y + 22} width="96" height="24" rx="12" fill="#fff" stroke={MIST} />
      {/* stat tiles */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={x + 164 + i * 152} y={y + 66} width="140" height="76" rx="12" fill="#fff" stroke={MIST} />
          <rect x={x + 178 + i * 152} y={y + 80} width="50" height="7" rx="3.5" fill={LINE} />
          <rect x={x + 178 + i * 152} y={y + 98} width={[72, 60, 84][i]} height="16" rx="5" fill={NAVY} />
          <rect x={x + 178 + i * 152} y={y + 122} width="36" height="7" rx="3.5" fill={i === 1 ? PRIMARY : SKY} />
        </g>
      ))}
      {/* chart */}
      <rect x={x + 164} y={y + 156} width="292" height="168" rx="12" fill="#fff" stroke={MIST} />
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={x + 180} x2={x + 440} y1={y + 196 + i * 30} y2={y + 196 + i * 30} stroke={MIST} />
      ))}
      <path d={`M${x + 180} ${y + 290}C${x + 220} ${y + 280} ${x + 240} ${y + 236} ${x + 280} ${y + 246}S${x + 340} ${y + 206} ${x + 370} ${y + 214} ${x + 420} ${y + 180} ${x + 440} ${y + 186}V${y + 300}H${x + 180}z`} fill={`url(#${id}-area)`} />
      <path d={`M${x + 180} ${y + 290}C${x + 220} ${y + 280} ${x + 240} ${y + 236} ${x + 280} ${y + 246}S${x + 340} ${y + 206} ${x + 370} ${y + 214} ${x + 420} ${y + 180} ${x + 440} ${y + 186}`} fill="none" stroke={PRIMARY} strokeWidth="3.5" strokeLinecap="round" />
      <circle cx={x + 370} cy={y + 214} r="6" fill="#fff" stroke={PRIMARY} strokeWidth="3" />
      {/* donut */}
      <rect x={x + 468} y={y + 156} width="148" height="168" rx="12" fill="#fff" stroke={MIST} />
      <circle cx={x + 542} cy={y + 236} r="42" fill="none" stroke={MIST} strokeWidth="16" />
      <circle cx={x + 542} cy={y + 236} r="42" fill="none" stroke={`url(#${id}-brand)`} strokeWidth="16" strokeDasharray="180 264" strokeLinecap="round" transform={`rotate(-90 ${x + 542} ${y + 236})`} />
      <rect x={x + 500} y={y + 296} width="84" height="7" rx="3.5" fill={LINE} />
      {/* table */}
      <rect x={x + 164} y={y + 338} width="452" height="64" rx="12" fill="#fff" stroke={MIST} />
      {[0, 1].map((r) => (
        <g key={r}>
          <circle cx={x + 186} cy={y + 357 + r * 26} r="7" fill={r ? MIST : SKY} />
          <rect x={x + 202} y={y + 354 + r * 26} width="110" height="7" rx="3.5" fill={NAVY} fillOpacity="0.7" />
          <rect x={x + 360} y={y + 354 + r * 26} width="70" height="7" rx="3.5" fill={LINE} />
          <rect x={x + 540} y={y + 351 + r * 26} width="56" height="13" rx="6.5" fill={r ? MIST : SKY} fillOpacity={r ? 1 : 0.25} />
        </g>
      ))}
    </g>
  );
}

/** Design canvas: type specimen, brand palette, a bézier path with handles, and components. */
function DesignScene({ id }: SceneProps) {
  return (
    <g>
      <g filter={`url(#${id}-shadow)`}>
        {/* type + palette board */}
        <rect x="90" y="110" width="300" height="380" rx="16" fill={PAPER} />
        <text x="120" y="250" fontSize="120" fontWeight="600" fill={NAVY} style={{ fontFamily: "inherit" }}>Aa</text>
        <rect x="120" y="280" width="150" height="8" rx="4" fill={LINE} />
        <rect x="120" y="296" width="110" height="8" rx="4" fill={LINE} />
        {[NAVY, PRIMARY, SKY, "#ffffff"].map((c, i) => (
          <g key={c}>
            <circle cx={140 + i * 64} cy="370" r="24" fill={c} stroke={MIST} strokeWidth="2" />
            <rect x={122 + i * 64} y="406" width="36" height="6" rx="3" fill={LINE} />
          </g>
        ))}
        <rect x="120" y="440" width="240" height="22" rx="11" fill={`url(#${id}-brand)`} />
      </g>
      {/* components board */}
      <g filter={`url(#${id}-shadow)`}>
        <rect x="420" y="150" width="290" height="250" rx="16" fill="#fff" />
        <rect x="446" y="176" width="120" height="10" rx="5" fill={NAVY} />
        <rect x="446" y="208" width="132" height="40" rx="20" fill={NAVY} />
        <rect x="474" y="224" width="76" height="8" rx="4" fill="#fff" />
        <rect x="590" y="208" width="96" height="40" rx="20" fill="none" stroke={NAVY} strokeWidth="2" />
        <rect x="446" y="268" width="240" height="40" rx="10" fill={PAPER} stroke={LINE} />
        <rect x="462" y="284" width="90" height="8" rx="4" fill={LINE} />
        <rect x="446" y="330" width="56" height="30" rx="15" fill={SKY} />
        <circle cx="487" cy="345" r="11" fill="#fff" />
        <rect x="520" y="330" width="56" height="30" rx="15" fill={MIST} />
        <circle cx="535" cy="345" r="11" fill="#fff" />
        <rect x="596" y="334" width="22" height="22" rx="6" fill={PRIMARY} />
        <path d="M601 345l4 4 8-9" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="630" y="334" width="22" height="22" rx="6" fill="none" stroke={LINE} strokeWidth="2" />
      </g>
      {/* pen path with handles */}
      <path d="M430 470C500 400 560 520 640 450S720 420 740 380" fill="none" stroke={SKY} strokeWidth="3" />
      <line x1="640" y1="450" x2="600" y2="486" stroke="#fff" strokeOpacity="0.6" strokeWidth="1.5" />
      <line x1="640" y1="450" x2="680" y2="414" stroke="#fff" strokeOpacity="0.6" strokeWidth="1.5" />
      <circle cx="600" cy="486" r="5" fill="#fff" />
      <circle cx="680" cy="414" r="5" fill="#fff" />
      <rect x="633" y="443" width="14" height="14" fill={NAVY} stroke={SKY} strokeWidth="2.5" />
      <rect x="423" y="463" width="14" height="14" fill={NAVY} stroke="#fff" strokeWidth="2" />
      <rect x="733" y="373" width="14" height="14" fill={NAVY} stroke="#fff" strokeWidth="2" />
      {/* selection frame + cursor */}
      <rect x="412" y="142" width="306" height="266" rx="20" fill="none" stroke={SKY} strokeWidth="1.5" strokeDasharray="6 6" />
      <path d="M690 108l10 34 7-13 14-3z" fill="#fff" stroke={NAVY} strokeWidth="2" strokeLinejoin="round" />
      <rect x="704" y="80" width="64" height="22" rx="6" fill={SKY} />
      <rect x="714" y="88" width="44" height="6" rx="3" fill={NAVY} />
    </g>
  );
}

const SCENES: Record<string, (p: SceneProps) => React.ReactElement> = {
  "web-development": WebScene,
  "mobile-app-development": MobileScene,
  "custom-software-development": SoftwareScene,
  "ui-ux-design-branding": DesignScene,
};
