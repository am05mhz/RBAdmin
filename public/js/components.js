var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Vue.component('navigation', {
	computed: {
		navs: function(){
			return this.$store.state.navigation;
		},
		keyword: {
			get: function(){
				return this.$store.state.keyword;
			},
			set: function(newValue){
				this.$store.commit('setKeyword', newValue);
			}
		},
	},
	template: '<nav>' +
				'<div class="nav-toggle"></div>' +
				'<ul>' +
					'<li v-for="nav in navs"><a :href="nav.url">{{ nav.label }}</a></li>' +
				'</ul>' +
				'<div class="nav-search"><input type="text" v-model="keyword"></div>' +
			'</nav>',
})

Vue.component('tabs', {
	computed: {
		tabs: function(){
			return this.$store.state.tabs;
		},
		activeTab: {
			get: function(){
				return this.$store.state.activeTab;
			},
			set: function(newValue){
				this.$store.commit('selectTab', newValue);
			}
		},
	},
	template: '<ul id="tabs">' +
				'<li v-for="tab in tabs" :class="tabs[activeTab] == tab ? \'active\' : \'\'" @click="tabClick(tab)">{{ tab }}</li>' +
			'</ul>',
	methods: {
		tabClick: function(tab){
			this.activeTab = this.tabs.indexOf(tab);
		},
	},
})

Vue.component('tools', {
	computed: {
		tools: function(){
			return this.$store.state.tools;
		},
		activeTab: function(){
			return this.$store.state.activeTab;
		},
	},
	template: '<ul id="tools">' +
				'<li v-for="tool in tools[activeTab]" @click="toolClick(tool)">{{ tool }}</li>' +
			'</ul>',
	methods: {
		toolClick: function(tool){
			this.$emit('click', tool);
		},
	},
})

Vue.component('board-item', {
	props: {
		item: {
			type: Object,
			default: function(){
				return undefined;
			},
		},
	},
	template: '<tr @click="click(item)" :class="{ selected: item.checked }">' +
				'<td class="checkbox"><input type="checkbox" v-model="item.checked" @click.stop=""/></td>' +
				'<td>{{ item.name }}</td>' +
				'<td>{{ item.ip }}</td>' +
				'<td>{{ item.user }}</td>' +
			'</tr>',
	methods: {
		click: function(item){
			item.checked = !item.checked;
		},
	},
})

Vue.component('board-header', {
	computed: {
		allSelected: {
			get: function(){
				return this.$store.getters.allSelected;
			},
			set: function(newValue){
				this.$store.commit('selectAll', newValue);
			},
		},
	},
	template: '<tr>' +
				'<th class="checkbox"><input type="checkbox" v-model="allSelected"/></th>' +
				'<th>Router Board Name</th>' +
				'<th>IP</th>' +
				'<th>Admin User</th>' +
			'</tr>',
})

Vue.component('rule-item', {
	props: {
		item: {
			type: Object,
			default: function(){
				return undefined;
			},
		},
	},
	template: '<tr @click="click(item)" :class="{ selected: item.checked }">' +
				'<td class="checkbox"><input type="checkbox" v-model="item.checked" @click.stop=""/></td>' +
				'<td>{{ item.chain }}</td>' +
				'<td>{{ item.action }}</td>' +
				'<td>{{ item.comment }}</td>' +
				'<td><span v-for="(value, key) in item.rules" class="rule-item">{{ key }}: {{ value }}</span></td>' +
			'</tr>',
	methods: {
		click: function(item){
			item.checked = !item.checked;
		},
	},
})

Vue.component('rule-header', {
	computed: {
		allSelected: {
			get: function(){
				return this.$store.getters.allSelected;
			},
			set: function(newValue){
				this.$store.commit('selectAll', newValue);
			},
		},
	},
	template: '<tr>' +
				'<th class="checkbox"><input type="checkbox" v-model="allSelected"/></th>' +
				'<th>Chain</th>' +
				'<th>Action</th>' +
				'<th>Comment</th>' +
				'<th>Rules</th>' +
			'</tr>',
})

Vue.component('address-list-item', {
	props: {
		item: {
			type: Object,
			default: function(){
				return undefined;
			},
		},
	},
	template: '<tr @click="click(item)" :class="{ selected: item.checked }">' +
				'<td class="checkbox"><input type="checkbox" v-model="item.checked" @click.stop=""/></td>' +
				'<td>{{ item.list }}</td>' +
				'<td>{{ item.address }}</td>' +
				'<td>{{ item.timeout }}</td>' +
				'<td>{{ item.comment }}</td>' +
			'</tr>',
	methods: {
		click: function(item){
			item.checked = !item.checked;
		},
	},
})

Vue.component('address-list-header', {
	computed: {
		allSelected: {
			get: function(){
				return this.$store.getters.allSelected;
			},
			set: function(newValue){
				this.$store.commit('selectAll', newValue);
			},
		},
	},
	template: '<tr>' +
				'<th class="checkbox"><input type="checkbox" v-model="allSelected"/></th>' +
				'<th>List</th>' +
				'<th>Address</th>' +
				'<th>Timeout</th>' +
				'<th>Comment</th>' +
			'</tr>',
})

Vue.component('layer7-protocol-item', {
	props: {
		item: {
			type: Object,
			default: function(){
				return undefined;
			},
		},
	},
	template: '<tr @click="click(item)" :class="{ selected: item.checked }">' +
				'<td class="checkbox"><input type="checkbox" v-model="item.checked" @click.stop=""/></td>' +
				'<td>{{ item.name }}</td>' +
				'<td class="regexp">{{ item.regexp }}</td>' +
				'<td>{{ item.comment }}</td>' +
			'</tr>',
	methods: {
		click: function(item){
			item.checked = !item.checked;
		},
	},
})

Vue.component('layer7-protocol-header', {
	computed: {
		allSelected: {
			get: function(){
				return this.$store.getters.allSelected;
			},
			set: function(newValue){
				this.$store.commit('selectAll', newValue);
			},
		},
	},
	template: '<tr>' +
				'<th class="checkbox"><input type="checkbox" v-model="allSelected"/></th>' +
				'<th>Name</th>' +
				'<th>Regular Expression</th>' +
				'<th>Comment</th>' +
			'</tr>',
	methods: {
		toggle: function(){
			this.$emit('toggle');
		},
	},
})

Vue.component('loading', {
	computed: {
		activeTab: function(){
			return this.$store.state.activeTab;
		},
		colspan: function(){
			switch(this.activeTab){
				case 0:
				case 5:
					return 4;
				case 1:
				case 2:
				case 3:
				case 4:
					return 5;
			}
		},
	},
	template: '<tr><td class="loading" :colspan="colspan">Loading</td></tr>',
})

Vue.component('paging', {
	props: {
		pages: {
			type: Number,
			default: 1,
		}
	},
	computed: {
		activeTab: function(){
			return this.$store.state.activeTab;
		},
		colspan: function(){
			switch(this.activeTab){
				case 0:
				case 5:
					return 4;
				case 1:
				case 2:
				case 3:
				case 4:
					return 5;
			}
		},
		keyword: function(){
			return this.$store.state.keyword.toLowerCase();
		},
		activePage: _extends({
			set: function(newValue){
				this.$store.commit('setActivePage', newValue);
			},
		}, (0, Vuex.mapGetters)({get: 'activePage'})),
		pageList: function(){
			var pgs = [], maxLeft = this.activePage - 1, minRight = this.activePage + 1;
			maxLeft = maxLeft > 4 ? 4 : maxLeft;
			minRight = minRight < this.pages - 3 ? this.pages - 3 : minRight;
			for (i = 1; i <= maxLeft; i++){
				pgs.push(i);
			}
			if (maxLeft == 4 && this.activePage > 5){
				pgs.push('...');
			}
			pgs.push(this.activePage);
			if (minRight == this.pages - 3 && this.activePage < this.pages - 4){
				pgs.push('...');
			}
			for (i = minRight; i <= this.pages; i++){
				pgs.push(i);
			}
			return pgs;
		},
	}, 
	template: '<tr class="paging">' +
				'<td :colspan="colspan">' +
					'<button :disabled="activePage == 1" @click="goto(1)">First</button>' +
					'<button :disabled="activePage == 1" @click="prev">Prev</button>' +
					'<button v-for="p in pageList" :class="p == activePage ? \'current\' : \'\'" @click="goto(p)">{{ p }}</button>' +
					'<button :disabled="activePage == pages" @click="next">Next</button>' +
					'<button :disabled="activePage == pages" @click="goto(pages)">Last</button>' +
				'</td>' +
			'</tr>',
	methods: {
		next: function(){
			var p = this.activePage + 1;
			if (p > this.pages) {
				p = this.pages;
			}
			this.$store.commit('setActivePage', p);
		},
		prev: function(){
			var p = this.activePage - 1;
			if (p < 1) {
				p = 1;
			}
			this.$store.commit('setActivePage', p);
		},
		goto: function(page){
			if (page == '...'){
				return;
			}
			if (page < 1 || page > this.pages){
				return;
			}
			this.$store.commit('setActivePage', page);
		}
	}
})

Vue.component('list', {
	computed: _extends({
		activeTab: function(){
			return this.$store.state.activeTab;
		},
		keyword: function(){
			return this.$store.state.keyword.toLowerCase();
		},
		items: function(){
			var offset = (this.activePage - 1) * 20;
			return this.filteredItems.slice(offset, offset + 20);
		},
		loading: function(){
			return this.$store.state.loading;
		},
		header: function(){
			switch(this.activeTab){
				case 0:
					return 'board-header';
				case 1:
				case 2:
				case 3:
					return 'rule-header';
				case 4:
					return 'address-list-header';
				case 5:
					return 'layer7-protocol-header';
			}
		},
		listItem: function(){
			switch(this.activeTab){
				case 0:
					return 'board-item';
				case 1:
				case 2:
				case 3:
					return 'rule-item';
				case 4:
					return 'address-list-item';
				case 5:
					return 'layer7-protocol-item';
			}
		},
	}, (0, Vuex.mapGetters)(['filteredItems', 'pages', 'activePage'])),
	template: '<table><thead>' + 
				'<tr :is="header"></tr>' +
				'</thead><tbody v-if="loading">'+
				'<tr is="loading"></tr>' +
				'</tbody><tbody>' +
				'<tr :is="listItem" v-for="it in items" :item="it"></tr>' +
				'</tbody><tfoot v-if="pages > 1">' +
				'<tr is="paging" :pages="pages"></tr>' +
				'</tfoot></table>',
})

Vue.component('board-form', {
	computed: {
		board: function(){
			return this.$store.state.board;
		},
		editing: function(){
			return this.$store.state.editing;
		},
	},
	template: '<div>' +
				'<header>{{ editing ? \'Editing\' : \'New\' }} Router Board</header>' +
				'<section>' +
					'<p><label>Name:</label><input type="text" v-model="board.name"/></p>' +
					'<p><label>IP:</label><input type="text" v-model="board.ip"/></p>' +
					'<p><label>User:</label><input type="text" v-model="board.user"/></p>' +
					'<p><label>Password:</label><input type="password" v-model="board.password"/></p>' +
				'</section>' +
				'</div>',
})

Vue.component('rule-form', {
	props: {
		ruleType: {
			type: String,
			default: 'filter',
			validator: function(value){
				var valid = ['filter', 'nat', 'mangle'];
				return (valid.indexOf(value) !== -1);
			}
		}
	},
	computed: {
		rule: function(){
			switch(this.ruleType){
				case 'filter':
					return this.$store.state.filter;
				case 'nat':
					return this.$store.state.nat;
				case 'mangle':
					return this.$store.state.mangle;
			}
		},
		tab: function(){
			switch(this.ruleType){
				case 'filter':
					return 'Filter';
				case 'nat':
					return 'NAT';
				case 'mangle':
					return 'Mangle';
			}
		},
		editing: function(){
			return this.$store.state.editing;
		},
	},
	methods: {
		addRule: function(){
			if (this.rule.ruleName != '' && this.rule.ruleValue != ''){
				this.$store.commit('addRule', {
					type: this.ruleType,
					key: this.rule.ruleName,
					value: this.rule.ruleValue,
				});
			}
		},
		removeRule: function(key){
			this.$store.commit('removeRule', {
				type: this.ruleType,
				key: key,
			});
		}
	},
	template: '<div>' +
				'<header>{{ editing ? \'Editing\' : \'New\' }} {{ tab }} Rule</header>' +
				'<section>' +
					'<p><label>Chain:</label><input type="text" v-model="rule.chain"/></p>' +
					'<p><label>Action:</label><input type="text" v-model="rule.action"/></p>' +
					'<p><label>Comment:</label><input type="text" v-model="rule.comment"/></p>' +
					'<p><label>Rules:</label><span class="rules">' +
						'<span v-for="(value, key) in rule.rules" class="rule-item" @click="removeRule(key)">{{ key }}: {{ value }}</span>' +
					'</span></p>' +
					'<p><label>Rule Name:</label>' + 
						'<select v-model="rule.ruleName"><option v-for="f in rule.fields" :value="f">{{ f }}</option></select>' +
					'</p>' +
					'<p><label>Rule Value:</label><input type="text" v-model="rule.ruleValue"/></p>' +
					'<p class="buttons"><button type="button" @click="addRule">Add Rule</button></p>' +
				'</section>' +
				'</div>',
})

Vue.component('address-list-form', {
	computed: {
		addr: function(){
			return this.$store.state.addressList;
		},
		editing: function(){
			return this.$store.state.editing;
		},
	},
	template: '<div>' +
				'<header>{{ editing ? \'Editing\' : \'New\' }} Address List</header>' +
				'<section>' +
					'<p><label>List:</label><input type="text" v-model="addr.list"/></p>' +
					'<p><label>Address:</label><input type="text" v-model="addr.address"/></p>' +
					'<p><label>Timeout:</label><input type="text" v-model="addr.timeout"/></p>' +
					'<p><label>Comment:</label><input type="text" v-model="addr.comment"/></p>' +
				'</section>' +
				'</div>',
})

Vue.component('layer7-protocol-form', {
	computed: {
		proto: function(){
			return this.$store.state.layer7Protocol;
		},
		editing: function(){
			return this.$store.state.editing;
		},
	},
	template: '<div>' +
				'<header>{{ editing ? \'Editing\' : \'New\' }} Layer 7 Protocol</header>' +
				'<section>' +
					'<p><label>Name:</label><input type="text" v-model="proto.name"/></p>' +
					'<p><label>Regular Expression:</label><input type="text" v-model="proto.regexp"/></p>' +
					'<p><label>Comment:</label><input type="text" v-model="proto.comment"/></p>' +
				'</section>' +
				'</div>',
})

Vue.component('item-form', {
	computed: {
		activeTab: function(){
			return this.$store.state.activeTab;
		},
		showing: function(){
			return this.$store.state.showForm;
		},
	},
	template: '<aside class="form" :class="{ showing: showing }">' +
				'<button type="button" class="close" @click="close"></button>' +
				'<form method="post" @submit.prevent="save">' +
				'<board-form v-if="activeTab == 0"></board-form>' +
				'<rule-form v-if="activeTab == 1"></rule-form>' +
				'<rule-form rule-type="nat" v-if="activeTab == 2"></rule-form>' +
				'<rule-form rule-type="mangle" v-if="activeTab == 3"></rule-form>' +
				'<address-list-form v-if="activeTab == 4"></address-list-form>' +
				'<layer7-protocol-form v-if="activeTab == 5"></layer7-protocol-form>' +
				'<section class="buttons"><button type="submit">Save</button></section>' +
				'</form>' +
			'</aside>',
	methods: {
		save: function(){
			this.$emit('save');
		},
		close: function(){
			this.$store.commit('setShowForm', false);
		}
	},
})

Vue.component('board-picker', {
	data: function(){
		return {boards: []}
	},
	computed: {
		boardAction: function(){
			return this.$store.state.boardAction;
		},
		chooseBoards: function(){
			return this.$store.state.chooseBoards;
		},
		selectedBoards: function(){
			return this.boards.filter(function(row){
				return row.checked;
			})
		}
	},
	created: function(){
		var _self = this;
		errand({
			url: 'boards',
			json: true,
		}).success(function(resp){
			if (resp.boards){
				_self.boards = resp.boards;
			} else {
				_self.boards = [];
			}
		})
	},
	methods: {
		close: function(){
			this.$store.commit('setChooseBoards', false);
		},
		process: function(){
			if (this.selectedBoards.length == 0 && this.boardAction != 'delete'){
				alert('Please select the boards you want to process');
				return;
			}
			this.$emit('process', this.selectedBoards);
		}
	},
	template: '<aside class="board-picker" :class="{ showing: chooseBoards }">' +
				'<button type="button" class="close" @click="close"></button>' +
				'<header>Choose Boards</header>' +
				'<section><ul>' +
					'<li v-for="b in boards"><input type="checkbox" v-model="b.checked" :id="b.name"/><label :for="b.name">{{ b.name }} [{{ b.ip }}]</label></li>' +
				'</ul></section>' +
				'<section class="buttons"><button type="button" @click="process">Process</button></section>' +
			'</aside>',
})

Vue.component('mikrotik', {
	computed: {
		tabs: function(){
			return this.$store.state.tabs;
		},
		tools: function(){
			return this.$store.state.tools;
		},
		activeTab: function(){
			return this.$store.state.activeTab;
		},
		items: function(){
			return this.$store.state.items;
		},
		chooseBoards: function(){
			return this.$store.state.chooseBoards;
		},
	},
	template: '<div id="mikrotik">' +
				'<tabs></tabs>' +
				'<tools @click="toolClick"></tools>' +
				'<list></list>' +
				'<item-form @save="saveClick"></item-form>' +
				'<board-picker @process="processClick"></board-picker>' +
				'</div>',
	methods: {
		toolClick: function(tool){
			this.$emit('tool-click', tool);
		},
		saveClick: function(){
			this.$emit('save');
		},
		processClick: function(boards){
			this.$emit('process', boards);
		}
	},
})