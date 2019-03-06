export default (api) => {
  return {
    add: (data) => {
      return api.post(`merchant/${data.id}/tags/`, data)
    },
    view: (data) => {
      return api.get(`merchant/1/tags/`, data)
    },
    select: (data) => {
      return api.get(`merchant/${data.id}/tags/`, data)
    },
    delete: (data) => {
      return api.delete(`merchant/${data.id}/tags/${data.tagId}/`, data)
    }
  }
}
