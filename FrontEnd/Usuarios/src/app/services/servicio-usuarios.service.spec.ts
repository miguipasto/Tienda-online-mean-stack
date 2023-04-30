import { TestBed } from '@angular/core/testing';

import { ServicioUsuariosService } from './servicio-usuarios.service';

describe('ServicioUsuariosService', () => {
  let service: ServicioUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
