import {
	BadRequestException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'
import { RegisterDto } from './dto/register.dto'
import { hash, verify } from 'argon2'
import { User } from '../../generated/prisma/client'
import { LoginDto } from './dto/login.dto'
import { OAuth2Client } from 'google-auth-library'
import { GoogleAuthDto } from './dto/google-auth.dto'

interface JwtPayload {
	id: number
	email: string
}

@Injectable()
export class AuthService {
	private googleClient: OAuth2Client

	constructor(
		private prisma: PrismaService,
		private jwt: JwtService
	) {
		this.googleClient = new OAuth2Client(
			process.env.GOOGLE_CLIENT_ID,
			process.env.GOOGLE_CLIENT_SECRET,
			'postmessage'
		)
	}

	async register(dto: RegisterDto) {
		const oldUser = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		})

		if (oldUser) throw new BadRequestException('User already exists')

		const user = await this.prisma.user.create({
			data: {
				email: dto.email,
				password: await hash(dto.password)
			}
		})

		const tokens = await this.issueTokens(user.id)

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	async login(dto: LoginDto) {
		const user = await this.validateUser(dto)
		const tokens = await this.issueTokens(user.id)

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	async googleAuth(dto: GoogleAuthDto) {
		try {
			const { tokens } = await this.googleClient.getToken(dto.token)

			if (!tokens.id_token) {
				throw new BadRequestException('Google did not return an ID token')
			}

			const ticket = await this.googleClient.verifyIdToken({
				idToken: tokens.id_token,
				audience: process.env.GOOGLE_CLIENT_ID
			})

			const payload = ticket.getPayload()
			if (!payload || !payload.email) {
				throw new BadRequestException('Invalid Google token data')
			}

			let user = await this.prisma.user.findUnique({
				where: { email: payload.email }
			})

			if (!user) {
				const randomPassword = Math.random().toString(36).slice(-10)
				user = await this.prisma.user.create({
					data: {
						email: payload.email,
						password: await hash(randomPassword)
					}
				})
			}

			const tokensApp = await this.issueTokens(user.id)

			return {
				user: this.returnUserFields(user),
				...tokensApp
			}
		} catch {
			throw new UnauthorizedException('Google authentication failed')
		}
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwt.verifyAsync<JwtPayload>(refreshToken)

		if (!result) throw new UnauthorizedException('Invalid refresh token')

		const user = await this.prisma.user.findUnique({
			where: {
				id: result.id
			}
		})

		if (!user) {
			throw new UnauthorizedException('User not found')
		}

		const tokens = await this.issueTokens(user.id)

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	private async issueTokens(userId: number) {
		const data = { id: userId }

		const accessToken = this.jwt.sign(data, {
			expiresIn: '15m'
		})

		const refreshToken = this.jwt.sign(data, {
			expiresIn: '3d'
		})

		return { accessToken, refreshToken }
	}

	private async validateUser(dto: LoginDto) {
		const user = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		})

		if (!user) throw new UnauthorizedException('Invalid email or password')

		const isValid = await verify(user.password, dto.password)

		if (!isValid) throw new UnauthorizedException('Invalid email or password')

		return user
	}
	private returnUserFields(user: User) {
		return {
			id: user.id,
			email: user.email,
			role: user.role
		}
	}
}
