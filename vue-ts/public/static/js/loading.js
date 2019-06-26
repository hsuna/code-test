(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(c){window.setTimeout(c, 1000/60)};
    var mainfest = {"dialog":8,"formal":13,"home":9,"prehot":26,"winners":7};
    var performance = window.performance || window.msPerformance || window.webkitPerformance || { timing: { navigationStart: new Date().getTime() } };
    var step = (window.loadingStep = 0);
    var loading = document.getElementById("loading");
    var loadingBar = document.getElementById("loadingBar");
    var loadingMsg = document.getElementById("loadingMsg");
    var emptymask = document.getElementById("emptymask");
    var total= getTotal()
    
    // var loadingRole = document.getElementById("loadingRole");
    loading.addEventListener("touchstart", function (e) {
        e.preventDefault();
    });

    function run() {
        if (!loading) {
            return;
        }
        if (window.isStopLoading) {
            requestAnimationFrame(run);
            return;
        }
        if (emptymask) {
            document.body.removeChild(emptymask);
            emptymask = null;
        }
        window.scrollTo(0, 0);
        
        if (step === total) {
            loading.className += " loading_willLeave";
            console.log("time:", new Date().getTime() - performance.timing.navigationStart);
            return;
        }

        var rate = Math.max((window.loadingStep-step)/10, 0)
        if(step < total * 0.66){
            step += Math.max(0.2, rate)
        } else if(step < total * 0.92){
            step += Math.max(0.02, rate)
        } else {
            if(0 == rate){
                requestAnimationFrame(run);
                return
            }
            step += rate
        }

        if(step > total || (step > total * 0.95 && window.loadingStep >= total)) {
            window.loadingStep = step = total
        }

        var n = step / total;
        if (n == 1) {
            document.querySelector('.loading-bar').classList.remove('addBefore');
        }
        
        var startPosition = -100;
        loadingBar.style.left = startPosition + n * 100 + "%";
        loadingMsg.innerText = (n * 100).toFixed(0) + "%";
        loadingMsg.style.transform = "translate3d(" + n * 3.89 + "rem,0,0)";
        loadingMsg.style.webkitTransform = "translate3d(" + n * 3.89 + "rem,0,0)";
        requestAnimationFrame(run);
    }

    function getTotal(){
        var assetsMap = {
            "index": ["dialog", "formal", "home"],
            "prehot": ["prehot"],
            "winners": ["winners"]
        }
        var len = 1, list = assetsMap[loading.getAttribute('data-mainfest')] || [];
        for(var i=0; i<list.length; i++){
            len += mainfest[list[i]]
        }
        return len;
    }

    function hideLoading() {
        window.loadingStep = undefined;
        loading.parentNode.removeChild(loading);
        loading = null;
        loadingBar = null;
        loadingMsg = null;
        var loadingHide = new CustomEvent("loadinghide");
        window.dispatchEvent(loadingHide);
    }

    function loadingOnload(){
        var img = new Image();
        img.onload = function(){ document.querySelector('.loading-bar').classList.add('addBefore');},
        img.src="./static/img/loading-progress.png";
    }
    
    window.loadingStep = 1;
    run();
    loadingOnload();
   

    loading.addEventListener("transitionend", function (e) {
        if (/opacity/.test(e.propertyName)) {
            hideLoading();
        }
    });
})();
