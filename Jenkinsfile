pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'wicare'
        HOST = "${env.HOST}"
        DATABASE_NAME_MYSQL = "${env.DATABASE_NAME_MYSQL}"
        DATABASE_PASSWORD_MYSQL = "${env.DATABASE_PASSWORD_MYSQL}"
        DATABASE_USER_MYSQL = "${env.DATABASE_USER_MYSQL}"
        SECRET = "${env.SECRET}"
        AWS_REGION="${env.AWS_REGION}"
        S3_BUCKET_NAME="${env.S3_BUCKET_NAME}"
        S3_FOLDER="${env.S3_FOLDER}"

    }

    stages {
        stage('Build') {
            steps {
                script {
                    docker.build(DOCKER_IMAGE)
                    
                }
            }
        }
        stage('Install') {
            steps {
                script {
                    docker.image(DOCKER_IMAGE).inside('-u root') {
                        
                        sh 'npm install --unsafe-perm'
                    }
                }
            }
        }
        stage('Stop and remove Docker container') {
            steps {
                script {
                    def PORT = 3000
                    def CONTAINER_ID = sh(
                        script: "docker ps -q --filter 'expose=${PORT}/tcp'",
                        returnStdout: true
                    ).trim()
                    
                    if (CONTAINER_ID) {
                        echo "Stopping container using port $PORT..."
                        sh "docker stop $CONTAINER_ID"
                        echo "Removing container using port $PORT..."
                        sh "docker rm $CONTAINER_ID"
                    } else {
                        echo "No container found using port $PORT."
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    docker.image(DOCKER_IMAGE).run('-d -p 3000:3000 ' +
                            "-e HOST=${HOST} " +
                            "-e SECRET=${SECRET} " +
                            "-e DATABASE_NAME_MYSQL=${DATABASE_NAME_MYSQL} " +
                            "-e DATABASE_PASSWORD_MYSQL=${DATABASE_PASSWORD_MYSQL} " +
                            "-e DATABASE_USER_MYSQL=${DATABASE_USER_MYSQL}" +
                            "-e AWS_REGION=${AWS_REGION}" +
                            "-e S3_BUCKET_NAME=${S3_BUCKET_NAME}" +
                            "-e S3_FOLDER=${S3_FOLDER}")
                }
            }
        }
    }
}