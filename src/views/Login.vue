<template>
    <form action="/" class="login sign-form">
        <h3>Login</h3>
        <div>
            <input type="text" placeholder="Email" v-model="email">
        </div>
        <div>
            <input type="password" placeholder="Password" v-model="password">
        </div>
        <div>
            <input type="submit" @click.prevent="login" value="login">
        </div>
        <div class="error-message">
            {{errorMessage}}
        </div>
        <p>You don't have an account ? You can <router-link to="/sign-up">create here!</router-link></p>
    </form>
</template>

<script>
    import firebase from 'firebase'

	export default {
		name: "Login",
		data() {
			return {
				email: '',
				password: '',
				errorMessage: ''
			}
		},
		methods: {
			login() {
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
			}
		}
	}
</script>

<style lang="scss">

    .sign-form {
        margin: 0 auto;
        max-width: 550px;
        padding: 0 15px;
        text-align: center;

        input {
            background-color: transparent;
            border: 1px solid #eee;
            padding: 15px;
            color: white;
            border-radius: 5px;
            margin-bottom: 10px;
            &[type='submit'] {
                cursor: pointer;
            }
        }

        .error-message {
            color: red;
        }
    }
</style>
