import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from 'src/app/service/GLOBAL';
import { AdminService } from 'src/app/service/admin.service';
import { ProductoService } from 'src/app/service/producto.service';

declare var iziToast:any;
declare var JQuery:any;
declare var $:any;

@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.css']
})
export class EditProductoComponent implements OnInit {
  public producto:any = {
    categoria: ''
  };
  public file : any = undefined;
  public imgSelect : any | ArrayBuffer;
  public config: any = {};
  public token:any;
  public load_btn:Boolean = false;
  public load_data:Boolean = true;
  public id:any;
  public url:any;
  public config_global:any = {}
  constructor(
    private _productoService:ProductoService,
    private _adminService:AdminService,
    private _router:Router,
    private _route: ActivatedRoute
  )
  {
    this.config = {
      height: 500
    }
    this.token = this._adminService.getToken();
    this.url = GLOBAL.url;
    this._adminService.obtener_config_publico().subscribe(
      response => {
        this.config_global = response.data;
      }
    )
  }
  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        this._productoService.obtener_producto_admin(this.id, this.token).subscribe(
          response => {
            if(response.data == undefined){
              this.producto = undefined
            }else{
              this.producto = response.data;
              this.imgSelect = this.url + 'obtener_portada/'+ this.producto.portada;
            }
          },
          error => {
            console.log(error);
          }
        )
      }
    )
  }

  update(updateForm:any){
    if(updateForm.valid)
    {
      var data:any = {};
      if(this.file != undefined)
      {
        data.portada = this.file;
      } 
      data.titulo = this.producto.titulo;
      data.stock = this.producto.stock;
      data.precio = this.producto.precio;
      data.categoria = this.producto.categoria;
      data.descripcion = this.producto.descripcion;
      data.contenido = this.producto.contenido;
      this._productoService.actualizar_producto_admin(this.id, data, this.token).subscribe(
        response => {
          console.log(response)
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'se actualizo correctamente el producto'
          });
          this.load_btn = false;
          this._router.navigate(['/panel/productos']);
        },
        error=>{
          console.log(error);
          this.load_btn = false;
        }
      )
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: "#FF0000",
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario son invalidos'
      });
      this.load_data = false;
    }
  }

  fileChangeEvent(event:any):void{
    var file:any;
    if(event.target.files && event.target.files[0])
    {
      file = <File>event.target.files[0];
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: "#FF0000",
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'No hay una imagen de envio'
      });
      $('#file-portada').text('Seleccionar imagen')
        this.imgSelect = "assets/img/producto_nulo.jpg";
        this.file= undefined;
    }

    if(file.size <= 4000000)
    {
      if(file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg')
      {
        const reader = new FileReader();
        reader.onload = e => this.imgSelect = reader.result;
        reader.readAsDataURL(file);
        $('#input-portada').text(file.name);
        this.file = file;
      }else{
        iziToast.show({
          title: 'ERROR',
          titleColor: "#FF0000",
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'El archivo debe ser una imagen'
        });
        $('#file-portada').text('Seleccionar imagen')
        this.imgSelect = "assets/img/producto_nulo.jpg";
        this.file= undefined;
      }
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: "#FF0000",
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'La imagen no puede superar los 4MB'
      });
      $('#file-portada').text('Seleccionar imagen')
        this.imgSelect = "assets/img/producto_nulo.jpg";
        this.file= undefined;
    }
  }
}
