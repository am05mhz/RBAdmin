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
			keyword: '',
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
				rules: {},
				ruleName: '',
				ruleValue: '',
				fields: [
					'address-list',
					'address-list-timeout',
					'connection-bytes',
					'connection-limit',
					'connection-mark',
					'connection-nat-state',
					'connection-rate',
					'connection-state',
					'connection-type',
					'content',
					'disabled',
					'dscp',
					'dst-address',
					'dst-address-list',
					'dst-address-type',
					'dst-limit',
					'dst-port',
					'fragment',
					'hotspot',
					'icmp-options',
					'in-bridge-port',
					'in-bridge-port-list',
					'in-interface',
					'in-interface-list',
					'ingress-priority',
					'ipsec-policy',
					'ipv4-options',
					'jump-target',
					'layer7-protocol',
					'limit',
					'log',
					'log-prefix',
					'out-bridge-port',
					'out-bridge-port-list',
					'p2p',
					'packet-mark',
					'packet-size',
					'per-connection-classifier',
					'port',
					'priority',
					'protocol',
					'psd',
					'random',
					'reject-with',
					'routing-mark',
					'routing-table',
					'src-address',
					'src-address-list',
					'src-address-type',
					'src-mac-address',
					'src-port',
					'tcp-flags',
					'tcp-mss',
					'time',
					'ttl',
				],
			},
			nat: {
				chain: '',
				action: '',
				comment: '',
				rules: {},
				ruleName: '',
				ruleValue: '',
				fields: [
					'address-list',
					'address-list-timeout',
					'connection-bytes',
					'connection-limit',
					'connection-mark',
					'connection-nat-state',
					'connection-rate',
					'connection-state',
					'connection-type',
					'content',
					'disabled',
					'dscp',
					'dst-address',
					'dst-address-list',
					'dst-address-type',
					'dst-limit',
					'dst-port',
					'fragment',
					'hotspot',
					'icmp-options',
					'in-bridge-port',
					'in-bridge-port-list',
					'in-interface',
					'in-interface-list',
					'ingress-priority',
					'ipsec-policy',
					'ipv4-options',
					'jump-target',
					'layer7-protocol',
					'limit',
					'log',
					'log-prefix',
					'out-bridge-port',
					'out-bridge-port-list',
					'out-interface',
					'out-interface-list',
					'packet-mark',
					'packet-size',
					'per-connection-classifier',
					'port',
					'priority',
					'protocol',
					'psd',
					'random',
					'routing-mark',
					'routing-table',
					'same-not-by-dst',
					'src-address',
					'src-address-list',
					'src-address-type',
					'src-mac-address',
					'src-port',
					'tcp-mss',
					'time',
					'to-addresses',
					'to-ports',
					'ttl',
				],
			},
			mangle: {
				chain: '',
				action: '',
				comment: '',
				rules: {},
				ruleName: '',
				ruleValue: '',
				fields: [
					'address-list',
					'address-list-timeout',
					'connection-bytes',
					'connection-limit',
					'connection-mark',
					'connection-nat-state',
					'connection-rate',
					'connection-state',
					'connection-type',
					'content',
					'disabled',
					'dscp',
					'dst-address',
					'dst-address-list',
					'dst-address-type',
					'dst-limit',
					'dst-port',
					'fragment',
					'hotspot',
					'icmp-options',
					'in-bridge-port',
					'in-bridge-port-list',
					'in-interface',
					'in-interface-list',
					'ingress-priority',
					'ipsec-policy',
					'ipv4-options',
					'jump-target',
					'layer7-protocol',
					'limit',
					'log',
					'log-prefix',
					'new-connection-mark',
					'new-dscp',
					'new-mss',
					'new-packet-mark',
					'new-priority',
					'new-routing-mark',
					'new-ttl',
					'out-bridge-port',
					'out-bridge-port-list',
					'out-interface',
					'out-interface-list',
					'packet-mark',
					'packet-size',
					'passthrough',
					'per-connection-classifier',
					'port',
					'priority',
					'protocol',
					'psd',
					'random',
					'route-dst',
					'routing-mark',
					'routing-table',
					'sniff-id',
					'sniff-target',
					'sniff-target-port',
					'src-address',
					'src-address-list',
					'src-address-type',
					'src-mac-address',
					'src-port',
					'tcp-flags',
					'tcp-mss',
					'time',
					'ttl',
				],
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
		getters: {
			filteredItems: function(state){
				return state.items.filter(function(row){
					var found = false;
					if (state.keyword == ''){
						return true;
					}
					for(prop in row){
						if (row[prop] != undefined){
							if (prop == 'id' || prop == 'checked'){
								
							} else if (row[prop].constructor == Object){
								for(p in row[prop]){
									if (row[prop][p] != undefined){
										if (row[prop][p].constructor == String){
											if (row[prop][p].toLowerCase().indexOf(state.keyword.toLowerCase()) != -1){
												found = true;
											}
										}
									}
								}
							} else if (row[prop].toLowerCase().indexOf(state.keyword.toLowerCase()) != -1){
								found = true;
							}
						}
					}
					if (!found){
						row.checked = false;
					}
					return found;
				});
			},
			selectedItems: function(state){
				return state.items.filter(function(row){
					return row.checked;
				})
			},
			allSelected: function(state){
				return (dataPool.getters.filteredItems.length == dataPool.getters.selectedItems.length) && (dataPool.getters.filteredItems.length > 0);
			},
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
				if (Math.ceil(dataPool.getters.filteredItems.length / 20) > 1){
					var txt = '';
					if (val){
						txt = 'This will select all items in other pages as well';
					} else {
						txt = 'This will deselect all items in other pages as well';
					}
					alert(txt);
				}
				dataPool.getters.filteredItems.forEach(function(item, idx, arr){
					item.checked = val;
				});
			},
			selectTab: function(state, val){
				state.activeTab = val;
			},
			setActivePage: function(state, val){
				state.activePage = val;
			},
			setKeyword: function(state, val){
				state.keyword = val;
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
			addRule: function(state, val){
				var obj = {};
				for(prop in state[val.type].rules){
					obj[prop] = state[val.type].rules[prop];
				}
				obj[val.key] = val.value;
				state[val.type].rules = obj;
				state[val.type].ruleName = '';
				state[val.type].ruleValue = '';
			},
			removeRule: function(state, val){
				var obj = {}
				for(prop in state[val.type].rules){
					if (prop != val.key){						
						obj[prop] = state[val.type].rules[prop];
					}
				}
				state[val.type].rules = obj;
			}
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
			editItem: undefined,
			jobType: '',
			jobCount: 0,
			jobDone: 0,
			watchJob: false,
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
			keyword: {
				get: function(){
					return dataPool.state.keyword;
				},
				set: function(newValue){
					dataPool.commit('setKeyword', newValue);
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
				this.keyword = '';
				this.activePage = 1;
				this.editing = false;
				this.showForm = false;
				this.loadData(this.tabName);
			},
			keyword: function(newValue){
				this.activePage = 1;
			},
			jobDone: function(newValue){
				if (this.watchJob){
					if (newValue == this.jobCount && this.jobType == 'pull'){
						this.watchJob = false;
						this.loadData(this.tabName);
						alert('Pull finished.')
					}
					if (newValue == this.jobCount && this.jobType == 'push'){
						this.watchJob = false;
						alert('Push finished.')
					}
				}
			},
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
								var b = {};
								for(prop in this.board){
									if (['checked', 'id'].indexOf(prop) !== -1){
									} else {
										b[prop] = '';
									}
								}
								this.board = b;
								this.editing = false;
								this.showForm = true;
								break;
							case 'edit':
								if (this.selectedItems.length > 1){
									alert('You can only edit 1 item at a time');
								} else if (this.selectedItems.length == 0){
									alert('Please select the item you want to edit');
								} else {
									this.editItem = this.selectedItems[0];
									for(prop in this.editItem){
										if (this.board.hasOwnProperty(prop) || prop == 'id'){
											this.board[prop] = this.editItem[prop];
										}
									}
									this.board.password = '';
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
						var type = this.tabName;
						if (type.substr(-1) == 's'){
							type = type.substr(0, type.length - 1);
						}
						if (type == 'address-list'){
							type = 'addressList';
						}
						if (type == 'layer-7-protocol'){
							type = 'layer7Protocol';
						}
						switch(tool.toLowerCase()){
							case 'add':
								var t = {};
								for(prop in this[type]){
									if (['checked', 'id'].indexOf(prop) !== -1){
									} else if (prop == 'fields'){
										t[prop] = this[type][prop];
									} else if (this[type][prop] == undefined){
										t[prop] = '';
									} else if (this[type][prop].constructor === Object){
										t[prop] = {};
									} else {
										t[prop] = '';
									}
								}
								this[type] = t;
								this.editing = false;
								this.showForm = true;
								break;
							case 'edit':
								if (this.selectedItems.length > 1){
									alert('You can only edit 1 item at a time');
								} else if (this.selectedItems.length == 0){
									alert('Please select the item you want to edit');
								} else {
									this.editItem = this.selectedItems[0];
									for(prop in this.editItem){
										if (this[type].hasOwnProperty(prop) || prop == 'id'){
											this[type][prop] = this.editItem[prop];
										}
									}
									this[type].ruleName = '';
									this[type].ruleValue = '';
									this.editing = true;
									this.showForm = true;
								}
								break;
							case 'delete':
								if (this.selectedItems.length == 0){
									alert('Please select the item you want to edit');
								} else {
									this.boardAction = 'delete';
									this.chooseBoards = true;
								}
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
				if (type == 'address-list'){
					type = 'addressList';
				}
				if (type == 'layer-7-protocol'){
					type = 'layer7Protocol';
				}

				var data = {};
				for(prop in this[type]){
					if (prop != 'ruleName' && prop != 'ruleValue' && prop != 'fields'){
						data[prop] = this[type][prop];
					}
				}

				if (this.editing){
					errand({
						url: this.tabName + '/update',
						json: true,
						method: 'post',
						data: data,
					}).success(function(resp){
						if (resp[type]){
							console.log(resp[type]);
							for(prop in resp[type]){
								_self.editItem[prop] = resp[type][prop];
							}
							_self.editItem = undefined;
							_self.showForm = false;
						} else if (resp.error){
							alert(resp.error);
						}
					}).error(function(resp){
						
					});
				} else {
					errand({
						url: this.tabName + '/save',
						json: true,
						method: 'post',
						data: data,
					}).success(function(resp){
						if (resp[type]){
							_self.items.push(resp[type]);
							_self.showForm = false;
						} else if (resp.error){
							alert(resp.error);
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
						this.jobType = 'pull';
						this.jobCount = boards.length;
						this.jobDone = 0;
						this.watchJob = true;
						boards.forEach(function(brd, idx, arr){
							errand({
								url: 'pull/' + tab + '/' + brd.name,
								json: true,
							}).success(function(resp){
								_self.jobDone++;
							}).error(function(resp){
								_self.jobDone++;
								console.log(resp);
							})
						})
						break;
					case 'push':
						var _self = this, toPush = [];
						this.selectedItems.forEach(function(itm, idx, arr){
							toPush.push(itm.id);
						})
						this.jobType = 'push';
						this.jobCount = boards.length;
						this.jobDone = 0;
						this.watchJob = true;
						boards.forEach(function(brd, idx, arr){
							errand({
								url: 'push/' + _self.tabName + '/' + brd.name,
								json: true,
								method: 'post',
								data: {push: toPush},
							}).success(function(resp){
								_self.jobDone++;
							}).error(function(resp){
								_self.jobDone++;
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