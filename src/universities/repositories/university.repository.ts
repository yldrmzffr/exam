import { Injectable } from '@nestjs/common';
import { University } from '../schemas/university.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UniversityRepository {
  constructor(
    @InjectModel(University.name)
    private readonly universityModel: Model<University>,
  ) {}

  async create(university: University): Promise<University> {
    return this.universityModel.create(university);
  }

  async addUniversities(universities: University[]): Promise<University[]> {
    return this.universityModel.insertMany(universities);
  }

  async getAll(): Promise<University[]> {
    return this.universityModel.find({}).lean().exec();
  }

  async getById(id: string): Promise<University> {
    return this.universityModel
      .findOne({
        _id: id,
      })
      .lean()
      .exec();
  }

  async delete(id: string): Promise<University> {
    return this.universityModel.findOneAndDelete({ _id: id }).lean().exec();
  }

  async deleteAll() {
    return this.universityModel.deleteMany({}).lean().exec();
  }
}
