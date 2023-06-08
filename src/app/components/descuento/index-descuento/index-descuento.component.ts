import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/service/GLOBAL';
import { AdminService } from 'src/app/service/admin.service';
import { DescuentoService } from 'src/app/service/descuento.service';

declare var iziToast:any;
declare var JQuery:any;
declare var $:any;
@Component({
  selector: 'app-index-descuento',
  templateUrl: './index-descuento.component.html',
  styleUrls: ['./index-descuento.component.css']
})
export class IndexDescuentoComponent implements OnInit {
  public load_data:Boolean = true;
  public page = 1;
  public pageSize = 10;
  public filtro:any = '';
  public url:any;
  public token:any;
  public load_btn:Boolean = false;
  public arr_descuentos: Array<any> = [];
  public descuentos: Array<any>=[];
  constructor(private _descuentoService: DescuentoService, private _adminService: AdminService)
  {
    this.token = this._adminService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this.init_data();
  }

  init_data(){
    this._descuentoService.listar_descuentos_admin(this.filtro, this.token).subscribe(
      response => {
        
        this.descuentos = response.data;
        this.descuentos.forEach((element:any) => {
          var tt_inicio = Date.parse(element.fecha_inicio+"T00:00:00")/1000;
          var tt_fin = Date.parse(element.fecha_fin+"T00:00:00")/1000;
          var today = Date.parse(new Date().toString())/1000;
          if(today>tt_inicio){
            element.estado = 'Expirado';
          }
          if(today<tt_inicio){
            element.estado = 'Proximamente';
          }
          if(today>= tt_inicio && today<= tt_fin)
          {
            element.estado = 'En progreso';
          }
        })
        this.load_data = false;
      },
      error => {
        console.log(error);
      }
    )
  }

  filtrar(){
    if(this.filtro){
      this._descuentoService.listar_descuentos_admin(this.filtro, this.token).subscribe(
        response => {
          
          this.descuentos = response.data;
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
    this._descuentoService.eliminar_descuento_admin(id,this.token).subscribe(
      response => {
        console.log(response);
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: '#FFF',
          class: 'text-success',
          position: 'topRight',
          message: 'se elimino correctamente el descuento.'
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
