import { Component, OnInit } from '@angular/core';
import { Exhibition } from '../../shared/models/Exhibition';
import { ExhibitionService } from '../../shared/services/exhibition.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { TicketService } from '../../shared/services/ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrl: './my-tickets.component.scss'
})
export class MyTicketsComponent implements OnInit{
  exhibitions: Exhibition[] | undefined;
  user: Subscription | undefined;
  userId?: string;
  dataSource!: MatTableDataSource<Exhibition>;
  loading: boolean = false;

  constructor(
    private location: Location,
    private ticketService: TicketService,
    private auth: AngularFireAuth,
    private router: Router){}


    ngOnInit(): void {
      this.loading = true;
      this.user = this.auth.user.subscribe(user => {
        if (user) {
          this.userId = user.uid;
          this.ticketService.getMyTickets(this.userId).subscribe(exhibitions => {
            this.exhibitions = exhibitions;
            console.log(this.exhibitions);
            this.loading = false;
          });
        }
      });
    }

  ngOnDestroy(): void {
    if (this.user) {
      this.user.unsubscribe();
    }
  }

  delete(exId: string){
    const id = this.userId + exId;
    console.log('ID: ' + id);
    this.ticketService.delete(id);
    this.router.navigate(['/main']);
  }

  goBack(){
    this.location.back();
  }

}
