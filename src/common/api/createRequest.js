const getFilename = ({path}) => {
  return path.slice(path.lastIndexOf('/')).substr(1)
}

export default (data, fileKey, file) => {
  const request = new FormData()

  for (let field in data) {
    request.append(field, data[field])
  }

  const filename = getFilename(file)

  request.append(fileKey, {
    name: filename,
    filename,
    type: file.mime,
    uri: file.path
  })

  return request
}
