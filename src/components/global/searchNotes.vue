<template>
    <div class="search">
        <label>
            <input type="text" v-model="search" @input="searchItems" placeholder="Search items">
        </label>
    </div>
</template>

<script>
	export default {
		name: "searchNotes",
		data() {
			return {
				search: ''
			}
		},
		methods: {
			searchItems() {
				if(this.search) {
					let items = this.$store.getters.getItems,
						searchText = this.search.toLowerCase(),
						searchedItems = items.filter(item => item.description.toLowerCase().includes(searchText));
					this.$store.commit('setItems', searchedItems);
					this.$store.commit('searchStatus', true)
				} else {
					this.$store.dispatch('getItems')
                        .then(() => {
							this.$store.commit('searchStatus', false)
                        })
						.catch(error => console.log(error))
				}
			}
		}
	}
</script>

<style scoped lang="scss">

    .search {
        margin: 10px 0;
        text-align: center;
        input {
            background-color: transparent;
            border: 1px solid #eee;
            padding: 15px;
            color: white;
            border-radius: 5px;
        }
    }

</style>
