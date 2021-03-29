import type { ActivityData } from '../types/data';
import type { Orientation } from '../types/orientation';

type Day = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export default class ActivityPage {
    
    private data : ActivityData;
    private orientation: Orientation;
    private days: Day[] = [ 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun' ];
    private params = {
        'vertical'  : { hours: 1, text: '1 час' },
        'horizontal': { hours: 2, text: '2 часа' }
    };

    constructor (data: ActivityData, orientation: Orientation) { 
        this.data = data;
        this.orientation = orientation;
    }

    render() {

        const { hours, text } = this.params[this.orientation];
        var arr = [];

        // 24 hours for vertical orientation, 12 for horizontal
        for (let i = 0; i < 7; i++) {
            arr.push([] as number[]);
            for (let j = 0; j < 24; j += hours) {
                
                let day : Day = this.days[i];
                
                if (this.orientation == 'horizontal')     
                    arr[i].push(this.data.data[day][j] + this.data.data[day][j + 1])
                else
                    arr[i].push(this.data.data[day][j]);
            
            }
        }
        
        const segments = [0, 0, 0, 0];

       // Finding an upper bound of commits per day number
        var maxDay = arr.map((day) => Math.max.apply(Math, day));
        segments[3] = Math.max.apply(null, maxDay);

        for (let i = 1; i < 3; i++)
            segments[i] = segments[i - 1] + (Math.floor(segments[3] / 3)) ;


        const container = document.createElement('div');
        container.classList.add('activity-page');

        const activity = document.createElement('div')
        activity.classList.add('activity-chart');
        container.append(activity);
        
        let [n, m] = this.orientation == 'horizontal' ? [7, 24 / hours] : [24 / hours, 7];

        // Activity chart creation
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                
                let poly = document.createElement('div');
                let polydata = this.orientation == 'horizontal' ? arr[i][j] : arr[j][i];

                let n = 0;
                while (polydata > segments[n]) n++;

                poly.classList.add(`activity-chart__polygon-${n}`, 'activity-chart__polygon')
                activity.append(poly);
            }
        }


        const history = document.createElement('div');
        history.classList.add('activity-history');
        container.append(history);

        // Chart history creation
        for (let i = 0; i < 5; i++) {
            const interval = document.createElement('div');
            interval.classList.add(`activity-history__interval-${i}`, 'activity-history__interval');
            history.append(interval); 

            const description = document.createElement('div');
            description.classList.add('activity-history__text', 'text');

            if (i == 0)
                description.innerText = text;
            else if (i == 1) 
                description.innerText = `${segments[0]}`;
            else {
                let flag = segments[i-2] + 1 != segments[i-1];
                description.innerText = (flag) ? `${segments[i-2] + 1} — ${segments[i-1]}` : `${segments[i-1]}`;
            }


            interval.append(description);         
        }


        return container as HTMLElement;
    }  

    setOrientation(orientation : Orientation) {
        this.orientation = orientation;
    }
}
