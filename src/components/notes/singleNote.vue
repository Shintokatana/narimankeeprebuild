<template>
    <div class="single-note col-xl-3 col-lg-3 col-md-6 col-sm-12">
        <div class="note-body">
            {{item.title}}
            {{item.description}}
            <a @click.prevent="deleteItem(item.id)" class="event-icon close-icon" href="#"><icon icon="close"/></a>
        </div>
    </div>
</template>

<script>
    import icon from '@/components/global/icon'

    export default {
		name: "singleNote",
		props: ['item'],
        components: {
			icon
        },
        methods: {
			deleteItem(id) {
				this.$store.dispatch('deleteItem', id)
					.catch(error => {
						console.log(error)
					})
			}
		}
	}
</script>

<style scoped lang="scss">

    .note-body {
        position: relative;
        border: 1px solid #eeeeee;
        border-radius: 10px 0 10px 0;
        padding: 15px;
        transition: .4s ease all;

        &:hover {
            background-color: rgba(238, 238, 238, 0.05);
            .close-icon {
                transition: .4s ease all;
                opacity: 1;
                visibility: visible;
            }
        }

        .close-icon {
            opacity: 0;
            background-color: #191919;
            visibility: hidden;
            color: #191919;
            position: absolute;
            top: -8px;
            right: -8px;
        }

    }

</style>
