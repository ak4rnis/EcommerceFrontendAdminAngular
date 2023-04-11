import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/service/GLOBAL';
import { AdminService } from 'src/app/service/admin.service';
import { ProductoService } from 'src/app/service/producto.service';

declare var iziToast:any;
declare var JQuery:any;
declare var $:any;

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit {
  public load_data:Boolean = true;
  public page = 1;
  public pageSize = 10;
  public filtro:any = '';
  public url:any;
  public token:any;
  public load_btn:Boolean = false;
  public productos: Array<any>=[];
  constructor(private _productoService: ProductoService, private _adminService: AdminService){
    this.token = this._adminService.getToken();
    this.url = GLOBAL.url;
  }
  ngOnInit(): void {
    this.init_data();
  }
  init_data(){
    this._productoService.listar_productos_admin(this.filtro, this.token).subscribe(
      response => {
        
        this.productos = response.data;
        this.load_data = false;
      },
      error => {
        console.log(error);
      }
    )
  }

  filtrar(){
    if(this.filtro){
      this._productoService.listar_productos_admin(this.filtro, this.token).subscribe(
        response => {
          
          this.productos = response.data;
          this.load_data = false;
        },
        error => {
          console.log(error);
        }
      )
    }else{
      this.filtro = '';
      iziToast.show({
        title: 'ERROR',
        titleColor: "#FF0000",
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Ingrese un filtro para buscar'
      });
      this.init_data();
    }
  }

  resetear(){
    this.filtro = '';
    this.init_data();
  }

  eliminar(id:any){
    this.load_btn = true;
    this._productoService.eliminar_producto_admin(id,this.token).subscribe(
      response => {
        console.log(response);
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: '#FFF',
          class: 'text-success',
          position: 'topRight',
          message: 'se elimino correctamente el producto.'
        });

        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.load_btn = false;
        this.init_data();
      },
      error => {
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: '#FFF',
          class: 'text-success',
          position: 'topRight',
          message: 'Ocurrio un error en el servidor.'
        });
        console.log(error);
        this.load_btn = false;
      }
    )
  }
}
