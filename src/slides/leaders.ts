import type { User } from '../types/user' ;
import type { Orientation } from '../types/orientation';
import UserCard from '../templates/UserCard'
import Podium from '../templates/Podium'
import Header from '../templates/Header';


export default class LeadersPage {
    
    private orientation: Orientation;
    private data : {
        title: String, 
        subtitle: String, 
        emoji: String, 
        selectedUserId?: number,
        users: Array<User>,
    };

    private props = {
        'vertical'  : { steps: 3 },
        'horizontal': { steps: 5 }
    };

    constructor (data: { 
        title: String, 
        subtitle: String, 
        emoji: String, 
        selectedUserId?: 
        number, users: Array<User> 
    },  orientation: Orientation) { 
        
        this.data = data;
        this.orientation = orientation;
    }

    render() {

        // Defining a number of podium places according to orientation
        const steps = this.props[this.orientation].steps;

        // Base container
        const container = document.createElement('div');
        container.classList.add('leaders');

        // Creating ar array of winners in descending order
        // Place number is needed for an audience choice winner
        var winners : { winner: UserCard, place: number }[] = []; 

        for (let i = 0; i < steps; i++) { 
            const user = new UserCard().render({ 
                user : this.data.users[i] as User, 
                caption: true,
                emoji: i == 0 ? this.data.emoji as string : undefined });

            winners.push({ winner: user, place: i });
        }

        // If an extra winner exists
        if (this.data.selectedUserId) {

            // Find his index in data
            const extraIndex : number = this.data.users.findIndex(x => x.id === this.data.selectedUserId);

            const extra = new UserCard().render({ 
                user : this.data.users[extraIndex] as User, 
                caption: true, 
                emoji: '👍' });

            // If extra winner is on the podium
            if (extraIndex > 0 && extraIndex < steps) 
                winners[extraIndex].winner.setEmoji('👍');
            
            // If orientation is horizontal & selected user not in first four winners
            else if (this.orientation == 'horizontal' && extraIndex >= 4)
                winners[winners.length - 1] = { winner: extra, place: extraIndex };                
            
            // If orientation is vertical & selected user not in winners
            else if (this.orientation == 'vertical' && extraIndex >= 3)
                winners.push({ winner: extra, place: extraIndex });
        }

        // Podium component
        const podium = new Podium().render({ 
            winners : winners, 
            orientation: this.orientation});

        container.append(podium);

        return container as HTMLElement;
        
    }

    setOrientation(orientation : Orientation) {
        this.orientation = orientation;
    }

}
