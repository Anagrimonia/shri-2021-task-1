import type { User } from '../types/user' ;

type UserCardProps = {
   user: User,
   caption?: boolean, 
   style?: 'primary' | 'secondary', 
   orientation?: 'vertical' | 'horizontal',
   emoji?: string,
   hoverable?: boolean 
};

export default class UserCard extends HTMLElement {

    constructor() { 
        super()
    }

    setAvatar(avatar: string) {

        const old = this.querySelector('.user-card__avatar');
        if (old) this.removeChild(old);

        const img = document.createElement('img');
        img.classList.add('user-card__avatar', 'avatar');
        img.src = `assets/images/1x/${avatar}`;
        this.appendChild(img);
    }

    setName(name: string) {
        
        const old = this.querySelector('.user-card__name');
        if (old) this.removeChild(old);

        const p = document.createElement('p');
        p.classList.add('user-card__name', 'text', 'text_truncation');
        p.innerText += name;
        this.appendChild(p);
    }

    setCaption(caption: string) {

        const old = this.querySelector('.user-card__caption');
        if (old) this.removeChild(old);

        const p = document.createElement('p');
        p.classList.add('user-card__caption', 'caption', 'text_truncation');
        p.innerText += caption;   
        this.appendChild(p);
    }

    setEmoji(emoji: string) {

        const old = this.querySelector('.user-card__emoji');
        if (old) this.removeChild(old);

        const p = document.createElement('p');
        p.classList.add('user-card__emoji');
        p.innerText += emoji;   
        this.prepend(p);
    }

    hover(bool : boolean) {
        if (bool) { this.classList.add('user-card_hoverable'); this.active(false) }
        else this.classList.remove('user-card_hoverable');
    }

    active(bool : boolean) {
        if (bool) { this.classList.add('user-card_active'); this.hover(false) }
        else this.classList.remove('user-card_active')
    }

    render(props: UserCardProps) {

        const { user, caption, style, orientation, emoji, hoverable } = props;

        // Base container
        this.classList.add(
            'user-card',
            `user-card_style_${style || 'none'}`, 
            `user-card_orientation_${orientation || 'vertical'}`);

        this.setAvatar(user.avatar as string);
        this.setName(user.name as string);

        if (caption) this.setCaption(user.valueText as string);
        if (emoji) this.setEmoji(emoji as string);
        if (hoverable) this.hover(true);

        return this;
    }
}

customElements.define("user-card", UserCard);