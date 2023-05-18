import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { Category } from './schemas/category.schema';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async createCategory(createStoreDto: CreateStoreDto): Promise<string> {
    const newCategory = new this.categoryModel(createStoreDto);
    try {
      const response: string = await newCategory
        .save()
        .then(() => `${newCategory._id}`);
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  async createProduct(createStoreDto: CreateStoreDto): Promise<string> {
    const newProduct = new this.productModel(createStoreDto);
    try {
      const response: string = await newProduct
        .save()
        .then(() => `${newProduct._id}`);
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  async findAllProducts(): Promise<Product[]> {
    try {
      const response: Product[] = await this.productModel
        .find({})
        .select('-__v')
        .populate({ path: 'categories', select: 'name' })
        .exec();
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  async findAllCategories(): Promise<Category[]> {
    try {
      const response: Category[] = await this.categoryModel
        .find({})
        .select('-__v');
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} store`;
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
