docReady(function(){
	var runErrand;
	var dataPool = new Vuex.Store({
		state: {
			navigation: [],
			tabs: ['Router Boards', 'Filter Rules', 'NAT', 'Mangle', 'Address Lists', 'Layer 7 Protocol'],
			tools: [
				['Add', 'Edit', 'Delete', 'Pull Filter Rules', 'Pull NAT', 'Pull Mangle', 'Pull Address Lists', 'Pull Layer 7 Protocols'], 
				['Add', 'Edit', 'Delete', 'Pull', 'Push'],
				['Add', 'Edit', 'Delete', 'Pull', 'Push'],
				['Add', 'Edit', 'Delete', 'Pull', 'Push'],
				['Add', 'Edit', 'Delete', 'Pull', 'Push'],
				['Add', 'Edit', 'Delete', 'Pull', 'Push'],
			],
			activeTab: 0,
			items: [],
			activePage: 1,
			loading: false,
			editing: false,
			showForm: false,
			board: {
				name: '',
				ip: '',
				user: '',
				password: '',
			},
			filter: {
				chain: '',
				action: '',
				comment: '',
				rules: [],
			},
			nat: {
				chain: '',
				action: '',
				comment: '',
				rules: [],
			},
			mangle: {
				chain: '',
				action: '',
				comment: '',
				rules: [],
			},
			addressList: {
				list: '',
				address: '',
				timeout: '',
				comment: '',
			},
			layer7Protocol: {
				name: '',
				regexp: '',
				comment: '',
			},
			chooseBoards: false,
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
				if (Math.ceil(state.items.length / 20) > 1){
					var txt = '';
					if (val){
						txt = 'This will select all items in other pages as well';
					} else {
						txt = 'This will deselect all items in other pages as well';
					}
					alert(txt);
				}
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
			setLoading: function(state, val){
				state.loading = val;
			},
			setEditing: function(state, val){
				state.editing = val;
			},
			setShowForm: function(state, val){
				state.showForm = val;
			},
			setBoard: function(state, val){
				state.board = val;
			},
			setFilter: function(state, val){
				state.filter = val;
			},
			setNat: function(state, val){
				state.nat = val;
			},
			setMangle: function(state, val){
				state.mangle = val;
			},
			setAddressList: function(state, val){
				state.addressList = val;
			},
			setLayer7Protocol: function(state, val){
				state.layer7Protocol = val;
			},
			setChooseBoards: function(state, val){
				state.chooseBoards = val;
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
		data: {
			boardAction: '',
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
			tabName: function(){
				switch(this.activeTab){
					case 0:
						return 'boards';
					case 1:
						return 'filters';
					case 2:
						return 'nat';
					case 3:
						return 'mangle';
					case 4:
						return 'address-lists';
					case 5:
						return 'layer-7-protocols';
				}
				return null;
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
			activePage: {
				get: function(){
					return dataPool.state.activePage;
				},
				set: function(newValue){
					dataPool.commit('setActivePage', newValue);
				}
			},
			tools: function(){
				return dataPool.state.tools;
			},
			editing: {
				get: function(){
					return dataPool.state.editing;
				},
				set: function(newValue){
					dataPool.commit('setEditing', newValue);
				},
			},
			showForm: {
				get: function(){
					return dataPool.state.showForm;
				},
				set: function(newValue){
					dataPool.commit('setShowForm', newValue);
				},
			},
			board: {
				get: function(){
					return dataPool.state.board;
				},
				set: function(newValue){
					dataPool.commit('setBoard', newValue);
				},
			},
			filter: {
				get: function(){
					return dataPool.state.filter;
				},
				set: function(newValue){
					dataPool.commit('setFilter', newValue);
				},
			},
			nat: {
				get: function(){
					return dataPool.state.nat;
				},
				set: function(newValue){
					dataPool.commit('setNat', newValue);
				},
			},
			mangle: {
				get: function(){
					return dataPool.state.mangle;
				},
				set: function(newValue){
					dataPool.commit('setMangle', newValue);
				},
			},
			addressList: {
				get: function(){
					return dataPool.state.addressList;
				},
				set: function(newValue){
					dataPool.commit('setAddressList', newValue);
				},
			},
			layer7Protocol: {
				get: function(){
					return dataPool.state.layer7Protocol;
				},
				set: function(newValue){
					dataPool.commit('setLayer7Protocol', newValue);
				},
			},
			chooseBoards: {
				get: function(){
					return dataPool.state.chooseBoards;
				},
				set: function(newValue){
					dataPool.commit('setChooseBoards', newValue);
				},
			},
		},
		watch: {
			activeTab: function(newValue){
				this.items = [];
				this.activePage = 1;
				this.editing = false;
				this.showForm = false;
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
				dataPool.commit('setLoading', true);
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
					dataPool.commit('setLoading', false);
				}).error(function(resp){
					console.log(resp);
					dataPool.commit('setLoading', false);
				})
			},
			toolClick: function(tool){
				switch (this.activeTab){
					default:
					case 0:
						if (tool.toLowerCase().indexOf('pull') != -1){
							var _self = this;
							this.selectedItems.forEach(function(item, idx, arr){
								errand({
									url: tool.replace(' ', '/').replace(/\s/g, '-').toLowerCase() + '/' + encodeURIComponent(item.name),
									method: 'get',
									json: true,
								}).success(function(resp){
									if (resp.error){
										alert(resp.error);
									} else {
										alert('Pull finnished');
										dataPool.commit('selectAll', false);
									}
								}).error(function(resp){
									alert('Oops, there is an error. Please try again');
								});
							});
							return;
						}
						switch(tool.toLowerCase()){
							case 'add':
								this.board = {
									name: '',
									ip: '',
									user: '',
									password: '',
								};
								this.editing = false;
								this.showForm = true;
								break;
							case 'edit':
								if (this.selectedItems.length > 1){
									alert('You can only edit 1 item at a time');
								} else if (this.selectedItems.length == 0){
									alert('Please select the item you want to edit');
								} else {
									this.board = this.selectedItems[0];
									this.editing = true;
									this.showForm = true;
								}
								break;
							case 'delete':
								this.delete(this.tabName);
								break;
						}
						break;
					case 1:
					case 2:
					case 3:
					case 4:
					case 5:
						switch(tool.toLowerCase()){
							case 'add':
								this.showForm = true;
								break;
							case 'edit':
								if (this.selectedItems.length > 1){
									alert('You can only edit 1 item at a time');
								} else if (this.selectedItems.length == 0){
									alert('Please select the item you want to edit');
								} else {
									this.board = this.selectedItems[0];
									this.editing = true;
									this.showForm = true;
								}
								break;
							case 'delete':
								this.boardAction = 'delete';
								this.chooseBoards = true;
								break;
							case 'pull':
								this.boardAction = 'pull';
								this.chooseBoards = true;
								break;
							case 'push':
								if (this.selectedItems.length == 0){
									alert('Please select the items you want to push');
								} else {
									this.boardAction = 'push';
									this.chooseBoards = true;
								}
								break;
						}
						break;
				}
			},
			save: function(){
				var type = this.tabName, _self = this;
				if (type.substr(-1) == 's'){
					type = type.substr(0, type.length - 1);
				}
				if (this.editing){
					errand({
						url: this.tabName + '/update',
						json: true,
						method: 'post',
						data: dataPool.state[type],
					}).success(function(resp){
						
					}).error(function(resp){
						
					});
				} else {
					errand({
						url: this.tabName + '/save',
						json: true,
						method: 'post',
						data: dataPool.state[type],
					}).success(function(resp){
						if (resp[type]){
							_self.items.push(resp[type]);
							_self.showForm = false;
						} else {
							
						}
					}).error(function(resp){
						
					});
				}
			},
			delete: function(type, boards){
				if (this.selectedItems.length == 0){
					alert('Please select the item you want to delete');
				} else {
					var txt = 'Are you sure you want to delete the selected items?';
					if (type != 'boards'){
						txt = 'Are you sure you want to delete the selected items from the Router Boards?';
					}
					if (confirm(txt)){
						var toDelete = [], _self = this;
						this.selectedItems.forEach(function(item, idx, arr){
							toDelete.push(item.id);
						});
						if (isVarTypeOf(boards, Array)){
							boards.forEach(function(brd, idx, arr){
								errand({
									url: type + '/delete/' + brd.name,
									json: true,
									data: {del: toDelete},
								}).success(function(resp){
									if (resp.success){
										toDelete.forEach(function(itm, idx, arr){
											_self.items.splice(_self.items.indexOf(itm), 1);
										});
									} else {
										alert('Something happened, please try again');
									}
								}).error(function(resp){
									console.log(resp);
								});
							});
						} else {
							errand({
								url: type + '/delete',
								json: true,
								data: {del: toDelete},
							}).success(function(resp){
								if (resp.success){
									toDelete.forEach(function(itm, idx, arr){
										_self.items.splice(_self.items.indexOf(itm), 1);
									});
								} else {
									alert('Something happened, please try again');
								}
							}).error(function(resp){
								console.log(resp);
							});
						}
					}
				}
			},
			process: function(boards){
				switch(this.boardAction){
					case 'pull':
						var _self = this, tab = this.tabName;
						if (tab == 'filters'){
							tab = 'filter-rules';
						}
						boards.forEach(function(brd, idx, arr){
							errand({
								url: 'pull/' + tab + '/' + brd.name,
								json: true,
								method: 'post',
								data: {push: toPush},
							}).success(function(resp){
								console.log(resp);
							}).error(function(resp){
								console.log(resp);
							})
						})
						break;
					case 'push':
						var _self = this, toPush = [];
						this.selectedItems.forEach(function(itm, idx, arr){
							toPush.push(itm.id);
						})
						boards.forEach(function(brd, idx, arr){
							errand({
								url: 'push/' + _self.tabName + '/' + brd.name,
								json: true,
								method: 'post',
								data: {push: toPush},
							}).success(function(resp){
								console.log(resp);
							}).error(function(resp){
								console.log(resp);
							})
						})
						break;
					case 'delete':
						this.delete(this.tabName, boards);
						break;
				}
				this.chooseBoards = false;
			}
		}
	})
});