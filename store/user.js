export const state = () => ({user: ''})

export const mutations = {
    setUsername(state, val) {
        state.user = val
    }
}