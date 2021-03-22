import type { ActivityData } from '../types/data';
import type { Orientation } from '../types/orientation';

export default class ActivityPage {
    
    private data : ActivityData;
    private orientation: Orientation;

    constructor (data: ActivityData, orientation: Orientation) { 
        this.data = data;
        this.orientation = orientation;
    }

    render() {

        // Content block
        const container = document.createElement('div');
        container.classList.add('user-grid');


        return container as HTMLElement;
    }  

    setOrientation(orientation : Orientation) {
        this.orientation = orientation;
    }
}
