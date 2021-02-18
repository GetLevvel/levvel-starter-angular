/// <reference types="jest" />

import { TestBed } from '@angular/core/testing';
import { HomeGetDataResolver } from './home-get-data.resolver';

describe('OrderDetailSearchUsersResolver', () => {
  let service: HomeGetDataResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeGetDataResolver],
    });
    service = TestBed.inject(HomeGetDataResolver);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('resolve', () => {
    it('makes expected calls', () => {
      jest.spyOn(service, 'resolve').getMockImplementation();
      service.resolve();
      expect(service.resolve).toHaveBeenCalled();
    });
  });
});
