<template>
    <form action="/" class="sign-up sign-form">
        <h3>Sign Up</h3>
        <div>
            <label>
                <input type="email" placeholder="Email" v-model="email">
            </label>
        </div>
        <div>
            <label>
                <input type="password" placeholder="Password" v-model="password">
            </label>
        </div>
        <div>
            <input type="submit" @click.prevent="signUp" value="Sign Up">
        </div>
        <div>
            <label>
                Login after sign up ?
                <input type="checkbox" value="login" v-model="loginStatus">
            </label>
        </div>
        <div class="error-message">
            {{errorMessage}}
        </div>
        <p>You have an account ? You can <router-link to="/login">login in here!</router-link></p>
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
				errorMessage: '',
                loginStatus: false
			}
		},
        methods: {
			signUp: function ()  {
				firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
					.then((user) => {
						console.log(user);
						if (this.loginStatus) {
							firebase.auth().signInWithEmailAndPassword(this.email, this.password)
								.then((user) => {
									this.$store.commit('fireLogin', user);
									this.$store.commit('authStatus');
									this.$store.dispatch('getItems').then(() => {
										this.$router.replace('/home');
									});
								})
								.catch((error) => {
									this.errorMessage = error.message
								})
                        } else {
							this.email = '';
							this.password = '';
							this.errorMessage = '';
                        }
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
