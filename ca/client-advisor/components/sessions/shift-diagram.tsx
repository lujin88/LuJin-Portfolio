type ShiftDiagramProps = {
  signal: string
  signalQ: string
  context: string
  contextQ: string
  act: string
  actQ: string
}

export function ShiftDiagram({
  signal,
  signalQ,
  context,
  contextQ,
  act,
  actQ,
}: ShiftDiagramProps) {
  return (
    <svg
      className="s04-scene"
      viewBox="420 30 604 389"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="s04-diagram-title s04-diagram-desc"
    >
      <title id="s04-diagram-title">{`${signal} → ${context} → ${act}`}</title>
      <desc id="s04-diagram-desc">
        {`${signal}: ${signalQ} ${context}: ${contextQ} ${act}: ${actQ}`}
      </desc>
      <defs>
        <linearGradient
          id="s04-edge-fade"
          gradientUnits="userSpaceOnUse"
          x1="720"
          y1="30"
          x2="720"
          y2="419"
        >
          <stop stopColor="#fff" stopOpacity="0" />
          <stop offset=".16" stopColor="#fff" />
          <stop offset=".84" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient
          id="s04-orbit-fade"
          gradientUnits="userSpaceOnUse"
          cx="710"
          cy="210"
          r="300"
        >
          <stop offset=".42" stopColor="#fff" />
          <stop offset=".72" stopColor="#fff" stopOpacity=".45" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask
          id="s04-orbit-mask"
          maskUnits="userSpaceOnUse"
          x="420"
          y="30"
          width="604"
          height="389"
        >
          <rect
            x="420"
            y="30"
            width="604"
            height="389"
            fill="url(#s04-orbit-fade)"
          />
        </mask>
        <mask
          id="s04-blend-mask"
          maskUnits="userSpaceOnUse"
          x="420"
          y="30"
          width="604"
          height="389"
        >
          <rect
            x="420"
            y="30"
            width="604"
            height="389"
            fill="url(#s04-edge-fade)"
          />
        </mask>
        <linearGradient
          id="s04-ribbon-a"
          x1="495"
          y1="101"
          x2="676"
          y2="293"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#12365a" stopOpacity=".04" />
          <stop offset=".32" stopColor="#3686d6" stopOpacity=".52" />
          <stop offset=".50" stopColor="#1a487a" stopOpacity=".16" />
          <stop offset=".83" stopColor="#225589" stopOpacity=".36" />
          <stop offset="1" stopColor="#174166" stopOpacity=".08" />
        </linearGradient>
        <linearGradient
          id="s04-ribbon-b"
          x1="813"
          y1="210"
          x2="906"
          y2="325"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2c6dac" stopOpacity=".13" />
          <stop offset=".32" stopColor="#498bd0" stopOpacity=".40" />
          <stop offset=".65" stopColor="#174477" stopOpacity=".37" />
          <stop offset="1" stopColor="#06213d" stopOpacity=".02" />
        </linearGradient>
        <linearGradient
          id="s04-edge-a"
          x1="438"
          y1="88"
          x2="677"
          y2="216"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#579be2" stopOpacity=".24" />
          <stop offset=".55" stopColor="#85c5ff" stopOpacity=".8" />
          <stop offset="1" stopColor="#3178b9" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="s04-edge-b"
          x1="792"
          y1="247"
          x2="1024"
          y2="270"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#397abb" stopOpacity="0" />
          <stop offset=".45" stopColor="#9cccff" stopOpacity=".8" />
          <stop offset="1" stopColor="#4b86be" stopOpacity=".35" />
        </linearGradient>
        <linearGradient
          id="s04-flow"
          x1="525"
          y1="151"
          x2="916"
          y2="268"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#123b64" />
          <stop offset=".19" stopColor="#459efb" />
          <stop offset=".35" stopColor="#164e7d" />
          <stop offset=".61" stopColor="#469ffc" />
          <stop offset=".84" stopColor="#16456b" />
          <stop offset="1" stopColor="#0b2845" />
        </linearGradient>
        <radialGradient id="s04-glass" cx="30%" cy="16%" r="88%">
          <stop stopColor="#2c5b87" />
          <stop offset=".35" stopColor="#102a44" />
          <stop offset=".67" stopColor="#071b2c" />
          <stop offset=".86" stopColor="#0a2037" />
          <stop offset="1" stopColor="#16385b" />
        </radialGradient>
        <linearGradient id="s04-rim" x1=".14" y1="0" x2=".78" y2="1">
          <stop stopColor="#aedbff" />
          <stop offset=".32" stopColor="#4a91ce" />
          <stop offset=".65" stopColor="#153f67" />
          <stop offset="1" stopColor="#0e2943" />
        </linearGradient>
        <radialGradient id="s04-node-halo">
          <stop stopColor="#63bdff" stopOpacity=".73" />
          <stop offset=".35" stopColor="#2b8ef9" stopOpacity=".30" />
          <stop offset="1" stopColor="#1878e9" stopOpacity="0" />
        </radialGradient>
        <filter id="s04-soft">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id="s04-glow" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <path
          id="s04-flow-path"
          d="M 536 150 C 567 145 580 161 598 182 C 624 212 650 221 680 210 C 724 194 764 222 793 247 C 819 270 845 283 878 275 C 899 270 916 256 929 237"
        />
      </defs>
      <g mask="url(#s04-blend-mask)">
      <g
        mask="url(#s04-orbit-mask)"
        fill="none"
        stroke="#47739d"
        strokeWidth=".6"
        strokeDasharray="1.6 4.1"
        opacity=".40"
      >
        <path d="M452 124 C478 76 529 53 580 68 C632 81 670 121 677 162" />
        <path d="M437 172 C440 226 467 268 512 268 C558 268 585 225 588 183" />
        <path d="M630 205 C636 165 673 135 714 139 C769 141 803 187 799 241" />
        <path
          d="M648 299 C685 350 739 368 786 334 C810 316 824 286 827 257"
          opacity=".7"
        />
        <path d="M824 222 C840 183 880 165 916 174 C961 185 990 226 992 269" />
        <path
          d="M798 254 C824 308 869 340 918 331 C951 324 976 300 985 273"
          opacity=".4"
        />
      </g>
      <path
        d="M435 157 C433 114 468 77 512 84 C557 84 586 117 609 145 C633 173 650 167 674 152 C629 179 616 205 625 237 C637 280 670 326 712 322 C651 329 612 282 591 220 C569 148 554 113 516 100 C474 85 443 110 435 157Z"
        fill="url(#s04-ribbon-a)"
      />
      <path
        d="M435 157 C433 114 468 77 512 84 C557 84 586 117 609 145 C633 173 650 167 674 152"
        fill="none"
        stroke="url(#s04-edge-a)"
        strokeWidth=".6"
      />
      <path
        d="M625 237 C644 305 689 337 738 317 C772 303 789 273 799 241"
        fill="none"
        stroke="#21517d"
        strokeWidth=".65"
        opacity=".65"
      />
      <path
        d="M786 253 C823 213 861 195 906 208 C949 218 990 246 1024 276 L1024 363 C975 332 945 296 907 279 C862 258 825 256 786 253Z"
        fill="url(#s04-ribbon-b)"
      />
      <path
        d="M786 253 C823 213 861 195 906 208 C949 218 990 246 1024 276"
        fill="none"
        stroke="url(#s04-edge-b)"
        strokeWidth=".7"
      />
      <use
        href="#s04-flow-path"
        fill="none"
        stroke="#1988ed"
        strokeWidth="7"
        opacity=".15"
        filter="url(#s04-soft)"
      />
      <use
        href="#s04-flow-path"
        fill="none"
        stroke="url(#s04-flow)"
        strokeWidth="2"
      />
      </g>
      <g>
        <circle
          cx="508"
          cy="152"
          r="48"
          fill="#1e72bb"
          opacity=".07"
          filter="url(#s04-soft)"
        />
        <circle
          cx="508"
          cy="152"
          r="38"
          fill="url(#s04-glass)"
          stroke="url(#s04-rim)"
          strokeWidth=".9"
        />
        <g
          transform="translate(508 152) scale(.12)"
          fill="none"
          stroke="#f3f6fa"
          strokeWidth="17"
          strokeLinecap="butt"
        >
          <path d="M-132 0 A132 132 0 0 1 0 -132 M-56 0 A56 56 0 0 1 0 -56 M0 56 A56 56 0 0 0 56 0 M0 132 A132 132 0 0 0 132 0" />
        </g>
        <circle
          cx="535"
          cy="124"
          r="4.3"
          fill="#062037"
          stroke="#1c9ee7"
          strokeWidth="2.2"
        />
      </g>
      <g>
        <circle
          cx="704"
          cy="210"
          r="38.5"
          fill="url(#s04-glass)"
          stroke="url(#s04-rim)"
          strokeWidth=".9"
        />
        <g transform="translate(704 210) scale(.128) translate(-250 -235.5)">
          <g
            fill="none"
            stroke="#f3f6fa"
            strokeWidth="15"
            strokeLinecap="butt"
            strokeLinejoin="miter"
          >
            <path d="M246.5 255 H184.5 V142 C184.5 123.5 199.5 108.5 218 108.5 H387 V233 C387 245 379 254.5 366.5 254.5" />
            <path d="M316 184.5 H143 C127 184.5 114 197.5 114 213.5 V358.5 L169.5 340 H279 C294.5 340 307 328 307 313" />
          </g>
          <path
            fill="#f3f6fa"
            fillRule="evenodd"
            d="M297.5 212 H316.5 C316.5 230.5 331.5 245.5 350 245.5 V264.5 C331.5 264.5 316.5 279.5 316.5 298 H297.5 C297.5 279.5 282.5 264.5 264 264.5 V245.5 C282.5 245.5 297.5 230.5 297.5 212 Z M307 231.5 C302 241.5 293.5 250 283.5 255 C293.5 260 302 268.5 307 278.5 C312 268.5 320.5 260 330.5 255 C320.5 250 312 241.5 307 231.5 Z"
          />
        </g>
        <circle
          cx="731.5"
          cy="181.7"
          r="4.3"
          fill="#072039"
          stroke="#1e9ce4"
          strokeWidth="2.2"
        />
      </g>
      <g>
        <circle
          cx="902"
          cy="250"
          r="38"
          fill="url(#s04-glass)"
          stroke="url(#s04-rim)"
          strokeWidth=".9"
        />
        <g
          fill="none"
          stroke="#f4f8fe"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="902.3" cy="252" r="19.4" />
          <path d="M893 252 H911 M904 244.5 L911.5 252 L904 259.5" />
        </g>
        <circle
          cx="929.5"
          cy="220"
          r="4.8"
          fill="#08253d"
          stroke="#1ba3e8"
          strokeWidth="2.3"
        />
      </g>
      <g>
        <circle cx="598" cy="182" r="24" fill="url(#s04-node-halo)" />
        <circle
          className="s04-pulse"
          cx="598"
          cy="182"
          r="7"
          fill="#62b5ff"
          opacity=".8"
          filter="url(#s04-glow)"
        />
        <circle
          cx="598"
          cy="182"
          r="4.7"
          fill="#c0e6ff"
          stroke="#66b8ff"
          strokeWidth="1.2"
        />
        <circle cx="793" cy="247" r="25" fill="url(#s04-node-halo)" />
        <circle
          className="s04-pulse"
          cx="793"
          cy="247"
          r="7"
          fill="#62b5ff"
          opacity=".8"
          filter="url(#s04-glow)"
        />
        <circle
          cx="793"
          cy="247"
          r="4.7"
          fill="#c0e6ff"
          stroke="#66b8ff"
          strokeWidth="1.2"
        />
      </g>
      <g aria-hidden="true">
        <text x="507" y="211" className="s04-label">
          {signal}
        </text>
        <text x="506" y="231" className="s04-desc">
          {signalQ}
        </text>
        <text x="702" y="270" className="s04-label">
          {context}
        </text>
        <text x="703" y="290" className="s04-desc">
          {contextQ}
        </text>
        <text x="902" y="306" className="s04-label">
          {act}
        </text>
        <text x="903" y="325" className="s04-desc">
          {actQ}
        </text>
      </g>
    </svg>
  )
}
