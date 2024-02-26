import { Component } from '@angular/core';
import { ProcessService } from 'src/app/services/process.service'; 
import { User } from '../models/User';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [ProcessService]
})
export class UserComponent {
  public users: User[];
  public user: User;
  public userUpdate: User;
  public updateFlag: Boolean;
  public createFlag: Boolean;
  constructor(
    private _processService: ProcessService
  ){
    this.users = [];
    this.user = new User(0,'', '', '');
    this.userUpdate = new User(0,'', '', '');
    this.updateFlag = false;
    this.createFlag = false
  };
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this._processService.getUsers().subscribe(
      Response => {
        console.log(Response.data);
        this.users = Response.data;
      },
      err => {
        console.log(<any>err);
      }
    )
 
  }
  deleteUser(id:any){
    this._processService.deleteUser(id).subscribe(
      Response => {
        this.getUsers();
        console.log(Response);
      },
      err => {
        console.log(<any>err)
      }
    )
  }

  editUser(user:User){
    
    this.userUpdate = user;
    console.log(this.userUpdate);
    this.updateFlag = true;

  }

  EditarUsuario(){
    this._processService.updateUser(this.userUpdate).subscribe(
      Response => {
        console.log(Response);
        this.getUsers();
        this.updateFlag = false
      },
      err => {
        console.log(<any>err)
      }
    )
  }

  crearUsuario(){
    console.log(this.user)
    this._processService.createUsers(this.user).subscribe(
      Response => {
        console.log(Response.data);
        this.getUsers();
        this.createFlag = false;
      },
      err => {
        console.log(<any>err)
      }
    )
  }

  viewCreate(){
    this.createFlag = true;
  }
  cerrarModal(){
    this.createFlag = false;
    this.updateFlag = false;
  }
}
