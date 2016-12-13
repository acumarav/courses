class MdatInfo {

    constructor(public url: string,
                public offset: number,
                public length: number) {
    }

    echo():string {
        let line = JSON.stringify(this);
        console.log(line);
        return line;
    }


}
