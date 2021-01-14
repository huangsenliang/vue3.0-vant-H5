// import store from '../index'
// import { dictList } from '@/api/common.js'

// dictList({ type: 'orderStatus' }).then(_ => {
//   store.dispatch('dict/updateDicts', _.data)
// })

const state = {
  dict: new Map(),
  dictChgNum: 0 // 处理vue2.0不响应Map对象
}

const getters = {
  getDict: state => query => {
    // 支持查询格式 type + value => name || [type + value] => name [type, value] => name
    // type => type[]
    state.dictChgNum
    if (typeof query === 'string') {
      return state.dict.get(query)
    } else if (Array.isArray(query)) {
      query = query.join('')
      return state.dict.get(query)
    } else {
      return undefined
    }
  }
}

const mutations = {
  UPDATE_DICTS: (state, dictList) => {
    state.dict.clear()
    for (const item of dictList) {
      state.dict.set(item.type + '' + item.value, item.name)
      if (!state.dict.has(item.type)) {
        state.dict.set(item.type, [])
      }
      state.dict.get(item.type).push(item)
    }
    state.dictChgNum++
    // console.log(state.dict)
  }
}

const actions = {
  updateDicts({ commit }, dictList) {
    commit('UPDATE_DICTS', dictList)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
