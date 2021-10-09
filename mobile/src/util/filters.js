import dayjs from 'dayjs'

export const formatDateMDHM = function(str) {
  if(!str)return;
	let ptime = new Date(str).getTime()
	const twentyFourHours = 24 * 60 * 60 * 1000
	const fortyEightHours = 24 * 60 * 60 * 1000 * 2
	const date = new Date()
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const today = `${year}-${month}-${day}`
	const todayTime = new Date(today).getTime()
	const yesterdayTime = new Date(todayTime - twentyFourHours).getTime()
	const lastYesterdayTime = new Date(todayTime - fortyEightHours).getTime()

	if (ptime >= todayTime) {
		return dayjs(str).format('HH[:]mm')
	} else if (ptime < todayTime && yesterdayTime <= ptime) {
		return dayjs(str).format('[昨天] HH[:]mm')
	} else if (ptime < yesterdayTime && lastYesterdayTime <= ptime) {
		return dayjs(str).format('[前天] HH[:]mm')
	} else {
		return dayjs(str).format('MM[月]DD[日]')
	}
}