import fs from 'fs'

export default (filename: string) => {
  return new Promise(function(resolve, reject) {
    fs.readFile(`src/fixtures/${filename}`, 'utf8', (err, res) => {
      if (err) reject(err)
      try {
        res = JSON.parse(res)
        resolve(res)
      } catch (err) {
        reject(err)
      }
    })
  })
}
