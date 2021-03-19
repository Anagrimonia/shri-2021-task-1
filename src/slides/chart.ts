import type { ChartData } from '../types/data';
import type { User } from '../types/user' ;
import type { Orientation } from '../types/orientation';

import UserCard from '../templates/UserCard'

export default class ChartPage {
    
    private data : ChartData;
    private orientation: Orientation;

    constructor (data: ChartData, orientation: Orientation) { 
        this.data = data;
        this.orientation = orientation;
    }

    render() {

        // Content block
        const container = document.createElement('div');
        container.classList.add('--align_center');

        const chart = document.createElement('div');
        chart.classList.add('chart'); 
        container.append(chart);

        const sprintsNum = Math.floor((window.innerWidth / 2 + 188 + 8) / 64);

        const maxSprint = Math.max.apply(Math, this.data.values.map((obj) => obj.value))
        const activeSprintIndex = this.data.values.findIndex((obj) => obj.active);

        for (let i = activeSprintIndex - sprintsNum + 3; i < activeSprintIndex + 3; i++) {
            

            const sprint = document.createElement('div');
            sprint.classList.add(`chart__sprint`);
            chart.append(sprint);

            if (this.data.values[i]) {
                let h = this.data.values[i].value / maxSprint * 70;           
                let bg = activeSprintIndex == i ? 'primary' : 'secondary';

                const commits = document.createElement('p');
                commits.classList.add(`chart__commits`, 'subhead', `--color_${bg}`);
                commits.innerText = String(this.data.values[i].value);
                sprint.append(commits);

                const column = document.createElement('div');
                column.classList.add(`chart__column`, `--background_${bg}`);
                column.style.height = `${String(h == 0 ? 2 : h)}%`;
                sprint.append(column);

                const num = document.createElement('p');
                num.classList.add(`chart__number`, 'text');
                num.innerText = this.data.values[i].title;
                sprint.append(num); 
            }
              
        }

        const chartTop = document.createElement('div');
        chartTop.classList.add('chart-top'); 
        container.append(chartTop);        

        for (let i = 0; i < 2; i++) {
            const user = new UserCard().render({ 
                user: this.data.users[i] as User, 
                caption: true,
                orientation: 'horizontal'
            });

            chartTop.append(user);

            if (i != 1) {
                const divider = document.createElement('p');
                divider.classList.add('chart-top__divider', 'divider');
                chartTop.append(divider); 
            }
        }

        return container as HTMLElement;
    }  

    setOrientation(orientation : Orientation) {
        this.orientation = orientation;
    }
}
