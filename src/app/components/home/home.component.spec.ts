/// <reference types="jest" />

import { TestBed, async } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  beforeEach(async(() => {
    const metaStub = () => ({ updateTag: (object) => ({}) });
    const titleStub = () => ({ setTitle: (string) => ({}) });
    const activatedRouteStub = () => ({
      data: { pipe: () => ({ subscribe: (f) => f({}) }) },
    });
    const routerStub = () => ({
      events: {
        pipe: () => ({ subscribe: (f) => f({}) }),
      },
      url: {},
      navigateByUrl: (string) => ({}),
    });
    const matDialogStub = () => ({
      open: (logoutDialog) => ({
        afterClosed: () => ({ pipe: () => ({ subscribe: (f) => f({}) }) }),
      }),
    });
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: Meta, useFactory: metaStub },
        { provide: Title, useFactory: titleStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: MatDialog, useFactory: matDialogStub },
        {
          provide: Router,
          useValue: {
            url: '/path',
          },
          useFactory: routerStub,
        },
      ],
    }).compileComponents();
  }));

  it('should create the home', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const home = fixture.componentInstance;
    expect(home).toBeTruthy();
  });

  it(`should have as title 'levvel-starter-angular'`, () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const home = fixture.componentInstance;
    expect(home.title).toEqual('levvel-starter-angular');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(HomeComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain(
  //     'levvel-starter-angular home is running!'
  //   );
  // });
});
