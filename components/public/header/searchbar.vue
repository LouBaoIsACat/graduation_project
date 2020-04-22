<template>
    <div class="com-searchbar">
        <el-row>
            <el-col :span="6" class="logo">
                <img src="@/static/logo.png" alt="logo">
            </el-col>
            <el-col :span="12" class="center">
                <div class="search">
                    <el-input v-model="search" placeholder="" @focus="focus" @blur="blur" @input="input"></el-input>
                    <button class="el-button el-button--primary" @click="xsSearch"><i class="el-icon-search"></i></button>
                    <dl class="history-search-list" v-if="isHistory && historySearchList.length">
                        <dd v-for="(item, index) in historySearchList" :key="index">
                            <span @click="handleHistorySearch(item)">{{item}}</span>
                        </dd>
                    </dl>
                    <dl class="history-search-list" v-if="isSearchList && searchList.length">
                        <dd v-for="(item, index) in searchList" :key="index">
                            <a :href="'/novel?bookId=' + item.bookId">{{item.name}}</a>
                        </dd>
                    </dl>
                </div>
            </el-col>
            <el-col :span="6" class="right">
                <p>留言：</p>
                <a href="#">信息反馈</a>
            </el-col>
        </el-row>
    </div>
</template>

<script>

import {saveSearch} from '@/server/interface/utils/cache.js'
import storage from 'good-storage'
import _ from 'lodash'
export default {
    data(){
        return {
            search: '',
            isFocus: false,
            searchList: []
        }
    },
    computed: {
        historySearchList: function(){
            let searchesList = []
            if (process.client) {
                // let searches = storage.get('_search_')
                let username = this.$store.state.user.user
                let searches = window.localStorage.getItem(`${username}_search`)
                searchesList = searches ? window.JSON.parse(searches) : []
            }
            return searchesList
        },
        isHistory: function(){
            return this.isFocus && !this.search
        },
        isSearchList: function(){
            return this.isFocus && this.search
        }
    },
    methods: {
        focus: function() {
            this.isFocus = true
        },
        blur: function(){
            let self = this
            setTimeout(() => {
                self.isFocus = false
            }, 200);
        },
        input: _.debounce(async function(){
            let self = this
            let {status, data: {searchNovels}} = await self.$axios.get('/book/getSearchNovels', {
                params: {
                    search: self.search
                }
            })
            if (status === 200) {
                self.searchList = searchNovels
            }
        }, 300),
        xsSearch: async function(){
            let self = this
            if (this.search != '') {
                let username = this.$store.state.user.user
                saveSearch(username, this.search)
                // this.$store.commit('search/setSearchKw', this.search)
                // let {status, data: {searchNovels}} = await this.$axios.get('/book/getSearchNovels', {
                //     params: {
                //         search: this.search
                //     }
                // })
                window.sessionStorage.setItem('searchKw', this.search)
                setTimeout(() => {
                    location.href = "/searchResult"
                }, 1000);
            }
        },
        handleHistorySearch: function(item) {
            this.search = item
        }
    }
}
</script>

<style lang="scss">
.com-searchbar {
    width: 1127px;
    margin: 0px auto;
    .logo {
        img {
            width: 100px;
        }
    }
    .center {
        .search {
            position: relative;
            .el-input {
                width: 400px;
            }
            .history-search-list {
                position: absolute;
                z-index: 1;
                width: 368px;
                background-color: white;
                border: 1px solid #DCDFE6;
                border-top: none;
                padding: 5px 15px;
                border-radius: 0 0 5px 5px;
                dd {
                    padding: 5px;
                    font-size: 14px;
                    border-bottom: 1px solid #E4E7ED;
                    a{
                        color: #6b78a7;
                    }
                    span {
                        cursor: pointer;
                        color: #6b78a7;
                    }
                }
                dd:last-child {
                    border-bottom: none;
                }
            }
        }
        margin-top: 13px;
    }
    .right {
        border: 1px dashed #6ec8e6;
        padding: 5px;
        margin-top: 8px;
    }
}
</style>