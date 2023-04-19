import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
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
  public file:any=undefined;
  constructor(private _adminService:AdminService)
  {
    this.token = localStorage.getItem('token');
    this._adminService.obtener_config_admin(this.token).subscribe(
      response => {
        this.config = response.data
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
}
