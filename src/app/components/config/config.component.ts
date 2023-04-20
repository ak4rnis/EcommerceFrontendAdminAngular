import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { GLOBAL } from 'src/app/service/GLOBAL';
declare var iziToast:any;
declare var JQuery:any;
declare var $:any;
import {v4 as uuidv4} from "uuid";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  public token:any;
  public config:any = {};
  public titulo_cat:any = '';
  public icono_cat:any = '';
  public imgSelect : any | ArrayBuffer = 'assets/img/producto_nulo.jpg';
  public url:any;
  public file:any=undefined;
  constructor(private _adminService:AdminService)
  {
    this.url = GLOBAL.url;
    this.token = localStorage.getItem('token');
    this._adminService.obtener_config_admin(this.token).subscribe(
      response => {
        this.config = response.data
        this.imgSelect = this.url+'obtener_logo/'+this.config.logo;
        console.log(this.imgSelect);
      },
      error => {
        console.log(error)
      }
    )
  }
  ngOnInit(): void {
      
  }

  agregar_cat(){
    if(this.titulo_cat && this.icono_cat){
      this.config.categorias.push({
        titulo: this.titulo_cat,
        icono: this.icono_cat,
        _id: uuidv4()
      })
      this.titulo_cat = ""
      this.icono_cat = ""
    }else{
      this.titulo_cat = ""
      this.icono_cat = ""
      iziToast.show({
        title: 'ERROR',
        titleColor: "#FF0000",
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debes ingresar un titulo e icono para la categoria'
      });
    }
  }

  actualizar(configForm:any){
    if(configForm.valid){
      let data = {
        titulo: configForm.value.titulo,
        serie: configForm.value.serie,
        correlativo: configForm.value.correlativo,
        categorias: this.config.categorias,
        logo:this.file
      }
      this._adminService.actualiza_config_admin("643e277e886d03f8c61ebea1",data,this.token).subscribe(
        response=>{
          console.log(response);
        }
      )
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: "#FF0000",
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Comple correctamente el formulario'
      });
    }
  }
  fileChangeEvent(event:any){
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
        $('.cs-file-drop-icon').addClass('cs-file-drop-preview img-thumbail rounded');
        $('.cs-file-drop-icon').removeClass('cs-file-drop-icon cxi-upload')
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

  ngDoCheck():void{
    $('.cs-file-drop-preview').html("<img src="+this.imgSelect+">");
  }
}
