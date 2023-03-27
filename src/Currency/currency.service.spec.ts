import { CACHE_MANAGER, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CacheRedisService } from '../CacheTool/Redis/cacheRedis.service';
import { CurrencyEntity } from './currency.entity';
import { CurrencyService } from './currency.service';
import AwesomeApi from './APIs/AwesomeApi/AwesomeApi';

const currencies = [
  {
    currency: 'USD',
    value: 0.19,
  },
  {
    currency: 'EUR',
    value: 0.15,
  },
];

const mockRepository = {
  findOne: jest.fn(),
};

const mockCache = {
  set: jest.fn(),
  get: jest.fn(),
};

const mockApi = {
  getCurrencies: jest.fn(),
};

let service: CurrencyService;

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      CurrencyService,
      CacheRedisService,
      AwesomeApi,
      {
        provide: getRepositoryToken(CurrencyEntity),
        useValue: mockRepository,
      },
      {
        provide: CACHE_MANAGER,
        useValue: mockCache,
      },
      {
        provide: AwesomeApi,
        useValue: mockApi,
      },
    ],
  }).compile();

  service = module.get<CurrencyService>(CurrencyService);
});

describe('Currency service', () => {
  it('descarta moeda invalida', async () => {
    const result = service.getCurrencies('BRLd', 529);
    expect(result).rejects.toBeInstanceOf(NotFoundException);
  });

  it('retorna conversoes em outras moedas', async () => {
    mockApi.getCurrencies.mockResolvedValue(currencies);

    const result = await service.getCurrencies('BRL', 529);
    const convert = service.convert(currencies, 529);

    expect(result).toMatchObject(convert);
  });
});
