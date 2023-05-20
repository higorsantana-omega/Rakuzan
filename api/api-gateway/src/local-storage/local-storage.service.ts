import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { mkdirp } from 'mkdirp';
import { join } from 'path';

@Injectable()
export class LocalStorageService {
  private logger = new Logger(LocalStorageService.name);

  async uploadFile(file: any) {
    const fileName = this.generateFileName(file);
    const pathComplete = join(__dirname, '..', '..', 'uploads', fileName);

    await mkdirp(join(__dirname, '..', '..', 'uploads'));

    try {
      await new Promise<void>((resolve, reject) =>
        createWriteStream(pathComplete)
          .on('finish', () => resolve())
          .on('error', (error) => reject(error))
          .end(file.buffer),
      );

      this.logger.log(`file ${fileName} saved with success`);

      return pathComplete;
    } catch (error) {
      this.logger.error(`error on save file:`, error.message);
      throw new BadRequestException('Error on save file');
    }
  }

  private generateFileName(file: any): string {
    const dataAtual = new Date();

    const extension = file.originalname.split('.')[1];

    const year = `${dataAtual.getFullYear()}${dataAtual.getMonth() + 1}`;
    const minutes = `${dataAtual.getDate()}${dataAtual.getHours()}${dataAtual.getMinutes()}${dataAtual.getSeconds()}`;
    const secondsAndExtension = `${dataAtual.getMilliseconds()}.${extension}`;
    const fileName = year + minutes + secondsAndExtension;
    return fileName;
  }
}
