<template>
    <div class="new-item-form">
        <form action="/">
            <div>
                <input type="text" ref="title" placeholder="Note Title">
            </div>
            <div>
                <input type="text" ref="description" placeholder="Note Content">
            </div>
            <div>
                <input type="submit" value="Add Note" @click.prevent="addItem">
            </div>
        </form>
    </div>
</template>

<script>
	export default {
		name: "addNote",
        methods: {
			addItem() {
				let item = {
					title: this.$refs.title.value,
					description: this.$refs.description.value,
                    order: 0
				};
				this.$store.dispatch('addItem', item)
					.catch(error => {
						console.log(error)
					})
			}
        }
	}
</script>

<style scoped lang="scss">

    .new-item-form {
        max-width: 600px;
        margin: 0 auto;
        padding: 0 15px;

        input {
            background-color: transparent;
            border: 1px solid #eee;
            padding: 15px;
            color: white;
            border-radius: 5px;

            &[type='submit'] {
                cursor: pointer;
            }
        }
    }

</style>
