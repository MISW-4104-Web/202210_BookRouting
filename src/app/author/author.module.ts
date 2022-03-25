import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorDetailComponent } from './author-detail/author-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [AuthorListComponent, AuthorDetailComponent]
})
export class AuthorModule { }
