const xlsx = require('node-xlsx');
const fs = require('fs');

const kpart_path = 'D:/Desktop/KPartData/json/page'
const pages = fs.readdirSync(kpart_path)

const getSheet = () => {
	return {
		sheetData: [['Part', 'Des', 'Qty']],
		sheet2Data: [],
		sheet2DataIndex: 0,
		sheet3Data: [['Seal kit', 'Des', 'Title']],
	}
}

const rkeyword = /(SERVICE|SEAL) KIT/
// const keys = [1, 2, 12, 55]
const keydata = {}

pages.forEach(function (bookpath) {
	let books = fs.readdirSync(`${kpart_path}/${bookpath}`)
	books.forEach(function (filepath) {
		let data = fs.readFileSync(`${kpart_path}/${bookpath}/${filepath}`, "utf-8")
		try{
			console.log(`${kpart_path}/${bookpath}/${filepath}`)
			const json = JSON.parse(data);
			const key = json.path[1]
			
			if(!keydata[key]){
				keydata[key] = getSheet()
			}
			const sds = keydata[key]
			const kits = [];
			json.part.forEach(function(part){
				if(rkeyword.test(part.name.toLocaleUpperCase()))
					kits.push(part)
			})
			if(kits.length>0){
				sds.sheet2Data[sds.sheet2DataIndex] = ['Seal kit', 'Part', 'Des', 'Qty', 'Title']
				for(let k=1, i=0; k<50; k++, i++){
					sds.sheet2Data[sds.sheet2DataIndex+k] = []
					if(0 == i){
						sds.sheet2Data[sds.sheet2DataIndex+k][4] = json.data['PageTitle']
					}
					if(kits[i]){
						sds.sheet2Data[sds.sheet2DataIndex+k][0] = kits[i]['number']
					}
					if(json.part[i]){
						const item = json.part[i]
						sds.sheetData.push([item['number'], item['name'], item['quantity']])
						sds.sheet2Data[sds.sheet2DataIndex+k][1] = item['number']
						sds.sheet2Data[sds.sheet2DataIndex+k][2] = item['name']
						sds.sheet2Data[sds.sheet2DataIndex+k][3] = item['quantity']
					}
				}
				sds.sheet2DataIndex += 50

				sds.sheet3Data.push([
					kits.map(item => item['number']).join(' '),
					json.part.filter(item => item['number']).map(item => `${item['number']}, ${item['name']}, ${item['quantity']}`).join('<br/>').replace(/<img[^>]*>/g, ''), 
					json.data['PageTitle']
				])
			}
		}catch(e){
		}
	})
})

Object.keys(keydata).forEach(key => {
	const { sheetData, sheet2Data, sheet3Data} = keydata[key]
	let data = [
		{
			name : 'sheet',
			data : sheetData,
		},
		{
			name : 'sheet2',
			data : sheet2Data,
		},
		{
			name : 'sheet3',
			data : sheet3Data,
		}
	]
		
	let buffer = xlsx.build(data);
	fs.writeFile(`./dist/kparts_${key}.xls`, buffer, function (err){
		if (err) throw err;
	})
})