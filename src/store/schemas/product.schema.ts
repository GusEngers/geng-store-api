import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Category } from './category.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    required: true,
  })
  price: Types.Decimal128;

  @Prop({
    default: 0,
  })
  count: number;

  @Prop({
    required: true,
    ref: 'Category',
  })
  categories: Category[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
