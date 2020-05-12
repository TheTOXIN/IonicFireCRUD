import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrudComponent } from './crud.component';

describe('CrudComponent', () => {
  let component: CrudComponent;
  let fixture: ComponentFixture<CrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
