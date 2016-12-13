class MdatInfo {

    constructor(public url: string,
                public offset: number,
                public length: number) {
    }

    echo():string {
        return JSON.stringify(this);
    }


}
