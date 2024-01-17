import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { TodoComponent } from './todo/todo.component';
import { Ng2SearchPipe } from 'ng2-search-filter';


const routes: Routes = [
  {path : 'signup', component : UserLoginComponent},
  {path: 'login' , component : LoginComponent},
  {path: 'todo' , component : TodoComponent,canActivate:[AuthGuard]},
  {path: '', redirectTo: 'signup', pathMatch: 'full'},
  {path:'**', redirectTo:'signup'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
