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

            if(id % 7 == 0){
                url="http://big-bunny.com/bigbunny.jpg";
            }

            let vid = new Video(id.toString(), "Video " + id, url);
            videos.push(vid);
            index++;
        }

        return videos;
    }
}