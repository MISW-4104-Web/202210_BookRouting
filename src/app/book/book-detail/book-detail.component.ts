import { Component, Input, OnInit } from '@angular/core';
import { BookDetail } from '../book-detail';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  @Input() bookDetail!: BookDetail;

  constructor() { }

  getShortDate() {
    let shortDate: String = this.bookDetail.publishingDate + '';
    return shortDate.split('T')[0];
  }

  ngOnInit() {
  }

}
