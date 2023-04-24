import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/service/GLOBAL';
import { AdminService } from 'src/app/service/admin.service';
import { ProductoService } from 'src/app/service/producto.service';
//import * as XLSX from 'xlsx';
//import { saveAs } from 'file-saver';
import { Workbook } from 'exceljs';
import * as fs from "file-saver";

declare var iziToast:any;
declare var JQuery:any;
declare var $:any;


@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit {
  public load_data:Boolean = true;
  public page = 1;
  public pageSize = 10;
  public filtro:any = '';
  public url:any;
  public token:any;
  public load_btn:Boolean = false;
  public arr_productos: Array<any> = [];
  public productos: Array<any>=[];
  constructor(private _productoService: ProductoService, private _adminService: AdminService){
    this.token = this._adminService.getToken();
    this.url = GLOBAL.url;
  }
  ngOnInit(): void {
    this.init_data();
  }
  init_data(){
    this._productoService.listar_productos_admin(this.filtro, this.token).subscribe(
      response => {
        
        this.productos = response.data;
        this.productos.forEach(element => {
          this.arr_productos.push({
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

  filtrar(){
    if(this.filtro){
      this._productoService.listar_productos_admin(this.filtro, this.token).subscribe(
        response => {
          
          this.productos = response.data;
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
    this._productoService.eliminar_producto_admin(id,this.token).subscribe(
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

  download_excelo()
  {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Reporte de productos");
    worksheet.addRow(undefined);
    for(let x1 of this.arr_productos){
      let x2=Object.keys(x1);
      let temp=[]
      for(let y of x2){
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }
    let fname = 'REP-01- ';
    worksheet.columns = [
      {header: 'Producto', key: 'col1', width: 30},
      {header: 'Stock', key: 'col2', width: 15},
      {header: 'Precio', key: 'col3', width: 15},
      {header: 'Categoria', key: 'col14', width: 25},
      {header: 'N° ventas', key: 'col5', width: 15}
    ]as any;
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
    })
  }
}
