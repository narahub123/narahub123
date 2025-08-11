import { Injectable } from '@nestjs/common';
import { PostDto } from './blog.model';
import { BlogMongoRepository } from './blog.repository';

@Injectable()
export class BlogService {
  //   posts: PostDto[] = [];

  //   blogRepository: BlogRepository;

  //   // 블로그 리포지토리 객체 형성
  //   constructor() {
  //     this.blogRepository = new BlogFileRepository();
  //   }

  constructor(private blogRepository: BlogMongoRepository) {}

  // 게시글 전체 가져오기
  async getAllPosts() {
    return await this.blogRepository.getAllPosts();
  }

  // 게시글 생성
  createPost(postDto: PostDto) {
    this.blogRepository.createPost(postDto);
  }

  // 게시글 가져오기
  async getPost(id) {
    return await this.blogRepository.getPost(id);
  }

  // 게시글 삭제
  async delete(id) {
    return await this.blogRepository.deletePost(id);
  }

  // 게시글 수정
  async updatePost(id, postDto: PostDto) {
    return await this.blogRepository.updatePost(id, postDto);
  }
}
