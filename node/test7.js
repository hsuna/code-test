const xlsx = require('node-xlsx');
const fs = require('fs');

const kpart_path = 'D:/Desktop/KPartData/json/page'
const pages = fs.readdirSync(kpart_path)

const getSheet = () => {
	return [['TITLE', 'DESCRIPTION']]
}

const keywords = [
	'CONTROL VALVE',
	'PISTON PUMP',
	'P.P.C. VALVE',
	'SWING MOTOR',
	'SWING MACHINERY',
	'TRAVEL MOTOR',
	'FINAL DRIVE',
]
const regkw = new RegExp('('+keywords.join('|').replace(/\s/g, '\\s')+')', 'i')
const keys = [1, 2]
const keydata = {}

pages.forEach(function (bookpath) {
	let books = fs.readdirSync(`${kpart_path}/${bookpath}`)
	books.forEach(function (filepath) {
		let data = fs.readFileSync(`${kpart_path}/${bookpath}/${filepath}`, "utf-8")
		try{
			const json = JSON.parse(data);
			const key = Number(json.path[1])
			console.log(`${kpart_path}/${bookpath}/${filepath}`)

			if(-1 == keys.indexOf(key)) return;
			
			if(regkw.test(json.data['PageTitle'] || '')){
				let key = RegExp.$1.toLocaleUpperCase()
				if(!keydata[key]){
					keydata[key] = getSheet()
				}
				const sheetData = keydata[key]
				sheetData.push([
					json.book['BookName']+json.data['PageTitle'],
					json.part.filter(item => item['number']).map(item => `${item['number']}, ${item['name']}, ${item['quantity']}`).join('<br/>').replace(/<img[^>]*>/g, ''), 
				])
			}
		}catch(e){
		}
	})
})

Object.keys(keydata).forEach(key => {
	const sheetData = keydata[key]
	let data = [
		{
			name : 'sheet',
			data : sheetData,
		}
	]
		
	let buffer = xlsx.build(data);
	fs.writeFile(`./dist/20191124/kparts_${key}.xls`, buffer, function (err){
		if (err) throw err;
	})
})