import UserCard from '../templates/UserCard' ;
import type { Orientation } from '../types/orientation';

type PodiumProps = {
   winners: { winner: UserCard, place: number }[],
   orientation: 'vertical' | 'horizontal' 
};

export default class Podium extends HTMLElement {

    private margin : { [key: string]: string[] } = { 
        '3': ['0', '15%', '30%'], 
        '4': ['0', '15%', '30%', ''],
        '5': ['0', '3%', '3%', '6%', '6%'] 
    }

    constructor() { 
        super();    
    }

    render(props : PodiumProps) {

        const { winners, orientation } = props;

        // Podium
        this.classList.add('podium');

        // Defining a number of podium places according to orientation
        const num = winners.length;

        for (let i = 0; i < num; i++) {
            
            // Podium step
            const step = document.createElement('div');
            step.classList.add(`podium__step`);
            step.style.zIndex = String(num - i);
            step.style.marginTop = String(this.margin[num][i]);

            // Winner
            winners[i].winner.classList.add(`podium__user-card`);
            step.append(winners[i].winner);

            // Place number
            const placeNumber = document.createElement('p');
            placeNumber.classList.add('headline', 'podium__place-number');
            placeNumber.innerText = String(winners[i].place + 1);
            step.append(placeNumber);

            // Adding places backgrounds
            step.classList.add(`--background_${i == 0 ? 'primary' : 'secondary' }`);

            // Sorting places positions on podium (ex: 3-1-2, 5-3-1-2-4)
            if (orientation == 'vertical' && i == 3) {
                step.style.zIndex = String(num);
                step.classList.add(`podium__step--position_extra`);
                step.classList.remove(`--background_secondary`);
                placeNumber.classList.add('podium__place-number--position_extra');
                this.append(step);
            }
            else if (i % 2 == 0) {
                step.classList.add(`podium__step--position_${i == 0 ? 'center' : 'left' }`);
                this.prepend(step);
            }
            else {
                step.classList.add(`podium__step--position_right`);
                this.append(step);   
            }    
        }

        return this;
    }
}

customElements.define("user-podium", Podium);