import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorDetail } from '../author-detail';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.css']
})
export class AuthorDetailComponent implements OnInit {

  authorId!: string;
  @Input() authorDetail!: AuthorDetail;

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService
  ) {}

  getAuthor(){
    this.authorService.getAuthor(this.authorId).subscribe(author=>{
      this.authorDetail = author;
    })
  }

  ngOnInit() {
    if(this.authorDetail === undefined){
      this.authorId = this.route.snapshot.paramMap.get('id')!
      if (this.authorId) {
        this.getAuthor();
      }
    }
  }
}
