import type { Command } from "bluebun"

const command: Command = {
  name: "hello",
  description: "Say hello",
  run: async (props) => {
    console.log("Hello from the homeschool CLI!")
  },
}

export default command 