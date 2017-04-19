Vue.component('login-form', {
	props: {
		url: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			default: 'Login',
		},
		method: {
			type: String,
			default: 'post',
			validator: function(v){
				return ['get', 'post'].indexOf(v.toLowerCase()) != -1;
			},
		},
		json: {
			type: Boolean,
			default: true,
		},
	},
	data: function(){
		return {
			username: '',
			password: '',
		}
	},
	template: '<form :action="url" :method="method" @submit.prevent="formSubmit">' +
				'<header>{{ title }}</header>' +
				'<p><label for="login-username">Username</label><input id="login-username" type="text" required autofocus v-model="username"/></p>' +
				'<p><label for="login-password">Password</label><input id="login-password" type="password" required v-model="password"/></p>' +
				'<button type="submit">Login</button>' +
				'</form>',
	methods: {
		formSubmit: function(){
			var _self = this;
			errand({
					url: this.url,
					method: this.method,
					json: this.json,
					data: {
						username: this.username, 
						password: this.password
					}
				}).success(function(resp){
					console.log(resp);
					if (resp.success){
						window.location = resp.redirectTo;
					} else {
						alert(resp.error);
					}
				}).error(function(resp){
					console.log(resp);
				});
		},
	},
});

docReady(function(){
	var app = new Vue({
		el: '#login'
	})
});