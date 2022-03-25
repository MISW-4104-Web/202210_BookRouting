import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  @Input() bookDetail!: Book;

  constructor() { }

  getShortDate() {
    let shortDate: String = this.bookDetail.publishingDate + '';
    return shortDate.split('T')[0];
  }

  ngOnInit() {
  }

}
