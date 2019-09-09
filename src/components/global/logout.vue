<template>
    <div>
        <a @click.prevent="logout" href="#">Logout</a>
    </div>
</template>

<script>
    import firebase from 'firebase'

	export default {
		name: "logout",
		methods: {
			logout() {
				firebase.auth().signOut()
					.then(() => {
						this.$router.replace('login')
                            .then(() => {
								this.$store.commit('setUID', null)
							})
					})
					.catch((error) => {
						console.log(error)
					})
			}
		}
	}
</script>

<style scoped>

</style>
