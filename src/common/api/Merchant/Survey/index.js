export default (api) => {
  return {
    close: (data) => {
      return api.put(`survey/surveys/${data.id}/stop`, data)
    },

    create: (data) => {
      return api.post(`survey/surveys/`, data)
    },

    delete: (data) => {
      return api.delete(`survey/surveys/${data.id}/stop`)
    },

    select: (data) => {
      return api.get(`survey/surveys/?merchant_id=1`, data)
    },

    update: (data) => {
      return api.put('merchant/survey', data)
    },

    view: (data) => {
      return api.get('merchant/survey/' + data.surveyId)
    },

    vote: (data) => {
      return api.post('survey/vote/', data)
    }
  }
}
