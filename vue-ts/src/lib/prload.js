import mainfest from "./dirlist";

const assetsMap = {
    "index": ["dialog", "formal", "home"],
    "prehot": ["prehot"],
    "winners": ["winners"]
}

///////// 加载资源 //////////
const loadImage = url => { 
	return new Promise(resolve => {
		let img = new Image();
		img.onload = resolve;
		img.onerror = resolve;
        img.src = url;
        setTimeout(resolve, 1000)
	});
}

export default async name => {
    const list = assetsMap[name].reduce((p, c) => [...p, ...mainfest[c]], [])

    for (let i = 0, len = list.length; i < len; i++) {
        await loadImage(list[i])
        window.loadingStep++
        console.log(list[i], window.loadingStep)
    }
}