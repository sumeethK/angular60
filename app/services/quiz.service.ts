import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class QuizService {
  private host = "http://localhost:8026";

  constructor(private http: Http) {
    console.log('QuizService Initialized...');
  }

  getQuestion() {
    return this.http.get(this.host + '/quiz/getAllQuestion').map(res => res.json());
  }
}
