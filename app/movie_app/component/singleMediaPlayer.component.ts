import {Component} from "@angular/core";

@Component({
  moduleId: module.id,
  selector: 'single-media-player',
  templateUrl: './views/media.player.html'
})
export class SingleMediaPlayer {
  sources: Array<Object>;

  constructor() {
    this.sources = [
      {
        src: "http://static.videogular.com/assets/videos/videogular.mp4",
        type: "video/mp4"
      },
      {
        src: "http://static.videogular.com/assets/videos/videogular.ogg",
        type: "video/ogg"
      },
      {
        src: "http://static.videogular.com/assets/videos/videogular.webm",
        type: "video/webm"
      }
    ];
  }
}
