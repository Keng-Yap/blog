import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './pages/post/post.component';
import { SnakeGameComponent } from './games/snake-game/snake-game.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'post', component: PostComponent },
  { path: 'snake-game', component: SnakeGameComponent },
  { path: '**', redirectTo: '' }
];
