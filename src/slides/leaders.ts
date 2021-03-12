import type { User } from '../types/user' ;
import type { Orientation } from '../types/orientation';
import UserCard from '../components/UserCard'

export default class LeadersPage {
    private data : {
        title: String, 
        subtitle: String, 
        emoji: String, 
        users: Array<User>
    };
    private orientation: Orientation;

    constructor (data: { title: String, subtitle: String, emoji: String, users: Array<User> }, 
                 orientation: Orientation) { 
        this.data = data;
        this.orientation = orientation;
    }

    render() {

        // Base container
        const container = document.createElement('div');
        container.classList.add('slide', 'leaders');

        // Headline
        const title = document.createElement('h2');
        title.classList.add('headline', 'leaders__title');
        title.innerText += this.data.title;
        container.appendChild(title);

        // Subhead
        const subtitle = document.createElement('h3');
        subtitle.classList.add('text', 'leaders__subtitle');
        subtitle.innerText += this.data.subtitle;
        container.appendChild(subtitle);

        // Podium
        const podium = document.createElement('div');
        podium.classList.add('podium');
        container.appendChild(podium);

        // Checking orientation
        var num = this.orientation === 'vertical' ? 3 : 5;
        const margin : { [key: string]: string[] } = { '3': ['0', '15', '30'], '5': ['0', '3', '3', '6', '6'] }

        for (let i = 0; i < num; i++) {
            
            // Step
            const step = document.createElement('div');
            step.classList.add(`podium__step`);
            step.style.zIndex = String(num - i);
            step.style.marginTop = margin[num][i] + '%';

            // Adding places backgrounds
            if (i == 0)
                step.classList.add(`podium__step_background_primary`);
            else 
                step.classList.add(`podium__step_background_secondary`);

            // Sorting places positions on podium (ex: 3-1-2, 5-3-1-2-4)
            if (i % 2 == 0) {
                step.classList.add(`podium__step_position_${i == 0 ? 'center' : 'left' }`);
                podium.prepend(step);
            }
            else {
                step.classList.add(`podium__step_position_right`);
                podium.append(step);
            }

            // Winner
            const user = new UserCard({ 
                user : this.data.users[i] as User, 
                caption: true, 
                emoji: i == 0 ? this.data.emoji as string : undefined }).render();

            user.classList.add(`podium__user-card`);
            step.append(user);

            // Place number
            const placeNumber = document.createElement('p');
            placeNumber.classList.add('headline', 'podium__place-number');
            placeNumber.innerText = String(i + 1);
            step.append(placeNumber);            
        }

        return container as HTMLElement;
        
    }

}
