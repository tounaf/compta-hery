import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComptaComponent } from './compta/compta.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/guard/auth-guard.service';

const routes: Routes = [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'compta',
        component: ComptaComponent,
        canActivate: [AuthGuardService]
      },
      {
        path:"**",
        component: ComptaComponent,
        canActivate: [AuthGuardService]
      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
