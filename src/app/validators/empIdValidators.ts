import { AbstractControl, ValidationErrors } from "@angular/forms"

export class EmpIdValidators{
    static isEmpIdvalid(controls:AbstractControl):ValidationErrors|null{
        let val = controls.value as string
        if(!val){
            return null
        }
        let regExp=/^[A-Z]\d{3}$/
        let isValid = regExp.test(val)
        if(isValid){
            return null
        }else{
            return{
                inValidEmpId :`Emp id must be start with one alphabate and end with 3 numbers`
            }
        }
    }
}