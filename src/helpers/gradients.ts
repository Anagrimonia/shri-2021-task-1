const stops_dark_fill = [
  [  { opacity: '.8', offset: '0.71875', color: '#FFA300'},
     { opacity: '.8', offset: '1',       color: '#5B3A00'}  ],
  [  { opacity: '.5', offset: '0.7292',  color: '#633F00'},
     { opacity: '.5', offset: '1',       color: '#0F0900'}  ],
  [  { opacity: '.5', offset: '0.71875', color: '#9B9B9B'},
     { opacity: '.5', offset: '1',       color: '#382900'}  ],
  [  { opacity: '.5', offset: '0.71875', color: '#4D4D4D'},
     { opacity: '.5', offset: '1',       color: '#382900'}  ]];

export function dark_fill(n : number) {
  if (n > 3) return '';
  return `<radialGradient id="dark_fill_${n}" cx="0" cy="0" r="0.9"  gradientUnits="userSpaceOnUse" gradientTransform="rotate(90) scale(119.624)"> \
          <stop stop-opacity="${stops_dark_fill[n][0].opacity}" offset="${stops_dark_fill[n][0].offset}" stop-color="${stops_dark_fill[n][0].color}"/> \
          <stop stop-opacity="${stops_dark_fill[n][1].opacity}" offset="${stops_dark_fill[n][1].offset}" stop-color="${stops_dark_fill[n][1].color}"/> \
          </radialGradient>`;
}

const stops_light_fill = [
  [  { opacity: '.56',   offset: '0.8125', color: '#FFB800'},
     { opacity: '.32',   offset: '1',      color: '#FFEF99'}  ],
  [  { opacity: '.24',   offset: '0.8125', color: '#FFB800'},
     { opacity: '.12',   offset: '1',      color: '#FFEF99'}  ],
  [  { opacity: '.1725', offset: '0.8281', color: '#A6A6A6'},
     { opacity: '.05',   offset: '0.9219', color: '#CBCBCB'}  ],
  [  { opacity: '.345',  offset: '0.8281', color: '#BFBFBF'},
     { opacity: '.1',    offset: '0.9219', color: '#E4E4E4'}  ]];

export function light_fill(n : number) {
  if (n > 3) return '';
  return  `<radialGradient id="light_fill_${n}" cx="0.5" cy="0.5" r="100" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90) scale(119.624)"> \
          <stop stop-opacity="${stops_light_fill[n][0].opacity}" offset="${stops_light_fill[n][0].offset}" stop-color="${stops_light_fill[n][0].color}"/> \
          <stop stop-opacity="${stops_light_fill[n][1].opacity}" offset="${stops_light_fill[n][1].offset}" stop-color="${stops_light_fill[n][1].color}"/> \
          </radialGradient>`;
}