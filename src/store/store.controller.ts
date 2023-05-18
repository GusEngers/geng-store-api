import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post('category')
  async createCategory(@Body() createStoreDto: CreateStoreDto) {
    const response = await this.storeService.createCategory(createStoreDto);
    return response;
  }

  @Post('product')
  async createProduct(@Body() createStoreDto: CreateStoreDto) {
    const response = await this.storeService.createProduct(createStoreDto);
    return response;
  }

  @Get('product')
  async findAllProducts() {
    const response = await this.storeService.findAllProducts();
    return response;
  }

  @Get('category')
  async findAllCategories() {
    const response = await this.storeService.findAllCategories();
    return response;
  }

  @Get('product/:id')
  async findOne(@Param('id') id: string) {
    const response = await this.storeService.findOneProduct(id);
    return response;
  }

  @Get('filter/:category')
  async filterByCategory(@Param('category') category: string) {
    const response = await this.storeService.filterByCategory(category);
    return response;
  }

  @Patch('product/:id')
  async updatePrice(
    @Param('id') id: string,
    @Body() updateStoreDto: UpdateStoreDto,
  ) {
    const response = await this.storeService.updatePrice(id, updateStoreDto);
    return response;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeService.remove(+id);
  }
}
