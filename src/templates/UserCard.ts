import type { User } from '../types/user' ;

type UserCardProps = {
   user: User,
   caption?: boolean, 
   style?: 'primary' | 'secondary', 
   orientation?: 'vertical' | 'horizontal',
   emoji?: string,
   hoverable?: boolean 
};

export default class UserCard {

    private element: HTMLElement;
    constructor() { 
        this.element = document.createElement('div');
    }

    setAvatar(avatar: string) {

        const old = this.element.querySelector('.user-card__avatar');
        if (old) this.element.removeChild(old);

        const wrapper = document.createElement('div');
        wrapper.classList.add('user-card__avatar', 'avatar');
        this.element.appendChild(wrapper);

        const img = document.createElement('img');
        img.src = `assets/images/${avatar}`;
        wrapper.appendChild(img);
    }

    setName(name: string) {
        
        const old = this.element.querySelector('.user-card__name');
        if (old) this.element.removeChild(old);

        const p = document.createElement('p');
        p.classList.add('user-card__name', 'text', '--text_truncation');
        p.innerText += name;
        this.element.appendChild(p);
    }

    setCaption(caption: string) {

        const old = this.element.querySelector('.user-card__caption');
        if (old) this.element.removeChild(old);

        const p = document.createElement('p');
        p.classList.add('user-card__caption', 'caption', '--text_truncation');
        p.innerText += caption;   
        this.element.appendChild(p);
    }

    setEmoji(emoji: string) {

        const old = this.element.querySelector('.user-card__emoji');
        if (old) this.element.removeChild(old);

        const p = document.createElement('p');
        p.classList.add('user-card__emoji');
        p.innerText += emoji;   
        this.element.prepend(p);
    }

    hover(bool : boolean) {
        if (bool) { this.element.classList.add('user-card--hoverable'); this.active(false) }
        else this.element.classList.remove('user-card--hoverable');
    }

    active(bool : boolean) {
        if (bool) { this.element.classList.add('user-card--active'); this.hover(false) }
        else this.element.classList.remove('user-card--active')
    }

    render(props: UserCardProps) {

        const { user, caption, style, orientation, emoji, hoverable } = props;

        // Base container
        this.element.classList.add(
            'user-card',
            `user-card--style_${style || 'none'}`, 
            `user-card--${orientation || 'vertical'}`);

        this.setAvatar(user.avatar as string);
        this.setName(user.name as string);

        if (caption) this.setCaption(user.valueText as string);
        if (emoji) this.setEmoji(emoji as string);
        if (hoverable) this.hover(true);

        return this;
    }

    getElement() : HTMLElement {
        return this.element;
    }
}
