import {
	CanActivate,
	ExecutionContext,
	Injectable,
	ForbiddenException
} from '@nestjs/common'
import { Request } from 'express'
import { User } from '../../../generated/prisma/client'

@Injectable()
export class AdminGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = context
			.switchToHttp()
			.getRequest<Request & { user?: User }>()
		const user = request.user

		if (!user) {
			throw new ForbiddenException('Authentication required')
		}

		if (user.role !== 'admin') {
			throw new ForbiddenException('Access restricted to administrators only')
		}

		return true
	}
}
