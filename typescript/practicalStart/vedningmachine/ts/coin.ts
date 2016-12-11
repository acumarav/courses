namespace Coins {

  let imagePath="img/";
    export abstract class Coin {
        constructor(protected value: number) {
            this.value = value;
        }
        abstract getImageUrl(): string

        get Value() {
            return this.value;
        }
    }


    export class Quarter extends Coin {
        constructor() {
            super(.25);
        }

        getImageUrl(): string {
            return imagePath+"Quarter.png";
        }
    }

    export class Dime extends Coin {
        constructor() {
            super(.10)
        }

        getImageUrl() {
            return imagePath+ "Dime.png";
        }
    }

    export class Half extends Coin {
        constructor() {
            super(.5);
        }
        getImageUrl() {
            return imagePath+"Half.png";
        }
    }

    export class Dollar extends Coin {
        constructor() {
            super(1);
        }

        getImageUrl() {
            return imagePath+"Dollar.jpg";
        }
    }
}
