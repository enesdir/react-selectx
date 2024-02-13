export interface APIResponse {
	info: Info
	results: Result[]
}

export interface Info {
	count: number
	next: string
	pages: number
	prev: null
}

export interface Result {
	created: Date
	episode: string[]
	gender: Gender
	id: number
	image: string
	location: Location
	name: string
	origin: Location
	species: Species
	status: Status
	type: Type
	url: string
}

export enum Gender {
	Female = 'Female',
	Male = 'Male',
}

export interface Location {
	name: string
	url: string
}

export enum Species {
	Alien = 'Alien',
	Human = 'Human',
	Unknown = 'unknown',
}

export enum Status {
	Alive = 'Alive',
}

export enum Type {
	Chair = 'Chair',
	Clone = 'Clone',
	Empty = '',
	Pickle = 'Pickle',
}
