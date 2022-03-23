var execShPromise = require("exec-sh").promise;

const projects = [
  { name: "202212_Equipo02" },
  { name: "202212_Equipo03" },
  { name: "202212_Equipo04" },
  { name: "202212_Equipo05" },
  { name: "202212_Equipo06" },
  { name: "202212_Equipo07" },
  { name: "202212_Equipo08" },
  { name: "202212_Equipo09" },
  { name: "202212_Equipo10" },
  { name: "202212_Equipo11" },
  { name: "202212_Equipo12" },
  { name: "202212_Equipo13" },
  { name: "202212_Equipo14" },
  { name: "202212_Equipo15" },
  { name: "202212_Equipo16" },
  { name: "202212_Equipo17" },
  { name: "202212_Equipo18" },
  { name: "202212_Equipo19" },
  { name: "202212_Equipo20" },
  { name: "202212_Equipo21" },
  { name: "202212_Equipo22" },
  { name: "202212_Equipo23" },
  { name: "202212_Equipo24" },
  { name: "202212_Equipo25" },
  { name: "202212_Equipo26" },
  { name: "202212_Equipo27" },
  { name: "202212_Equipo28" },
  { name: "202212_Equipo29" },
  { name: "202212_Equipo30" },
  { name: "202212_Equipo31" },
  { name: "202212_Equipo32" },
  { name: "202212_Equipo33" },
  { name: "202212_Equipo34" },
  { name: "202212_Equipo35" },
  { name: "202212_Equipo36" },
  { name: "202212_Equipo37" },
  { name: "202212_Equipo38" },
  { name: "202212_Equipo39" },
  { name: "202212_Equipo40" },
];

const updateRepos = async () => {
  let out;

  try {
    for (const project of projects) {
      let command = `
       git remote rm origin &&
       git remote add origin git@github.com:MISW-4104-Web/${project.name}.git &&
       git push origin master`;
      out = await execShPromise(command, true);
    }
  } catch (e) {
    console.log("Error: ", e);
    console.log("Stderr: ", e.stderr);
    console.log("Stdout: ", e.stdout);
    return e;
  }

  console.log("out: ", out.stdout, out.stderr);
};

updateRepos();
