import fs from 'fs-extra'

export default async (path, data) => {
  try {
    fs.ensureFileSync(path)
    await fs.writeJson(path, data)

    return true
  } catch (e) {
    const message = `${path} Write Failed. ${e}`

    throw new Error(message)
  }
}
