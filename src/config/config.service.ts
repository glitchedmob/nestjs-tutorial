import * as fs from 'fs';
import * as Joi from 'joi';
import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';

export interface EnvConfig {
  [key: string]: string;
}

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = ConfigService.validateInput(config);
  }

  get port(): number {
    return parseInt(this.envConfig.PORT, 10);
  }

  get env(): string {
    return this.envConfig.NODE_ENV;
  }

  get host(): string {
    return this.envConfig.HOST;
  }

  get db() {
    return {
      host: this.envConfig.DB_HOST,
      port: parseInt(this.envConfig.DB_PORT, 10),
      username: this.envConfig.DB_USERNAME,
      password: this.envConfig.DB_PASSWORD,
      name: this.envConfig.DB_NAME,
    };
  }

  private static validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production'])
        .default('development'),
      PORT: Joi.number().default(3000),
      HOST: Joi.string().default('localhost'),
      DB_HOST: Joi.string().default('localhost'),
      DB_PORT: Joi.number().integer().default(3306),
      DB_USERNAME: Joi.string().required(),
      DB_PASSWORD: Joi.string().allow('').optional().default(''),
      DB_NAME: Joi.string().required(),
    });

    const { error, value: validateEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validateEnvConfig;
  }
}