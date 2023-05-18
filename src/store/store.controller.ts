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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(+id, updateStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeService.remove(+id);
  }
}
