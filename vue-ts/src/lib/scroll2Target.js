/**
 *
 *
 * @param {HTMLElement} target
 *
 */
function scroll2target(target, container = window, type) {
    return new Promise((res, rej) => {
        let TargetRect = target.getBoundingClientRect();
        let TargetTop = TargetRect.top;
        if (type === 'center') {
            TargetTop -= (window.innerHeight - TargetRect.height) / 2;
        }
        let winTop = Math.max(
            container.pageYOffset || 0,
            container.scrollTop,
            document.documentElement.scrollTop,
            document.body.scrollTop
        );
        const sec = 0.5;
        const TOP = winTop + TargetTop;
        let d = TargetTop / (sec * 60);
        let time = new Date().getTime();
		let dur = time;
		const scrollTo = (top)=>{
			if (typeof container.scrollTo === 'function') {
                container.scrollTo(0, top);
            } else {
                container.scrollTop = top;
            }
		}
		function run() {
			const lastTime = new Date().getTime();
			if (Math.abs(winTop-TOP) <= 1) {
				res();
				return;
			}
            if (lastTime - time < 1000 / 60) {
                requestAnimationFrame(run);
                return;
            }
			winTop += d;
			if(Math.abs(winTop-TOP) <= 1){
				winTop = TOP
			}
            scrollTo(winTop)
            requestAnimationFrame(run);
        }
        run();
    });
}
export default scroll2target;
