/**
 * Created by daljit on 08-Apr-17.
 */
import {Todo} from "./model/todo";
import {TodoDataService} from "../service/todo.service";
import {Component} from "@angular/core";
@Component({
  moduleId: module.id,
  selector: 'todoapp',
  templateUrl: './views/todos.html',
  styleUrls: ['./css/todo-structure.css'],
  providers: [TodoDataService]
})
export class TodoComponent {
  newTodo: Todo = new Todo();

  constructor(private todoDataService: TodoDataService) {
  }

  addTodo() {
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
  }

  toggleTodoComplete(todo: Todo) {
    this.todoDataService.toggleTodoComplete(todo);
  }

  removeTodo(todo: Todo) {
    this.todoDataService.deleteTodoById(todo.id);
  }

  get todos() {
    return this.todoDataService.getAllTodos();
  }

}
