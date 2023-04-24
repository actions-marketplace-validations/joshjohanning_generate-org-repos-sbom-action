import * as core from '@actions/core'
import {Octokit} from 'octokit'
import * as fs from 'fs'
import {wrapError} from './utils'

export async function generateSBOM(
  token: string,
  org: string,
  octokit?: Octokit
): Promise<void> {
  const kit = octokit || new Octokit({auth: token})

  // get all repos in org
  const repos = await kit.paginate(kit.rest.repos.listForOrg, {
    org
  })

  // write repos to log
  core.info(`Found ${repos.length} repos`)

  // loop through repos
  for (const repo of repos) {
    core.info(`repo name: ${repo.name}`)

    try {
      const res = await kit.request(
        'GET /repos/{owner}/{repo}/dependency-graph/sbom',
        {
          owner: org,
          repo: repo.name,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        }
      )

      const fileName = `sbom-${org}-${repo.name}.json`
      fs.writeFile(fileName, JSON.stringify(res.data.sbom), err => {
        if (err) {
          const e = wrapError(err)
          core.setFailed(e.message)
        } else {
          core.info(`SBOM written to ${fileName}`)
        }
      })
    } catch (error) {
      core.warning(`Failed to export SBOM for: ${repo.name} (is Dependency Graph enabled?)`)
    }
  }
}
