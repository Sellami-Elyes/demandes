import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationItemComponent } from './authorization-item.component';

describe('AuthorizationItemComponent', () => {
  let component: AuthorizationItemComponent;
  let fixture: ComponentFixture<AuthorizationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorizationItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
