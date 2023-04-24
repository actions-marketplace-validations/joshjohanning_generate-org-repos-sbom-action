import * as core from '@actions/core'
import {generateSBOM} from './generate-sbom'

async function run(): Promise<void> {
  try {
    const token: string = core.getInput('token')
    const org: string = core.getInput('org')

    core.debug(new Date().toTimeString())
    await generateSBOM(token, org)
    core.debug(new Date().toTimeString())
  } catch (error) {
    core.info('Error: ' + error)
  }
}

run()
