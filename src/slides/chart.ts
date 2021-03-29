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

        const container = document.createElement('div');
        container.classList.add('--align_bottom');

        const chart = document.createElement('div');
        chart.classList.add('chart'); 
        container.append(chart);

        // Counting the max number of columns on the page
        let sprintsNum = Math.floor((window.innerWidth / 2 + 188 + 8) / 64);
        if (this.orientation == 'horizontal') sprintsNum += 1;

        const maxSprint = Math.max.apply(Math, this.data.values.map((obj) => obj.value))
        const activeSprintIndex = this.data.values.findIndex((obj) => obj.active);

        // Chart creation
        for (let i = activeSprintIndex - sprintsNum + 3; i < activeSprintIndex + 3; i++) {
            
            const { title, value, active } = this.data.values[i] ? this.data.values[i] : { title: '-', value: 0, active: false };
            
            const sprint = document.createElement('div');
            sprint.classList.add(`chart__sprint`);
            if (!this.data.values[i]) sprint.style.opacity = '0.3';
            chart.append(sprint);

            let h =  value / maxSprint * 70 * (this.orientation === 'horizontal' ? 0.8 : 0.9);           
            let bg = activeSprintIndex == i ? 'primary' : 'secondary';

            const commits = document.createElement('p');
            commits.classList.add(`chart__commits`, 'subhead', `--color_${bg}`);
            commits.innerText = value != 0 ? String(value) : '';
            sprint.append(commits);

            const column = document.createElement('div');
            column.classList.add(`chart__column`, `chart__column--bg_${bg}`);
            column.style.height = `${h == 0 ? '10px' : String(h) + '%'}`;
            sprint.append(column);

            const num = document.createElement('p');
            num.classList.add(`chart__number`, 'text');
            num.innerText = title;
            sprint.append(num); 
              
        }

        // Chart history creation
        const chartTop = document.createElement('div');
        chartTop.classList.add('chart-top'); 
        container.append(chartTop);        

        for (let i = 0; i < 2; i++) {
            const user = new UserCard().render({ 
                user: this.data.users[i] as User, 
                caption: true,
                orientation: 'horizontal'
            });

            chartTop.append(user.getElement());

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
