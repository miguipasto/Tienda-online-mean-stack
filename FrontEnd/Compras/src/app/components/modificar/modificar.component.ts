import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServicioComprasService } from 'src/app/services/servicio-compras.service';
import { Compra } from 'src/app/services/Compra';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})

export class ModificarComponent implements OnInit{

  constructor(private servicioCompras: ServicioComprasService) { }
  compra: Compra = new Compra();
  id = String();

  ngOnInit() {
    this.servicioCompras.selectedCompra.subscribe((compra: Compra) => {
      this.compra = compra;
      this.id = compra._id;
      console.log(this.compra._id)
    });
  }
  onSubmit(modificarCompraForm: NgForm) {
    const id = prompt("Ingrese el ID del cliente para poder modificar sus compras:");
    if (id) {
      this.servicioCompras.consultarRol(id).subscribe(res => {
        if(res==="Cliente"){
          const formData = new FormData();
          if (modificarCompraForm.valid) {
            formData.append('ID_articulo', modificarCompraForm.value.ID_articulo);
            formData.append('ID_cliente', modificarCompraForm.value.ID_cliente);
            formData.append('cantidad', modificarCompraForm.value.cantidad);
            formData.append('nombre_comprador', modificarCompraForm.value.nombre_comprador);
            formData.append('direccion', modificarCompraForm.value.direccion);
            formData.append('titulo_actividad', modificarCompraForm.value.titulo_actividad);
            this.servicioCompras.UpdateCompras(formData,this.id).subscribe(res => {
              window.alert("Compra modificada correctamente");
              location.reload();
              console.log(res);
            });
          }
        }else{
          window.alert("No tienes permisos para modificar la compra");
        }
      });
    }
}
}
