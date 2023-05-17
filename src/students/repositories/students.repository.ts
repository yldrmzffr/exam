import { Injectable } from '@nestjs/common';
import { Student } from '../schemas/student.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class StudentsRepository {
  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<Student>,
  ) {}

  async create(student: Student): Promise<Student> {
    return this.studentModel.create(student);
  }

  async bulkCreate(students: Student[]): Promise<Student[]> {
    return this.studentModel.insertMany(students);
  }

  async findWithEmailOrPhone(email: string, phone: string): Promise<Student> {
    return this.studentModel
      .findOne({
        $or: [{ email }, { phone }],
      })
      .lean()
      .exec();
  }

  async getAll(): Promise<Student[]> {
    return this.studentModel
      .find({
        isDeleted: false,
      })
      .lean()
      .exec();
  }

  async getById(id: string): Promise<Student> {
    return this.studentModel.findOne({ _id: id }).lean().exec();
  }

  async update(id: string, student: Partial<Student>): Promise<Student> {
    return this.studentModel
      .findOneAndUpdate({ _id: id, isDeleted: false }, student, { new: true })
      .lean()
      .exec();
  }

  async delete(id: string): Promise<Student> {
    return this.studentModel
      .findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true },
      )
      .lean()
      .exec();
  }

  async restore(id: string): Promise<Student> {
    return this.studentModel
      .findOneAndUpdate(
        { _id: id, isDeleted: true },
        { isDeleted: false },
        { new: true },
      )
      .lean()
      .exec();
  }

  async clear(): Promise<void> {
    await this.studentModel.deleteMany({}).exec();
  }

  async getByIds(ids: string[]): Promise<Student[]> {
    return this.studentModel
      .find({
        _id: {
          $in: ids,
        },
      })
      .lean()
      .exec();
  }
}
