import * as core from '@actions/core'
import {generateSBOM} from './generate-sbom'
import {wrapError} from './utils'

async function run(): Promise<void> {
  try {
    const token: string = core.getInput('token')
    const org: string = core.getInput('org')

    core.debug(new Date().toTimeString())
    await generateSBOM(token, org)
    core.debug(new Date().toTimeString())
  } catch (error) {
    core.setFailed(wrapError(error).message)
  }
}

run()
