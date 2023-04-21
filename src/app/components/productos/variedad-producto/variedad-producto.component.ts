import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/service/GLOBAL';
import { ProductoService } from 'src/app/service/producto.service';
declare var iziToast:any;
declare var JQuery:any;
declare var $:any;

@Component({
  selector: 'app-variedad-producto',
  templateUrl: './variedad-producto.component.html',
  styleUrls: ['./variedad-producto.component.css']
})
export class VariedadProductoComponent implements OnInit {
  public producto:any = {};
  public id:any;
  public token:any;
  public nueva_variedad:any = '';
  public load_btn:Boolean = false;
  public url:any;
  constructor(
    private _route:ActivatedRoute,
    private _productoService:ProductoService
  ){
    this.url = GLOBAL.url;
    this.token = localStorage.getItem('token');
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this._productoService.obtener_producto_admin(this.id, this.token).subscribe(
          response => {
            if(response.data == undefined){
              this.producto = undefined;
            }else{
              this.producto = response.data;
            }

          },
          error => {

          }
        )
      }
    )
  }
  ngOnInit(): void {
      
  }

  agregar_variedad()
  {
    if(this.nueva_variedad){
      this.producto.variedades.push({titulo: this.nueva_variedad})
      this.nueva_variedad = '';
    }else{
      iziToast.show({
        title: 'SUCCESS',
        titleColor: '#1DC74C',
        color: '#FFF',
        class: 'text-success',
        position: 'topRight',
        message: 'El campo de la variedad debe estar completada.'
      });
    }
  }

  eliminar_variedad(idx:any){
    this.producto.variedades.splice(idx,1);
  }

  actualizar(){
    if(this.producto.titulo_variedad){
      if(this.producto.variedades.length >= 1){
        this.load_btn = true;
        this._productoService.actualizar_producto_variedades_admin({
          titulo_variedad: this.producto.titulo_variedad,
          variedades: this.producto.variedades
        }, this.id, this.token).subscribe(
          response => {
            iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1DC74C',
              color: '#FFF',
              class: 'text-success',
              position: 'topRight',
              message: 'se actualizo correctamente las variables del producto.'
            });
            this.load_btn = false;
          }
        )
      }else{
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: '#FFF',
          class: 'text-success',
          position: 'topRight',
          message: 'se debe agregar al menos una variedad'
        });
      }
    }else{
      iziToast.show({
        title: 'SUCCESS',
        titleColor: '#1DC74C',
        color: '#FFF',
        class: 'text-success',
        position: 'topRight',
        message: 'Debe completar el titulo de variedad'
      });
    }
  }
}
