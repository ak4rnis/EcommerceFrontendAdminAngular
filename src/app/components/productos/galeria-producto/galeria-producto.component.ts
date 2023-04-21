import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/service/GLOBAL';
import { ProductoService } from 'src/app/service/producto.service';
declare var iziToast:any;
declare var JQuery:any;
declare var $:any;
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-galeria-producto',
  templateUrl: './galeria-producto.component.html',
  styleUrls: ['./galeria-producto.component.css']
})
export class GaleriaProductoComponent implements OnInit {
  public producto:any = {}
  public id:any;
  public token:any;
  public nueva_variedad:any = ''
  public load_btn:Boolean = false;
  public url:any;
  public file:any = undefined;
  public imgSelect : any | ArrayBuffer = 'assets/img/producto_nulo.jpg';
  constructor(private _route: ActivatedRoute, private _productoService: ProductoService){
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this._productoService.obtener_producto_admin(this.id,this.token).subscribe(
          response => {
            if(response.data == undefined){
              this.producto = undefined;
            }else{
              this.producto = response.data;
            }
            console.log(this.producto);
          }
        )
      }
    )
  }
  ngOnInit(): void {
      
  }

  subir_imagen(){
    if(this.file != undefined){
      let data = {
        imagen: this.file,
        _id: uuidv4()
        
      }
      console.log(data);
      this._productoService.agregar_imagen_galeria_admin(this.id, data, this.token).subscribe(
        response => {
          console.log(response.data)
        }
      )
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: "#FF0000",
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe seleccionar una imagen para subir'
      });
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
        
        
        $('#input-img').val('');
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
      $('#input-img').val('');
      this.file = undefined;

    }
  }
}
