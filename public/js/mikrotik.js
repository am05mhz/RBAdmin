docReady(function(){
	var app = new Vue({
		el: '#app',
		data: {
			navigation: [],
			tabs: ['Router Boards', 'Address List Names', 'MAC Addresses'],
			activeTab: 0,
			items: [],
		},
		created: function(){
			this.loadUrls();
			this.loadBoards();
			console.log(this.navigation);
		},
		methods: {
			loadUrls: function(){
				this.navigation = navigation;
			},
			loadBoards: function(){
				var _self = this;
				errand({
					url: 'boards',
					json: true,
					method: 'get'
				}).success(function(resp){
					if (resp.boards){
						_self.$set(_self, 'items', resp.boards);
					} else {
						_self.$set(_self, 'items', []);
					}
				}).error(function(resp){
					
				})
			},
			loadAddressListNames: function(){
				var _self = this;
				errand({
					url: 'address-list-names',
					json: true,
					method: 'get'
				}).success(function(resp){
					if (resp.names){
						_self.$set(_self, 'items', resp.names);
					} else {
						_self.$set(_self, 'items', []);
					}
				}).error(function(resp){
					
				})
			},
			loadMacAddresses: function(){
				var _self = this;
				errand({
					url: 'mac-addresses',
					json: true,
					method: 'get'
				}).success(function(resp){
					if (resp.macs){
						_self.$set(_self, 'items', resp.macs);
					} else {
						_self.$set(_self, 'items', []);
					}
				}).error(function(resp){
					
				})
			},
			tabClick: function(tab){
				this.items = [];
				this.activeTab = this.tabs.indexOf(tab);
				switch (this.activeTab){
					default:
					case 0:
						this.loadBoards();
						break;
					case 1:
						this.loadAddressListNames();
						break;
					case 2:
						this.loadMacAddresses();
						break;
				}
			}
		}
	})
});