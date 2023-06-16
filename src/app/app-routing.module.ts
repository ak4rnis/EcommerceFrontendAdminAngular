import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { AdminGuard } from './guards/admin.guard';
import { IndexClienteComponent } from './components/clientes/index-cliente/index-cliente.component';
import { CreateClienteComponent } from './components/clientes/create-cliente/create-cliente.component';
import { EditClienteComponent } from './components/clientes/edit-cliente/edit-cliente.component';
import { CreateProductoComponent } from './components/productos/create-producto/create-producto.component';
import { IndexProductoComponent } from './components/productos/index-producto/index-producto.component';
import { EditProductoComponent } from './components/productos/edit-producto/edit-producto.component';
import { InventarioProductoComponent } from './components/productos/inventario-producto/inventario-producto.component';
import { CreateCuponComponent } from './components/cupones/create-cupon/create-cupon.component';
import { IndexCuponesComponent } from './components/cupones/index-cupones/index-cupones.component';
import { EditCuponComponent } from './components/cupones/edit-cupon/edit-cupon.component';
import { ConfigComponent } from './components/config/config.component';
import { VariedadProductoComponent } from './components/productos/variedad-producto/variedad-producto.component';
import { GaleriaProductoComponent } from './components/productos/galeria-producto/galeria-producto.component';
import { IndexDescuentoComponent } from './components/descuento/index-descuento/index-descuento.component';
import { CreateDescuentoComponent } from './components/descuento/create-descuento/create-descuento.component';
import { EditDescuentoComponent } from './components/descuento/edit-descuento/edit-descuento.component';
import { IndexContactoComponent } from './components/contacto/index-contacto/index-contacto.component';
import { ReviewsProductoComponent } from './components/productos/reviews-producto/reviews-producto.component';

const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: 'inicio', component: InicioComponent, canActivate: [AdminGuard]},
  {path: 'panel', children: [
    {path: 'clientes', component: IndexClienteComponent, canActivate: [AdminGuard]},
    {path: 'clientes/registro', component: CreateClienteComponent, canActivate: [AdminGuard]},
    {path: 'clientes/:id', component: EditClienteComponent, canActivate: [AdminGuard]},

    {path: 'productos', component: IndexProductoComponent, canActivate: [AdminGuard]},
    {path: 'productos/registro', component: CreateProductoComponent, canActivate: [AdminGuard]},
    {path: 'productos/:id', component: EditProductoComponent, canActivate: [AdminGuard]},
    {path: 'productos/inventario/:id', component: InventarioProductoComponent, canActivate: [AdminGuard]},
    {path: 'productos/variedades/:id', component: VariedadProductoComponent, canActivate: [AdminGuard]},
    {path: 'productos/galeria/:id', component: GaleriaProductoComponent, canActivate: [AdminGuard]},
    {path: 'productos/reviews/:id', component: ReviewsProductoComponent, canActivate: [AdminGuard]},
    

    {path: 'cupones', component: IndexCuponesComponent, canActivate: [AdminGuard]},
    {path: 'cupones/registro', component: CreateCuponComponent, canActivate: [AdminGuard]},
    {path: 'cupones/:id', component: EditCuponComponent, canActivate: [AdminGuard]},

    {path: 'descuentos', component: IndexDescuentoComponent, canActivate: [AdminGuard]},
    {path: 'descuentos/registro', component: CreateDescuentoComponent, canActivate: [AdminGuard]},
    {path: 'descuentos/:id', component: EditDescuentoComponent, canActivate: [AdminGuard]},

    {path: 'contactos', component: IndexContactoComponent, canActivate: [AdminGuard]},


    {path: 'configuraciones', component: ConfigComponent, canActivate: [AdminGuard]},

    
    

  ]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
