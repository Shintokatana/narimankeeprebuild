<template>
    <div>
        <addNote/>
        <div>
            <singleNote v-for="item in notes" :item="item" :key="item.id"/>
        </div>
    </div>
</template>

<script>
    import singleNote from "@/components/notes/singleNote";
    import addNote from '@/components/notes/addNote/addNote'

	export default {
		name: "notes",
        components: {
			singleNote,
			addNote
		},
        computed: {
			notes() {
				return this.$store.getters.getItems
            }
        },
		created() {
			if (!this.$store.getters.authStatus) {
				this.$store.dispatch('getItems')
			}
        }
	}
</script>

<style scoped>

</style>
