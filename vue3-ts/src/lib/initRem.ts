let $tips:string = `<div id="tips" style="display: none; z-index: 10000; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.9);">
    <div class="tips-cont" style="position: absolute; top: 50%; left: 50%; width: 100%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%);">
        <i style="display: block; margin: 0 auto; width: 1.65rem; height: 1.74rem; background: url(//game.gtimg.cn/images/game/cp/a20170601fbh/i_tips.png) no-repeat; background-size: 1.65rem 1.74rem;"></i>
        <p style="margin-top: .2rem; font-size: .3rem; text-align: center; color: #fff;">请保持竖屏</p>
    </div>
</div>`;

const docEl:HTMLElement = document.documentElement;
const container:HTMLDivElement = document.createElement("div");
container.addEventListener("touchmove", function(e) {
  e.preventDefault();
  return false;
});
container.innerHTML = $tips;
document.body.appendChild(container);

const tips:HTMLElement = <HTMLElement>document.getElementById("tips");
tips.addEventListener("touchstart", function(e) { e.preventDefault(); e.stopPropagation(); },  { passive: true });

window.addEventListener("resize", resize, false);
document.addEventListener("DOMContentLoaded", resize, false);

function setFontSize(k:number) {

  docEl.style.fontSize = (((k / 750) * 100) / 16) * 100 + "%";
  
  var div:HTMLElement = document.createElement('div');
  div.style.width = '1rem';
  div.style.height = '0';
  document.body.appendChild(div);
  var ideal:number = 100 * k / 750;
  var rmd:number = (div.clientWidth / ideal);
  if(rmd > 1.01 || rmd < 0.99){
      docEl.style.fontSize = (k / 750) / rmd * 100 + 'px';
  }
  document.body.removeChild(div);
}

function resize(){
  setFontSize(Math.min(docEl.clientWidth, docEl.clientHeight));
  tips.style.display = docEl.clientWidth > docEl.clientHeight ? "block" : "none";
}