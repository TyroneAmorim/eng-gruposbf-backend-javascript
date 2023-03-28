import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import AwesomeApi from './AwesomeApi';

const apiResponse = {
  data: {
    USDBRL: {
      codein: 'USD',
      ask: '0.19',
    },
    EURBRL: {
      codein: 'EUR',
      ask: '0.15',
    },
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
  axiosRef: {
    get: jest.fn(),
  },
};

let api: AwesomeApi;

beforeEach(async () => {
  mockApi.axiosRef.get.mockReset();
});

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
    mockApi.axiosRef.get.mockReturnValue(apiResponse);
    const result = await api.getCurrencies({
      currencyBase: 'BRL',
      currenciesSearch: ['USD', 'EUR'],
    });
    expect(result).toMatchObject(currencies);
  });

  it('valida possivel erro dentro do recurso', async () => {
    mockApi.axiosRef.get.mockRejectedValue(new InternalServerErrorException());
    try {
      await api.getCurrencies({
        currencyBase: null,
        currenciesSearch: null,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerErrorException);
    }

    mockApi.axiosRef.get.mockRejectedValue(new NotFoundException());
    try {
      await api.getCurrencies({
        currencyBase: 'BRLT',
        currenciesSearch: ['USD', 'EUR'],
      });
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  });
});
