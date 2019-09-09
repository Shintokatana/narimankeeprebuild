<template>
    <div>
        <div class="canvas-wrapper">
            <canvas ref="canvas" id='drawing-pad' width='620' height='300'></canvas>
        </div>
    </div>
</template>

<script>
	export default {
		name: "addNoteDrawing",
		data() {
			return {
				canvas: null,
				context: null,
				isDrawing: false,
				startX: 0,
				startY: 0,
				points: [],
				drawStatus: false,
				lineWidth: 1,
				color: '#42b883',
			}
		},
		mounted() {
			let vm = this;
			vm.canvas = vm.$refs.canvas;
			vm.context = vm.canvas.getContext("2d");
			vm.canvas.addEventListener('mousedown', vm.mousedown);
			vm.canvas.addEventListener('mousemove', vm.mousemove);
			document.addEventListener('mouseup', vm.mouseup);
		},
		methods: {
			mousedown(e) {
				let vm = this,
					rect = vm.canvas.getBoundingClientRect(),
					x = e.clientX - rect.left,
					y = e.clientY - rect.top;
				vm.isDrawing = true;
				vm.startX = x;
				vm.startY = y;
				vm.points.push({
					x: x,
					y: y
				});
			},
			mousemove(e) {
				let vm = this,
					rect = vm.canvas.getBoundingClientRect(),
					x = e.clientX - rect.left,
					y = e.clientY - rect.top;
				if (vm.isDrawing) {
					vm.context.beginPath();
					vm.context.moveTo(vm.startX, vm.startY);
					vm.context.lineTo(x, y);
					vm.context.lineWidth = this.lineWidth;
					vm.context.lineCap = 'round';
					vm.context.strokeStyle = this.color;
					vm.context.stroke();
					vm.startX = x;
					vm.startY = y;
					vm.points.push({
						x: x,
						y: y
					});
				}

			},
			mouseup() {
				let vm = this;
				vm.isDrawing = false;
				this.$emit('saveimage', this.canvas.toDataURL());
			},
		},
	}
</script>

<style scoped lang="scss">

    .canvas-wrapper {
        background-color: white;
    }

</style>
