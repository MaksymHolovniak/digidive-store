import { IsNotEmpty, IsString } from 'class-validator'

export class GithubAuthDto {
	@IsString()
	@IsNotEmpty()
	token: string
}
