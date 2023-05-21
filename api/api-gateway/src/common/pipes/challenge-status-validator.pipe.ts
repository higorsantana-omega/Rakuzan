import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ChallengeStatus } from '../../challenges/interfaces/challenges.interface';

export class ChallengeStatusValidatorPipe implements PipeTransform {
  readonly statusAccepted: ChallengeStatus[] = [
    'ACCEPTED',
    'DECLINED',
    'CANCELLED',
  ];

  transform(value: any) {
    const status = value.status.trim().toUpperCase();

    if (!this.statusAccepted.includes(status)) {
      throw new BadRequestException(`The status: ${status} is invalid.`);
    }

    return value;
  }
}
