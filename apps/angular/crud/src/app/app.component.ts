import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal } from '@angular/core';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todos()">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos: Signal<Todo[]> = this.todoService.todos;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getAllTodos();
  }

  update(todo: Todo) {
    this.todoService.updateTodo(todo);
  }
}
