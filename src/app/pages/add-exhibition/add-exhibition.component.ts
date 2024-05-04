import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Exhibition } from '../../shared/models/Exhibition';
import { ExhibitionService } from '../../shared/services/exhibition.service';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp, getFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-exhibition',
  templateUrl: './add-exhibition.component.html',
  styleUrl: './add-exhibition.component.scss'
})
export class AddExhibitionComponent implements OnInit{

  addExhibitionForm = new FormGroup({
    id: new FormControl,
    title: new FormControl(''),
    description: new FormControl(''),
    date: new FormControl(''),
    price: new FormControl(''),
    image_url: new FormControl('')
  });

  loading: boolean = false;
  imageUrl: string = '';
  file!: File;
  constructor(
    private location: Location,
    private exhibitionService: ExhibitionService,
    private fb: FormBuilder,
    private router: Router,
    private storage: AngularFireStorage){}

  ngOnInit(): void {

  }
  createForm(model: Exhibition) {
    if (this.loading) return;
    let formGroup = this.fb.group(model);
    formGroup.get('title')?.addValidators([Validators.required]);
    formGroup.get('description')?.addValidators([Validators.required, Validators.minLength(10)]);
    formGroup.get('date')?.addValidators([Validators.required]);
    formGroup.get('price')?.addValidators([Validators.required]);
    formGroup.get('image_url')?.addValidators([Validators.required]);
    return formGroup;
  }

  onSubmit(){
    if (this.addExhibitionForm.valid) {
      if (this.addExhibitionForm.get('title') && this.addExhibitionForm.get('description') && this.addExhibitionForm.get('date') && this.addExhibitionForm.get('price') && this.addExhibitionForm.get('image_url')) {

        if (!this.imageUrl) {
          this.imageUrl = 'images/coming_soon.jpg'
        }
        console.log(this.imageUrl);
        const exhibition: Exhibition={
          id: uuidv4(),
          title: this.addExhibitionForm.get('title')?.value as string,
          description: this.addExhibitionForm.get('description')?.value as string,
          date: Timestamp.fromDate(new Date(this.addExhibitionForm.get('date')?.value as string)),
          price: this.addExhibitionForm.get('price')?.value as unknown as number,
          image_url: this.imageUrl,
       }

       this.exhibitionService.create(exhibition).then(_ =>{
        if(this.imageUrl !== 'images/coming_soon.jpg'){
        this.uploadImage();}
        console.log('Exhebition added succesfully');
        this.router.navigate(['/main']);
      }).catch(error => {
      console.error(error);
    })
      }
    }
  }
  onFileSelected(event: any){
    this.file = event.target.files[0];
    const filePath = 'images/' + this.file.name;
    console.log(this.file.name);

    this.imageUrl = filePath;
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
