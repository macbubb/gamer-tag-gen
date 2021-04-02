function ColorSwitch(props){
      const drawSwitchPosition = (choice) => {
            switch(choice) {
                  case 1:
                        return <circle stroke="black"
                        stroke-width="5"
                        fill='#8C8C8C'
                          cx='42.5'
                          cy="42.5"
                          r="35"
                />
                  case 2:
                        return <circle stroke="black"
                        stroke-width="5"
                        fill='#8C8C8C'
                          cx='147'
                          cy="42.5"
                          r="35"
                />
                  case 3:
                        return <circle stroke="black"
                        stroke-width="5"
                        fill='#8C8C8C'
                          cx='243'
                          cy="42.5"
                          r="35"
                          />
                  default:
                        return <circle stroke="black"
                        stroke-width="5"
                        fill='#8C8C8C'
                          cx='42.5'
                          cy="42.5"
                          r="35"
                />;
            }
      }
      const switchStyles = {
            //transform: "scale(.7)",
      }
    return (
        <svg style={switchStyles}  width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            <g fill="none">
            <path stroke="black"
                  stroke-width="5"
                  fill='#BFBFBF'
                  d="
                  M42.5,2.5
                  h200
                  a40,40 0 1,1 0,80
                  h-200
                  a40,40 0 1,1 0,-80"/>
            {drawSwitchPosition(props.palette)}
            <path stroke="black"
                  fill="black"
                  stroke-width="5"
                  d="
                  M20,100
                  h45
                  v45
                  h-45
                  z"
            />
            <path stroke="#BF1120"
                  fill="#BF1120"
                  stroke-width="5"
                  d="
                  M125,100
                  h45
                  v45
                  h-45
                  z"
            />
            <path stroke="#BF3064"
                  stroke-width="9"
                  d="
                  M265,97.5
                  v50"
            />
            <path stroke="#A545BF"
                  stroke-width="9"
                  d="
                  m256,97.5
                  v50"
            />
            <path stroke="#025373"
                  stroke-width="9"
                  d="m247,97.5
                  v50"
            />
            <path stroke="#F29D35"
                  stroke-width="9"
                  d="M238,97.5
                  v50"
            />
            <path stroke="#F2784B"
                  stroke-width="9"
                  d="M229,97.5
                  v50"
            />


            </g>
      </svg>
    )
}

export default ColorSwitch;