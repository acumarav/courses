class Video {
    constructor(public id: String, public name: String, public thumbnailUrl: String) {
    }
}

class VideoService {
    public getVideos(count: number, offset: number): Video[] {

        let videos = [];
        let index: number = 0;
        while (index < count) {
            let id: number = index + offset + 1;

            let url = (id % 2 == 0) ? "https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg02.jpg" : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg04.jpg";

            if (id % 5 == 0) {
                url = "http://big-bunny.com/bigbunny.jpg";
            }

            let vid = new Video(id.toString(), "Video " + id, url);
            videos.push(vid);
            index++;
        }

        return videos;
    }


    public  getThumbnails(video: Video): string[] {

        return [
            "https://pocasi.seznam.cz/img/hp-large/jihlava/winter/6.jpg",
            "https://pocasi.seznam.cz/img/hp-large/karlovy-vary/winter/6.jpg",
            "https://pocasi.seznam.cz/img/hp-large/kladno/winter/6.jpg",
            "https://pocasi.seznam.cz/img/hp-large/pardubice/winter/4.jpg",
            "https://pocasi.seznam.cz/img/hp-large/praha/winter/8.jpg",
            "https://pocasi.seznam.cz/img/hp-large/usti-nad-labem/winter/7.jpg",
            "https://pocasi.seznam.cz/img/hp-large/zlin/winter/7.jpg",

            "https://pocasi.seznam.cz/img/hp-large/jihlava/winter/1.jpg",
            "https://pocasi.seznam.cz/img/hp-large/karlovy-vary/winter/1.jpg",
            "https://pocasi.seznam.cz/img/hp-large/kladno/winter/1.jpg",
            "https://pocasi.seznam.cz/img/hp-large/pardubice/winter/1.jpg",
            "https://pocasi.seznam.cz/img/hp-large/praha/winter/1.jpg",
            "https://pocasi.seznam.cz/img/hp-large/usti-nad-labem/winter/1.jpg",
            "https://pocasi.seznam.cz/img/hp-large/zlin/winter/1.jpg",

            "https://pocasi.seznam.cz/img/hp-large/jihlava/winter/2.jpg",
            "https://pocasi.seznam.cz/img/hp-large/karlovy-vary/winter/2.jpg",
            "https://pocasi.seznam.cz/img/hp-large/kladno/winter/2.jpg",
            "https://pocasi.seznam.cz/img/hp-large/pardubice/winter/2.jpg",
            "https://pocasi.seznam.cz/img/hp-large/praha/winter/2.jpg",
            "https://pocasi.seznam.cz/img/hp-large/usti-nad-labem/winter/2.jpg",
            "https://pocasi.seznam.cz/img/hp-large/zlin/winter/2.jpg"
        ];
    }
}