import { Component, OnInit } from '@angular/core';
import { TodoServiceService } from '../services/todo-service.service';
import { todo } from '../todo.model';
import { take } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})


export class TodoComponent implements OnInit{



private serachSubject = new Subject<string>();
searchText: string = '';
filterTodosArr : todo[] = [];




  constructor(public service : TodoServiceService,private router: Router ){}

  ngOnInit(): void {
    const temp = localStorage.getItem("todoUsers")
    this.service.todoUsers = temp?JSON.parse(temp):[];
    this.filterTodosArr = this.service.todoUsers;
    // debounce
    this.serachSubject.pipe(debounceTime(500)).subscribe(()=>{
      this.filterTasks();
    });
  }
  

  showForm : boolean = false;
  showButton : boolean = true;

  todoObj : todo = {
    title : '',
    description : '',
    // date : new Date('2001-04-29'),
    date : '',
  }

  addTask(){

    // if(this.todoObj.title != "" && this.todoObj.description != "" && this.todoObj.date.toString() != (new Date('2001-04-29')).toString()){
    //   this.service.add(this.todoObj);
    // }

        if(this.todoObj.title != "" && this.todoObj.description != "" && this.todoObj.description != '2024-01-04'){
      this.service.add(this.todoObj);
    }
    this.filterTodosArr=this.service.todoUsers;
    this.todoObj = {
      title : '',
      description : '',
      // date : new Date('2001-04-29'),
      date: '2024-01-04',
   

    }
    // this.showForm = false;
  }

  deleteTask(idx: number){
    this.service.delete(idx);

  }

  Add(){
    this.showForm = !this.showForm;
    this.showButton = !this.showButton;
  }

  // filterTasks(): todo[] {
  //   return this.service.todoUsers.filter(task =>
  //     task.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
  //     task.description.toLowerCase().includes(this.searchText.toLowerCase()) ||
  //     (task.date.toLowerCase().includes(this.searchText.toLowerCase()))
  //   );
  // }

  filterTasks() {
  this.filterTodosArr = this.service.todoUsers.filter(
    (task)=>
    task.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      task.description.toLowerCase().includes(this.searchText.toLowerCase()) ||
      (task.date.toLowerCase().includes(this.searchText.toLowerCase()))
    );
  }

    onSearchInput(event : any) {
      console.log(this.searchText);
      this.searchText = event.target.value;
      // pushing serach query to subject --> debounce time
      this.serachSubject.next(this.searchText);
      }
  
  editTask(todoObj : any) {
    todoObj.isEdit = true;

  }

  onLogout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
    }
  
}
