import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioUsuariosService } from 'src/app/services/servicio-usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchTerm = String();
  busqueda: any = [];
  users: any = [];
  usersToDisplay: any = [];
  administrador: boolean = false;

  constructor(private servicioUsuariosService: ServicioUsuariosService, private router: Router) { }


  onSearch() {
    this.servicioUsuariosService.searchUsers(this.searchTerm).subscribe(res => {
      this.usersToDisplay = res;
    });
  }

  crearAdministrador() {
    const rol = "Administrador";
    this.servicioUsuariosService.creteUser(rol).subscribe((res: any) => {
      window.alert("Administrador con ID: " + res._id + " creado correctamente");
      location.reload();
    });
  }


  crearUsuario() {
    const rol = "Cliente";
    this.servicioUsuariosService.creteUser(rol).subscribe((res: any) => {
      window.alert("Cliente con ID: " + res._id + " creado correctamente");
      location.reload();
    });
  }

  consultarUsuarios() {
    const id = prompt("Ingrese el ID del administrador para poder consultar usuarios:");
    if (id) {
      this.servicioUsuariosService.consultarRol(id).subscribe(res => {
        console.log(res);
        if (res.length === 0) {
          window.alert("No eres un administrador, por lo que no tienes permisos para consultar usuarios.")
          this.mostrarUsuarios(false);
          location.reload();
        }
        if (res[0].rol === "Administrador") {
          this.administrador = true;
          this.servicioUsuariosService.getUsers().subscribe((res: any) => {
            this.users = res;
            this.usersToDisplay = this.users;
            this.mostrarUsuarios(true);
          });
        } else {
          window.alert("No eres un administrador, por lo que no tienes permisos para consultar usuarios.")
          this.mostrarUsuarios(false);
          location.reload();
        }
      });
    }
  }

  mostrarUsuarios(activar: boolean) {
    var mostrado = document.getElementById("consultar");
    if (activar) {
      if (mostrado != null) {
        mostrado.style.display = "block";
      }
    } else {
      if (mostrado != null) {
        mostrado.style.display = "none";
      }
    }
  }

  eliminarUsuario() {
    let id_delete;
    id_delete = prompt("Ingrese su ID de usuario para darse de baja:");
    if (id_delete) {
      if (window.confirm('¿Estás seguro de que quieres darte de baja?')) {
        this.servicioUsuariosService.deleteUsers(id_delete).subscribe((res) => {
          window.alert("Usuario eliminado correctamente");
          location.reload();
        })
      }
    }
  }

  filtrar(event: any) {
    const checkboxes = document.getElementsByName("usuarios");
    const seleccionados: string[] = [];
    for (let i = 0; i < checkboxes.length; i++) {
      const checkbox = checkboxes[i] as HTMLInputElement;
      if (checkbox.checked) {
        seleccionados.push(checkbox.value);
      }
    }

    let usuariosToDisplay = this.users;

    if (seleccionados.length > 0) {
      usuariosToDisplay = usuariosToDisplay.filter((user: any) => seleccionados.includes(user.rol));
    }

    this.usersToDisplay = usuariosToDisplay;

  }
}