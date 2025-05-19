import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FileUploadService } from '../../shared/services/file-service/file-upload.service';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
})
export class CustomerFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly translate = inject(TranslateService);
  protected readonly fileUploadService = inject(FileUploadService);

  form!: FormGroup;
  currentLang: string = 'en';

  ngOnInit(): void {
    this.initializeForm();
    this.initTranslate();
  }

  removeFile(index: number): void {
    this.fileUploadService.removeFile(index);
  }

  async onFileDropped(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.items) {
      await this.fileUploadService.addFiles(event.dataTransfer.items);
    }
  }

  async fileBrowseHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      await this.fileUploadService.addFiles(input.files);
    }
  }

  initTranslate(): void {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.currentLang = 'en';
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  initializeForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      alert('تم إرسال النموذج بنجاح!');
    } else {
      this.form.markAllAsTouched();
      alert('الرجاء ملء جميع الحقول المطلوبة بشكل صحيح!');
    }
  }
}
