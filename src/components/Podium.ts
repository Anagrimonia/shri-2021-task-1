import UserCard from '../components/UserCard' ;

export default class Podium {
    
   winners: { winner: UserCard, place: number }[];
    orientation: 'vertical' | 'horizontal';

    constructor (options: {
                   winners: { winner: UserCard, place: number }[],
                   orientation: 'vertical' | 'horizontal' }) { 
        
        const { winners, orientation } = options;

        this.winners = winners;        
        this.orientation = orientation;
    }

    render() {

        // Podium
        const podium = document.createElement('div');
        podium.classList.add('podium');

        // Defining a number of podium places according to orientation
        const num = this.winners.length;
        const margin : { [key: string]: string[] } = { 
            '3': ['0', '15%', '30%'], 
            '4': ['0', '15%', '30%', ''],
            '5': ['0', '3%', '3%', '6%', '6%'] 
        }

        for (let i = 0; i < num; i++) {
            
            // Podium step
            const step = document.createElement('div');
            step.classList.add(`podium__step`);
            step.style.zIndex = String(num - i);
            step.style.marginTop = String(margin[num][i]);

            // Winner
            const winner = this.winners[i].winner.render();
            winner.classList.add(`podium__user-card`);
            step.append(winner);

            // Place number
            const placeNumber = document.createElement('p');
            placeNumber.classList.add('headline', 'podium__place-number');
            placeNumber.innerText = String(this.winners[i].place + 1);
            step.append(placeNumber);

            
            // Adding places backgrounds
            step.classList.add(`podium__step_background_${i == 0 ? 'primary' : 'secondary' }`);

            // Sorting places positions on podium (ex: 3-1-2, 5-3-1-2-4)
            if (this.orientation == 'vertical' && i == 3) {
                step.style.zIndex = String(num);
                step.classList.add(`podium__step_position_extra`);
                step.classList.remove(`podium__step_background_secondary`);
                placeNumber.classList.add('podium__place-number_position_extra');
                podium.append(step);
            }
            else if (i % 2 == 0) {
                step.classList.add(`podium__step_position_${i == 0 ? 'center' : 'left' }`);
                podium.prepend(step);
            }
            else {
                step.classList.add(`podium__step_position_right`);
                podium.append(step);
            }            
        }

        return podium as HTMLElement;
    }
}