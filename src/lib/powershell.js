const Shell = require('node-powershell')
const options = {
  debugMsg: false
}

const openPreferences = pane => {
  const cmd = `Get-ControlPanelItem *${pane.replace(/[^\w]/g, '')}* | Show-ControlPanelItem`
  const ps = new Shell(options)
  ps.addCommand(cmd)
  return ps.invoke()
}

const run = cmd => {
  const ps = new Shell(options)
  ps.addCommand(cmd)
  return ps.invoke()
}

const getUserId = async () => {
  const ps = new Shell(options)
  ps.addCommand('[System.Security.Principal.WindowsIdentity]::GetCurrent().User | Select Value')
  const output = await ps.invoke()
  return output.split(/[\r\n]+/).pop()
}

const firewallStatus = async () => {
  const ps = new Shell(options)
  ps.addCommand('netsh advfirewall show allprofiles')
  const output = await ps.invoke().then((output) => {
    const firewalls = ['domainFirewall', 'privateFirewall', 'publicFirewall']
    return output.match(/State[\s\t]*(ON|OFF)/g).reduce((p, c, i) => {
      p[firewalls[i]] = c.includes('ON') ? 'ON' : 'OFF'
      return p
    }, {})
  })
  return output
}

const disks = async (disks = []) => {
  const status = await Promise.all(
    disks.map(async ({ label }) => {
      const ps = new Shell(options)
      ps.addCommand(`manage-bde -status ${label}`)
      const encrypted = await ps.invoke().then(data =>
        !(!data.includes('Protection') || data.includes('Protection Off'))
      )

      return {
        label,
        name: label,
        encrypted
      }
    })
  )
  return status
}

module.exports = { run, openPreferences, getUserId, disks, firewallStatus }
