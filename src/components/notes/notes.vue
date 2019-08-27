<template>
    <div>
        <addNote/>
        <draggable class="notes-wrapper container" v-model="notes">
            <transition-group class="row">
                <singleNote v-for="item in notes" :item="item" :key="item.id"/>
            </transition-group>
        </draggable>
    </div>
</template>

<script>
	import singleNote from "@/components/notes/singleNote";
	import addNote from '@/components/notes/addNote/addNote'
    import draggable from 'vuedraggable'

	export default {
		name: "notes",
		data() {
			return {
				drag: false
			}
		},
        components: {
			singleNote,
			addNote,
			draggable
		},
        computed: {
			notes: {
				get() {
					// let self = this;
					// return self.$store.getters.getItems.sort((e, f) => {
					// 	return e.order - f.order
					// })
					return this.$store.getters.getItems
				},
				set(array) {
					console.log();
					console.log(array);
					this.$store.dispatch('updateItems', array)
						.catch((error) => {
							console.log(error)
						})
				}
			}
		},
		created() {
			if (!this.$store.getters.authStatus) {
				this.$store.dispatch('getItems')
					.catch(error => {
						console.log(error)
					})
			}
        }
	}
</script>

<style scoped lang="scss">

    .notes-wrapper {
        margin-top: 25px;
    }

</style>
