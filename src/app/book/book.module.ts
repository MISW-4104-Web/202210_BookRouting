import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [BookListComponent],
  declarations: [BookListComponent, BookDetailComponent]
})
export class BookModule { }
