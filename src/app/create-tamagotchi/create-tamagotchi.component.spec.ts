import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTamagotchiComponent } from './create-tamagotchi.component';

describe('CreateTamagotchiComponent', () => {
  let component: CreateTamagotchiComponent;
  let fixture: ComponentFixture<CreateTamagotchiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTamagotchiComponent]
    });
    fixture = TestBed.createComponent(CreateTamagotchiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
