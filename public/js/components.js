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
	template: '<tr @click="click(item)">' +
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
	template: '<tr @click="click(item)">' +
				'<td class="checkbox"><input type="checkbox" v-model="item.checked" @click.stop=""/></td>' +
				'<td>{{ item.chain }}</td>' +
				'<td>{{ item.action }}</td>' +
				'<td>{{ item.comment }}</td>' +
				'<td>{{ item.rules }}</td>' +
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
	template: '<tr @click="click(item)">' +
				'<td class="checkbox"><input type="checkbox" v-model="item.checked" @click.stop=""/></td>' +
				'<td>{{ item.list }}</td>' +
				'<td>{{ item.address }}</td>' +
				'<td>{{ item.timeout }}</td>' +
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
	template: '<tr @click="click(item)">' +
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

Vue.component('paging', {
	computed: {
		activeTab: function(){
			return this.$store.state.activeTab;
		},
		colspan: function(){
			switch(this.activeTab){
				case 0:
				case 4:
				case 5:
					return 4;
				case 1:
				case 2:
				case 3:
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
	},
	template: '<tr>' +
				'<td :colspan="colspan"><button @click="prev">Prev</button><button @click="next">Next</button></td>' +
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
	}
})

Vue.component('list', {
	computed: {
		activeTab: function(){
			return this.$store.state.activeTab;
		},
		items: function(){
			console.log((this.activePage - 1) * 20, this.$store.state.items.length);
			var offset = (this.activePage - 1) * 20;
			return this.$store.state.items.slice(offset, offset + 20 - 1);
		},
		pages: function(){
			return Math.ceil(this.$store.state.items.length / 20);
		},
		activePage: function(){
			return this.$store.state.activePage;
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
	},
	template: '<div id="mikrotik">' +
				'<tabs></tabs>' +
				'<tools @click="toolClick"></tools>' +
				'<list></list>' +
				'</div>',
	methods: {
		toolClick: function(tool){
			this.$emit('tool-click', tool);
		},
	},
})