import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DescuentoService {
  public url:any;
  constructor(private _http:HttpClient){
    this.url = GLOBAL.url;
  }

  listar_descuentos_admin(filtro:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar_descuentos_admin/'+filtro,{headers:headers});
    
  }

  eliminar_descuento_admin(id:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.delete(this.url+'eliminar_descuento_admin/'+id,{headers:headers});
  }

  registro_descuento_admin(data:any,file:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Authorization':token});

    const fd = new FormData();
    fd.append('titulo',data.titulo);
    fd.append('descuento',data.descuento);
    fd.append('fecha_inicio',data.fecha_inicio);
    fd.append('fecha_fin',data.fecha_fin);
    fd.append('banner',file);
    return this._http.post(this.url+'registro_descuento_admin',fd,{headers:headers});
  }

  obtener_descuento_admin(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_descuento_admin/'+id,{headers:headers});
  }

  actualizar_descuento_admin(id:any,data:any,token:any):Observable<any>{
    if(data.banner){
      let headers = new HttpHeaders({"Authorization":token});
      const fd = new FormData();
      fd.append('titulo',data.titulo);
      fd.append("descuento",data.descuento);
      fd.append("fecha_inicio",data.fecha_inicio);
      fd.append("fecha_fin",data.fecha_fin);
      fd.append('banner',data.banner);
      return this._http.put(this.url+'actualizar_descuento_admin/'+id,fd,{headers:headers});
    }else{
      let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
      return this._http.put(this.url+'actualizar_descuento_admin/'+id,data,{headers:headers});
    }
  }
}
