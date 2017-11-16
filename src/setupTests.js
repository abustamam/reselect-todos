import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
}

const consoleMock = {
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}

global.localStorage = localStorageMock
global.console = consoleMock
