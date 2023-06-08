import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/service/GLOBAL';
import { AdminService } from 'src/app/service/admin.service';
import { DescuentoService } from 'src/app/service/descuento.service';

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
    
  }

  init_data(){
    this._descuentoService.listar_descuentos_admin(this.filtro, this.token).subscribe(
      response => {
        
        this.descuentos = response.data;
        this.descuentos.forEach(element => {
          this.arr_descuentos.push({
            titulo: element.titulo,
            stock: element.stock,
            precio: element.precio,
            categoria: element.categoria,
            nventas: element.nventas
          })
        })
        this.load_data = false;
      },
      error => {
        console.log(error);
      }
    )
  }
}
