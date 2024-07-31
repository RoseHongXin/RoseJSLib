interface Calendar {
	getMilliseconds() : number
	getSeconds() : number
	getMinutes() : number
	getHours() : number
	getDate() : number
	getDay() : number
	getMonth() : number
	getFullYear() : number
	getTime() : number
	now() : number
	
	setMilliseconds(val : number) : void
	setSeconds(val : number) : void
	setMinutes(val : number) : void
	setHours(val : number) : void
	setDate(val : number) : void
	setDay(val : number) : void
	setMonth(val : number) : void
	setFullYear(val : number) : void
	setTime(val : number) : void
	parse(val : number) : void
	
	addMilliseconds(val : number) : void
	addSeconds(val : number) : void
	addMinutes(val : number) : void
	addHours(val : number) : void
	addDate(val : number) : void
	addMonth(val : number) : void
	addYear(val : number) : void
	equal(calendar : Calendar) : boolean
	compare(calendar : Calendar) : number
	offsetDays(calendar : Calendar) : number
	toString() : string
	format(fmt : string) : string
}

export function getInstance() : Calendar
export function getInstance(time : string) : Calendar