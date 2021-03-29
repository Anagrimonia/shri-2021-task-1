import type { DiagramData } from '../types/data';
import type { Orientation } from '../types/orientation';

import PieChart from '../templates/PieChart';

export default class DiagramPage {
    
    private data : DiagramData;
    private orientation: Orientation;

    constructor (data: DiagramData, orientation: Orientation) { 
        this.data = data;
        this.orientation = orientation;
    }

    render() {

        const commits = this.data.categories.map(i => Number(i.valueText.substr(0, i.valueText.indexOf(' '))));
        const sum = commits.reduce((prev, next) => prev + next);
        const percents = commits.map(i => i / sum * 100);
        console.log(percents);

        // Content block
        const container = document.createElement('div');
        container.classList.add('diagram-page');
        container.classList.add('--align_bottom');

        const diagram = document.createElement("div");
        diagram.classList.add('diagram');
        container.append(diagram);

        // Pie chart creation 
        const pie = new PieChart().render({ percents: percents });
        pie.getElement().classList.add('diagram__pie-chart');
        diagram.append(pie.getElement());

        const textBlock = document.createElement("div");
        textBlock.classList.add('diagram__text-block');
        diagram.append(textBlock);

        const pieTitle = document.createElement("p");
        pieTitle.classList.add('diagram__title', this.orientation == 'vertical' ? 'headline' : 'subhead');
        pieTitle.innerText = this.data.totalText;
        textBlock.append(pieTitle);

        const pieSubtitle = document.createElement("p");
        pieSubtitle.classList.add('diagram__subtitle', 'subhead', this.orientation == 'vertical' ? 'subhead' : 'text');
        pieSubtitle.innerText = this.data.differenceText;
        textBlock.append(pieSubtitle);

        const history = document.createElement("div");
        history.classList.add('diagram-history');
        container.append(history);

        // Pie chart history creation
        for (let i = 0; i < this.data.categories.length; i++) {

            var { title, valueText, differenceText } = this.data.categories[i];

            var row = document.createElement('div');
            row.classList.add('diagram-history__row');
            history.append(row);

            var dot = document.createElement('div');
            dot.classList.add('diagram-history__dot', `--style-diagram-${i}`);
            row.append(dot);

            var rowTitle = document.createElement('p');
            rowTitle.classList.add('diagram-history__title', 'text');
            rowTitle.innerText = title;
            row.append(rowTitle);

            var difference = document.createElement('p');
            difference.classList.add('diagram-history__difference', 'text');
            difference.innerText = differenceText.substr(0, differenceText.indexOf(' '));
            row.append(difference);

            var value = document.createElement('p');
            value.classList.add('diagram-history__value', 'text');
            value.innerText = valueText.substr(0, valueText.indexOf(' '));
            row.append(value);

            if (i != this.data.categories.length - 1)  {
                var divider = document.createElement('div');
                divider.classList.add('diagram-history__divider', 'divider');
                history.append(divider);
            }
        }


        return container as HTMLElement;
    }  

    setOrientation(orientation : Orientation) {
        this.orientation = orientation;
    }
}
