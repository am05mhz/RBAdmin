Vue.component('navigation', {
	props: {
		items: {
			type: Array,
			default: function(){
				return [];
			}
		}
	},
	template: '<nav><div class="nav-toggle"></div><ul><li v-for="it in items"><a :href="it.url">{{ it.label }}</a></li></ul></nav>'
})

Vue.component('tabs', {
	props: {
		items: {
			type: Array,
			default: function(){
				return [];
			}
		},
		activeTab: {
			type: Number,
			default: 0,
		}
	},
	template: '<ul id="tabs"><li v-for="it in items" :class="items[activeTab] == it ? \'active\' : \'\'" @click="tabClick(it)">{{ it }}</li></ul>',
	methods: {
		tabClick: function(tab){
			this.$emit('click', tab);
		}
	}
})

Vue.component('board-item', {
	props: {
		item: {
			type: Object,
			default: function(){
				return undefined;
			}
		}
	},
	template: '<tr><td>{{ item.name }}</td><td>{{ item.ip }}</td><td>{{ item.user }}</td></tr>'
})

Vue.component('board-header', {
	template: '<tr><th>Router Board Name</th><th>IP</th><th>Admin User</th></tr>'
})

Vue.component('list', {
	props: {
		activeTab: {
			type: Number,
			default: 0
		},
		items: {
			type: Array,
			default: function(){
				return [];
			}
		},
	},
	template: '<table><thead><tr is="board-header" v-if="activeTab == 0"></tr></thead><tbody><tr is="board-item" v-if="activeTab == 0" v-for="it in items" :item="it"></tr></tbody></table>'
})

Vue.component('mikrotik', {
	props: {
		tabs: {
			type: Array,
			default: function(){
				return [];
			}
		},
		activeTab: {
			type: Number,
			default: 0,
		},
		items: {
			type: Array,
			default: function(){
				return []
			}
		},
	},
	template: '<div id="mikrotik"><tabs :items="tabs" :active-tab="activeTab" @click="tabClick"></tabs><list :items="items" :active-tab="activeTab"></list></div>',
	methods: {
		tabClick: function(tab){
			this.$emit('tab-click', tab);
		}
	}
})