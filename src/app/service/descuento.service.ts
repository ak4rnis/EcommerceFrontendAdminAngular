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
}
