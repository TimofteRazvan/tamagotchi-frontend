import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticateComponent } from './authenticate/authenticate.component'
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { CreateTamagotchiComponent } from './create-tamagotchi/create-tamagotchi.component';

const routes: Routes = [
  {path: '', component: AuthenticateComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'create-tamagotchi', component: CreateTamagotchiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
