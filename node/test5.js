const xlsx = require('node-xlsx');
const fs = require('fs');

let sheetData = [['Part', 'Des', 'Qty']]
let sheet2Data = []
let sheet3Data = [['Seal kit', 'Des', 'Title']]

const files = fs.readdirSync('./kparts')
files.forEach(function (filepath, i) {
	let data = fs.readFileSync(`./kparts/${filepath}`, "utf-8")
	let json = JSON.parse(data);
	
	sheet2Data[i*50] = ['Seal kit', 'Part', 'Des', 'Qty', 'Title']
	json.data.forEach((item, j) => {
		sheetData.push([item['Part #'], item['Description'], item['Qty']])
		if(0==j)
			sheet2Data[i*50+j+1] = [json['sealkits'], item['Part #'], item['Description'], item['Qty'], json['title']]
		else
			sheet2Data[i*50+j+1] = ['', item['Part #'], item['Description'], item['Qty'], '']
	})
	for(let k=sheet2Data.length, len=(i+1)*50; k<len; k++){
		sheet2Data[k] = []
	}
	sheet3Data.push([json['sealkits'], json.data.map(item => `${item['Part #']}, ${item['Description']}, ${item['Qty']}`).join('<br/>'), json['title']])
})

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
fs.writeFile('./kparts.xls', buffer, function (err){
    if (err) throw err;
})