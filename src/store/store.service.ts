import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isObjectIdOrHexString } from 'mongoose';
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
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllCategories(): Promise<Category[]> {
    try {
      const response: Category[] = await this.categoryModel
        .find({})
        .select('-__v');
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneProduct(id: string): Promise<Product | null> {
    if (!isObjectIdOrHexString(id))
      throw new HttpException('Invalid ID format', HttpStatus.NOT_ACCEPTABLE);
    try {
      const response: Product | null = await this.productModel
        .findById(id)
        .select('-__v')
        .populate({ path: 'categories', select: 'name' })
        .exec();
      if (!response)
        throw new HttpException(
          `Product with ID '${id}' not found`,
          HttpStatus.NOT_FOUND,
        );
      return response;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async filterByCategory(category: string): Promise<Product[]> {
    if (!isObjectIdOrHexString(category))
      throw new HttpException('Invalid ID format', HttpStatus.NOT_ACCEPTABLE);
    try {
      const response: Product[] = await this.productModel
        .find({ categories: category })
        .select('-__v')
        .populate({ path: 'categories', select: 'name' })
        .exec();
      return response;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async updatePrice(
    id: string,
    updateStoreDto: UpdateStoreDto,
  ): Promise<string> {
    if (!isObjectIdOrHexString(id))
      throw new HttpException('Invalid ID format', HttpStatus.NOT_ACCEPTABLE);
    try {
      const response = await this.productModel.findById(id);
      if (!response)
        throw new HttpException(
          `Product with ID '${id}' not found`,
          HttpStatus.NOT_FOUND,
        );
      response.price = updateStoreDto.price;
      await response.save();
      return `Price for product '${response.name}' updated!`;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
