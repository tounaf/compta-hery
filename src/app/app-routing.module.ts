import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComptaComponent } from './compta/compta.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'compta',
        component: ComptaComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      }
      // ,
      // {
      //   path:"**",
      //   component: errorpagecomponent
      // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
