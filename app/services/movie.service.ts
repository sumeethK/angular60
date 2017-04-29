import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class MovieService {
  private host = "http://localhost:8026";
  private slash = "/";

  constructor(private http: Http) {
    console.log('MovieService Initialized...');
  }

  getAllmovies() {
    return this.http.get(this.host + '/movies/showAll')
      .map(res => res.json());
  }

  getMovies(limit: number) {
    return this.http.get(this.host + '/movies/get/' + limit)
      .map(res => res.json());
  }

  getMoviesWithLimitAndOffset(limit: number, offset: number) {
    return this.http.get(this.host + '/movies/get/' + limit + this.slash + offset)
      .map(res => res.json());
  }
}
