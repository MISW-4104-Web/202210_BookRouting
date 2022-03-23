const execShPromise = require("exec-sh").promise;

let fs = require("fs");

const projects = [
  { name: "202212_Equipo01" },
  //{ name: "202212_Equipo02" },
  //{ name: "202212_Equipo03" },
  // { name: "202212_Equipo04" },
  // { name: "202212_Equipo05" },
  // { name: "202212_Equipo06" },
  // { name: "202212_Equipo07" },
  // { name: "202212_Equipo08" },
  // { name: "202212_Equipo09" },
  // { name: "202212_Equipo10" },
  // { name: "202212_Equipo11" },
  // { name: "202212_Equipo12" },
  // { name: "202212_Equipo13" },
  // { name: "202212_Equipo14" },
  // { name: "202212_Equipo15" },
  // { name: "202212_Equipo16" },
  // { name: "202212_Equipo17" },
  // { name: "202212_Equipo18" },
  // { name: "202212_Equipo19" },
  // { name: "202212_Equipo20" },
  // { name: "202212_Equipo21" },
  // { name: "202212_Equipo22" },
  // { name: "202212_Equipo23" },
  // { name: "202212_Equipo24" },
  // { name: "202212_Equipo25" },
  // { name: "202212_Equipo26" },
  // { name: "202212_Equipo27" },
  // { name: "202212_Equipo28" },
  // { name: "202212_Equipo29" },
  // { name: "202212_Equipo30" },
  // { name: "202212_Equipo31" },
  // { name: "202212_Equipo32" },
  // { name: "202212_Equipo33" },
  // { name: "202212_Equipo34" },
  // { name: "202212_Equipo35" },
  // { name: "202212_Equipo36" },
  // { name: "202212_Equipo37" },
  // { name: "202212_Equipo38" },
  // { name: "202212_Equipo39" },
  // { name: "202212_Equipo40" }
];

const updateRepos = async () => {
  let out;
  try {
    for (const project of projects) {
      fs.writeFileSync("Jenkinsfile", "//Jenkinsfile");
      fs.writeFileSync("sonar-project.properties", "//Sonar properties file");

      let command1 = `git remote rm origin && git add . &&
       git commit -m "Update Jenkinsfile and sonar-project.properties" &&
       git remote add origin git@github.com:MISW-4104-Web/${project.name}.git &&
       git pull origin master &&
       git push origin master`;
      out = await execShPromise(command1, true);

      const jenkinsFile = getJenkinsFile(project.name);
      const sonarFile = getSonarFile(project.name);

      fs.writeFileSync("Jenkinsfile", jenkinsFile);
      fs.writeFileSync("sonar-project.properties", sonarFile);

      let command2 = `git remote rm origin &&
       git add . &&
       git commit -m "Update Jenkinsfile and sonar-project.properties" &&
       git remote add origin git@github.com:MISW-4104-Web/${project.name}.git &&
       git push origin master`;
      out = await execShPromise(command2, true);
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

function getSonarFile(repo) {
  const content = `sonar.host.url=http://157.253.238.75:8080/sonar-misovirtual/
  sonar.projectKey=${repo}:sonar
  sonar.projectName=${repo}
  sonar.projectVersion=1.0
  sonar.sources=src/app
  sonar.test=src/app
  sonar.test.inclusions=**/*.spec.ts
  sonar.exclusions=**/*.module.ts, **/utils/**
  sonar.ts.tslint.configPath=tslint.json
  sonar.javascript.lcov.reportPaths=coverage/front/lcov.info
  sonar.testExecutionReportPaths=reports/ut_report.xml`;

  return content;
}

function getJenkinsFile(repo) {
  const content = `pipeline {
    agent any
    environment {
       GIT_REPO = '${repo}'
       GIT_CREDENTIAL_ID = '277a9d46-cf19-4119-afd9-4054a7d35151'
       SONARQUBE_URL = 'http://172.24.100.52:8082/sonar-misovirtual'
    }
    stages {
       stage('Checkout') {
          steps {
             scmSkip(deleteBuild: true, skipPattern:'.*\\\\[ci-skip\\\\].*')


             git branch: 'master',
                credentialsId: env.GIT_CREDENTIAL_ID,
                url: 'https://github.com/MISW-4104-Web/' + env.GIT_REPO
          }
       }
       stage('Git Analysis') {
          // Run git analysis
          steps {
             script {
                docker.image('gitinspector-isis2603').inside('--entrypoint=""') {
                   sh '''
                      mkdir -p ./reports/
                      datetime=$(date +'%Y-%m-%d_%H%M%S')
                      gitinspector --file-types="cs,js,asax,ascx,asmx,aspx,html,fs,ts" --format=html --RxU -w -T -x author:Bocanegra -x author:estudiante > ./reports/index.html
                   '''
                }
             }
             withCredentials([usernamePassword(credentialsId: env.GIT_CREDENTIAL_ID, passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                sh('git config --global user.email "ci-isis2603@uniandes.edu.co"')
                sh('git config --global user.name "ci-isis2603"')
                sh('git add ./reports/index.html')
                sh('git commit -m "[ci-skip] GitInspector report added"')
                sh('git pull https://\${GIT_USERNAME}:\${GIT_PASSWORD}@github.com/MISW-4104-Web/\${GIT_REPO} master')
                sh('git push https://\${GIT_USERNAME}:\${GIT_PASSWORD}@github.com/MISW-4104-Web/\${GIT_REPO} master')
             }
          }
       }
       stage('Build') {
          // Build app
          steps {
             script {
                docker.image('citools-isis2603:latest').inside('-u root') {
                   sh '''
                      npm i -s
                      npm i typescript@4.6.2
                      ng build
                   '''
                }
             }
          }
       }
      stage('Test') {
          steps {
             script {
                docker.image('citools-isis2603:latest').inside('-u root') {
                   sh '''
                      ng test --watch=false --code-coverage true
                      npm run sonar
                   '''
                }
             }
          }
       }
       stage('Static Analysis') {
          // Run static analysis
          steps {
             sh '''
                docker run --rm -u root -e SONAR_HOST_URL=\${SONARQUBE_URL} -v \${WORKSPACE}:/usr/src sonarsource/sonar-scanner-cli:4.3
             '''
          }
       }
    }
    post {
       always {
          // Clean workspace
          cleanWs deleteDirs: true
       }
    }
  }
  `;
  return content;
}
