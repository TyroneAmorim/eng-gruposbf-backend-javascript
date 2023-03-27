import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';

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
let controller: CurrencyController;
let service: CurrencyService;

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    controllers: [CurrencyController],
    providers: [
      {
        provide: CurrencyService,
        useValue: {
          getCurrencies: jest.fn().mockReturnValue(currencies),
        },
      },
    ],
  }).compile();

  controller = module.get<CurrencyController>(CurrencyController);
  service = module.get<CurrencyService>(CurrencyService);
});

describe('controller', () => {
  it('retorna dados da moeda enviada', async () => {
    const result = controller.getCurrency({ currency: 'BRL', value: 529 });
    expect(result).toMatchObject(currencies);
    expect(service.getCurrencies).toHaveBeenCalledTimes(1);
  });

  it('valida possiveis erros dentro do servico', async () => {
    jest.spyOn(service, 'getCurrencies').mockRejectedValue(new Error());
    expect(
      controller.getCurrency({ currency: 'BRL', value: 529 }),
    ).rejects.toThrowError();
  });
});
