import { AbstractControl, ValidationErrors } from "@angular/forms"
import { Observable } from "rxjs";

export class AsynchEmailValidator{
    static isEmailAvailable(controls:AbstractControl):Promise<ValidationErrors|null> |Observable<ValidationErrors|null>{
            let val = controls.value as string
           
            const promise = new Promise<ValidationErrors|null>((resolve, reject)=>{

               setTimeout(() => {
                if(val===`JhonDoe@gmail.com`){
                    resolve({
                        emailExistErr :`This Email id is already in use`
                    })
                }else{
                    resolve(null)
                }
               }, 5000);
               
            });
            return promise
        }
}