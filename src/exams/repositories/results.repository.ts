import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Result } from '../schemas/results.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ResultsRepository {
  constructor(
    @InjectModel(Result.name)
    private readonly resultModel: Model<Result>,
  ) {}

  async create(result: Result): Promise<Result> {
    return this.resultModel.create(result);
  }

  async createMany(results: Result[]): Promise<Result[]> {
    return this.resultModel.insertMany(results);
  }

  async getAll(): Promise<Result[]> {
    return this.resultModel.find({}).lean().exec();
  }

  async getByStudentId(studentId: string): Promise<Result> {
    return this.resultModel.findOne({ studentId }).lean().exec();
  }

  async deleteAll() {
    return this.resultModel.deleteMany({}).lean().exec();
  }
}
