import { Timestamp } from "@angular/fire/firestore";

export interface Exhibition {
  id: string;
  title: string;
  description: string;
  date: Timestamp;
  price: number;
  image_url:string;
}
