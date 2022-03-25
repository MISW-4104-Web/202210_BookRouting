import { Component, OnInit } from '@angular/core';
import { AuthorDetail } from '../author-detail';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  authors: Array<AuthorDetail> = [];

  constructor(private authorService: AuthorService) { }

  getAuthors(){
    this.authorService.getAuthors().subscribe(authors=>{
      this.authors = authors;
    })
  }

  ngOnInit() {
    this.getAuthors();
  }

}
