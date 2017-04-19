Vue.component('navigation', {
	computed: {
		items: function(){
			return this.$store.state.navigation;
		},
	},
	template: '<nav>' +
				'<div class="nav-toggle"></div>' +
				'<ul>' +
					'<li v-for="it in items"><a :href="it.url">{{ it.label }}</a></li>' +
				'</ul>' +
			'</nav>',
})

Vue.component('tabs', {
	computed: {
		items: function(){
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
				'<li v-for="it in items" :class="items[activeTab] == it ? \'active\' : \'\'" @click="tabClick(it)">{{ it }}</li>' +
			'</ul>',
	methods: {
		tabClick: function(tab){
			this.activeTab = this.items.indexOf(tab);
		},
	},
})

Vue.component('tools', {
	computed: {
		items: function(){
			return this.$store.state.tools;
		},
		activeTab: function(){
			return this.$store.state.activeTab;
		},
	},
	template: '<ul id="tools">' +
				'<li v-for="it in items[activeTab]" @click="toolClick(it)">{{ it }}</li>' +
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
		selectedItems: function(){
			return this.$store.state.items.filter(function(row){
				return row.checked;
			})
		},
		allSelected: {
			get: function(){
				return (this.selectedItems.length == this.$store.state.items.length) && (this.$store.state.items.length > 0);
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
		selectedItems: function(){
			return this.$store.state.items.filter(function(row){
				return row.checked;
			})
		},
		allSelected: {
			get: function(){
				return (this.selectedItems.length == this.$store.state.items.length) && (this.$store.state.items.length > 0);
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
		selectedItems: function(){
			return this.$store.state.items.filter(function(row){
				return row.checked;
			})
		},
		allSelected: {
			get: function(){
				return (this.selectedItems.length == this.$store.state.items.length) && (this.$store.state.items.length > 0);
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
				'<td>{{ item.regexp }}</td>' +
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
		selectedItems: function(){
			return this.$store.state.items.filter(function(row){
				return row.checked;
			})
		},
		allSelected: {
			get: function(){
				return (this.selectedItems.length == this.$store.state.items.length) && (this.$store.state.items.length > 0);
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
		pages: function(){
			return Math.ceil(this.$store.state.items.length / 20);
		},
		activePage: {
			get: function(){
				return this.$store.state.activePage;
			},
			set: function(newValue){
				this.$store.commit('setActivePage', newValue);
			},
		},
		pageList: function(){
			var pgs = [], maxLeft = this.activePage - 1, minRight = this.activePage + 1;
			maxLeft = maxLeft > 4 ? 4 : maxLeft;
			minRight = minRight < this.pages - 3 ? this.pages - 3 : minRight;
			for (i = 1; i <= maxLeft; i++){
				pgs.push(i);
			}
			pgs.push(this.activePage);
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
			if (page < 1 || page > this.pages){
				return;
			}
			this.$store.commit('setActivePage', page);
		}
	}
})

Vue.component('list', {
	computed: {
		activeTab: function(){
			return this.$store.state.activeTab;
		},
		items: function(){
			var offset = (this.activePage - 1) * 20;
			return this.$store.state.items.slice(offset, offset + 20);
		},
		pages: function(){
			return Math.ceil(this.$store.state.items.length / 20);
		},
		activePage: function(){
			return this.$store.state.activePage;
		},
		loading: function(){
			return this.$store.state.loading;
		},
	},
	template: '<table><thead v-if="activeTab == 0">' + 
				'<tr is="board-header"></tr>' +
				'</thead><thead v-if="activeTab == 1">'+
				'<tr is="rule-header"></tr>' +
				'</thead><thead v-if="activeTab == 2">'+
				'<tr is="rule-header"></tr>' +
				'</thead><thead v-if="activeTab == 3">'+
				'<tr is="rule-header"></tr>' +
				'</thead><thead v-if="activeTab == 4">'+
				'<tr is="address-list-header"></tr>' +
				'</thead><thead v-if="activeTab == 5">'+
				'<tr is="layer7-protocol-header"></tr>' +
				'</thead><thead v-if="loading">'+
				'<tr is="loading"></tr>' +
				'</thead><tbody v-if="activeTab == 0">' +
				'<tr is="board-item" v-for="it in items" :item="it"></tr>' +
				'</tbody><tbody v-if="activeTab == 1">' +
				'<tr is="rule-item" v-for="it in items" :item="it"></tr>' +
				'</tbody><tbody v-if="activeTab == 2">' +
				'<tr is="rule-item" v-for="it in items" :item="it"></tr>' +
				'</tbody><tbody v-if="activeTab == 3">' +
				'<tr is="rule-item" v-for="it in items" :item="it"></tr>' +
				'</tbody><tbody v-if="activeTab == 4">' +
				'<tr is="address-list-item" v-for="it in items" :item="it"></tr>' +
				'</tbody><tbody v-if="activeTab == 5">' +
				'<tr is="layer7-protocol-item" v-for="it in items" :item="it"></tr>' +
				'</tbody><tfoot v-if="pages > 1">' +
				'<tr is="paging"></tr>' +
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

Vue.component('filter-form', {
	computed: {
		filter: function(){
			return this.$store.state.filter;
		},
		editing: function(){
			return this.$store.state.editing;
		},
	},
	template: '<div>' +
				'<header>{{ editing ? \'Editing\' : \'New\' }} Filter Rule</header>' +
				'<section>' +
					'<p><label>Chain:</label><input type="text" v-model="filter.chain"/></p>' +
					'<p><label>Action:</label><input type="text" v-model="filter.action"/></p>' +
					'<p><label>Comment:</label><input type="text" v-model="filter.comment"/></p>' +
					'<p><label>Rules:</label><input type="text" v-model="filter.rules"/></p>' +
				'</section>' +
				'</div>',
})

Vue.component('nat-form', {
	computed: {
		nat: function(){
			return this.$store.state.nat;
		},
		editing: function(){
			return this.$store.state.editing;
		},
	},
	template: '<div>' +
				'<header>{{ editing ? \'Editing\' : \'New\' }} NAT</header>' +
				'<section>' +
					'<p><label>Chain:</label><input type="text" v-model="nat.chain"/></p>' +
					'<p><label>Action:</label><input type="text" v-model="nat.action"/></p>' +
					'<p><label>Comment:</label><input type="text" v-model="nat.comment"/></p>' +
					'<p><label>Rules:</label><input type="text" v-model="nat.rules"/></p>' +
				'</section>' +
				'</div>',
})

Vue.component('mangle-form', {
	computed: {
		mangle: function(){
			return this.$store.state.mangle;
		},
		editing: function(){
			return this.$store.state.editing;
		},
	},
	template: '<div>' +
				'<header>{{ editing ? \'Editing\' : \'New\' }} Mangle</header>' +
				'<section>' +
					'<p><label>Chain:</label><input type="text" v-model="mangle.chain"/></p>' +
					'<p><label>Action:</label><input type="text" v-model="mangle.action"/></p>' +
					'<p><label>Comment:</label><input type="text" v-model="mangle.comment"/></p>' +
					'<p><label>Rules:</label><input type="text" v-model="mangle.rules"/></p>' +
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
				'<filter-form v-if="activeTab == 1"></filter-form>' +
				'<nat-form v-if="activeTab == 2"></nat-form>' +
				'<mangle-form v-if="activeTab == 3"></mangle-form>' +
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
			if (this.selectedBoards.length == 0){
				alert('Please select the boards you want to process');
				return;
			}
			this.$emit('process', this.selectedBoards);
		}
	},
	template: '<aside class="board-picker" :class="{ showing: chooseBoards }">' +
				'<button type="button" class="close" @click="close"></button>' +
				'<header>Choose Boards</header>' +
				'<ul>' +
					'<li v-for="b in boards"><input type="checkbox" v-model="b.checked" :id="b.name"/><label :for="b.name">{{ b.name }} [{{ b.ip }}]</label></li>' +
				'</ul>' +
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