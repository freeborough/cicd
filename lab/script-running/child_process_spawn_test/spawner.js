const { spawn } = require("child_process");

const main = async () => {
  console.log("Spawner v0.1.0");

  if (process.argv.length < 3) {
    console.error("Usage: node spawner.js <command> <arg-1> <arg-2> ... <arg-n>");
    process.exit(1);
  }

  const cmd = process.argv[2];
  const cmdArgs = process.argv.slice(3);

  try {
    const command = spawn(cmd, cmdArgs);

    command.stdout.on("data", (data) => {
      process.stdout.write(data.toString());
    });

    command.stderr.on("data", (data) => {
      process.stderr.write(data.toString());
    });

    command.on("close", (exitCode) => {
      console.log(`Exit Code: ${exitCode}`);
    });
  } catch(e) {
    console.error(`Spawned command failed: ${e}`);
  }
};

main();