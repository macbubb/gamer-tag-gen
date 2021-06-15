function ColorSwitch(props) {
  const handleSwitchChange = props.handleSwitchChange;
  const writeSwitchPositionStyle = (choice) => {
    switch (choice) {
      case 1:
        return { transform: 'translateX(0px)' };
      case 2:
        return { transform: 'translateX(50px)' };
      case 3:
        return { transform: 'translateX(95px)' };
      default:
        return;
    }
  };
  const switchPosition = writeSwitchPositionStyle(props.palette);
  return (
    <svg width="168" height="90" xmlns="http://www.w3.org/2000/svg">
      {/*             <linearGradient id="rainbow" x1="0" x2="1" y1="0" y2="0">
                  <stop  style="stop-color: #BF3064" offset="0%"/>
                  <stop style="stop-color: #A545BF; stop-opacity: 0.9;" offset="20%"/>
                  <stop style="stop-color: #025373; stop-opacity: 0.9;" offset="36%"/>
                  <stop style="stop-color: #F29D35; stop-opacity: 0.9;" offset="50%"/>
                  <stop style="stop-color: #F2784B; stop-opacity: 0.9;" offset="66%"/>
            </linearGradient> */}
      <g fill="none">
        {/*  rounded rectangle  */}

        <path
          stroke="black"
          strokeWidth="5"
          fill="#BFBFBF"
          d="
                  M42.5,2.5
                  h100
                  a20,20 0 1,1 0,40
                  h-100
                  a20,20 0 1,1 0,-40"
        />
        {/*  circle switch
                  black position:style="transform: translateX(0px)"
                  red position:style="transform: translateX(50px)"
                  rainbow position:style="transform: translateX(95px)"
             */}
        <circle
          style={switchPosition}
          stroke="black"
          strokeWidth="5"
          fill="#8C8C8C"
          cx="45"
          cy="22.5"
          r="18"
        />
        {/*  black square     */}
        <path
          stroke="black"
          fill="black"
          strokeWidth="5"
          d="
                  M32.5,60
                  h22.5
                  v22.5
                  h-22.5
                  z"
        />
        {/*  red square     */}
        <path
          stroke="#BF1120"
          fill="#BF1120"
          strokeWidth="5"
          d="
                  M85,60
                  h22.5
                  v22.5
                  h-22.5
                  z"
        />
        {/*  rainbow square     */}
        <svg className="rainbow-square">
          <path
            stroke="#BF3064"
            strokeWidth="4.5"
            d="M135,57.5
                        v27.5"
          />
          <path
            stroke="#A545BF"
            strokeWidth="4.5"
            d="M139.5,57.5
                        v27.5"
          />
          <path
            stroke="#025373"
            strokeWidth="4.5"
            d="M144,57.5
                        v27.5"
          />
          <path
            stroke="#F29D35"
            strokeWidth="4.5"
            d="M148.5,57.5
                        v27.5"
          />
          <path
            stroke="#F2784B"
            strokeWidth="4.5"
            d="M153,57.5
                        v27.5"
          />
        </svg>
      </g>
      <a
        onClick={() => handleSwitchChange(1)}
        cursor="pointer"
        href="#root"
        pointerEvents="all"
      >
        <path
          stroke="none"
          strokeWidth="2"
          fill="none"
          d="
          M19,0
          h53
          v90
          h-53
          v-90"
        />
      </a>
      <a
        onClick={() => handleSwitchChange(2)}
        cursor="pointer"
        href="#root"
        pointerEvents="all"
      >
        <path
          stroke="none"
          strokeWidth="2"
          fill="none"
          d="
          M75,0
          h45
          v90
          h-45
          v-90"
        />
      </a>
      <a
        onClick={() => handleSwitchChange(3)}
        cursor="pointer"
        pointerEvents="all"
        href="#root"
      >
        <path
          stroke="none"
          strokeWidth="2"
          fill="none"
          d="
          M122,0
          h40
          v90
          h-40
          v-90"
        />
      </a>
    </svg>
  );
}

export default ColorSwitch;
