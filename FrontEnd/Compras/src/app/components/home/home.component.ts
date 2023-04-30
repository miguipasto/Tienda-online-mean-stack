import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/services/Activity';
import { Compra } from 'src/app/services/Compra';
import { Router } from '@angular/router';
import { ServicioComprasService } from 'src/app/services/servicio-compras.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchTerm = String();
  Activities: any = [];
  ActivitiesToDisplay: any = [];
  ComprasToDisplay: any = [];
  busqueda: any = [];
  activity: Activity = new Activity();
  compra: Compra = new Compra();
  id_cliente_activo: any;
  cliente: boolean = false;

  constructor(private servicioCompras: ServicioComprasService, private router: Router) { }

  ngOnInit(): void {
    this.servicioCompras.GetActivities().subscribe(res => {
      this.Activities = res;
      this.ActivitiesToDisplay = this.Activities;
    });
  }

  onSearch() {
    if (this.cliente == true) {
      this.servicioCompras.searchActivities(this.searchTerm).subscribe(res => {
        this.ActivitiesToDisplay = res;
      });

      this.servicioCompras.searchCompras(this.id_cliente_activo, this.searchTerm).subscribe(res => {
        this.ComprasToDisplay = res;
      });
    }
  }

  mostrarActividades() {
    const id = prompt("Ingrese el ID del cliente para poder obtener los permisos necesarios:");
    if (id) {
      this.servicioCompras.consultarRol(id).subscribe(res => {
        if (res === "Cliente") {
          this.id_cliente_activo = id;
          var escondido = document.getElementById("misCompras");
          if (escondido != null) {
            escondido.style.display = "none";
          }
          var escondido = document.getElementById("Comprar");
          if (escondido != null) {
            escondido.style.display = "none";
          }
          var mostrado = document.getElementById("mostrarActividades");
          if (mostrado != null) {
            mostrado.style.display = "flex";
          }
          var busqueda = document.getElementById("buscador_nav");
          if (busqueda != null) {
            busqueda.style.display = "flex";
          }
          var modificar = document.getElementById("modificarForm");
          if (modificar != null) {
            modificar.style.display = "none";
          }
        } else {
          window.alert("No eres un cliente, por lo que no tienes permiso para consultar actividades para comprar");
          location.reload();
        }
      });
    }
  }

  mostrarMisCompras() {
    const id = prompt("Ingrese el ID del cliente para poder consultar sus compras:");
    if (id) {
      this.servicioCompras.consultarRol(id).subscribe(res => {
        if (res === "Cliente") {
          this.id_cliente_activo = id;
          console.log(res);
          var mostrado = document.getElementById("misCompras");
          if (mostrado != null) {
            mostrado.style.display = "flex";
            this.servicioCompras.GetCompras(id).subscribe(res => {
              this.ComprasToDisplay = res;
              console.log(this.ComprasToDisplay);
            });
          }
          var escondido = document.getElementById("Comprar");
          if (escondido != null) {
            escondido.style.display = "none";
          }
          var escondido = document.getElementById("mostrarActividades");
          if (escondido != null) {
            escondido.style.display = "none";
          }
          var busqueda = document.getElementById("buscador_nav");
          if (busqueda != null) {
            busqueda.style.display = "flex";
          }
          var modificar = document.getElementById("modificarForm");
          if (modificar != null) {
            modificar.style.display = "none";
          }
        }
        else {
          window.alert("El administrador no puede consultar las compras de los clientes");
          location.reload();
        }
      });
    }
  }

  modificar(compra: any) {

    this.servicioCompras.selectedCompra.next(compra);
    this.compra = compra;
    var escondido = document.getElementById("escondido");
    if (escondido != null) {
      escondido.style.display = "none";
    }
    var modificar = document.getElementById("modificarForm");
    if (modificar != null) {
      modificar.style.display = "flex";
    }
    var mostrado = document.getElementById("misCompras");
    if (mostrado != null) {
      mostrado.style.display = "none";
    }
    var busqueda = document.getElementById("buscador_nav");
    if (busqueda != null) {
      busqueda.style.display = "none";
    }

  }

  mostrarFormCompra(activity: any) {
    const id = prompt("Ingrese el ID del cliente para poder comprar:");
    if (id) {
      this.servicioCompras.consultarRol(id).subscribe(res => {
        if (res === "Cliente") {
          this.servicioCompras.selectedActivity.next(activity);
          this.servicioCompras.id_cliente.next(id);
          var escondido = document.getElementById("misCompras");
          if (escondido != null) {
            escondido.style.display = "none";
          }
          var mostrado = document.getElementById("Comprar");
          if (mostrado != null) {
            mostrado.style.display = "flex";
          }
          var escondido = document.getElementById("mostrarActividades");
          if (escondido != null) {
            escondido.style.display = "none";
          }
          var busqueda = document.getElementById("buscador_nav");
          if (busqueda != null) {
            busqueda.style.display = "none";
          }
          var modificar = document.getElementById("modificarForm");
          if (modificar != null) {
            modificar.style.display = "none";
          }
        } else {
          window.alert("No tienes permiso para comprar");
          location.reload();
        }
      });
    }
  }

  getImageUrl(activity: any) {
    if (activity.imagen && activity.imagen.originalName) {
      const imageUrl = `http://localhost:5000/uploads/${activity.imagen.originalName}`;
      return imageUrl;
    } else {
      return '';
    }
  }

  //Añadir función comprar
  filtrar(event: any) {
    const filtroPrecio = (document.getElementById("filtrarPorPrecio") as HTMLSelectElement).value;
    const filtroDificultad = (document.getElementById("filtrarPorDificultad") as HTMLSelectElement).value;
    const checkboxes = document.getElementsByName("categoria");
    const seleccionados: string[] = [];

    for (let i = 0; i < checkboxes.length; i++) {
      const checkbox = checkboxes[i] as HTMLInputElement;
      if (checkbox.checked) {
        seleccionados.push(checkbox.value);
      }
    }

    let activitiesToDisplay = this.Activities;

    if (filtroPrecio === 'asc') {
      activitiesToDisplay = activitiesToDisplay.sort((a: Activity, b: Activity) => parseInt(a.precio) - parseInt(b.precio));
    } else if (filtroPrecio === 'desc') {
      activitiesToDisplay = activitiesToDisplay.sort((a: Activity, b: Activity) => parseInt(b.precio) - parseInt(a.precio));
    }

    if (filtroDificultad !== 'seleccionar') {
      activitiesToDisplay = activitiesToDisplay.filter((activity: Activity) => activity.dificultad === filtroDificultad);
    }

    if (seleccionados.length > 0) {
      activitiesToDisplay = activitiesToDisplay.filter((activity: Activity) => seleccionados.includes(activity.categoria));
    }

    this.ActivitiesToDisplay = activitiesToDisplay;
  }

  deleteCompras(compra: any) {
    const id = prompt("Ingrese el ID del cliente para poder eliminar sus compras:");
    if (id) {
      this.servicioCompras.consultarRol(id).subscribe(res => {
        if (res === "Cliente") {
          if (window.confirm('¿Estás seguro de que quieres eliminar la compra?')) {
            this.servicioCompras.DeleteCompras(compra._id).subscribe((res) => {
              console.log(res)
              this.ComprasToDisplay = res;
              window.alert("Compra eliminada correctamente");
              location.reload();
            })
          }
        } else {
          window.alert("El administrador no puede consultar las compras de los clientes");
          location.reload();
        }
      });
    }
  }
}