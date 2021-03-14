import type { User } from '../types/user' ;
import type { Orientation } from '../types/orientation';
import UserCard from '../components/UserCard'
import Podium from '../components/Podium'
import Header from '../components/Header';


export default class LeadersPage {
    private data : {
        title: String, 
        subtitle: String, 
        emoji: String, 
        selectedUserId?: number,
        users: Array<User>,
    };
    private orientation: Orientation;

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

        // Base container
        const container = document.createElement('div');
        container.classList.add('leaders');

        // Defining a number of podium places according to orientation
        const num = this.orientation === 'vertical' ? 3 : 5;

        var winners : { winner: UserCard, place: number }[] = []; 

        for (let i = 0; i < num; i++) { 

            const user = new UserCard({ 
                user : this.data.users[i] as User, 
                caption: true,
                emoji: i == 0 ? this.data.emoji as string : undefined });

            winners.push({ winner: user, place: i });
        }

        // If an extra winner exists
        if (this.data.selectedUserId) {

            const extraIndex : number = this.data.users.findIndex(x => x.id === this.data.selectedUserId);
            
            const extra = new UserCard({ 
                user : this.data.users[extraIndex] as User, 
                caption: true, 
                emoji: '👍' });

            // If extra winner is on the podium
            if (extraIndex > 0 && extraIndex < num) 
                winners[extraIndex].winner.emoji = '👍';
            
            // If orientation is horizontal & selected user not in first four winners
            else if (this.orientation == 'horizontal' && extraIndex >= 4)
                winners[winners.length - 1] = { winner: extra, place: extraIndex };                
            
            // If orientation is vertical & selected user not in winners
            else if (this.orientation == 'vertical' && extraIndex >= 3)
                winners.push({ winner: extra, place: extraIndex });
        }

        const podium = new Podium({ 
                winners : winners, 
                orientation: this.orientation}).render();

        container.append(podium);

        return container as HTMLElement;
        
    }

}
