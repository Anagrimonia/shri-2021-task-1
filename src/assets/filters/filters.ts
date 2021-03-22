const color_matrix_dark_filter = [
  [  '0 0 0 0 0.972549 0 0 0 0 0.618715 0 0 0 0 0 0 0 0 0.2 0',
     '0 0 0 0 1 0 0 0 0 0.636666 0 0 0 0 0 0 0 0 0.9 0'                ],
  [  '0 0 0 0 0.575 0 0 0 0 0.365803 0 0 0 0 0 0 0 0 0.2 0',
     '0 0 0 0 0.791667 0 0 0 0 0.504028 0 0 0 0 0 0 0 0 0.9 0'         ],
  [  '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0',
     '0 0 0 0 0.545833 0 0 0 0 0.545833 0 0 0 0 0.545833 0 0 0 0.9 0'  ],
  [  '0 0 0 0 0.375 0 0 0 0 0.375 0 0 0 0 0.375 0 0 0 0.2 0',
     '0 0 0 0 0.15 0 0 0 0 0.15 0 0 0 0 0.15 0 0 0 0.9 0'              ]];

export function dark_filter(n : number) {
  if (n > 3) return '';
  return `<filter id="dark_filter_${n}" color-interpolation-filters="sRGB" x="-100" y="-100" width="200" height="200" filterUnits="userSpaceOnUse" >  \
          <feFlood flood-opacity="0" result="BackgroundImageFix"/> \
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/> \
          <feMorphology radius="8" operator="erode" in="SourceAlpha" result="effect1_dropShadow"/> \
          <feOffset/> \
          <feGaussianBlur stdDeviation="10"/> \
          <feColorMatrix type="matrix" values="${color_matrix_dark_filter[n][0]}"/> \
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/> \
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/> \
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> \
          <feOffset/> \
          <feGaussianBlur stdDeviation="10"/> \
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/> \
          <feColorMatrix type="matrix" values="${color_matrix_dark_filter[n][0]}"/> \
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow"/> \
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> \
          <feOffset dx="-1" dy="1"/> \
          <feGaussianBlur stdDeviation="0.5"/> \
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/> \
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"/> \
          <feBlend mode="normal" in2="effect2_innerShadow" result="effect3_innerShadow"/> \
          </filter>`;
}

const color_matrix_light_filter = [
  [  '0 0 0 0 1 0 0 0 0 0.69 0 0 0 0 0.225 0 0 0 0.9 0'         ],
  [  '0 0 0 0 1 0 0 0 0 0.69 0 0 0 0 0.225 0 0 0 0.4 0'         ],
  [  '0 0 0 0 0.4125 0 0 0 0 0.4125 0 0 0 0 0.4125 0 0 0 0.2 0' ],
  [  '0 0 0 0 0.5125 0 0 0 0 0.5125 0 0 0 0 0.5125 0 0 0 0.6 0' ]];

export function light_filter(n : number) {
  if (n > 3) return '';
  return `<filter id="light_filter_${n}" color-interpolation-filters="sRGB" x="-100" y="-100" width="200" height="200" filterUnits="userSpaceOnUse" >  \
          <feFlood flood-opacity="0" result="BackgroundImageFix"/> \
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/> \
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> \
          <feOffset/> \
          <feGaussianBlur stdDeviation="10"/> \
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/> \
          <feColorMatrix type="matrix" values="${color_matrix_light_filter[n][0]}"/> \
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/> \
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> \
          <feOffset dx="-1" dy="1"/> \
          <feGaussianBlur stdDeviation="0.5"/> \
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/> \
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"/> \
          <feBlend mode="normal" in2="effect1_innerShadow" result="effect2_innerShadow"/> \
          </filter>`;
}
