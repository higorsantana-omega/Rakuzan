import { PipeTransform } from '@nestjs/common';
import { ChallengeStatus } from '../../challenges/interfaces/challenges.interface';
export declare class ChallengeStatusValidatorPipe implements PipeTransform {
    readonly statusAccepted: ChallengeStatus[];
    transform(value: any): any;
}
