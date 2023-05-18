import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreDto } from './create-store.dto';
import { Types } from 'mongoose';

export class UpdateStoreDto extends PartialType(CreateStoreDto) {
  price: Types.Decimal128
}
