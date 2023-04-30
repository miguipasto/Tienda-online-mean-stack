import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import { Activity } from 'src/app/service/Activity';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-activities',
  templateUrl: './create-activities.component.html',
  styleUrls: ['./create-activities.component.css']
})
export class CreateActivitiesComponent implements OnInit {

  activity: Activity = new Activity();
  imagen: any;
  
  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
  }
  
  onFileChange(event : any) {
    this.imagen = event.target.files[0];
  }
  
  onSubmit(form: NgForm) {
    const id = prompt("Ingrese el ID del administrador para poder obtener los permisos necesarios:");
    if (id) {
      this.crudService.consultarRol(id).subscribe(res => {
        if(res==="Administrador"){
          const formData = new FormData();
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
          
            this.crudService.CreateActivities(formData).subscribe(res => {
              window.alert("Actividad creada correctamente");
              location.reload();
              console.log(res);
            });
          }
        }else{
          window.alert("No eres un administrador, por lo que no tienes permiso para crear una actividad");
          location.reload();
        }
      });
      }
  }
  
}