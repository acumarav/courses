  
    export abstract class Coin {
      protected imagePath ="img/";
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
            return this.imagePath+"Quarter.png";
        }
    }

    export class Dime extends Coin {
        constructor() {
            super(.10)
        }

        getImageUrl() {
            return this.imagePath+ "Dime.png";
        }
    }

    export class Half extends Coin {
        constructor() {
            super(.5);
        }
        getImageUrl() {
            return this.imagePath+"Half.png";
        }
    }

    export class Dollar extends Coin {
        constructor() {
            super(1);
        }

        getImageUrl() {
            return this.imagePath+"Dollar.jpg";
        }
    }
