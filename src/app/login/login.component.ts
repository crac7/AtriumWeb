import { Component, OnInit } from '@angular/core';
import { User  } from '../models/user';
import {UserService}from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public title = 'app';
    public user: User;
public datos:any;
    public token;
   public  erroMessage;
    constructor( private _userService:UserService, private _router: Router){
       this.user =new User('','');
    }
    ngOnInit(){

      this.token =this._userService.getToken();

        
    }

    public onSubmit(){

     this._userService.signup(this.user).subscribe(
         response=>{
           let token = response.token;
           this.token =token;

           if(this.token.length < 0){
              alert("Usuario no identificado");
           }
           else{

                  localStorage.setItem('token', token);
                  this.obtieneDatos();
           }

         },
         error=>{
             var erroMessage= <any> error;
              if(erroMessage !=null){
                var body =JSON.parse(error._body);
                this.erroMessage=body.message;
                 console.log(error);
              }
         }
      );
    }


    obtieneDatos(){
      this._userService.datos().subscribe(
           response=>{
               localStorage.setItem('cod_per', response.cod_per);
               localStorage.setItem('let_per',  response.let_per);
               localStorage.setItem('cod_profesor',  response.cod_profesor);
               localStorage.setItem('nombre',  response.nombre);
               localStorage.setItem('e_mail',  response.e_mail);
               localStorage.setItem('username',  response.username);
               localStorage.setItem('bandera',  response.bandera);

               this.user =new User('','');
               this._router.navigate(['/Faltas-Atrasos']);

           },
           error=>{
               var erroMessage= <any> error;
                if(erroMessage !=null){
                  var body =JSON.parse(error._body);
                   console.log(error);
                }
           }
          );
    }
}
