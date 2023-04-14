import macSecurity from './MacSecurity'
import macDevice from './MacDevice'
import linuxSecurity from './LinuxSecurity'
import linuxDevice from './LinuxDevice'

let PlatformSecurity = macSecurity
let PlatformDevice = macDevice

const platform = process.platform

switch (platform) {
  case 'ubuntu':
  case 'linux':
    PlatformSecurity = linuxSecurity
    PlatformDevice = linuxDevice
    break
}

export {
  PlatformDevice,
  PlatformSecurity
}
