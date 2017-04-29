import {Component} from "@angular/core";
import {PostsService} from "../services/posts.service";
import {Post, User} from "./interface/user.interface";
@Component({
  moduleId: module.id,
  selector: 'user',
  templateUrl: './views/user.details.html',
  providers: [PostsService]
})
export class UserComponent {
  users: User[];
  hobbies: string[];
  showHobbies: boolean;
  posts: Post[];

  constructor(private postsService: PostsService) {
    this.hobbies = ['Music', 'Movies', 'Sports'];
    this.showHobbies = false;

    this.postsService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
    this.postsService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  toggleHobbies() {
    this.showHobbies = !this.showHobbies;
  }

  addHobby(hobby: any) {
    this.hobbies.push(hobby);
  }

  deleteHobby(hobby: any) {
    this.hobbies.splice(hobby, 1);
  }
}
