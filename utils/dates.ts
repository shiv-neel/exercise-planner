export const shift: any = {
	Monday: 1,
	Tuesday: 2,
	Wednesday: 3,
	Thursday: 4,
	Friday: 5,
	Saturday: 6,
	Sunday: 7,
}

export const getDateGivenDay = (day: string) => {
	const today = new Date()
	const numberOfDay = today.getDate() - today.getDay() + shift[day] // gets most recent sunday's date, adds shift
	return new Date(today.setDate(numberOfDay))
}