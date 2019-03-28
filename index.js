const express = require('express')
//jalali date: http://nodejs.ir/blog/jalaali
//https://github.com/jalaali/jalaali-js
var jalaali = require('jalaali-js')

const app = express()
const port = process.env.PORT || 3000
//use pug as template engine
app.set('view engine', 'pug')

//allow access for resources
app.use("/styles", express.static(__dirname + '/styles'));
app.use("/scripts", express.static(__dirname + '/scripts'));

//index
app.get('/', (req, res) => 
	showTimePage(res)
)

//index controller
function showTimePage(res){
	res.setHeader("Content-Type", "text/html; charset=utf-8")
	var d = new Date()
	var n = d.toLocaleTimeString()
	var jalaliDate = jalaali.toJalaali(d)
	//res.sendFile(__dirname + '/index.html')
	res.render('index', { Date: formatJalaliDate(jalaliDate), Time: n })
	/*
	res.write('<html>')
	res.write('<head>')
	res.write('<link rel="stylesheet" type="text/css" href="styles/bootstrap.css"/>')
	res.write('</head>')
	res.write('<body>')
	res.write('<div style="float:left">')
	res.write('<div style="direction:rtl;"><span style="float:right">ساعت:</span><span style="float:left">'+n + '</span></div>')
	console.log(jalaliDate)
	res.write('<div style="direction:rtl;">تاریخ :'+jalaliDate.jd + ' ' + monthToSting(jalaliDate.jm) + ' ' + jalaliDate.jy + "</div>")
	res.write('</div>')
	res.write('<script src="scripts/bootstrap.js"></script>')
	res.write('</body>')
	res.end('</html>')
	*/
	}
//beauty view jalali time
function formatJalaliDate(jalaliDate){
	return jalaliDate.jd + ' ' + monthToSting(jalaliDate.jm) + ' ' + jalaliDate.jy
}
//convert month number to month name
function monthToSting(m){
	monthes = ['فروردین' , 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']
	return monthes[m-1]
}
//start server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))