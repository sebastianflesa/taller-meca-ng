import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AuthLoginGuard } from './auth-login.guard';
import { InventarioComponent } from './inventario/inventario.component';
import { InventarioNuevoComponent } from './inventario-nuevo/inventario-nuevo.component';
import { InventarioEditarComponent } from './inventario-editar/inventario-editar.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LoginRegistroComponent } from './login-registro/login-registro.component';
import { InventarioUtilizarComponent } from './inventario-utilizar/inventario-utilizar.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [AuthLoginGuard]  },
    { path: 'inventario', component: InventarioComponent , canActivate: [AuthGuard]  },
    { path: 'login', component: LoginComponent },
    { path: 'login/registro', component: LoginRegistroComponent },
    { path: 'inventario/nuevo', component: InventarioNuevoComponent ,canActivate: [AuthGuard] },
    { path: 'inventario/:id', component: InventarioEditarComponent ,canActivate: [AuthGuard] },
    { path: 'inventario/utilizar/:id', component: InventarioUtilizarComponent, canActivate: [AuthGuard] },
    { path: 'perfil', component: PerfilComponent ,canActivate: [AuthGuard] }
  ];
