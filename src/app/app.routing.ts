import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';


const routes: Routes =[

  { path: 'login',        component: LoginComponent },
];


export const AppRoutingModule = RouterModule.forRoot(routes,{ useHash:true});
