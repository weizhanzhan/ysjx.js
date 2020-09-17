<template>
	<transition name="el-notification-fade">
	<div :class="['my-notification', horizontalClass]" v-show="visible" :style="positionStyle" @mouseenter="clearTimer()" @mouseleave="startTimer()" role="alert">
		<div>
			<div class="clearfix">
				<h2 class="title fl" v-text="title"></h2>
				<div class="clonse-btn fr" v-if="showClose" @click.stop="close">关 闭</div>
			</div>
			<div class="content" v-show="message">
				<slot>
					<p v-html="message"></p>
				</slot>
			</div>
		</div>
	</div>
	</transition>
</template>

<script>
export default {
	data () {
		return {
			visible: false,
			title: '',
			message: '',
			duration: 884000,
			showClose: true,
			onClose: null,
			closed: false,
			verticalOffset: 0,
			timer: null,
			position: 'top-right'
		};
	},
	computed: {
		// position，过滤出left,right，添加right,left Class,左右显示
		horizontalClass () {
			return this.position.indexOf('right') > -1 ? 'right' : 'left';
		},
		// 检测position，-前是top或bottom，返回top或bottom
		verticalProperty () {
			return /^top-/.test(this.position) ? 'top' : 'bottom';
		},
		/**
		 * @name: nan
		 * @msg:
		 * verticalProperty：检测top/bottom
		 * verticalOffset + px
		 * top: 100px
		 */
		positionStyle () {
			return {
				[this.verticalProperty]: `${this.verticalOffset}px`
			};
		}
	},
	watch: {
		/**
		 * @name: nan
		 * @msg: 1、页面移除元素，执行动画完成后，删除元素
		 * 监听closed，true,
		 * visible = false,内置动画开始执行，添加transitionend事件（css执行完后运行）
		 * destroyElement：移除事件，销毁页面，移除元素
		 */
		closed (newVal) {
			console.log(newVal);
			if (newVal) {
				this.visible = false;
				// transitionend事件，在css过度完成后触发
				this.$el.addEventListener('transitionend', this.destroyElement);
			}
		}
	},
	methods: {
		destroyElement () {
			// 移除transitionend事件
			this.$el.removeEventListener('transitionend', this.destroyElement);
			// 销毁页面
			this.$destroy(true);
			// 父节点移除el元素
			this.$el.parentNode.removeChild(this.$el);
		},
		close () {
			this.closed = true;
			// 实例onClose是否是fun
			if (typeof this.onClose === 'function') {
				// onClose，移除js中，实例数组中的某一个
				this.onClose();
			}
		},
		clearTimer () {
			// 鼠标进入清除计时器
			clearTimeout(this.timer);
		},
		startTimer () {
			/**
			* @name: nan
			* @msg: 鼠标移动,创建计时器
			*/
			this.timer = setTimeout(() => {
				this.close();
			}, this.duration);
		}
	},
	mounted () {
		// 挂载完成创建计时器，用于自动关闭
		this.timer = setTimeout(() => {
			this.close();
		}, this.duration);
	}
};
</script>
<style lang="scss" scoped>
.my-notification {
    width: 290px;
    padding: 13px 16px;
    border-radius: 8px;
    box-sizing: border-box;
    position: fixed;
    background-color: #000;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    transition: opacity .3s,left .3s,right .3s,top .4s,bottom .3s,-webkit-transform .3s;
    transition: opacity .3s,transform .3s,left .3s,right .3s,top .4s,bottom .3s;
    transition: opacity .3s,transform .3s,left .3s,right .3s,top .4s,bottom .3s,-webkit-transform .3s;
	overflow: hidden;
	color: #fff;
}
.my-notification {
	&.right {
		right: 70px;
	}
	.title {
		font-family: PingFangSC-Semibold;
		font-size: 14px;
		color: #FFFFFF;
		line-height: 20px;
	}
	.content {
		margin-top: 10px;
		font-family: PingFangSC-Medium;
		font-size: 13px;
		color: #FFFFFF;
		p {
			line-height: 22px;
		}
	}
	.clonse-btn {
		background: #25B5A9;
		border-radius: 2px;
		padding: 3px 5px;
		color: #FFF;
		cursor: pointer;
		font-size: 12px;
	}
}
</style>
