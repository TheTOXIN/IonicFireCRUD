import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../../services/firebase.service';

interface Student {
  id: string;
  name: string;
  age: number;
  address: string;
  isEdit: false;
}

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent implements OnInit {

  studentList: Student[];
  studentData: Student;
  studentForm: FormGroup;

  constructor(
    private firebaseService: FirebaseService,
    public fb: FormBuilder
  ) {
    this.studentData = {} as Student;
    this.studentList = [];
  }

  ngOnInit() {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });

    this.read();
  }

  public create() {
    this.firebaseService.create(this.studentForm.value).then(res => {
      this.studentForm.reset();
    }).catch(error => {
      console.log(error);
    });
  }

  public read() {
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
    });
  }

  public update(recordRow) {
    const record = {};
    record['name'] = recordRow.name;
    record['age'] = recordRow.age;
    record['address'] = recordRow.address;
    this.firebaseService.update(recordRow.id, record);
    recordRow.isEdit = false;
  }

  public delete(rowId) {
    this.firebaseService.delete(rowId);
  }
}
