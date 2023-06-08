import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from 'src/app/service/GLOBAL';
import { AdminService } from 'src/app/service/admin.service';
import { DescuentoService } from 'src/app/service/descuento.service';

declare var iziToast:any;
declare var JQuery:any;
declare var $:any;
@Component({
  selector: 'app-edit-descuento',
  templateUrl: './edit-descuento.component.html',
  styleUrls: ['./edit-descuento.component.css']
})
export class EditDescuentoComponent implements OnInit {
  public descuento:any = {
    
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
    private _descuentoService:DescuentoService, 
    private _adminService:AdminService,
    private _router:Router,
    private _route: ActivatedRoute
    )
  {
    this.token = this._adminService.getToken();
    this.url = GLOBAL.url;


  }
  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        this._descuentoService.obtener_descuento_admin(this.id, this.token).subscribe(
          response => {
            if(response.data == undefined){
              this.descuento = undefined
            }else{
              this.descuento = response.data;
              this.imgSelect = this.url + 'obtener_banner/'+ this.descuento.banner;
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
        data.banner = this.file;
      } 
      data.titulo = this.descuento.titulo;
      data.fecha_inicio = this.descuento.fecha_inicio;
      data.fecha_fin = this.descuento.fecha_fin;
      
      this._productoService.actualizar_producto_admin(this.id, data, this.token).subscribe(
        response => {
          console.log(response)
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'se actualizo correctamente el descuento'
          });
          this.load_btn = false;
          this._router.navigate(['/panel/descuentos']);
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
        $('#input-banner').text(file.name);
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
        $('#file-banner').text('Seleccionar imagen')
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
      $('#file-banner').text('Seleccionar imagen')
        this.imgSelect = "assets/img/producto_nulo.jpg";
        this.file= undefined;
    }
  }
}
