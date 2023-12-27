import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})

export class UploadComponent implements OnInit {
  @Output() uploaded = new EventEmitter<string>();

  constructor(
    private http: HttpClient,
  ) {
  }

  ngOnInit(): void {
  }

  onFileChanged(event: any) {
    const file = event.target.files[0];
    const data = new FormData();
    data.append('image', file);
    this.http.post(`${environment.api}/upload`, data)
        .subscribe(
            (res: any) => {
              this.uploaded.emit(res.url)
            }
        )

  }

}
