import { Component,OnInit } from '@angular/core';
import { ServicioComprasService } from '../../services/servicio-compras.service';
import { Compra } from 'src/app/services/Compra';
import { Activity } from 'src/app/services/Activity';
import { NgForm } from '@angular/forms';
import { catchError } from 'rxjs';
import { tap } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  compra: Compra = new Compra();
  activity: Activity = new Activity();
  id_cliente : String = new String();
  
  constructor(private servicioCompras: ServicioComprasService) { }

  ngOnInit(): void {
    this.servicioCompras.selectedActivity.subscribe((actividad:Activity)=>{
      this.activity=actividad;
    })
    this.servicioCompras.id_cliente.subscribe((id:any)=>{
      this.id_cliente=id.toString();
    })
  }
  
  onSubmit(compraForm: NgForm) {
    const id = prompt("Ingrese el ID del cliente para poder obtener los permisos necesarios:");
    if (id) {
      this.servicioCompras.consultarRol(id).subscribe(res => {
        if(res==="Cliente"){
          const formData = new FormData();
          if (compraForm.valid) {
            formData.append('ID_articulo', compraForm.value.ID_articulo);
            formData.append('ID_cliente', compraForm.value.ID_cliente);
            formData.append('cantidad', compraForm.value.cantidad);
            formData.append('nombre_comprador', compraForm.value.nombre_comprador);
            formData.append('direccion', compraForm.value.direccion);
            formData.append('titulo_actividad', compraForm.value.titulo_actividad);
            
            this.servicioCompras.CreateCompras(formData).pipe(tap(res => {
              window.alert("Compra creada correctamente");
              location.reload();
              console.log(res);
            }),
            catchError(error => {
              window.alert("No hay cantidad suficiente");
              return of(null);
            })
            ).subscribe();

          }
        }else{
          window.alert("No eres un cliente, por lo que no tienes permiso para consultar actividades para comprar");
          location.reload();  
      }
      });
    }
  }
  
}