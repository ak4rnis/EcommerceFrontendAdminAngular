import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { ProductoService } from 'src/app/service/producto.service';

declare var iziToast:any;
declare var JQuery:any;
declare var $:any;

@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styleUrls: ['./inventario-producto.component.css']
})
export class InventarioProductoComponent implements OnInit {
  public id:any;
  public token:any;
  public producto:any = {};
  public inventarios : Array<any>=[];
  public load_btn:any = false;
  public inventario:any = {};
  public _iduser:any;
  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService,
    private _adminService: AdminService
  )
  {
    this.token = localStorage.getItem('token');
    this._iduser = localStorage.getItem('_id');
  }
  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        console.log(this.id);
        this._productoService.obtener_producto_admin(this.id, this.token).subscribe(
          response => {
            if(response.data == undefined){
              this.producto = undefined
            }else{
              this.producto = response.data;
              this._productoService.listar_inventario_producto_admin(this.producto._id, this.token).subscribe(
                response => {
                  this.inventarios = response.data;
                  console.log(this.inventarios);
                },
                error => {
                  console.log(error);
                }
              )
            }
          },
          error => {
            console.log(error);
          }
        )
      }
    )
  }

  eliminar(id:any){
    this.load_btn = true;
    this._productoService.eliminar_inventario_producto_admin(id,this.token).subscribe(
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
        this._productoService.listar_inventario_producto_admin(this.producto._id,this.token).subscribe(
          response => {
            this.inventarios = response.data;
            console.log(this.inventarios); 
          }
        )
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

  registro_inventario(inventarioForm:any){
    if(inventarioForm.valid){
      let data = {
        producto: this.producto._id,
        cantidad: inventarioForm.value.cantidad,
        admin: this._iduser,
        proveedor: inventarioForm.value.proveedor,
      }
      this._productoService.registro_inventario_producto_admin(data,this.token).subscribe(
        response => {
          console.log(response.data)
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'Se agrego un nuevo stock al producto'
          });
          this._productoService.listar_inventario_producto_admin(this.producto._id,this.token).subscribe(
            response => {
              this.inventarios = response.data;
              console.log(this.inventarios); 
            }
          )
        },
        error => {
          console.log(error);
        }
      )
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: "#FF0000",
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
      });
    }
  }
}
