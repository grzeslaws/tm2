import { Component } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms"

@Component({
    selector: "add-administrator",
    templateUrl: "./addAdministrator.html"
})



export class AddAdministratorComponent {

    constructor(private fb: FormBuilder) { // <--- inject FormBuilder
        this.createForm();
  }

    addAdminForm: FormGroup; 

    public customers: Array<string> = Customers;
    public submitted: boolean = false;

    createForm() {
        this.addAdminForm = this.fb.group({
        name: ['', [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(24)
            ]
          ],
        lastName: '',
        email: '',
        pass: '',
        options: this.fb.group({
            customers: ['', Validators.required, this.forbiddenNameValidator() ],
            confirmation: ''
        })
    });
    
}

forbiddenNameValidator(){
}



    onSubmit(){
        console.log(this.addAdminForm.value);
        this.submitted = true;
    }
}


const Customers: Array<string> = [
   "PZU", "Warta", "Link4"
]
