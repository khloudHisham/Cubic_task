import { Injectable } from '@angular/core';
import { IFile } from '../../interfaces/Ifile/IFile';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  files: IFile[] = [];

  async processEntry(entry: any, path: string = ''): Promise<IFile> {
    if (entry.isFile) {
      return new Promise((resolve) => {
        entry.file((file: File) => {
          const isImage = file.type.startsWith('image/');
          resolve({
            name: entry.name,
            isDirectory: false,
            file: file,
            type: file.type,
            size: file.size,
            isImage: isImage,
            previewUrl: isImage ? URL.createObjectURL(file) : null,
            path: path + '/' + entry.name,
          });
        });
      });
    } else if (entry.isDirectory) {
      const directory: IFile = {
        name: entry.name,
        isDirectory: true,
        children: [],
        path: path + '/' + entry.name,
      };

      const reader = entry.createReader();
      const entries = await this.readEntries(reader);

      for (const entry of entries) {
        const child = await this.processEntry(entry, directory.path);
        directory.children?.push(child);
      }

      return directory;
    }
    return {} as IFile;
  }

  private readEntries(reader: any): Promise<any[]> {
    return new Promise((resolve) => {
      reader.readEntries((entries: any[]) => {
        resolve(entries);
      });
    });
  }

  async addFiles(files: FileList | DataTransferItemList) {
    for (let i = 0; i < files.length; i++) {
      const item = files[i];
      if ('webkitGetAsEntry' in item) {
        const entry = (item as DataTransferItem).webkitGetAsEntry();
        if (entry) {
          const processedEntry = await this.processEntry(entry);
          this.files.push(processedEntry);
        }
      } else {
        const file = item as File;
        const isImage = file.type.startsWith('image/');
        this.files.push({
          name: file.name,
          isDirectory: false,
          file: file,
          type: file.type,
          size: file.size,
          isImage: isImage,
          previewUrl: isImage ? URL.createObjectURL(file) : null,
        });
      }
    }
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
  }

  clearFiles() {
    this.files = [];
  }
}
