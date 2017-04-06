docReady(function(){
	var runErrand;
	var dataPool = new Vuex.Store({
		state: {
			navigation: [],
			tabs: ['Router Boards', 'Filter Rules', 'NAT', 'Mangle', 'Address Lists', 'Layer 7 Protocol'],
			tools: [
				['Add', 'Edit', 'Delete', 'Pull Filter Rules', 'Pull NAT', 'Pull Mangle', 'Pull Address Lists', 'Pull Layer 7 Protocols'], 
				['Add', 'Delete', 'Pull', 'Push'],
				['Add', 'Delete', 'Pull', 'Push'],
				['Add', 'Delete', 'Pull', 'Push'],
				['Add', 'Delete', 'Pull', 'Push'],
				['Add', 'Delete', 'Pull', 'Push'],
			],
			activeTab: 0,
			items: [],
			activePage: 1,
		},
		mutations: {
			setNavigation: function(state, val){
				state.navigation = val;
			},
			setActiveTab: function(state, val){
				state.activeTab = val;
			},
			setItems: function(state, val){
				state.items = val;
			},
			selectAll: function(state, val){
				var txt = '';
				if (val){
					txt = 'This will select all items in other pages as well';
				} else {
					txt = 'This will deselect all items in other pages as well';
				}
				alert(txt);
				console.log(state.items.length);
				state.items.forEach(function(item, idx, arr){
					item.checked = val;
				});
			},
			selectTab: function(state, val){
				state.activeTab = val;
			},
			setActivePage: function(state, val){
				state.activePage = val;
			},
		},
	});
	
	var app = new Vue({
		el: '#app',
		store: dataPool,
		created: function(){
			this.loadUrls();
			this.loadData('boards');
		},
		computed: {
			navigation: {
				get: function(){
					return dataPool.state.items;
				},
				set: function(newValue){
					dataPool.commit('setNavigation', newValue);
				},
			},
			tabs: function(){
				return dataPool.state.tabs;
			},
			activeTab: function(){
				return dataPool.state.activeTab;
			},
			items: {
				get: function(){
					return dataPool.state.items;
				},
				set: function(newValue){
					dataPool.commit('setItems', newValue);
				},
			},
			selectedItems: function(){
				return dataPool.state.items.filter(function(row){
					return row.checked;
				})
			},
			tools: function(){
				return dataPool.state.tools;
			},
		},
		watch: {
			activeTab: function(newValue){
				this.items = [];
				switch (newValue){
					default:
					case 0:
						this.loadData('boards');
						break;
					case 1:
						this.loadData('filters');
						break;
					case 2:
						this.loadData('nat');
						break;
					case 3:
						this.loadData('mangle');
						break;
					case 4:
						this.loadData('address-lists');
						break;
					case 5:
						this.loadData('layer7-protocols');
						break;
				}
			}
		},
		methods: {
			loadUrls: function(){
				this.navigation = navigation;
			},
			loadData: function(type){
				var _self = this;
				if (runErrand){
					runErrand.cancel();
				}
				runErrand = errand({
					url: type,
					json: true,
					method: 'get'
				}).success(function(resp){
					if (resp[type]){
						_self.items = resp[type];
					} else {
						_self.items = [];
					}
				}).error(function(resp){
					console.log(resp);
				})
			},
			toolClick: function(tool){
				switch (this.activeTab){
					default:
					case 0:
						this.selectedItems.forEach(function(item, idx, arr){
							errand({
								url: tool.replace(' ', '/').replace(/\s/g, '-').toLowerCase() + '/' + encodeURIComponent(item.name),
								method: 'get',
								json: true,
							}).success(function(resp){
								if (resp.error){
									alert(resp.error);
								}
							}).error(function(resp){
								alert('Oops, there is an error. Please try again');
							});
						});
						break;
					case 1:
					case 2:
					case 3:
					case 4:
					case 5:
						break;
				}
			},
		}
	})
});