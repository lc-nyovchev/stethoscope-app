/**
 * This module registers all of the internal protocol handlers
 * Most of them are used in practices/instructions.yaml to take the user
 * where they need to go to resolve issue, but are also used by the web app
 * to trigger actions
 * (e.g. app://some-app opens some-app)
 */
import { protocol, shell } from 'electron'
import os from 'os'
import applescript from './applescript'
import { MAC } from './platform'

export default function initProtocols (mainWindow) {
  // used in instructions.yaml
  protocol.registerHttpProtocol('app', (request, cb) => {
    applescript.openApp(decodeURIComponent(request.url.replace('app://', '')))
  })

  // used in instructions.yaml
  protocol.registerHttpProtocol('prefs', (request, cb) => {
    const pref = decodeURIComponent(request.url.replace('prefs://', ''))
    switch (os.platform()) {
      case MAC:
        applescript.openPreferences(pref)
        break
      default:
        break
    }
  })

  // open a URL in the user's default browser
  protocol.registerHttpProtocol('link', (request, cb) => {
    shell.openExternal(request.url.replace('link://', ''))
  })

  // uses the shell `open` command to open item
  protocol.registerHttpProtocol('open', (request, cb) => {
    shell.openItem(request.url.replace('open://', ''))
  })
}
