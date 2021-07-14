import dotenv from 'dotenv'
import NacelleClient from '@nacelle/client-js-sdk'

dotenv.config()

const spaceID = process.env.NACELLE_SPACE_ID
const token = process.env.NACELLE_GRAPHQL_TOKEN
const endpoint = process.env.NACELLE_ENDPOINT

export default new NacelleClient({
  id: spaceID,
  token,
  nacelleEndpoint: endpoint,
  useStatic: false
})
