module.exports = {

  // Uncomment dryRun to test exotic config options without spamming dozens of
  // pull requests onto a repo that you would then need to clean up...
  dryRun: "full",

  // Inherit default config options
  //extends: ["config:base"],
  configMigration: true,

  // Force use of Conventional Commit messages to avoid Renovate not detecting them
  semanticCommits: "enabled",

  // Disable limits on the number of pull requests that can be managed simultaneously
  // since this can sometimes prevent security patches being suggested!
  prHourlyLimit: 0,
  prConcurrentLimit: 0,

  // Tell Renovate to re-create or rebase old pull requests when new commits have
  // since been merged into main...
  rebaseWhen: "behind-base-branch",

  // Set the default schedule for when pull requests will be created or updated.
  // If Renovate is run outside of this schedule then it will skip updating pull
  // requests for dependencies unless they override the schedule.
  updateNotScheduled: false,
  timezone: "Europe/London",
  //after 10pm and before 5am every weekday
  schedule: [
    "* 22-23,0-4 * * 1-5"
  ],

  // This setting helps handle breaking changes to Renovate bot when its version changes.
  ignorePrAuthor: true,

  // Automatically assign reviewers to pull requests based on who "owns" the source files
  // that need to be updated as listed in the CODEOWNERS file in the project repo.
  reviewersFromCodeOwners: true,

  // Auto discovery is dangerous, never blindly trust the scope of the token!
  autodiscover: false,
  // Instead, explicitly list the repos that we should manage pull requests on.
  // This should realistically only be one repo, the project repo you are currently in.
  // The default token "should" only have access to this repo...
  repositories: [
    "SwanseaUniversityMedical/slurm-operator",
  ],

  // branchPrefix: "upgrade/",
  ignorePaths: ["*/**/.github/**"], // Ignore any .github directories not on the repo root

  packageRules: [
    {
      matchUpdateTypes: ["major"],
      dependencyDashboardApproval: true,
      labels: ["external"]
    },
    {
      groupName: "all non-major dependencies",
      groupSlug: "all-minor-patch",
      matchPackageNames: ["*"],
      matchUpdateTypes: ["minor", "patch"],
      dependencyDashboardApproval: true,
      labels: ["external"]
    },
    {
      matchDatasources: ["docker"],
      matchPackageNames: ["slurm-operator"],
      schedule: ["at any time"],
      dependencyDashboardApproval: false,
      labels: ["internal"] 
    },
    {
      matchPackageNames: ["SwanseaUniversityMedical/workflows"],
      schedule: ["at any time"],
      dependencyDashboardApproval: false,
      labels: ["workflows"] 
    },
    {
      groupName: "workflows non-major dependencies",
      groupSlug: "workflows-minor-patch",
      matchPackageNames: ["SwanseaUniversityMedical/workflows"],
      matchUpdateTypes: ["minor", "patch"]
    }
  ],

  hostRules: [
    // Add a set of credentials for accessing docker or oci helm registries like harbor.
    // These registry tokens should be read-only, they only need to be able to look up
    // what versions are available. Pretty much all our repos will need this config!
    {
      hostType: "docker",
      domainName: process.env.RENOVATE_HARBOR_REGISTRY,
      username: process.env.RENOVATE_HARBOR_USER,
      password: process.env.RENOVATE_HARBOR_TOKEN
    }
  ],
};
