import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PublicRoomComponent } from './pages/public-room/public-room.component';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'home', component: HomeComponent},
  {path: 'public-room', component: PublicRoomComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
