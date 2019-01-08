pipeline {
  agent {
    label 'vetsgov-general-purpose'
  }

  stages {
    stage('Checkout Code') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        sh 'bash --login -c "npm install"'
      }
    }

    stage('Test') {
      steps {
        sh 'bash --login -c "npm run test"'
      }
    }
  }
}
