const MAC = 'darwin'
const LINUX = 'linux'
const UBUNTU = 'ubuntu'

const IS_MAC = process.platform === MAC
const IS_LINUX = [LINUX, UBUNTU].includes(process.platform)
const IS_UBUNTU = process.platform === UBUNTU

export {
  IS_MAC,
  IS_LINUX,
  IS_UBUNTU,
  MAC,
  LINUX,
  UBUNTU
}
