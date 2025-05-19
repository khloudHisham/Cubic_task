import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from '../../shared/services/file-service/file-upload.service';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly translate = inject(TranslateService);
  protected readonly fileUploadService = inject(FileUploadService);
  private readonly toastr = inject(ToastrService);

  form!: FormGroup;
  currentLang: string = 'en';

  ngOnInit(): void {
    this.initializeForm();
    this.initTranslate();
  }

  removeFile(index: number): void {
    this.fileUploadService.removeFile(index);
    this.toastr.warning('File removed successfully!', 'Warning');
  }

  async onFileDropped(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.items) {
      await this.fileUploadService.addFiles(event.dataTransfer.items);
    }
    this.toastr.info('Files added successfully!', 'Info');
  }

  async fileBrowseHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      await this.fileUploadService.addFiles(input.files);
    }
  }

  // تم حذف getImagePreview لأنها صارت غير ضرورية بعد حفظ previewUrl

  initTranslate(): void {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.currentLang = 'en';
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
  }

  switchLanguage(lang: string): void {
    this.currentLang = lang;
    this.translate.use(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update toast position based on language
    this.toastr.toastrConfig.positionClass = lang === 'ar' ? 'toast-top-left' : 'toast-top-right';
  }

  initializeForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      this.toastr.success(
        this.currentLang === 'ar' ? 'تم إرسال النموذج بنجاح!' : 'Form submitted successfully!',
        this.currentLang === 'ar' ? 'نجاح' : 'Success',
        {
          positionClass: this.currentLang === 'ar' ? 'toast-top-left' : 'toast-top-right'
        }
      );
    } else {
      this.form.markAllAsTouched();
      this.toastr.error(
        this.currentLang === 'ar' ? 'الرجاء ملء جميع الحقول المطلوبة بشكل صحيح!' : 'Please fill all required fields correctly!',
        this.currentLang === 'ar' ? 'خطأ' : 'Error',
        {
          positionClass: this.currentLang === 'ar' ? 'toast-top-left' : 'toast-top-right'
        }
      );
    }
  }

  get isFormValid(): boolean {
    return this.form.valid && this.form.dirty;
  }
}
