import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validator,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  dataLoaded = false;
  filterText = '';
  productAddForm: FormGroup;
  @ViewChild('closeModal') closeModal: ElementRef;
  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createProductAddForm();
    this.activatedRoute.params.subscribe((params) => {
      if (params['categoryId']) {
        this.getProductsByCategory(params['categoryId']);
      } else {
        this.getProducts();
      }
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.data;
      this.dataLoaded = true;
    });
  }
  getProductsByCategory(categoryId: number) {
    this.productService
      .getProductsByCategory(categoryId)
      .subscribe((response) => {
        this.products = response.data;
        this.dataLoaded = true;
      });
  }
  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.toastrService.info('sepete eklendi', product.productName);
  }

  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      productName: ['', Validators.required],
      unitsInStock: ['', Validators.required],
      unitPrice: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }

  add() {
    if (this.productAddForm.valid) {
      const productModel = Object.assign({}, this.productAddForm.value);

      this.productService
        .add(productModel)

        .subscribe(
          (data) => {
            this.toastrService.success(data.message);
            this.closeModal.nativeElement.click();
            this.productAddForm.reset();
            this.getProducts();
          },
          (responseError) => {
            if (responseError.error.Errors.length > 0) {
              // tslint:disable-next-line: prefer-for-of
              for (let i = 0; i < responseError.error.Errors.length; i++) {
                this.toastrService.error(
                  responseError.error.Errors[i].ErrorMessage
                );
              }
            }
          }
        );
    } else {
      this.toastrService.error('Hata');
    }
  }
}
