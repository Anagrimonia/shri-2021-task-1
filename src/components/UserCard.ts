import type { User } from '../types/user' ;

export default class UserCard {
    
    user: User;
    caption: boolean;
    style: 'primary' | 'secondary' | 'none' ;
    orientation: 'vertical' | 'horizontal';
    emoji: string | undefined;

    constructor (options: {
                   user: User,
                   caption?: boolean, 
                   style?: 'primary' | 'secondary' | 'none', 
                   orientation?: 'vertical' | 'horizontal',
                   emoji?: string }) { 
        
        const { user, caption, style, orientation, emoji } = options;

        this.user = user;        

        // Default parameters
        this.caption = caption ? caption : false;
        this.style = style ? style : 'none';
        this.orientation = orientation ? orientation : 'vertical';
        this.emoji = emoji ? emoji : undefined;
    }

    render() {

        // Base container
        const userCard = document.createElement('div');
        userCard.classList.add('user-card', 
                               `user-card_style_${this.style}`, 
                               `user-card_orientation_${this.orientation}`);

        // Avatar
        const avatar = document.createElement('img');
        avatar.classList.add('user-card__avatar', 'avatar');
        avatar.src = `assets/images/1x/${this.user.avatar}`;
        userCard.appendChild(avatar);
        
        // Name
        const name = document.createElement('p');
        name.classList.add('user-card__name', 'text', 'text_truncation');
        name.innerText += this.user.name;
        userCard.appendChild(name);

        // Caption
        if (this.caption) {
            const caption = document.createElement('p');
            caption.classList.add('user-card__caption', 'caption', 'text_truncation');
            caption.innerText += this.user.valueText;   
            userCard.appendChild(caption);
        }

        // Emoji
        if (this.emoji) {
            const emoji = document.createElement('p');
            emoji.classList.add('user-card__emoji');
            emoji.innerText += this.emoji;   
            userCard.prepend(emoji);
        }

        return userCard as HTMLElement;
    }
}