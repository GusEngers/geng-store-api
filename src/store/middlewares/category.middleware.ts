import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Category } from '../schemas/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoryMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const categories = await this.categoryModel.estimatedDocumentCount();
    if (!categories) {
      throw new HttpException(
        'There are no product categories hosted in the database. Please add one or more categories first.',
        HttpStatus.PRECONDITION_REQUIRED,
      );
    }
    next();
  }
}
