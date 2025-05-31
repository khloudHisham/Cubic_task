import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from '../../shared/services/file-service/file-upload.service';
import { MyTranslateService } from '../../shared/services/myTranslate/my-translate.service';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
})
export class CustomerFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly translateService = inject(TranslateService);
  private readonly myTranslateService = inject(MyTranslateService);
  protected readonly fileUploadService = inject(FileUploadService);
  private readonly toastrService = inject(ToastrService);

  form: FormGroup;
  currentLang: string = 'en';

  constructor() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [Validators.required, Validators.pattern('^01[0-2,5][0-9]{8}$')],
      ],
    });

    this.currentLang = localStorage.getItem('lang') || 'ar';

    this.myTranslateService.changeDirection();

    this.switchLanguage(this.currentLang);
  }

  removeFile(index: number): void {
    this.fileUploadService.removeFile(index);
    const fileRemovedText = this.translateService.instant('FORM.FILE_REMOVED');
    const titleWarningText =
      this.translateService.instant('FORM.TITLE_WARNING');
    this.toastrService.warning(fileRemovedText, titleWarningText, {
      positionClass:
        this.currentLang === 'ar' ? 'toast-top-left' : 'toast-top-right',
    });
  }

  async onFileDropped(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.items) {
      await this.fileUploadService.addFiles(event.dataTransfer.items);
    }
    const fileAddedText = this.translateService.instant('FORM.FILE_ADDED');
    const titleInfoText = this.translateService.instant('FORM.TITLE_INFO');
    this.toastrService.info(fileAddedText, titleInfoText, {
      positionClass:
        this.currentLang === 'ar' ? 'toast-top-left' : 'toast-top-right',
    });
  }

  async fileBrowseHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      await this.fileUploadService.addFiles(input.files);
    }
  }

  switchLanguage(lang: string): void {
    this.myTranslateService.changeLangTranslate(lang);
    this.currentLang = lang;
    this.translateService.use(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    this.toastrService.toastrConfig.positionClass =
      lang === 'ar' ? 'toast-top-left' : 'toast-top-right';
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      this.translateService
        .get(['FORM.SUCCESS', 'FORM.TITLE_SUCCESS'])
        .subscribe((translations) => {
          this.toastrService.success(
            translations['FORM.SUCCESS'],
            translations['FORM.TITLE_SUCCESS'],
            {
              positionClass:
                this.translateService.currentLang === 'ar'
                  ? 'toast-top-left'
                  : 'toast-top-right',
            }
          );
        });
    } else {
      Object.keys(this.form.controls).forEach((key) => {
        const control = this.form.get(key);
        control?.markAsTouched();
      });
      this.translateService
        .get(['FORM.ERROR', 'FORM.TITLE_ERROR'])
        .subscribe((translations) => {
          this.toastrService.error(
            translations['FORM.ERROR'],
            translations['FORM.TITLE_ERROR'],
            {
              positionClass:
                this.translateService.currentLang === 'ar'
                  ? 'toast-top-left'
                  : 'toast-top-right',
            }
          );
        });
    }
  }

  get isFormValid(): boolean {
    return this.form.valid && this.fileUploadService.files.length > 0;
  }
}
