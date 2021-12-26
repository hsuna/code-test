import * as THREE from '../../libs/three.weapp.js'
import animate from './animate'

function typedArrayToBuffer(array) {
	return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset)
}

Page({
	data: {
    pixelRatio: 1,
    width: 0,
		height: 0,
		
		saveImage: null,
	},
	onReady: function () {
    this.setData({
      pixelRatio: wx.getSystemInfoSync().pixelRatio,
      width: wx.getSystemInfoSync().windowWidth,
      height: wx.getSystemInfoSync().windowHeight,
		})
	},
	onLoad: function () {
		wx.createSelectorQuery()
			.select('#c')
			.node()
			.exec((res) => {
				const canvas = new THREE.global.registerCanvas(res[0].node)
				const {
					camera
				} = animate(canvas, THREE);
				/* wx.startGyroscope({
					success: () => {
						const pos = { x: 0, y: 0, z: 0 };
						wx.onGyroscopeChange((res) => {
							pos.x = pos.x + res.y * 0.1;
							pos.y = pos.y + res.x * 0.1;
							pos.z = pos.z + res.z * 0.1;
							console.log(`pos.x=>${pos.x}, pos.y=>${pos.y}, pos.z=>${pos.z}`)
							camera.lookAt(pos.x, pos.y, pos.z);
						})
					}
				}); */
			})
	},
	onUnload: function () {
		/* wx.stopGyroscope({
			complete: () => { */
				THREE.global.clearCanvas();
		/* 	}
		}); */
	},
	touchStart(e) {
		console.log('canvas', e)
		THREE.global.touchEventHandlerFactory('canvas', 'touchstart')(e)
	},
	touchMove(e) {
		console.log('canvas', e)
		THREE.global.touchEventHandlerFactory('canvas', 'touchmove')(e)
	},
	touchEnd(e) {
		console.log('canvas', e)
		THREE.global.touchEventHandlerFactory('canvas', 'touchend')(e)
	},
	touchCancel(e) {
		// console.log('canvas', e)
	},
	longTap(e) {
		// console.log('canvas', e)
	},
	tap(e) {
		// console.log('canvas', e)
	},

  handleSave() {
    console.log('ssssssssssssssssssssssss')
    wx.saveImageToPhotosAlbum({
      filePath: this.data.saveImage,
      success: (res) => {
        this.setData({
          saveImage: null
        })
      },
      fail(err) {
        console.log('fffffffffffffff', err);
      }
    })
  },

  handleTap() {
    wx.showLoading({
      title: '处理中'
		});
		const canvasToTempFilePath = (id, drawId) => new Promise(success => {
			console.log('cccccccccccccccccccccccccccccc')
			wx.createSelectorQuery()
				.select('#' + id)
				.node()
				.exec((res) => {
					console.log('aaaaaaaaaaaaaaaaaaaaaaaaa')
					const canvas = res[0].node;
					const gl = canvas.getContext("webgl", {
						preserveDrawingBuffer: true
					});
					const { drawingBufferWidth, drawingBufferHeight } = gl;
					const pixels = new Uint8Array(drawingBufferWidth * drawingBufferHeight * 4);
					gl.readPixels(0, 0, drawingBufferWidth, drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
					wx.canvasPutImageData({
						canvasId: drawId,
						width: drawingBufferWidth,
						height: drawingBufferHeight,
						data: new Uint8ClampedArray(typedArrayToBuffer(pixels)),
						success,
						fail(err) {
							console.log(err)
						}
				})
			});
		});
		const takePhoto = () => new Promise(success => {
			const context = wx.createCameraContext();
			context.takePhoto({ success })
		});
		const ctx = wx.createCanvasContext('firstCanvas');
		ctx.save();
		const getImageInfo = (src) => new Promise(success => wx.getImageInfo({ src, success }));
		console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbb')
		getImageInfo('https://radar-static.amwaynet.com.cn/apps/super-radar/admin/v1/image/90613752304616814434966952012.png').then(res => {
			console.log(111111111111111111)
			ctx.drawImage(res.path, 0, 0, res.width * this.data.pixelRatio, res.height * this.data.pixelRatio, 0, 0, this.data.width * this.data.pixelRatio, this.data.height * this.data.pixelRatio);
			ctx.restore(); // 恢复 初始状态
			ctx.save();
			return canvasToTempFilePath('c', 'firstCanvas');
		}).then(res => {
		/* 	return takePhoto()
		}).then(res => {
			return getImageInfo(res.tempImagePath);
		}).then(res => {
			console.log(444444444444444444444444444)
			ctx.drawImage(res.path, 0, 0, res.width * this.data.pixelRatio, res.height * this.data.pixelRatio, 0, 0, this.data.width * this.data.pixelRatio, this.data.height * this.data.pixelRatio);
			ctx.restore(); // 恢复 初始状态
			ctx.save(); */
			ctx.draw(true, setTimeout(() => {
				console.log(5555555555555555555555)
				wx.canvasToTempFilePath({
					x: 0,
					y: 0,
					fileType:'jpg',
					canvasId: "firstCanvas",
					success: (res) => {
						this.setData({
							saveImage: res.tempFilePath
						})
						wx.hideLoading();
						console.log('22222222222222222222')
						console.log(res);
					}                                                          
				});  
			}, 500));
		})
  }
})
