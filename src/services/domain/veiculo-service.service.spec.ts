import { TestBed } from '@angular/core/testing';

import { VeiculoServiceService } from './veiculo.service';

describe('VeiculoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VeiculoServiceService = TestBed.get(VeiculoServiceService);
    expect(service).toBeTruthy();
  });
});
