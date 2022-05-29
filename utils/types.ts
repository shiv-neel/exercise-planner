export interface TableType {
	tid: number // primary key
	uid: string // foreign key
	tname: string
	days: number[]
}

export interface ExerciseType {
	eid: number // primary key
	tid?: number // foreign key
	ename: string
	sets: number
	reps: number
	weight: number
	muscles: string[]
}
