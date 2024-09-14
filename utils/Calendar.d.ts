
type TimeType = number | string | Date;

interface Calendar {
	reset(time : TimeType) : void
	getMillisecond() : number
	getSecond() : number
	getMinute() : number
	getHour() : number
	getDay() : number
	getWeek() : number
	getMonth() : number
	getFullYear() : number
	getTime() : number
	now() : number
	
	setMillisecond(val : number) : void
	setSecond(val : number) : void
	setMinute(val : number) : void
	setHour(val : number) : void
	setDay(val : number) : void
	setMonth(val : number) : void
	setFullYear(val : number) : void
	setTime(val : number) : void
	parse(val : number) : void
	
	addMillisecond(val : number) : void
	addSecond(val : number) : void
	addMinute(val : number) : void
	addHour(val : number) : void
	addDay(val : number) : void
	addMonth(val : number) : void
	addYear(val : number) : void
	equal(calendar : Calendar) : boolean
	compare(calendar : Calendar) : number
	offsetDays(calendar : Calendar) : number
	toString() : string
	format(fmt : string) : string
}


export function getInstance() : Calendar
export function getInstance(time : TimeType) : Calendar