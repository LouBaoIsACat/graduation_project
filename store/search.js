export const state = () => ({search: ''})

export const mutations = {
    setSearchKw(state, val) {
        state.search = val
        sessionStorage.setItem('searchKw', val)
    },
    removeSearchKw(state) {
        state.search = ''
        sessionStorage.removeItem('searchKw')
    }
}

export const getters = {
    getSearchKw (state) {
        state.search = sessionStorage.getItem('searchKw')
        return state.search
    }
}