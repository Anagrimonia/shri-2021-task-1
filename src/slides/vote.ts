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

    private chunk: number;
    private grid = { 
        "vertical":   { order: [0, 1, 2, 0, 1, 2, 0, 2], num: 8, cols: 3 }, 
        "horizontal": { order: [0, 1, 3, 4, 1, 3],       num: 6, cols: 5 }
    };

    private buttonUp : Button;
    private buttonDown : Button;

    private columns: HTMLDivElement[] = [];

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

        this.buttonUp = new Button().render({ direction: 'up' });
        this.buttonDown = new Button().render({ direction: 'down' });

        // -----=== ORIENTATION OBSERVER ===-----
        // [ Triggered if orientation has changed ]
        const orientationObserver = new MutationObserver(() => {

            this._pageUp = this._pageUp.bind(this);
            this._pageDown = this._pageDown.bind(this);            

            this.buttonUp = (document.getElementsByClassName('button_direction_up')[0] as Button);
            this.buttonUp.removeEventListener('click', this._pageUp, true);
            this.buttonUp.addEventListener('click', this._pageUp, true);
            
            this.buttonDown = (document.getElementsByClassName('button_direction_down')[0] as Button);
            this.buttonDown.removeEventListener('click', this._pageDown, true);
            this.buttonDown.addEventListener('click', this._pageDown, true);

            this.columns = Array.from(document.getElementsByClassName('user-grid__column')) as HTMLDivElement[];

            this._resetUserSelection();
            gridUpdateObserver.observe(document.querySelector('.user-grid__column') as Node, { childList: true });

        });

         // -----=== GRID UPDATE OBSERVER ===-----
        // [ Triggered if page has turned ]
        const gridUpdateObserver = new MutationObserver(this._resetUserSelection.bind(this)); 
        

        orientationObserver.observe(document.querySelector('body') as Node, { childList: true });
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
            let items = column.getElementsByClassName("user-card");
            while (items.length) {
                column.removeChild(items[0]);
            }
        });

        // Adding users of the current batch
        for (var i = 0; i < Math.abs(num); i++) {

            var user : HTMLElement;

            if (i < users.length)
                 user = new UserCard().render({ user : users[i] as User, hoverable: true });
             else {
                user = document.createElement('div');
                user.classList.add('user-card');
                user.style.height = '142px';
             }
            this.columns[this.grid[this.orientation].order[i]].append(user);
        }
    }

    private _checkEdges(num : number) {             
         this.buttonUp.disabled(this.chunk === 0);
         this.buttonDown.disabled(this.chunk + num >= this.data.users.length);        
    }

    private _resetUserSelection() {
        var users : HTMLElement[];
        users = Array.from(document.querySelectorAll('.user-card'));
        users.map((user) => user.addEventListener('click', () => {
            (user as UserCard).active(true);
            console.log(this.data, UserCard);
            (user as UserCard).setEmoji('👍' as string);
        })); 
    }

    setOrientation(orientation : Orientation) {
        this.orientation = orientation;
        this.chunk = 0;
        this.columns = [];
    }
}
