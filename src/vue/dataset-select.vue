<template lang="html">
	<q-card class="dataset-select full-width q-pa-sm">
		<q-card-section>
			<div class="text-h6">選擇資料集</div>
			<div v-if="lastDataset">
				<div class="text-subtitle2">上次使用</div>
				<q-item clickable :active="selectIndex == -1" active-class="bg-green-2" @click="SelectItem(-1);" @dblclick="ConfirmSelect();">
					<q-item-section avatar>
						<q-avatar square rounded>
							<img style="object-fit:cover;" :src="lastDataset.picCover || '/static/image/logo-16-9.png' ">
						</q-avatar>
					</q-item-section>
					<q-item-section>
						<q-item-label>{{lastDataset.name}}</q-item-label>
					</q-item-section>
				</q-item>
			</div>

			<q-scroll-area style="height: 300px;">
				<q-infinite-scroll @load="LoadMoreDataset" ref="datasetScroll">
					<q-input placeholder="輸入篩選文字" outlined dense square v-model="searchKey" @change="ReloadDataset();"></q-input>
					<q-list bordered separator>
						<q-item clickable v-for="(dataset,i) in datasetArr" :key="i" :active="selectIndex == i" active-class="bg-green-2" @click="SelectItem(i);" @dblclick="ConfirmSelect();">
							<q-item-section avatar>
								<q-avatar square rounded>
									<img style="object-fit:cover;" :src="dataset.picCover || '/static/image/logo-16-9.png' ">
								</q-avatar>
							</q-item-section>
							<q-item-section>
								<q-item-label>{{dataset.name}}</q-item-label>
							</q-item-section>

							
						</q-item>
					</q-list>

					<template v-slot:loading>
						<div class="row justify-center q-my-md">
							<q-spinner-dots color="primary" size="40px" />
						</div>
					</template>
				</q-infinite-scroll>
			</q-scroll-area>
		</q-card-section>

		<q-card-actions class="justify-center">
			<q-btn flat label="確定" @click="ConfirmSelect();"></q-btn>
			<q-btn flat label="取消" @click="CancelSelect();"></q-btn>
		</q-card-actions>
	</q-card>

</template>

<script>

export default {
	name:"dataset-select",
	props: {
		forUpload: Boolean,
		forAnnotation: Boolean
	},
	components:{
		
	},
	data: function () {
		return {
			searchKey:"",
			datasetArr: [],
			hasMore: true,
			selectIndex: -1,
			lastDataset: {}
		};
	},
	created: function(){
		this.GetLastDataset();
	},
	methods: {
		GetLastDataset: function(){
			var storage = window.localStorage;
			this.lastDataset = JSON.parse(localStorage.getItem("lastDataset"));
		},
		SetLastDataset: function(dataset){
			var storage = window.localStorage;
			localStorage.setItem("lastDataset",JSON.stringify(dataset));
		},
		LoadMoreDataset: function(index,done){
			var url = "/dataset/list-dataset";
			url += "?page="+(index-1);
			url += "&sort=updatedAt";
			url += "&orderType=desc";
			if(this.forUpload){
				url += "&enableUpload=1";
			}
			if(this.forAnnotation){
				url += "&enableAnnotation=1";
			}
			url += "&keyword="+this.searchKey;
			$.get(url,function(result){
				if(result.status != "ok") return;
				this.hasMore = result.data.hasMore;
				if(!this.hasMore){
					this.$refs.datasetScroll.stop();
				}
				this.datasetArr = this.datasetArr.concat(result.data.dataset);
				done();
			}.bind(this));
		},
		ReloadDataset: function(){
			this.datasetArr = [];
			this.$refs.datasetScroll.reset();
			this.$refs.datasetScroll.resume();
			this.selectIndex = -1;
		},
		GetSelectDataset: function(){
			if(this.selectIndex == -1 && this.lastDataset){
				return this.lastDataset;
			}
			if(this.selectIndex < 0 || this.selectIndex >= this.datasetArr.length) return null;
			else return this.datasetArr[this.selectIndex];
		},
		SelectItem: function(i){
			this.selectIndex = i;
			this.$emit("change");
		},
		ConfirmSelect: function(){
			if(this.selectIndex == -1 && this.lastDataset){
				return this.$emit("confirm");
			}
			if(this.selectIndex < 0 || this.selectIndex >= this.datasetArr.length) return alert("請選擇資料集");
			this.SetLastDataset(this.datasetArr[this.selectIndex]);
			this.$emit("confirm");
		},
		CancelSelect: function(){
			this.$emit("cancel");
		}
	}
}
</script>

<style lang="scss">
.dataset-select{
	width: 100%;
}
</style>