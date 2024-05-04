import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ExhibitionService } from '../../shared/services/exhibition.service';
import { Exhibition } from '../../shared/models/Exhibition';
import { Timestamp } from '@angular/fire/firestore';
import { TicketService } from '../../shared/services/ticket.service';
import { Ticket } from '../../shared/models/Ticket';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  exhibitionId?: string;
  userId?: string;
  exhibition!: Exhibition;
  exhibitions!: Exhibition[] ;
  loading: boolean = false;
  user: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private exhibitionService: ExhibitionService,
    private ticketService: TicketService,
    private router: Router,
    private auth: AngularFireAuth
  ) {}

  ngOnInit(): void {
   this.loading = true;
    this.exhibitionId = this.route.snapshot.paramMap.get('id') as string;
    this.exhibitionService.getDetailsByExId(this.exhibitionId).subscribe(data => {
      this.exhibitions = data;
      this.exhibition = this.exhibitions[0];
      this.exhibitionService.loadImage(this.exhibition.image_url).subscribe(

        imageUrl => {
          this.exhibition.image_url = imageUrl as string;
          this.loading = false;
        },
        error => {
          console.error('Error loading image:', error);
          this.loading = false;
        }
      );

    });

  }
  isDateOlder(date: Timestamp): boolean {
    const today = new Date();
    return date.toDate() < today;
  }

  goBack(){
    this.location.back();
  }

  delete(id: string){
    this.exhibitionService.delete(id);
    this.router.navigate(['/main']);
  }

  updateExhibition(): void {
      this.router.navigate(['/edit-exhibition', this.exhibitionId]);
  }

  buy(){
    this.user = this.auth.user.subscribe(user => {
      if (user) {
       this.userId = user.uid;
       const ticket: Ticket={
       userId: this.userId as string,
       exhibitionId: this.exhibitionId as string
     }
      this.ticketService.create(ticket).then(_ =>{
        console.log('Ticket added succesfully');
        this.router.navigate(['/my-tickets']);
      }).catch(error => {
        console.error(error);
      })

      }
    });

    }

}
