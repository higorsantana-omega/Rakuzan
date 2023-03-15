import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class PlayersValidationParamsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value)
      throw new BadRequestException(
        `The value ${metadata.data} should be informed.`,
      );
    return value;
  }
}
