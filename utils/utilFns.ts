import muscleGroups from './muscleGroups'

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

export const stringCasing = (str: string) => {
	const split = str.split(' ')
	var res = ''
	for (let i = 0; i < split.length; i++) {
		res += split[i].charAt(0).toUpperCase() + split[i].slice(1) + ' '
	}
	return res
}

export const badgeColor = (str: string): string => {
	if (muscleGroups.ARMS.includes(str)) {
		return 'whatsapp'
	}
	if (muscleGroups.BACK.includes(str)) {
		return 'red'
	}
	if (muscleGroups.CHEST.includes(str)) {
		return 'yellow'
	}
	if (muscleGroups.LEGS.includes(str)) {
		return 'teal'
	}
	if (muscleGroups.SHOULDERS.includes(str)) {
		return 'purple'
	}
	return 'grayAlpha'
}
