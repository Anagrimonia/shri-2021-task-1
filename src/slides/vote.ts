import type { User } from '../types/user' ;
import type { Orientation } from '../types/orientation';

import UserCard from '../templates/UserCard'
import Header from '../templates/Header';
import Button from '../templates/Button';

export default class VotePage {
    
    private orientation: Orientation;

    private data : {
        title: String, 
        subtitle: String, 
        emoji: String,
        offset?: number, 
        selectedUserId?: number,
        users: Array<User>,
    };

    private grid = { 
        "vertical":   { order: [0, 1, 2, 0, 1, 2, 0, 2], num: 8, cols: 3 }, 
        "horizontal": { order: [0, 1, 3, 4, 1, 3],       num: 6, cols: 5 }
    };

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

        // Content block
        const container = document.createElement('div');
        container.classList.add('user-grid');

        const buttonUp = new Button().render({ direction: 'up' });
        buttonUp.classList.add('user-grid__button-up');

        const buttonDown = new Button().render({ direction: 'down' });
        buttonDown.classList.add('user-grid__button-down');

        const { order, num, cols } = this.grid[this.orientation];

        var columns : HTMLElement[] = []

        for (var i = 0; i < cols; i++) {
            
            const column = document.createElement('div');
            column.style.order = String(i + 1);
            column.classList.add('user-grid__column');
            container.append(column);
            columns.push(column);

            if (i + 1 == Math.ceil(cols / 2)) {
                column.append(buttonUp);
                column.append(buttonDown);
            }
        }

        // Getting a batch        
        const users = this.data.users.slice(this.data.offset || 0, num).map(user => {
            return new UserCard().render({ user: user, hoverable: true });
        });

        // Selecting selected user :)
        if (this.data.selectedUserId) {
            const i : number = this.data.users.findIndex(x => x.id === this.data.selectedUserId);
            users[i].active(true);
            users[i].setEmoji(this.data.emoji as string);
        }

        // Adding users of the current batch
        for (var i = 0; i < num; i++) {
            var user : HTMLElement;

            if (i <= users.length)
                 user = users[i];
            else {
                user = document.createElement('div');
                user.classList.add('user-card');
                user.style.height = '142px';
            }
            columns[this.grid[this.orientation].order[i]].append(user);
        }

        return container as HTMLElement;
    }  

    setOrientation(orientation : Orientation) {
        this.orientation = orientation;
    }
}
