import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, isObjectIdOrHexString } from 'mongoose';
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
    ref: 'Category',
    validate: [
      {
        validator: function (categories: Category[]) {
          return categories.length > 0;
        },
        msg: 'Categories is required',
      },
      {
        validator: function (categories: Category[]) {
          let ids = categories.filter((id) => isObjectIdOrHexString(id));
          return ids.length === categories.length;
        },
        msg: 'Unsupported ID',
      },
    ],
  })
  categories: Category[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
