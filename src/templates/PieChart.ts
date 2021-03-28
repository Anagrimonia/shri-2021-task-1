import * as filters from "../helpers/filters";
import * as gradients from "../helpers/gradients";
import type { Theme } from "../types/theme";

export default class PieChart {
    
    private element: HTMLElement;
    readonly RAD_DEG = Math.PI / 180.0;
    readonly PI2 = 2 * Math.PI;
    private theme : Theme;

    constructor () { 
        this.element = document.createElement('div');

        var bodyClass = document.getElementsByTagName('body')[0].className.match(/theme_(.*)/);
        this.theme = bodyClass && bodyClass.length > 1 && (bodyClass[1] =='light' || bodyClass[1] =='dark') ? bodyClass[1] : 'light';
    }

    private _pointOnArc = (center: [number, number], R: number, angle: number) => {
      let radians = (angle - 90) * this.RAD_DEG;

      return [
        center[0] + (R * Math.cos(radians)),
        center[1] + (R * Math.sin(radians))
      ];
    };

    private _drawCircle = (center: [number, number], R: number, width: number) => {
      let innerR = R - width;
      let [x, y] = center;

      return [
        'M', x - R,   y,
        'A', R,   R, 0, 1, 0,  x + R, y,
        'A', R,   R, 0, 1, 0,  x - R, y,

        'M', x - innerR,  y,
        'A', innerR,     innerR, 0, 1, 0, x + innerR, y,
        'A', innerR,     innerR, 0, 1, 0, x - innerR, y,
        'Z'
      ];
    };

    private _drawSector = (center: [number, number], R: number, start: number, end: number, w: number, corner: number) => {
          let points;
          let innerR        = R - w;
          let circumference = Math.abs(end - start);
          corner = Math.min(w / 2, corner);

          if (360 * (corner / (Math.PI * (R - w))) > Math.abs(start - end)) {
            corner = (circumference / 360) * innerR * Math.PI;
          }

          // inner and outer radiuses
          let innerR2      = innerR + corner;
          let outerRadius  = R - corner;

          // butts corner points
          let oStart = this._pointOnArc(center, outerRadius, start);
          let oEnd   = this._pointOnArc(center, outerRadius, end);

          let iStart = this._pointOnArc(center, innerR2, start);
          let iEnd   = this._pointOnArc(center, innerR2, end);

          let iSection  = 360 * (corner / (this.PI2 * innerR));
          let oSection  = 360 * (corner / (this.PI2 * R));

          // arcs endpoints
          let iArcStart = this._pointOnArc(center, innerR, start + iSection);
          let iArcEnd   = this._pointOnArc(center, innerR, end   - iSection);

          let oArcStart = this._pointOnArc(center, R, start + oSection);
          let oArcEnd   = this._pointOnArc(center, R, end   - oSection);

          let arcSweep1 = circumference > 180 + 2 * oSection ? 1 : 0;
          let arcSweep2 = circumference > 180 + 2 * iSection ? 1 : 0;

          points = [
            "M", oStart[0], oStart[1],                                                // begin path
            "A",  corner,  corner, 0,          0, 1,  oArcStart[0], oArcStart[1],     // outer start corner
            "A",       R,       R, 0,  arcSweep1, 1,   oArcEnd[0],    oArcEnd[1],     // outer main arc
            "A",  corner,  corner, 0,          0, 1,      oEnd[0],       oEnd[1],     // outer end corner
            "L", iEnd[0], iEnd[1],                                                    // end butt
            "A",  corner,  corner, 0,          0, 1,   iArcEnd[0],    iArcEnd[1],     // inner end corner
            "A",  innerR,  innerR, 0,   arcSweep2, 0, iArcStart[0],  iArcStart[1],    // inner arc
            "A",  corner,  corner, 0,          0, 1,    iStart[0],     iStart[1],     // inner start corner
            "Z"                                                                       // end path
          ];

          return points.join(' ');
        }

    render(props: { percents: number[] }) {

        const percents = props.percents.map(n => n * 3.6);
        const offset = 330;

        // Base container
        this.element.classList.add('pie-chart');
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', "-100 -100 200 200");
        svg.classList.add('pie-chart__svg');
        this.element.append(svg);
        
        let sum = 0;

        for (let i = 0; i < 4; i++) {
            if (percents[i] != 0)
            {
                svg.innerHTML += this.theme == 'dark' ? filters.dark_filter(i) : filters.light_filter(i);
                svg.innerHTML += this.theme == 'dark' ? gradients.dark_fill(i) : gradients.light_fill(i);
                let path = document.createElement('path');
                path.setAttribute('d', this._drawSector([0,0], 100, sum + 2 + offset, sum + percents[i] + offset, 30, 6));
                path.setAttribute('fill', `url(#${this.theme}_fill_${i})`);
                path.setAttribute('filter', `url(#${this.theme}_filter_${i})`);
                svg.append(path);
                sum += percents[i];
            }
        }

        return this;
    }

    getElement() : HTMLElement {
        return this.element;
    }
}
