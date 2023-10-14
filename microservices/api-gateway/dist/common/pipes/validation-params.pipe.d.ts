import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class ValidationParamsPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
