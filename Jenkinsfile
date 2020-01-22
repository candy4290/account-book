pipeline {
    agent {
        docker {
            image 'node:8'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Prod') {
            steps {
                sh 'npm run build'
            }
        }
    }
}