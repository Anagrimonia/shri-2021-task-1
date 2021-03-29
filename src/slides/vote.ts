import type { VoteData } from '../types/data' ;
import type { User } from '../types/user';
import type { Orientation } from '../types/orientation';

import UserCard from '../templates/UserCard'
import Header from '../templates/Header';
import Button from '../templates/Button';

export default class VotePage {
    
    private data : VoteData;
    private orientation: Orientation;
    private params = { 
        "vertical":   { order: [0, 1, 2, 0, 1, 2, 0, 2], num: 8, cols: 3 }, 
        "horizontal": { order: [0, 1, 3, 4, 1, 3],       num: 6, cols: 5 }
    };

    constructor (data: VoteData, orientation: Orientation) {
        this.data = data;
        this.orientation = orientation;
    }

    render() {

        const { order, num, cols } = this.params[this.orientation];
        const offset = this.data.offset || 0;

        const container = document.createElement('div');
        container.classList.add('user-grid', '--align_center');

        const buttonUp = new Button().render({ direction: 'up' });
        buttonUp.getElement().classList.add('user-grid__button-up');
        buttonUp.getElement().dataset.action = 'update';
        buttonUp.getElement().dataset.params = JSON.stringify({
            alias: 'vote',  
            data: {
                offset: (offset - num > 0) ? offset - num : 0          
            }
        });

        const buttonDown = new Button().render({ direction: 'down' });
        buttonDown.getElement().classList.add('user-grid__button-down');
        buttonDown.getElement().dataset.action = 'update';
        buttonDown.getElement().dataset.params = JSON.stringify({
            alias: 'vote',  
            data: {
                offset: (offset + num < this.data.users.length) ? offset + num : 0          
            }
        });
     
        buttonUp.disabled(offset == 0);
        buttonDown.disabled(offset + num >= this.data.users.length);        
    
        var columns : HTMLElement[] = []

        for (var i = 0; i < cols; i++) {
            
            const column = document.createElement('div');
            column.style.order = String(i + 1);
            column.classList.add('user-grid__column');
            container.append(column);
            columns.push(column);

            if (i + 1 == Math.ceil(cols / 2)) {
                column.append(buttonUp.getElement());
                column.append(buttonDown.getElement());
            }
        }

        // Getting a batch        
        const users = this.data.users.slice(offset, offset + num).map(user => {
            return new UserCard().render({ user: user, hoverable: true });
        });

        // Selecting selected user :)
        if (this.data.selectedUserId) {
            const i : number = this.data.users.findIndex(x => x.id === this.data.selectedUserId) - offset;
            if (i >= 0 && i < users.length) {
                users[i].active(true);
                users[i].setEmoji('👍' as string);
            } 
        }

        // Adding users of the current batch
        for (var i = 0; i < num; i++) {
            var user : HTMLElement;

            if (i < users.length) {
                user = users[i].getElement();
                user.dataset.action = 'update';
                user.dataset.params = JSON.stringify({
                    alias: 'leaders',    
                    data: { selectedUserId: this.data.users[i].id }
                });
            }
            else {
                user = document.createElement('div');
                user.classList.add('user-card');
                user.style.height = '142px';
            }
            columns[this.params[this.orientation].order[i]].append(user);
        }

        return container as HTMLElement;
    }  

    setOrientation(orientation : Orientation) {
        this.orientation = orientation;
    }
}
