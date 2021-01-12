const xlsx = require('node-xlsx');
const fs = require('fs');

const kpart_tree_path = 'D:/Desktop/KPartData/json/tree'
const kpart_page_path = 'D:/Desktop/KPartData/json/page'


const getSheet = () => {
	return [['MODEL', 'DESCRIPTION']]
}

const tree_kw = ['EXCAVATORS', 'EXCAVATORS KMG', 'WHEEL LOADERS']

const reg_tree_kw = new RegExp('('+tree_kw.join('|')+')', 'i')

const getTreeData = (key, book='') => {
	try{
		let data = fs.readFileSync(`${kpart_tree_path}/${book}/${key}.json`, "utf-8")
		console.log('getTreeData:', book, key)
		return JSON.parse(data);
	}catch(e){}
	return null
}
const cacheObj = {}
const pageDataList = []
const analyTreeData = (key, book) => {
	if(cacheObj[book]){
		if(cacheObj[book][key]){
			console.log('analyTreeData:', book, key)
			return
		}else{
			cacheObj[book][key] = true
		}
	}else{
		cacheObj[book] = {}
		cacheObj[book][key] = true
	}
	const list = getTreeData(key, book||'') || []
	list.forEach(obj => {
		if('1' == obj['leaf']){
			pageDataList.push(obj)
		}else{
			analyTreeData(obj['key'], obj['book'])
		}
	})
}

const list = getTreeData(0)
list.forEach(obj => {
	if(reg_tree_kw.test(obj['text'] || '')){
		analyTreeData(obj['key'])
	}
})

const sheetDatas = {}
pageDataList.forEach(obj => {
	try{
		let data = fs.readFileSync(`${kpart_page_path}/${obj['book']}/${obj['key']}.json`, "utf-8")
		const json = JSON.parse(data);
		
		console.log('pageDataList:', obj['book'], obj['key'])
		if(!sheetDatas[key]){
			sheetDatas[key] = getSheet()
		}
		const sheetData = sheetDatas[key]
		const firstItem = json.part[0] || {}
		sheetData.push([
			[json.book['BookName'], json.data['PageTitle'], firstItem['number']||'', firstItem['name']||''].join(' '),
			json.part.filter(item => item['number']).map(item => `${item['number']}, ${item['name']}, ${item['quantity']}`).join('<br/>').replace(/<img[^>]*>/g, ''), 
		])
	}catch(e){
	}
})

Object.keys(sheetDatas).forEach(key => {
	const sheetData = sheetDatas[key]
	let data = [
		{
			name : 'sheet',
			data : sheetData,
		}
	]
		
	let buffer = xlsx.build(data);
	fs.writeFile(`./dist/20191215/kparts_${key}.xls`, buffer, function (err){
		if (err) throw err;
	})
})