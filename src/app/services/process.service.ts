import { Injectable } from "@angular/core";
//Va a permitir hacer peticiones ajax a un servicio externo y modificar las cabeceras de esas peticiones
import { HttpClient, HttpHeaders } from "@angular/common/http";
//Recpger la informacion que devuelve el apirest
import { Observable } from "rxjs";
import { Global } from "./global";
import {User} from "src/app/models/User";
@Injectable()
export class ProcessService {
    public url: String;
  constructor(
    public _http: HttpClient
  ) {
    this.url = Global.url;
  }

  getUsers(): Observable<any> {
    let header = new HttpHeaders().set('Content-type', 'application/json');
    return this._http.get(this.url + 'getAllUser', { headers: header });
  }

  createUsers(user: User): Observable<any> {
    
    let params = JSON.stringify(user);
    let header = new HttpHeaders().set('Content-type', 'application/json');
    return this._http.post(this.url + 'createUser', params,{ headers: header });
  }

  deleteUser(id: number): Observable<any> {
    let header = new HttpHeaders().set('Content-type', 'application/json');
    return this._http.delete(this.url + 'deleteUser/' + id, { headers: header });
  }
  
  updateUser(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let header = new HttpHeaders().set('Content-type', 'application/json');
    return this._http.put(this.url + 'updateUser/' + user.id, params, { headers: header });
  }



}