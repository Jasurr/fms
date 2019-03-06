export default (api) => {
  return {
    accept: () => {
      return api.put('user/agreement')
    }
  }
}
