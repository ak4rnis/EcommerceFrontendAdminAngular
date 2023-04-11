import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { ProductoService } from 'src/app/service/producto.service';

declare var iziToast:any;
declare var JQuery:any;
declare var $:any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit {
  public producto:any = {
    categoria: ''
  };
  public file : any = undefined;
  public imgSelect : any | ArrayBuffer = 'assets/img/producto_nulo.jpg';
  public config: any = {};
  public token:any;
  public load_btn:Boolean = false;
  constructor(private _productoService: ProductoService, private _adminService: AdminService, private _router:Router)
  {
    this.config = {
      height: 500 
    }
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
      
  }

  registro(registroForm:any){
    if(registroForm.valid){
      if(this.file == undefined){
        iziToast.show({
          title: 'ERROR',
          titleColor: "#FF0000",
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'Debes subir una portada para registrar'
        });
      }
      this._productoService.registro_producto_admin(this.producto, this.file, this.token).subscribe(
        response => {
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'se registro correctamente el nuevo producto'
          });
          
          this._router.navigate(['/panel/productos']);
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
      $('#file-portada').text('Seleccionar imagen')
        this.imgSelect = "assets/img/producto_nulo.jpg";
        this.file= undefined;
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
