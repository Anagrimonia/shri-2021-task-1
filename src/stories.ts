import './normalize.css';
import './stories.scss';

import Header from './templates/Header';
import type { Orientation } from './types/orientation';

import LeadersPage from './slides/leaders';
import VotePage from './slides/vote';
import ChartPage from './slides/chart';
import DiagramPage from './slides/diagram';
import ActivityPage from './slides/activity';

function renderTemplate(alias: String, data: any) {
    
    window.onresize = resize;
    window.onload = resize;

    var alias = alias;
    var data = data;
    var orientation : Orientation = checkOrientation();

    var page : any;

    switch (alias) {
        case "leaders":  page = new LeadersPage(data, orientation);  break;
        case "vote":     page = new VotePage(data, orientation);     break;
        case "chart":    page = new ChartPage(data, orientation);    break;
        case "diagram":  page = new DiagramPage(data, orientation);  break;
        case "activity": page = new ActivityPage(data, orientation); break;
        default:         '';
    }


    function checkOrientation() : Orientation {
        return (window.innerWidth > window.innerHeight) ? 'horizontal' : 'vertical';
    }

    function resize() {
        var current : Orientation = checkOrientation();
        if (orientation != current) {
            orientation = current;
            page.setOrientation(current);
            document.body.innerHTML = render();
        }
    };

    function render() : string {

        // Base container
        const container = document.createElement('div');
        container.classList.add('slide');

        const header = new Header({ 
            title: data.title as string, 
            subtitle: data.subtitle as string }).render();

        container.append(header);

        // Content block
        const content = page.render();
        content.classList.add('content');
        container.append(content);

        return container.outerHTML;
    }

    return render();
};

(window as any).renderTemplate = renderTemplate;