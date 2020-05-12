import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../../services/firebase.service';

interface Student {
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent implements OnInit {

  studentList = [];
  studentData: Student;
  studentForm: FormGroup;

  constructor(
      private firebaseService: FirebaseService,
      public fb: FormBuilder
  ) {
    this.studentData = {} as Student;
  }

  ngOnInit() {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });

    this.read();
  }

  read() {
    this.firebaseService.read().subscribe(data => {
      this.studentList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
          age: e.payload.doc.data()['age'],
          address: e.payload.doc.data()['address'],
        };
      });
      console.log(this.studentList);
    });
  }

  create() {
    console.log(this.studentForm.value);
    this.firebaseService.create(this.studentForm.value).then(res => {
      this.studentForm.reset();
    }).catch(error => {
      console.log(error);
    });
  }

  public remove(rowId) {
    this.firebaseService.delete(rowId);
  }

  public edit(record) {
    record.isEdit = true;
    record.editName = record.name;
    record.editAge = record.age;
    record.editAddress = record.address;
  }

  public update(recordRow) {
    const record = {};
    record['name'] = recordRow.editName;
    record['age'] = recordRow.editAge;
    record['address'] = recordRow.editAddress;
    this.firebaseService.update(recordRow.id, record);
    recordRow.isEdit = false;
  }
}
