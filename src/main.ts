import * as core from '@actions/core'
import {generateSBOM} from './generate-sbom'
import {getRequiredEnvParam, wrapError} from './utils'

async function run(): Promise<void> {
  try {
    const token: string = getRequiredEnvParam('GITHUB_TOKEN')
    //const token: string = core.getInput('token')
    const org: string = getRequiredEnvParam('GITHUB_REPOSITORY_OWNER')
    //const org: string = core.getInput('org')

    core.debug(new Date().toTimeString())
    await generateSBOM(token, org)
    core.debug(new Date().toTimeString())
  } catch (error) {
    core.info('Error: ' + error)
  }
}

run()
