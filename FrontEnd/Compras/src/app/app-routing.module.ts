import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CompraComponent } from './components/compra/compra.component';
import { ModificarComponent } from './components/modificar/modificar.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'compra', component: CompraComponent},
  { path: 'modificar', component: ModificarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }