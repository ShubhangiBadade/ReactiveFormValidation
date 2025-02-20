import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Icountry } from './model/country';
import { COUNTRIES_META_DATA } from './const/countriesData';
import { CustomRegex } from './const/validationPattern';
import { NoSpaceBarValidators } from './validators/noSpaceBar';
import { AsynchEmailValidator } from './const/asyncEmailValidators';
import { EmpIdValidators } from './validators/empIdValidators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  signUpForm! : FormGroup
  title = 'reactiveFormTest';
  genderArr:Array<string>=["Female", "Male", "Others"]
  //skillsArr =["HTML", "CSS", "TS", "JS"]
  countryArr :Array<Icountry>=COUNTRIES_META_DATA
  ngOnInit(): void {
    this.createSignUpForm();
    console.log(this.f);
    this.isAddSameHandler();
    this.patchPermAdd()
    this.f['confirmPassword'].valueChanges
    .subscribe(res=>{
      console.log(res);
      
     if(res !== this.f['password'].value){
      this.f['confirmPassword'].setErrors({
        passandconpass:true
      })
     }else{
      this.f['confirmPassword'].setErrors(null)
     }
      
      
    })
    
    this.f['password'].valueChanges
        .subscribe(res=>{
          console.log(res);
          console.log("is password is valid", this.f['password'].valid);
          if(this.f['password'].valid){
            this.f['confirmPassword'].enable()
          }else{
            this.f['confirmPassword'].disable()
            this.f['confirmPassword'].reset()
          }
          
          
        })
    
      }
  patchPermAdd(){
    this.f['isAddSame'].valueChanges
      .subscribe((res:boolean)=>{
        console.log(res);
        if(res){
          console.log(this.f['currentAddress'].value);
          let currentAddObj =this.f['currentAddress'].value;
          this.f['permanentAddress'].patchValue(currentAddObj);
          this.f['permanentAddress'].disable();
          
        }else{
          this.f['permanentAddress'].reset();
          this.f['permanentAddress'].enable();
        }
        
      })
   }
  
  isAddSameHandler(){
    this.f['currentAddress'].valueChanges
          .subscribe(res=>{
            this.f['currentAddress'].valid ? this.f['isAddSame'].enable(): this.f['isAddSame'].disable()  
          })
  }

  createSignUpForm(){
    this.signUpForm =new FormGroup({
      userName : new FormControl(null, [Validators.required,
         Validators.minLength(5), 
         Validators.maxLength(9),
         Validators.pattern(CustomRegex.username),
        NoSpaceBarValidators.nospace]),
      email: new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.email)],
                                      [
                                        AsynchEmailValidator.isEmailAvailable
                                      ]),
      empId : new FormControl(null, [Validators.required, EmpIdValidators.isEmpIdvalid]),
      gender:new FormControl("Female"),
      skills:new FormArray([new FormControl(null, Validators.required)]),
      currentAddress: new FormGroup({
        city: new FormControl(null, [Validators.required]),
        state: new FormControl(null, [Validators.required]),
        country: new FormControl(null, [Validators.required]),
        pincode: new FormControl(null, [Validators.required]),
      }),
      permanentAddress: new FormGroup({
        city: new FormControl(null, [Validators.required]),
        state: new FormControl(null, [Validators.required]),
        country: new FormControl(null, [Validators.required]),
        pincode: new FormControl(null, [Validators.required]),
      }),
      isAddSame:new FormControl({value:null, disabled:true}),
      password: new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.password)]),
      confirmPassword: new FormControl({value:null, disabled:true} ,[Validators.required]),
      
    })
  }
  onSignUp(){
    if(this.signUpForm.valid){
      console.log(this.signUpForm.value);
      
    }
  }
  onAddSkill(){
   if(this.skillsArr.length <5){
    let cntrl = new FormControl(null, [Validators.required]);
    this.skillsArr.push(cntrl)
   }
  }
  onRemoveSkill(i:number){
    this.skillsArr.removeAt(i)
  }
  get f(){
    return this.signUpForm.controls
  }
  get skillsArr(){
    return this.f['skills'] as FormArray
  }
}
 