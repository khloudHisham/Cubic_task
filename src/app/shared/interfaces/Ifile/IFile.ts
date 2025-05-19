export interface IFile {
  name: string;
  isDirectory: boolean;
  children?: IFile[];
  file?: File;
  type?: string;
  size?: number;
  isImage?: boolean;
  previewUrl?: string | null;
  path?: string;
}