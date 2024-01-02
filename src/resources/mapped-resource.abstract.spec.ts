import { Repository } from 'typeorm';
import { SwapiService } from '../swapi/swapi.service';
import { MappedResource } from './mapped-resource.abstract';
import { ResourceName } from '../swapi/types';

class MockRepository<T> {
  find = jest.fn();
  save = jest.fn();
  delete = jest.fn();
  findOne = jest.fn();
}

class MockSwapiService {
  getAll = jest.fn();
}

const mockResourceName = 'test' as ResourceName;

interface MockResourceDTO {
  id: string;
  name: string;
}

interface MockEntity {
  id: string;
  name: string;
  test: string;
}

class TestResourceService extends MappedResource<MockEntity> {
  constructor(
    repository: Repository<MockEntity>,
    swapiService: SwapiService
  ) {
    super(mockResourceName, repository, swapiService);
  }

  public create = jest.fn().mockImplementation((dto: MockResourceDTO) => {
    // add a test property to return something different than the dto
    const entity: MockEntity = Object.assign({test: 'test'}, dto);
    return Promise.resolve(entity);
  });
}

describe('ResourceService', () => {
  let testService: TestResourceService;
  let mockRepository: MockRepository<MockEntity>;
  let mockSwapiService: MockSwapiService;

  beforeEach(() => {
    mockRepository = new MockRepository<MockEntity>();
    mockSwapiService = new MockSwapiService();
    testService = new TestResourceService(mockRepository as any, mockSwapiService as any);
  });

  it('should be defined', () => {
    expect(testService).toBeDefined();
  });

  describe('populate', () => {
    let dtoArray: MockResourceDTO[];
    beforeEach(() => {
      dtoArray = [
        { id: '1', name: 'Test Resource One' },
        { id: '2', name: 'Test Resource Two' },
        { id: '3', name: 'Test Resource Three' },
      ];
      mockSwapiService.getAll.mockResolvedValue(dtoArray);
    });

    it('should call swapiService.getAll with the correct resource name', async () => {
      await testService.populate();
      expect(mockSwapiService.getAll).toHaveBeenCalledWith(mockResourceName);
    });

    it('should call create method for each resource', async () => {
      await testService.populate();
      dtoArray.forEach(dto => {
        expect(testService.create).toHaveBeenCalledWith(dto);
      });
    });

    it('should call repository.save method with all the created entities', async () => {
      await testService.populate();
      const createResults = await Promise.all(testService.create.mock.results.map(result => result.value));
      expect(mockRepository.save).toHaveBeenCalledWith(createResults);
    });
  });

  describe('clear', () => {
    it('should call repository.delete', async () => {
      await testService.clear();
      expect(mockRepository.delete).toHaveBeenCalledWith({});
    });
  });

  describe('findAll', () => {
    it('should call repository.find with provided options', async () => {
      const options = { where: { name: 'Test' } };
      await testService.findAll(options);
      expect(mockRepository.find).toHaveBeenCalledWith(options);
    });
  });

  describe('findByID', () => {
    it('should call repository.findOne with ID and options', async () => {
      const id = '1';
      const options = { where: { name: 'Test' } };
      await testService.findByID(id, options);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id, name: 'Test' },
      });
    });
  });
});
