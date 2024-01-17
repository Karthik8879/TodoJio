import { Injectable } from '@angular/core';
import { todo } from '../todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  todoUsers : todo[] = [];

  add(todoObj: todo) {
    this.todoUsers.push(todoObj);
    console.log(this.todoUsers)
    localStorage.setItem("todoUsers", JSON.stringify(this.todoUsers));
  }

  delete(idx: number){
    this.todoUsers.splice(idx, 1);
    localStorage.setItem('todoUsers', JSON.stringify(this.todoUsers));
  }

  constructor() { }
}
