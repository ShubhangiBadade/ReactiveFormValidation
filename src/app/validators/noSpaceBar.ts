import { AbstractControl, ValidationErrors } from "@angular/forms";

export class NoSpaceBarValidators{
    static nospace(controls:AbstractControl):ValidationErrors|null{
        let val = controls.value as string
        if(!val){
            return null
        }
        if(val.includes(" ")){
            return{
                noSpaceBar :`Space is not allowed`
            }
        }else{
            return null
        }
    }
}