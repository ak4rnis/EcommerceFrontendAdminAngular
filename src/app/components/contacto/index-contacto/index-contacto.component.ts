import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
declare var iziToast:any;
declare var $:any;

@Component({
  selector: 'app-index-contacto',
  templateUrl: './index-contacto.component.html',
  styleUrls: ['./index-contacto.component.css']
})
export class IndexContactoComponent implements OnInit {
  public mensajes:Array<any> = [];
  public load_btn:Boolean = false;
  public load_data:Boolean = true;
  public page:number = 1;
  public pageSize:number = 20;
  public filtro:any = '';
  public token:any;
  constructor(private _adminService:AdminService){
    this.token = localStorage.getItem('token');
  }
  ngOnInit(): void {
   this.init_Data();
  }
  init_Data(){
    this._adminService.obtener_mensajes_admin(this.token).subscribe(
      response => {
        this.mensajes = response.data;
        this.load_data = false;
      }
    )
  }
  cerrar(id:any){
    this.load_btn = true;
    this._adminService.cerrar_mensaje_admin(id,{data:undefined},this.token).subscribe(
      response => {
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: '#FFF',
          class: 'text-success',
          position: 'topRight',
          message: 'se cerro correctamente el mensaje'
        });
        $('#estadoModal-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.init_Data();
        this.load_btn = true;
        
      },
      error => {
        console.log(error);
      }
    )
  }
}
