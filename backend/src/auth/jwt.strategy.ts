import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from '../prisma/prisma.service'
import { User } from '../../generated/prisma/client'

interface JwtPayload {
	id: number
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private configService: ConfigService,
		private prisma: PrismaService
	) {
		const secret = configService.get<string>('JWT_SECRET')

		if (!secret) {
			throw new Error('JWT_SECRET is not defined')
		}

		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: secret
		})
	}

	async validate(payload: JwtPayload): Promise<User> {
		const user = await this.prisma.user.findUnique({
			where: { id: payload.id }
		})

		if (!user) {
			throw new UnauthorizedException('User not found')
		}

		return user
	}
}
