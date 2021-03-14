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
    private chunk: number;
    private gridItems: HTMLDivElement[] = [];
    private buttonUp: HTMLElement;
    private buttonDown: HTMLElement;

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
        this.chunk = 0;

        this.buttonUp = new Button({ direction: 'up' }).render();
        this.buttonDown = new Button({ direction: 'down' }).render();
    }

    render() {

        // Content block
        const container = document.createElement('div');
        container.classList.add('user-grid');

        // Defining a number of users per page
        const num : number = (this.orientation === 'horizontal') ? 6 : 8;
        
        // Button Up
        const itemButtonUp = document.createElement('div');
        itemButtonUp.classList.add('user-grid__button-up');
        container.append(itemButtonUp);
        itemButtonUp.append(this.buttonUp);
        
        // Content down
        const itemButtonDown = document.createElement('div');
        itemButtonDown.classList.add('user-grid__button-down');
        container.append(itemButtonDown);
        itemButtonDown.append(this.buttonDown);

        for (var i = 0; i < num; i++) {
            
            // Grid item
            const item = document.createElement('div');
            item.classList.add('user-grid__item');
            container.append(item);
            this.gridItems.push(item);
        }

        this._showPage(num);

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(() => {
            this.buttonUp = (document.getElementsByClassName('button_direction_up')[0] as HTMLButtonElement);
            this.buttonUp.addEventListener('click', () => this._turnPage(-num));
            
            this.buttonDown = (document.getElementsByClassName('button_direction_down')[0] as HTMLButtonElement);
            this.buttonDown.addEventListener('click', () => this._turnPage(num));

            this.gridItems = Array.from(document.getElementsByClassName('user-grid__item')) as HTMLDivElement[];
        });

        observer.observe(document.querySelector('body') as Node, { childList: true });

        return container as HTMLElement;
    }  

    private _turnPage(num : number) {
        this.chunk += num;
        this._showPage(num);
    }

    private _showPage(num : number) {
        
        this._checkEdges(num);
        
        // Getting a batch        
        const users = this.data.users.slice(this.chunk, this.chunk + Math.abs(num));
        
        // Clearing grid cells
        this.gridItems.map((item) => item.innerHTML = "");

        // Adding users of the current batch
        for (var i = 0; i < users.length; i++) {
            const user = new UserCard({ user : users[i] as User }).render();
            this.gridItems[i].append(user);
        }
    }

    private _checkEdges(num : number) {             
        if (this.chunk === 0) 
           this.buttonUp.classList.add('button_disabled');
        else 
           this.buttonUp.classList.remove('button_disabled');


        if (this.chunk + num >= this.data.users.length) 
           this.buttonDown.classList.add('button_disabled');
        else 
           this.buttonDown.classList.remove('button_disabled');
        
    }
}
