<template>
    <form action="/" class="sign-up sign-form">
        <h3>Sign Up</h3>
        <div>
            <input type="text" placeholder="Email" v-model="email">
        </div>
        <div>
            <input type="text" placeholder="Password" v-model="password">
        </div>
        <div>
            <input type="submit" @click.prevent="signUp" value="Sign Up">
        </div>
        <div class="error-message">
            {{errorMessage}}
        </div>
        <p>You have an account ? You can <router-link to="/login">login in!</router-link></p>
    </form>
</template>

<script>
    import firebase from 'firebase'

	export default {
		name: "SignUp",
		data() {
			return {
				email: '',
                password: '',
				errorMessage: ''
			}
		},
        methods: {
			signUp: function ()  {
				firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
					.then((user) => {
						console.log(user);
					})
					.catch((error) => {
						this.errorMessage = error.message
					})
			},
        }
	}
</script>

<style scoped lang="scss">

</style>
