import type { User } from '../types/user' ;
import type { Orientation } from '../types/orientation';

import UserCard from '../components/UserCard'
import Header from '../components/Header';
import Button from '../components/Button';

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

    private chunk: number;
    private columns: HTMLDivElement[] = [];

    private grid = { 
        "vertical":   { order: [0, 1, 2, 0, 1, 2, 0, 2], num: 8, cols: 3 }, 
        "horizontal": { order: [0, 1, 3, 4, 1, 3], num: 6, cols: 5 }
    };

    private buttonUp : HTMLElement;
    private buttonDown : HTMLElement;

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

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(() => {

            this.buttonUp = (document.getElementsByClassName('button_direction_up')[0] as HTMLButtonElement);
            this.buttonUp.removeEventListener('click', this._pageUp.bind(this), true);
            this.buttonUp.addEventListener('click', this._pageUp.bind(this), true);
            
            this.buttonDown = (document.getElementsByClassName('button_direction_down')[0] as HTMLButtonElement);
            this.buttonDown.removeEventListener('click', this._pageDown.bind(this), true);
            this.buttonDown.addEventListener('click', this._pageDown.bind(this), true);

            this.columns = Array.from(document.getElementsByClassName('user-grid__column')) as HTMLDivElement[];
        });

        observer.observe(document.querySelector('body') as Node, { childList: true });
    }

    render() {

        // Content block
        const container = document.createElement('div');
        container.classList.add('user-grid');

        this.buttonUp.classList.add('user-grid__button-up');
        this.buttonDown.classList.add('user-grid__button-down');

        const { order, num, cols } = this.grid[this.orientation];

        for (var i = 0; i < cols; i++) {
            
            const column = document.createElement('div');
            column.style.order = String(i + 1);
            column.classList.add('user-grid__column');
            container.append(column);
            this.columns.push(column);

            if (i + 1 == Math.ceil(cols / 2)) {
                column.append(this.buttonUp);
                column.append(this.buttonDown);
            }
        }

        this._showPage(num);

        return container as HTMLElement;
    }  


    private _pageUp() {
        var num = this.grid[this.orientation].num;
        this.chunk -= num;
        this._showPage(-num);
    }

    private _pageDown() {
        var num = this.grid[this.orientation].num;
        this.chunk += num;
        this._showPage(num);
    }

    private _showPage(num : number) {
        
        this._checkEdges(num);
        
        // Getting a batch        
        const users = this.data.users.slice(this.chunk, this.chunk + Math.abs(num));
        
        // Clearing column items
        this.columns.map((column) => {
            let item = column.querySelector('.user-card');
            while (item) {
                column.removeChild(item);
                item = column.querySelector('.user-card');
            }
        });

        // Adding users of the current batch
        for (var i = 0; i < Math.abs(num); i++) {

            var user : HTMLElement;

            if (i < users.length)
                 user = new UserCard({ user : users[i] as User }).render();
             else {
                user = document.createElement('div');
                user.classList.add('user-card');
                user.style.height = '142px';
             }
            this.columns[this.grid[this.orientation].order[i]].append(user);
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

    setOrientation(orientation : Orientation) {
        this.orientation = orientation;
        this.chunk = 0;
        this.columns = [];
    }
}
