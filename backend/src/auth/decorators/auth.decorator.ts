import { applyDecorators, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Role } from '../../../generated/prisma/client'
import { AdminGuard } from './admin.guard'

export const Auth = (role: Role = 'user') => {
	if (role === 'admin') {
		return applyDecorators(UseGuards(AuthGuard('jwt'), AdminGuard))
	}

	return UseGuards(AuthGuard('jwt'))
}
