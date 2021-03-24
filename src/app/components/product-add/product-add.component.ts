import { ProductComponent } from './../product/product.component';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productAddForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private toestrService: ToastrService){};

ngOnInit(): void {

  this.createProductAddForm();

}
// tslint:disable-next-line: typedef
createProductAddForm() {

  this.productAddForm = this.formBuilder.group({


    productName: ['', Validators.required],
    unitsInStock: ['', Validators.required],
    unitPrice: ['', Validators.required],
    categoryId: ['', Validators.required]

  });

}


 add(){
  if (this.productAddForm.valid) {
    const productModel = Object.assign({}, this.productAddForm.value);

    this.productService.add(productModel)

    .subscribe (data => {

      this.toestrService.success(data.message);

    },
    responseError => {


if (responseError.error.Errors.length>0) {
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0 ; i < responseError.error.Errors.length; i++){
    this.toestrService.error(responseError.error.Errors[i].ErrorMessage);

  }

}
    })
  } else {
    this.toestrService.error('dsddsds');
  }




}
}
