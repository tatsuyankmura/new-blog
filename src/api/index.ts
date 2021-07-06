import ky from 'ky'
import { API_PATH } from '../config/constants'

const key = {
  headers: { 'X-API-KEY': process.env.API_KEY },
}
