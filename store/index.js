export const actions = {
    async nuxtServerInit({
        commit
    }, {req, app}) {
        const {status, data: {user}} = await app.$axios.get('/users/getUser')
        commit('user/setUsername', status === 200 ? user : '')
    }
}