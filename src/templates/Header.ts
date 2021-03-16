
export default class Header {
    
    title: string;
    subtitle: string;

    constructor (options: { title: string, subtitle: string }) { 
        
        const { title, subtitle } = options;

        this.title = title;        
        this.subtitle = subtitle;
    }

    render() {

        // Base container
        const header = document.createElement('div');
        header.classList.add('header');

        // Headline
        const title = document.createElement('h2');
        title.classList.add('headline', 'header__title');
        title.innerText += this.title;
        header.appendChild(title);

        // Subhead
        const subtitle = document.createElement('h3');
        subtitle.classList.add('text', 'header__subtitle');
        subtitle.innerText += this.subtitle;
        header.appendChild(subtitle);

        return header as HTMLElement;
    }
}