#!/usr/bin/env bun

import { cli } from "bluebun"

const main = async () => {
  const { command, props } = await cli({
    name: "homeschool",
    cliPath: __dirname,
  })

  await command.run(props)
}

main().catch((error) => {
  console.error("Error:", error)
  process.exit(1)
}) 