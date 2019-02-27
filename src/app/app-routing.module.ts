import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PrivateComponent } from './pages/private/private.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { animation: 'LoginComponent' }
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    data: { animation: 'HomeComponent' }
  },
  {
    path: 'private',
    component: PrivateComponent,
    data: { animation: 'PrivateComponent' }
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: { animation: 'NotFoundComponent' }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    // BrowserAnimationsModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
