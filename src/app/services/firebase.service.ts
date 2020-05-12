import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collection = 'students';

  constructor(
      private firestore: AngularFirestore
  ) {

  }

  create(record) {
    return this.firestore
      .collection(this.collection)
      .add(record);
  }

  read() {
    return this.firestore
      .collection(this.collection)
      .snapshotChanges();
  }

  update(recordId, record) {
    this.firestore
      .doc(this.collection + '/' + recordId)
      .update(record);
  }

  delete(recordId) {
    this.firestore
      .doc(this.collection + '/' + recordId)
      .delete();
  }
}
