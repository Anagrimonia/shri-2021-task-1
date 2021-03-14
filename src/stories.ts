import 'normalize.css';
import './stories.scss';


import type { Orientation } from './types/orientation';
import LeadersPage from './slides/leaders';
import VotePage from './slides/vote';
//import ChartPage from './slides/leaders';
//import DiagramPage from './slides/leaders';
//import ActivityPage from './slides/leaders';

function renderTemplate(alias: String, data: any) {
    
    window.onresize = resize;
    window.onload = resize;

    var alias = alias;
    var data = data;
    var orientation : Orientation = checkOrientation();

    function checkOrientation() : Orientation {
        return (window.innerWidth > window.innerHeight) ? 'horizontal' : 'vertical';
    }

    function resize() {
        var current : Orientation = checkOrientation();
        if (orientation != current) {
            orientation = current;
            document.body.innerHTML = render();
        }
    };

    function render() : string {
      switch (alias) {
        case "leaders":  return new LeadersPage(data, orientation).render().outerHTML;
        case "vote":     return new VotePage(data, orientation).render().outerHTML;
        //case "chart":    return new LeadersPage(data).render().outerHTML;
        //case "diagram":  return new LeadersPage(data).render().outerHTML;
        //case "activity": return new LeadersPage(data).render().outerHTML;
        default:         return '';
      }
    }

    return render();
};

(window as any).renderTemplate = renderTemplate;