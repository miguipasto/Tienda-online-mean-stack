import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import { Activity } from 'src/app/service/Activity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchTerm = String();
  Activities: any = [];
  ActivitiesToDisplay: any = [];
  busqueda: any = [];
  activity: Activity = new Activity();
  rolAdministrador: boolean = false;

  constructor(private crudService: CrudService, private router: Router) { }

  ngOnInit(): void {
    this.crudService.GetActivities().subscribe(res => {
      this.Activities = res;
      this.ActivitiesToDisplay = this.Activities;
    });
  }

  onSearch() {
    this.crudService.searchActivities(this.searchTerm).subscribe(res => {
      this.ActivitiesToDisplay = res;
    });
  }

  mostrarFormCrear() {
    const id = prompt("Ingrese el ID del administrador para poder obtener los permisos necesarios:");
    if (id) {
      this.crudService.consultarRol(id).subscribe(res => {
        if (res === "Administrador") {
          this.rolAdministrador = true;
          var escondido = document.getElementById("escondido");
          if (escondido != null) {
            escondido.style.display = "flex";
          }
          var modificar = document.getElementById("modificarForm");
          if (modificar != null) {
            modificar.style.display = "none";
          }
          var mostrado = document.getElementById("consultar");
          if (mostrado != null) {
            mostrado.style.display = "none";
          }
          var busqueda = document.getElementById("buscador_nav");
          if (busqueda != null) {
            busqueda.style.display = "none";
          }
        } else {
          this.rolAdministrador = false;
          window.alert("No eres un administrador, por lo que no tienes permiso para crear una actividad");
          location.reload();
        }
      });
    }
  }

  mostrarGet() {
    const id = prompt("Ingrese el ID del administrador para poder obtener los permisos necesarios:");
    if (id) {
      this.crudService.consultarRol(id).subscribe(res => {
        if (res === "Administrador") {
          this.rolAdministrador = true;
          var escondido = document.getElementById("escondido");
          if (escondido != null) {
            escondido.style.display = "none";
          }
          var modificar = document.getElementById("modificarForm");
          if (modificar != null) {
            modificar.style.display = "none";
          }
          var mostrado = document.getElementById("consultar");
          if (mostrado != null) {
            mostrado.style.display = "flex";
          }
          var busqueda = document.getElementById("buscador_nav");
          if (busqueda != null) {
            busqueda.style.display = "flex";
          }
        } else {
          this.rolAdministrador = false;
          window.alert("No eres un administrador, por lo que no tienes permiso para consultar actividades");
          location.reload();
        }
      });
    }
  }

  getImageUrl(activity: any) {
    if (activity.imagen && activity.imagen.originalName) {
      const imageUrl = `http://localhost:3000/uploads/${activity.imagen.originalName}`;
      return imageUrl;
    } else {
      return '';
    }
  }

  deleteActivity(activity: any) {
    const id = prompt("Ingrese el ID del administrador para poder obtener los permisos necesarios:");
    if (id) {
      this.crudService.consultarRol(id).subscribe(res => {
        if (res === "Administrador") {
          this.rolAdministrador = true;
          if (window.confirm('¿Estás seguro de que quieres eliminar la actividad?')) {
            this.crudService.DeleteActivities(activity._id).subscribe((res) => {
              console.log(res)
              this.Activities = res;
              window.alert("Actividad eliminada correctamente");
              location.reload();
            })
          }
        } else {
          this.rolAdministrador = false;
          window.alert("No eres un administrador, por lo que no tienes permiso para eliminar una actividad");
          location.reload();
        }
      });
    }
  }

  modificar(activity: any) {
    this.crudService.selectedActivity.next(activity);
    this.activity = activity;
    var escondido = document.getElementById("escondido");
    if (escondido != null) {
      escondido.style.display = "none";
    }
    var modificar = document.getElementById("modificarForm");
    if (modificar != null) {
      modificar.style.display = "flex";
    }
    var mostrado = document.getElementById("consultar");
    if (mostrado != null) {
      mostrado.style.display = "none";
    }
  }


  filtrar(event: any) {
    if (!this.rolAdministrador) {
      const id = prompt("Ingrese el ID del administrador para poder obtener los permisos necesarios:");
      if (id) {
        this.crudService.consultarRol(id).subscribe(res => {
          if (res === "Administrador") {
            this.rolAdministrador = true;
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
          } else {
            this.rolAdministrador = false;
            window.alert("No eres un administrador, por lo que no tienes permiso para filtrar una actividad");
            location.reload();
          }
        });
      }
    } else {
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
  }

}