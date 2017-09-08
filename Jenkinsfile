pipeline {
  agent any

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

    stage('Build') {
      steps {
        sh 'bash --login -c "npm run build"'
      }
    }

    stage('Test') {
      steps {
        sh 'bash --login -c "npm run test"'
      }
    }
  }
}
