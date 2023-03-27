import { HttpService } from '@nestjs/axios';
import { BadGatewayException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import AwesomeApi from './AwesomeApi';

const apiResponse = {
  USDBRL: {
    codein: 'USD',
    ask: '0.19',
  },
  EURBRL: {
    codein: 'EUR',
    ask: '0.15',
  },
};

const currencies = [
  {
    currency: 'USD',
    value: '0.19',
  },
  {
    currency: 'EUR',
    value: '0.15',
  },
];

const mockApi = {
  get: jest.fn(),
};

let api: AwesomeApi;

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      AwesomeApi,
      {
        provide: HttpService,
        useValue: mockApi,
      },
    ],
  }).compile();
  api = module.get<AwesomeApi>(AwesomeApi);
});

describe('AwesomeApi', () => {
  it('valida resposta da api de conversão', async () => {
    mockApi.get.mockResolvedValue(apiResponse);
    const result = await api.getCurrencies({
      currencyBase: 'BRL',
      currenciesSearch: ['USD', 'EUR'],
    });
    expect(result).toMatchObject(currencies);
  });

  it('valida possivel erro dentro do recurso', async () => {
    mockApi.get.mockRejectedValue(new Error('Similacao de erro dentro do try'));
    try {
      await api.getCurrencies({
        currencyBase: 'BRL',
        currenciesSearch: ['USD', 'EUR'],
      });
    } catch (error) {
      expect(error).toBeInstanceOf(BadGatewayException);
    }
  });
});
