import { container } from 'tsyringe';
import { URepository, UserRepository } from '@modules/account/infra/typeorm/repositories/User';
import { CARepository, CarRepository } from '@modules/car/infra/typeorm/repositories/Car';
import { CarImagesRepository, CIRepository } from '@modules/car/infra/typeorm/repositories/CarImage';
import { CategoryRepository, CRepository } from '@modules/car/infra/typeorm/repositories/Category';
import { SpecificationsRepository, SRepository } from '@modules/car/infra/typeorm/repositories/Specification';
import { RentalRepository, RRepository } from '@modules/rentals/infra/typeorm/repositories';
import { UserTokenRepository, UTRepository } from '@modules/account/infra/typeorm/repositories/UserToken';
import './providers';

container.registerSingleton<CRepository>('CategoryRepository',CategoryRepository);
container.registerSingleton<SRepository>('SpecificationsRepository',SpecificationsRepository);
container.registerSingleton<URepository>('UserRepository', UserRepository);
container.registerSingleton<CARepository>('CarRepository', CarRepository);
container.registerSingleton<CIRepository>('CarImagesRepository',CarImagesRepository);
container.registerSingleton<RRepository>('RentalRepository', RentalRepository);
container.registerSingleton<UTRepository>('UserTokenRepository',UserTokenRepository);