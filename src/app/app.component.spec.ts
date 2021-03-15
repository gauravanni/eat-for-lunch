import { TestBed, async,ComponentFixture } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports:[BrowserModule,FormsModule, ReactiveFormsModule]
    }).compileComponents().then(()=>{
      fixture = TestBed.createComponent(AppComponent);
      comp = fixture.componentInstance;
      comp.ngOnInit();
    })
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });


  it('form should be invalid', () => {
    // test case will fail if valid value is provided
    comp.itemForm.controls['item'].setValue('1,');
    expect(comp.itemForm.valid).toBeFalsy();
  });

  it('form should be valid', () => {
    // test case will fail if invalid value is provided
    comp.itemForm.controls['item'].setValue('1');
    expect(comp.itemForm.valid).toBeTruthy();
  });

  // new test cases
  it('button should contain Check If Too Much text', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toEqual('Check If Too Much');
  });

  it('click on Submit button', () => {
    spyOn(comp,'onSubmit')
  });

  it('it should render Please enter data first error message', () => {
    comp.itemForm.controls['item'].setValue('1,');
    comp.onSubmit()
    expect(comp.formObj.errorMessage).toEqual('Please enter data first')
  });

  it('it should render Enjoy! message', () => {
    comp.itemForm.controls['item'].setValue('1');
    comp.onSubmit()
    expect(comp.formObj.successMessage).toEqual('Enjoy!')
  });

  it('it should render Careful message', () => {
    comp.itemForm.controls['item'].setValue('1,2,3,4');
    comp.onSubmit()
    expect(comp.formObj.successMessage).toEqual('Careful')
  });

  it('it should render Too much! message', () => {
    comp.itemForm.controls['item'].setValue('1,2,3,4,5');
    comp.onSubmit()
    expect(comp.formObj.successMessage).toEqual('Too much!')
  });

});
