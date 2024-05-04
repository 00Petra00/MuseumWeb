import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Exhibition } from '../../shared/models/Exhibition';
import { ExhibitionService } from '../../shared/services/exhibition.service';
import { User } from '../../shared/models/User';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, catchError, of, forkJoin, Subscription} from 'rxjs';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})

export class MainComponent implements OnInit{

  exhibitions?: Exhibition[] = [];
  exhibitions$!: Observable<any[]>;
  loading: boolean = false;

  constructor(
    private exhibitionService: ExhibitionService,
    private router: Router) { }

  ngOnInit(): void {

    this.loading = true;

    this.exhibitionService.loadImageMeta().subscribe(

      exhibitions$ => {

        const requests = exhibitions$.map(exhibition =>
          this.exhibitionService.loadImage(exhibition.image_url).pipe(
            catchError(error => {
              console.error('Error loading image:', error);
              return of(null);
            })
          )
        );
        forkJoin(requests).subscribe(imageUrls => {
          console.log(requests)

          exhibitions$.forEach((exhibition, index) => {
            exhibition.image_url = imageUrls[index] as string;
          });
          this.exhibitions = exhibitions$;
          this.loading = false;
        });
      },
      error => {
        console.error('Error loading exhibitions:', error);
        this.loading = false;
      }
    );
  }

  showDetails(id: string): void {
    this.router.navigate(['/details', id]);
  }

  addExhibition(): void {
    this.router.navigate(['/add-exhibition']);
  }

}
