let importObj = {
	env: {
		memoryBase: 0,
		tableBase: 0,
		memory: new WebAssembly.Memory({initial:0,maximum:0}),
		table: new WebAssembly.Table({initial:2,maximum:2,element:'anyfunc'}),
		abort: ()=>{}
	}
}

// 封装的异步loader
const load = path => {
	return fetch(path)
		// 获取二进制buffer
		.then(res => res.arrayBuffer())
		// 编译&实例化，导入js对象
		.then(bytes => WebAssembly.instantiate(bytes, importObj))
		// 返回实例
		.then(res => res.instance)
}

load('../out/main.wasm').then(instance => {
  document.getElementById("container").innerText = instance.exports.main();
}).catch(console.error);
