<template>
    <div>
        {{item.title}}
        {{item.description}}
        <a @click.prevent="deleteItem(item.id)" href="#">Delete</a>
    </div>
</template>

<script>
    export default {
		name: "singleNote",
		props: ['item'],
        methods: {
			deleteItem(id) {
				this.$store.dispatch('deleteItem', id)
            }
        }
	}
</script>

<style scoped>

</style>
