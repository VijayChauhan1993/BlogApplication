import { Sequelize } from 'sequelize-typescript';
import { Blogs } from '../models/blog.model';
import { Module } from '@nestjs/common';
import { Comments } from 'src/models/comment.model';

export const databaseProviders = [
    {
      provide: 'SEQUELIZE',
      useFactory: async () => {
        const sequelize = new Sequelize({
          dialect: 'postgres',
          host: process.env.PGSQL_HOST,
          port: parseInt(process.env.PGSQL_PORT),
          username: process.env.PGSQL_USERNAME,
          password: process.env.PGSQL_PASSWORD,
          database: process.env.PGSQL_DATABASE
        });
        sequelize.addModels([Blogs,Comments]);
        await sequelize.sync();
        return sequelize;
      },
    },
  ];
 
  // exporting providers to make them accessible to rest of the application
  @Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
  })
  export class DatabaseModule {}