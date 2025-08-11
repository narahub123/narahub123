import { readFile, writeFile } from 'fs/promises';
import { PostDto } from './blog.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';

// 리포지토리 인터페이스 정의
export interface BlogRepository {
  getAllPosts(): Promise<(PostDto | Blog)[]>;
  createPost(postDto: PostDto);
  getPost(id: string): Promise<PostDto | Blog | null | undefined>;
  deletePost(id: string);
  updatePost(id: string, postDto: PostDto);
}

@Injectable()
export class BlogFileRepository implements BlogRepository {
  FILE_NAME = './src/blog.data.json';

  // 모든 게시글 가져오기
  async getAllPosts(): Promise<PostDto[]> {
    const datas = await readFile(this.FILE_NAME, 'utf-8');

    const posts = JSON.parse(datas);

    return posts;
  }

  async createPost(postDto: PostDto) {
    const posts = await this.getAllPosts();
    const id = posts.length + 1;
    const createPost = { ...postDto, id: id.toString(), createdDt: new Date() };
    posts.push(createPost);

    await writeFile(this.FILE_NAME, JSON.stringify(posts));
  }

  async getPost(id: string): Promise<PostDto | undefined> {
    const posts = await this.getAllPosts();
    const result = posts.find((post) => post.id === id);

    return result;
  }

  async deletePost(id: string) {
    const posts = await this.getAllPosts();
    const filteredPosts = posts.filter((post) => post.id !== id);

    await writeFile(this.FILE_NAME, JSON.stringify(filteredPosts));
  }

  async updatePost(id: string, postDto: PostDto) {
    const posts = await this.getAllPosts();
    const index = posts.findIndex((post) => post.id === id);
    const updatePost = { ...postDto, id, updatedDt: new Date() };
    posts[index] = updatePost;

    await writeFile(this.FILE_NAME, JSON.stringify(posts));
  }
}

@Injectable()
export class BlogMongoRepository implements BlogRepository {
  // Modal<BlogDocument> 타입인 blogModal을 주입
  constructor(@InjectModel(Blog.name) private blogModal: Model<BlogDocument>) {}

  async getAllPosts(): Promise<Blog[]> {
    return await this.blogModal.find().exec();
  }

  async createPost(postDto: PostDto) {
    const createPost = {
      ...postDto,
      createdDt: new Date(),
      updatedDt: new Date(),
    };

    this.blogModal.create(createPost);
  }

  async getPost(id: string): Promise<PostDto | null> {
    return await this.blogModal.findById(id);
  }

  async deletePost(id: string) {
    await this.blogModal.findByIdAndDelete(id);
  }

  async updatePost(id: string, postDto: PostDto) {
    const updatePost = { ...postDto, id, updatedDt: new Date() };
    await this.blogModal.findByIdAndUpdate(id, updatePost);
  }
}
