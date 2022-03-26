import { Component, OnInit } from '@angular/core';
import { EditorialDetail } from '../editorial-detail';
import { EditorialService } from '../editorial.service';

@Component({
  selector: 'app-editorial-list',
  templateUrl: './editorial-list.component.html',
  styleUrls: ['./editorial-list.component.css']
})
export class EditorialListComponent implements OnInit {

  editorials: Array<EditorialDetail> = [];
  constructor(private editorialService: EditorialService) { }

  getEditorials(){
    this.editorialService.getEditorials().subscribe(editorials=>{
      this.editorials = editorials;
    })
  }

  ngOnInit() {
    this.getEditorials();
  }

}
