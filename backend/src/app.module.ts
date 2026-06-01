import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { PaginationModule } from './pagination/pagination.module'
import { ProductModule } from './product/product.module'
import { BrandModule } from './brand/brand.module'
import { CategoryModule } from './category/category.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(process.cwd(), 'uploads'),
			serveRoot: '/uploads'
		}),
		ConfigModule.forRoot(),
		AuthModule,
		UserModule,
		PaginationModule,
		ProductModule,
		BrandModule,
		CategoryModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
