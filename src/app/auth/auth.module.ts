import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common'
import {  FormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDialogModule
 } from '@angular/material';


import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from "./auth-routing.module";


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
  ],
  imports : [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule
  ]
})
export class AuthModule {}
