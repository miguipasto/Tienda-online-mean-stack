import { TestBed } from '@angular/core/testing';

import { ServicioComprasService } from './servicio-compras.service';

describe('ServicioComprasService', () => {
  let service: ServicioComprasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioComprasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
