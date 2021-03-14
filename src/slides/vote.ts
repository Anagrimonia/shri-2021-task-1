import type { User } from '../types/user' ;
import type { Orientation } from '../types/orientation';

import UserCard from '../components/UserCard'
import Header from '../components/Header';
import Button from '../components/Button';

export default class VotePage {
    private data : {
        title: String, 
        subtitle: String, 
        emoji: String,
        offset?: number, 
        selectedUserId?: number,
        users: Array<User>,
    };
    private orientation: Orientation;

    constructor (data: { 
        title: String, 
        subtitle: String, 
        emoji: String, 
        offset?: number,
        selectedUserId?: 
        number, users: Array<User> 
    },  orientation: Orientation) { 
        
        this.data = data;
        this.orientation = orientation;
    }

    render() {

        // Base container
        const container = document.createElement('div');
        container.classList.add('slide', 'vote');

        const header = new Header({ 
            title: this.data.title as string, 
            subtitle: this.data.subtitle as string }).render();

        container.append(header);

        // Content block
        const content = document.createElement('div');
        content.classList.add('user-grid');
        container.append(content);

        const num : number = (this.orientation === 'horizontal') ? 6 : 8;

        for (var i = 0; i < num; i++) {

            // Content block
            const item = document.createElement('div');
            item.classList.add('user-grid__item');
            content.append(item);

            const user = new UserCard({ user : this.data.users[i] as User }).render();
            item.append(user);
        }

        // Content block
            const item1 = document.createElement('div');
            item1.classList.add('user-grid__item', 'user-grid__button-up');
            content.append(item1);

        const button1 = new Button({}).render();
        item1.append( button1);
        
        // Content block
            const item2 = document.createElement('div');
            item2.classList.add('user-grid__item', 'user-grid__button-down');
            content.append(item2);

        const button2 = new Button({}).render();
        item2.append( button2);

        return container as HTMLElement;
        
    }

}
