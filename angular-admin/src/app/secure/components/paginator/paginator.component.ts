import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent implements OnInit {
  @Input() lastPage: number | undefined;
  @Output() pageChanged = new EventEmitter<number>();
  page: number = 1;


  constructor() {
  }

  ngOnInit() {
  }

  next(): void {
    if (this.page === this.lastPage) {
      return;
    }
    this.page++;
    this.pageChanged.emit(this.page);
  }

  prev(): void {
    if (this.page === 1) {
      return;
    }
    this.page--;
    this.pageChanged.emit(this.page);
  }
}
