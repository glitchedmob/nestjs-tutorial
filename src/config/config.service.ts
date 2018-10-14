import * as fs from 'fs';
import * as Joi from 'joi';
import * as dotenv from 'dotenv';

export interface EnvConfig {
  [key: string]: string;
}

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

  private static validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production'])
        .default('development'),
      PORT: Joi.number().default(3000),
      HOST: Joi.string().default('localhost'),
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