import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import { Activity } from 'src/app/service/Activity';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-activities',
  templateUrl: './update-activities.component.html',
  styleUrls: ['./update-activities.component.css']
})

export class UpdateActivitiesComponent implements OnInit {
  imagen: any = [];
  activity: Activity = new Activity();
  id = String();
  
  constructor(private crudService: CrudService) {}

  ngOnInit() {
    this.crudService.selectedActivity.subscribe((actividad: Activity) => {
      this.activity = actividad;
      this.id = actividad._id;
      console.log(this.activity._id)
    });
  }

  onFileChange(event : any) {
    this.imagen = event.target.files[0];
  }
  
  getImageUrl(activity: any) {
    if (activity.imagen && activity.imagen.originalName) {
      const imageUrl = `http://localhost:3000/uploads/${activity.imagen.originalName}`;
      return imageUrl;
    } else {
      return '';
    }
  }
  
  onSubmit(form: NgForm) {
    const id = prompt("Ingrese el ID del administrador para poder obtener los permisos necesarios:");
    if (id) {
      this.crudService.consultarRol(id).subscribe(res => {
        if(res==="Administrador"){
          let formData = new FormData();
          // Verificar si se han ingresado valores en el formulario
          if (form.valid) {
            formData.append('titulo', form.value.titulo);
            formData.append('participantes', form.value.participantes);
            formData.append('localizacion', form.value.localizacion);
            formData.append('precio', form.value.precio);
            formData.append('cantidad', form.value.cantidad);
            formData.append('duracion', form.value.duracion);
            formData.append('descripcion', form.value.descripcion);
            formData.append('edad', form.value.edad);
            formData.append('dificultad', form.value.dificultad);
            formData.append('categoria', form.value.categoria);
            formData.append('imagen', this.imagen);
        
          } else {
            // Si no se han ingresado valores en el formulario, utilizar los valores de activity
            formData = new FormData();
            formData.append('titulo', this.activity.titulo);
            formData.append('participantes', this.activity.participantes);
            formData.append('localizacion', this.activity.localizacion);
            formData.append('precio', this.activity.precio);
            formData.append('cantidad', this.activity.cantidad);
            formData.append('duracion', this.activity.duracion);
            formData.append('descripcion', this.activity.descripcion);
            formData.append('edad', this.activity.edad);
            formData.append('dificultad', this.activity.dificultad);
            formData.append('categoria', this.activity.categoria);
          }
        
          this.crudService.UpdateActivities(formData,this.id).subscribe(res => {
            window.alert("Actividad actualizada correctamente");
            location.reload();
            console.log(res);
          });
        }else{
          window.alert("No eres un administrador, por lo que no tienes permiso para modificar una actividad");
          location.reload();
        }
      });
    }
  }
}