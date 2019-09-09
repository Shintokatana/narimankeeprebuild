<template>
    <div class="new-item-form" v-if="!searchStatus">
        <form v-click-outside="addItem">
            <noteDraw v-if="formVisibility" v-on:saveimage="saveImage"/>
            <label>
                <input v-show="formVisibility" type="text" v-model="newItem.title" placeholder="Note Title">
            </label>
            <label>
                <input @focus="formVisibility = true" type="text" v-model="newItem.description" placeholder="Note Content">
            </label>
            <input v-show="formVisibility" type="submit" value="Add Note" @click.prevent="addItem">
        </form>
    </div>
</template>

<script>
	import noteDraw from './addNoteDrawing'
	import ClickOutside from 'vue-click-outside'

	export default {
		name: "addNote",
		components: {
			noteDraw
		},
		data() {
			return {
				newItem: {
					title: '',
					description: '',
					image: ''
				},
				formVisibility: false
			}
		},
        computed: {
			searchStatus() {
				return this.$store.getters.searchStatus
            }
		},
		methods: {
			addItem() {
				this.formVisibility = false;
				if(this.newItem.description) {
					this.$store.dispatch('addItem', this.newItem)
						.catch(error => {
							console.log(error)
						});
					this.resetItem();
				}
			},
			saveImage(image) {
				this.newItem.image = image
			},
            resetItem() {
				this.newItem = {
					title: '',
					description: '',
					image: ''
                }
            }
		},
		directives: {
			ClickOutside
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
