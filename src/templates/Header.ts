
export default class Header {
    
    private element: HTMLElement;
    title: string;
    subtitle: string;

    constructor (options: { title: string, subtitle: string }) { 
        
        const { title, subtitle } = options;

        this.element = document.createElement('div');
        this.title = title;        
        this.subtitle = subtitle;
    }

    render() {

        // Base container
        this.element.classList.add('header');

        // Headline
        const title = document.createElement('h2');
        title.classList.add('headline', 'header__title');
        title.innerText += this.title;
        this.element.appendChild(title);

        // Subhead
        const subtitle = document.createElement('h3');
        subtitle.classList.add('text', 'header__subtitle');
        subtitle.innerText += this.subtitle;
        this.element.appendChild(subtitle);

        return this;
    }

    getElement() : HTMLElement {
        return this.element;
    }


}