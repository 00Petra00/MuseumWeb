import { Component, OnInit } from '@angular/core';
import { Exhibition } from '../../shared/models/Exhibition';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ExhibitionService } from '../../shared/services/exhibition.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Location } from '@angular/common';
import { Timestamp } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { EMPTY, catchError, first } from 'rxjs';

@Component({
  selector: 'app-edit-exhibition',
  templateUrl: './edit-exhibition.component.html',
  styleUrl: './edit-exhibition.component.scss'
})
export class EditExhibitionComponent implements OnInit{

  editExhibitionForm = new FormGroup({
    id: new FormControl,
    title: new FormControl(''),
    description: new FormControl(''),
    date: new FormControl(),
    price: new FormControl(0),
    image_url: new FormControl('')
  });

  selectedExhibition!: Exhibition;
  formattedDate: string = '';
  date!: Timestamp;
  imageUrl: string = '';
  loading: boolean = false;
  file!: File;
  constructor(
    private location: Location,
    private exhibitionService: ExhibitionService,
    private route: ActivatedRoute,
    private router: Router,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ){}

  ngOnInit(): void {
    this.loading = true;
    const exhibitionId = this.route.snapshot.paramMap.get('id') as string;

    this.firestore.doc<any>(`Exhibitions/${exhibitionId}`).valueChanges().pipe(
      first(),
      catchError(error => {
        console.error('Hiba történt a Firestore-ból történő adatlekérdezés során:', error);
        return EMPTY;
      })
    ).toPromise()
    .then((exhibition: any) => {
      this.selectedExhibition = exhibition as Exhibition;
      this.imageUrl = this.selectedExhibition.image_url;
      this.editExhibitionForm.setValue({
        id: this.selectedExhibition.id,
        title: this.selectedExhibition.title,
        description: this.selectedExhibition.description,
        date: this.selectedExhibition.date,
        price: this.selectedExhibition.price,
        image_url: this.imageUrl
      });

      if (this.selectedExhibition.date) {
        const dateObject = this.selectedExhibition.date.toDate();
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObject.getDate().toString().padStart(2, '0');

        this.formattedDate = `${year}-${month}-${day}`;
      }

      this.loading = false;
    })
    .catch(error => {
      console.error('Hiba történt a Firestore-ból történő adatlekérdezés során:', error);
      this.loading = false;
    });
  }


  onFileSelected(event: any){
    this.file = event.target.files[0];
    const filePath = 'images/' + this.file.name;
    console.log(this.file.name);

    this.imageUrl = filePath;
  }

  update(exhibition: Exhibition){
    if (this.editExhibitionForm.get('title') && this.editExhibitionForm.get('description') && this.editExhibitionForm.get('date') && this.editExhibitionForm.get('price') && this.editExhibitionForm.get('image_url')) {

      if (!this.imageUrl) {
         this.imageUrl = 'images/coming_soon.jpg';
      }
      console.log('Date: '+ typeof(this.editExhibitionForm.get('date')?.value))
      if(typeof(this.editExhibitionForm.get('date')?.value) === 'string'){
         this.date = Timestamp.fromDate(new Date(this.editExhibitionForm.get('date')?.value));
      }
      else{
         this.date = this.editExhibitionForm.get('date')?.value
      }
      const exhibition: Exhibition={
        id: this.selectedExhibition.id,
        title: this.editExhibitionForm.get('title')?.value as string,
        description: this.editExhibitionForm.get('description')?.value as string,
        date: this.date,
        price: this.editExhibitionForm.get('price')?.value as unknown as number,
        image_url: this.imageUrl
     }
     console.log(exhibition);
     this.exhibitionService.update(exhibition).then(_ =>{
      console.log('URL: '+this.imageUrl)
      if(this.imageUrl !== 'images/coming_soon.jpg' && this.imageUrl !== this.selectedExhibition.image_url){
        this.uploadImage();}
      console.log('Exhebition updated succesfully');
      this.router.navigate(['/main']);
    }).catch(error => {
    console.error(error);})
  }
  }

  uploadImage(){
    const fileRef = this.storage.ref(this.imageUrl);
    const task = this.storage.upload(this.imageUrl, this.file);

    task.snapshotChanges().subscribe(
      snapshot => {
        if (snapshot?.state === 'success') {
          console.log('A fájl sikeresen feltöltve');
        }
      },
      error => {
        console.error('Feltöltési hiba:', error);
      }
      );
  }

  goBack(){
    this.location.back();
  }

}
