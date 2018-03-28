import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService}from '../../services/user.service';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [

    { path: '/Faltas-Atrasos', title: 'Faltas y Atrasos',  icon:'content_paste', class: '' },
    { path: '/Lecionario', title: 'Lecionario',  icon:'assignment', class: '' },
    { path: '/Planificacion', title: 'Planificacion',  icon:'assignment', class: '' },
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
  /*  { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' }*/

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
username:string;
  constructor(  private _router: Router, private _userService:UserService) { }

  ngOnInit() {
        this.username=  localStorage.getItem('username');
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
  logout(){
  this._userService.logout();

}

}
