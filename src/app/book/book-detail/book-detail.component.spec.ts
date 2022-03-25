/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BookDetailComponent } from './book-detail.component';
import { faker } from '@faker-js/faker';
import { BookDetail } from '../book-detail';
import { Editorial } from 'src/app/editorial/editorial';

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;

    let editorial = new Editorial(
      faker.datatype.number(),
      faker.lorem.sentence()
    );

    component.bookDetail= new BookDetail(
        faker.datatype.number(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        faker.image.imageUrl(),
        faker.date.past(),
        editorial,
        [],[]
      );

    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an img element', () => {
    expect(debug.query(By.css('img')).attributes['alt']).toEqual(
      component.bookDetail.name
    );
  });

});
