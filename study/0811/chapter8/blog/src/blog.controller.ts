import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog') // 클래스에 붙이는 Controller 데코레이터
export class BlogController {
  //   blogService: BlogService;

  constructor(private blogService: BlogService) {}

  // 글 목록 가져오기
  @Get('/')
  async getAllPosts() {
    console.log('모든 게시글 가져오기');

    return await this.blogService.getAllPosts();
  }

  // 글 생성
  @Post('/')
  createPost(@Body() postDto) {
    console.log('게시글 작성');

    this.blogService.createPost(postDto);

    return 'success';
  }

  // 게시글 가져오기
  @Get('/:id')
  async getPost(@Param('id') id: string) {
    console.log(`[id: ${id}] 게시글 하나 가져오기`);

    return await this.blogService.getPost(id);
  }

  // 게시글 삭제
  @Delete('/:id')
  async deletePost(@Param('id') id: string) {
    console.log('게시글 삭제');

    await this.blogService.delete(id);

    return 'success';
  }

  // 게시글 수정
  @Put('/:id')
  async updatePost(@Param() id, @Body() postDto) {
    console.log(`[${id}] 게시글 업데이트`, id, postDto);

    return await this.blogService.updatePost(id, postDto);
  }
}
