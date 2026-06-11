export interface GithubTokenResponse {
	access_token?: string
	error?: string
}

export interface GithubUserResponse {
	id: number
	email: string | null
}

export interface GithubEmailResponse {
	email: string
	primary: boolean
	verified: boolean
}
