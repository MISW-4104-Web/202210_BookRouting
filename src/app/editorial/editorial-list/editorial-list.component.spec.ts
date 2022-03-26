/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { faker } from '@faker-js/faker';

import { EditorialListComponent } from './editorial-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { EditorialDetail } from '../editorial-detail';
import { Book } from 'src/app/book/book';

describe('EditorialListComponent', () => {
  let component: EditorialListComponent;
  let fixture: ComponentFixture<EditorialListComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule, RouterTestingModule],
      declarations: [ EditorialListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorialListComponent);
    component = fixture.componentInstance;

    component.editorials = [
      new EditorialDetail(faker.datatype.number(), faker.lorem.sentence(), [])
    ];

    debug = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a p element ', () => {
    expect(debug.query(By.css('p')).nativeElement.innerHTML).toContain(component.editorials[0].name)
  });
});
