import 'dotenv/config';

interface RedisConfig {
  host: string;
  port: number;
  ttl?: number;
}

class ConfigService {
  constructor(private env: { [key: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];

    if (!value && throwOnMissing) {
      throw new Error(`Missing key ${key}`);
    }

    return value;
  }

  getRedisConfig(): RedisConfig {
    return {
      host: this.getValue('REDIS_HOST') || 'localhost',
      port: parseInt(this.getValue('REDIS_PORT')) || 6379,
    };
  }
}

const appConfig = new ConfigService(process.env);

export { appConfig };
