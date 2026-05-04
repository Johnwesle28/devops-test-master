# Mindmeld Devops Take-home Exercise

This exercise is intended to test your knowledge and expertise of devops
tooling and commonly-used AWS products.

In this repository you'll find two directories:

* `api/` -- a simple key-value store API written in Rust
* `app/` -- a simple React frontend to interact with the KV store in a browser

The goal of the exercise is to operate a fully-functioning application stack on
AWS. Availability and resiliency are important, though your implementation does
not need to be overly elaborate. It is more important to demonstrate strong 
principles and opportunities for improvement than it is to build an exhaustive
solution. Be prepared to discuss potential improvements to your solution.

At minimum, you will need to:

* host the API
* host a Redis database for the API to communicate with
* host the frontend application and have it communicate with the API

You are free to choose whichever AWS products/services you believe will best
help you achieve the goal. We expect you to implement a solution using well-
known infrastructure as code tools, though which of those tools you use is
entirely up to you.

When you are finished with the exercise, please submit the configuration for
your solution and any documentation we might need in order to apply that
configuration.

### Application ran John And Find below Details ###


## Notes on behavior

- The app expects `src/config.json` to include:
  - `{ "apiUrl": "http://<api-host>:8080" }`
- On create (`POST /`):
  - Shows success message if key/value is stored
  - Shows duplicate-key message if API returns `409`
- On fetch (`GET /{key}`):
  - Shows fetched value when found
  - Shows "Key not found" on `404`
- The app now shows loading and error messages for better UX.

# Endpoints

- `GET /health`
  - Returns health status:
  - `200` with `{ "status": "ok" }`

- `POST /`
  - Request JSON:
	- `{ "key": "...", "value": "..." }`
  - Behavior:
	- Uses Redis `SETNX` (create only if key does not already exist)
  - Responses:
	- `201` with `{ "key": "...", "value": "...", "created": true }`
	- `409` with `{ "key": "...", "value": "...", "created": false }` when key already exists
	- `400` with `{ "error": "..." }` for invalid input
	- `500` with `{ "error": "..." }` for internal/Redis errors

- `GET /{key}`
  - Responses:
	- `200` with `{ "key": "...", "value": "..." }`
	- `404` with empty body if key is not found
	- `400` with `{ "error": "..." }` for invalid key
	- `500` with `{ "error": "..." }` for internal/Redis errors



### best practiaces provided by john for application setup and infra setup ###

Option1#
Setup for High Level using Monolithic based in EC2

1.Design the Architecture
2.Prepare the techstack
3.Setup the Infrastructure using IAAC Terraform / CloudFormation
4.Setup the CI/CD Pipeline using Jenkins & Shellscript
5.Follow the Security Best Practices for Layer7 (WAF) , Layer3 (Firewall)
6.Enable Scaling using Metrics (CPU , RAM)
7.Setup the Observability stack using Loki , Prometheus, Grafana, CloudWatch
8.Cost Optimization
9.Documentation for entire setup & process

1.Design the Architecture:

Frontend flow:
User request → WAF → CDN → Public ALB → Frontend Application → Application


Frontend - Backend flow:
User request → WAF → CDN → Public ALB → Frontend Application → Backend Application

Frontend - Backed - Database flow:
FE → BE → DB
User request → WAF → CDN → Public ALB → Frontend Application → Backend Application → DB , Kafka , Redis

Observability stack for FE -BE - DB:
FE , BE , DB:  Observability (Logs , Metrics , Traces) → Alerts (Pagerduty)

2.Prepare the techstack
    Cloud Provider: AWS
    IAAC tool: Terraform
    Application server: Apache Tomcat
    Load balancer: AWS ALB
    Server : EC2
    Certificates: AWS ACM
    DNS : Route53
    CICD Tools: Jenkins , GitHub, Shellscript
    Observability Tools: Loki , Prometheus , Grafana, Cloudwatch 
    Alerting Tools: PagerDuty , Opsgenie
    Layer7 Security: AWS WAF or any external WAF
     Layer3 Security: AWS Firewall 
     Subnet Level Security: NACL
     Server Level Security: Security Groups
     Code Quality: SonarQube
     EKS nodes scaling: AWS ASG
     Autoscaling: CPU & RAM
     Database: RDS PostgreSQL
     Caching Database: AWS EC Redis
     Environments: DEV , QA, UAT, PREPROD, PROD
     
     
3.Setup the Infrastructure using IAAC Terraform / CloudFormation
    Provider
    IAM roles
    vpc (subnets , RouteTables, IGW, NACL, NAT, EIP, )
    acm
    NACL
    SecurityGroups
    CDN
    WAF
    ALB
    RDS PostgreSQL
    EC Redis
    Cloudwatch
    SNS
    Route53
    AWS MSK (Kafka)
     
4.Setup the CI/CD Pipeline using Jenkins / Shellscripting / Ansible
Write Code → SCM →  Jenkins Build → Sonar Test → Generate Artifact→ Deploy in environments (Shellscript / Ansible) → Run application in environments ( EC2 )

IDE
GitHub / GitLab
Jenkins / Ansible
SonarQube





5.Follow the Security Best Practices for Layer7 (WAF) , Layer3 (Firewall), Code scan (Sonarqube)
 WAF
 NACL 
 Security groups
 Create Only ALB in public
 Remaining all resources in private subnets (EC2, Database, Kafka , Redis, CICD Tools, SRE Tools)
 Store Secrets / application properties in AWS Secrets Manager / AWS Parameter 

6.Enable Scaling using CPU & RAM
    Autoscaling Group: Using ASG EC2 policies

7.Setup the Observability stack using Loki , prometheus, Grafana, Cloudwatch
Logs: Loki
Metrics: Prometheus
Traces: Jeager
Visualisation: GrafanA

FLow:
App → Prometheus → Grafana
App Logs → Loki → Grafana
AWS Infra Monitoring→ CloudWatch


8.Documentation for entire setup & process
   Prepare the step by step documentation using Confluence
    Design Architectures using Draw.io

##################################################

Option 2#
Setup for High Level using micro service based & Kubernetes

1.Design the Architecture
2.Prepare the techstack
3.Setup the Infrastructure using IAAC Terraform / CloudFormation
4.Setup the CI/CD Pipeline using Jenkins / GitHub Actions / GitLab CICD / helm / ArgoCD
5.Follow the Security Best Practices for Layer7 (WAF) , Layer3 (Firewall) 
6.Enable Scaling using HPA / VPA / KEDA
7.Setup the Observability stack using Loki , prometheus, Grafana, Cloudwatch
8.Cost Optimisation
9.Documentation for entire setup & process

1.Design the Architecture:

Frontend flow:
User request → WAF → CDN → Public ALB (Ingress) → ALB Ingress Controller → Frontend K8s service → Pod → Container → Application

Frontend - Backend flow:
User request → WAF → CDN → Public ALB (Ingress) → ALB Ingress Controller → Frontend K8s service → Pod → Container → Application → Backend API

Frontend - Backed - Database flow:
FE → BE → DB
User request → WAF → CDN → Public ALB (Ingress) → ALB Ingress Controller → Frontend K8s service → Pod → Container → Application → Backend API → DB , Kafka , Redis

Observability stack for FE -BE - DB:
FE , BE , DB:  Observability (Logs , Metrics , Traces) → Alerts (Pagerduty)


2.Prepare the techstack
     Cloud Provider: AWS
     IAAC tool: Terraform
     Container Technology: Docker
     Container Orchestration: Kubernetes (EKS)
     Application server: Apache Tomcat
     Ingress: AWS ALB
     Ingress Controller: AWS ALB Ingress Controller
     Certificates: AWS ACM
     DNS : Route53
     CICD Tools: Jenkins , GitHub Actions , ArgoCD, Helm , Ansible
     Observability Tools: Loki , Prometheus , Grafana, Cloudwatch 
     Alerting Tools: PagerDuty , Opsgenie
     Layer7 Security: AWS WAF or any external WAF
     Layer3 Security: AWS Firewall
     Subnet Level Security: NACL
     Server Level Security: Security Groups
     Code Quality: SonarQube
     Codescan: AWS ECR image scan
     Docker Registry: ECR
     Container Technology: Docker
     Container Orchestration Technology: AWS EKS
     EKS nodes scaling: AWS ASG , Karpenter
     Pod scaling: HPA, VPA, KEDA
     Database: RDS PostgreSQL
     Caching Database: AWS EC Redis
     Environments: DEV , QA, UAT, PREPROD, PROD
     
     
3.Setup the Infrastructure using IAAC Terraform / CloudFormation
    Provider
    IAM roles
    vpc (subnets , RouteTables, IGW, NACL, NAT, EIP, )
    acm
    NACL
    SecurityGroups
    CDN
    WAF
    ALB
    EKS
    ECR
    RDS PostgreSQL
    EC Redis
    Cloudwatch
    SNS
    Route53
    AWS MSK (Kafka)
       
    
4.Setup the CI/CD Pipeline using Jenkins / GitHub Actions / GitLab CICD / helm / ArgoCD

Write Code → SCM →  Jenkins Build → Sonar Test → Build Docker Image → Push Docker Image (ECR) → Deploy in environments (ArgoCD/Helm) → Run application in environments ( EKS )

IDE
GitHub / GitLab
Jenkins / GitHub Actions / ArgoCD / Helm
SonarQube
ECR
EKS


5.Follow the Security Best Practices for Layer7 (WAF) , Layer3 (Firewall) , Code scan (SonarQube)
 WAF
 NACL 
 Security groups
 Create Only ALB in public
 Remaining all resources in private subnets (EKS, EC2, Database, Kafka , Redis, CICD Tools, SRE Tools)
Scan docker image using ECR scan
Store Secrets / application properties in AWS Secrets Manager / K8s Secrets / AWS Parameter 

6.Enable Scaling using HPA / VPA / KEDA
     EKS nodes scaling: AWS ASG , Karpenter
     Pod scaling: HPA, VPA, KEDA

7.Setup the Observability stack using Loki , prometheus, Grafana, Cloudwatch
Logs: Loki
Metrics: Prometheus
Traces: Jeager
Visualisation: Grafana

FLow:
App → Prometheus → Grafana
App Logs → Loki → Grafana
AWS Infra Monitoring→ CloudWatch


Option1#
Setup for High Level using Monolithic based in EC2

1.Design the Architecture
2.Prepare the techstack
3.Setup the Infrastructure using IAAC Terraform / CloudFormation
4.Setup the CI/CD Pipeline using Jenkins & Shellscript
5.Follow the Security Best Practices for Layer7 (WAF) , Layer3 (Firewall)
6.Enable Scaling using Metrics (CPU , RAM)
7.Setup the Observability stack using Loki , Prometheus, Grafana, CloudWatch
8.Cost Optimization
9.Documentation for entire setup & process

1.Design the Architecture:

Frontend flow:
User request → WAF → CDN → Public ALB → Frontend Application → Application


Frontend - Backend flow:
User request → WAF → CDN → Public ALB → Frontend Application → Backend Application

Frontend - Backed - Database flow:
FE → BE → DB
User request → WAF → CDN → Public ALB → Frontend Application → Backend Application → DB , Kafka , Redis

Observability stack for FE -BE - DB:
FE , BE , DB:  Observability (Logs , Metrics , Traces) → Alerts (Pagerduty)

2.Prepare the techstack
    Cloud Provider: AWS
    IAAC tool: Terraform
    Application server: Apache Tomcat
    Load balancer: AWS ALB
    Server : EC2
    Certificates: AWS ACM
    DNS : Route53
    CICD Tools: Jenkins , GitHub, Shellscript
    Observability Tools: Loki , Prometheus , Grafana, Cloudwatch 
    Alerting Tools: PagerDuty , Opsgenie
    Layer7 Security: AWS WAF or any external WAF
     Layer3 Security: AWS Firewall 
     Subnet Level Security: NACL
     Server Level Security: Security Groups
     Code Quality: SonarQube
     EKS nodes scaling: AWS ASG
     Autoscaling: CPU & RAM
     Database: RDS PostgreSQL
     Caching Database: AWS EC Redis
     Environments: DEV , QA, UAT, PREPROD, PROD
     
     
3.Setup the Infrastructure using IAAC Terraform / CloudFormation
    Provider
    IAM roles
    vpc (subnets , RouteTables, IGW, NACL, NAT, EIP, )
    acm
    NACL
    SecurityGroups
    CDN
    WAF
    ALB
    RDS PostgreSQL
    EC Redis
    Cloudwatch
    SNS
    Route53
    AWS MSK (Kafka)
     
4.Setup the CI/CD Pipeline using Jenkins / Shellscripting / Ansible
Write Code → SCM →  Jenkins Build → Sonar Test → Generate Artifact→ Deploy in environments (Shellscript / Ansible) → Run application in environments ( EC2 )

IDE
GitHub / GitLab
Jenkins / Ansible
SonarQube





5.Follow the Security Best Practices for Layer7 (WAF) , Layer3 (Firewall), Code scan (Sonarqube)
 WAF
 NACL 
 Security groups
 Create Only ALB in public
 Remaining all resources in private subnets (EC2, Database, Kafka , Redis, CICD Tools, SRE Tools)
 Store Secrets / application properties in AWS Secrets Manager / AWS Parameter 

6.Enable Scaling using CPU & RAM
    Autoscaling Group: Using ASG EC2 policies

7.Setup the Observability stack using Loki , prometheus, Grafana, Cloudwatch
Logs: Loki
Metrics: Prometheus
Traces: Jeager
Visualisation: Grafana

FLow:
App → Prometheus → Grafana
App Logs → Loki → Grafana
AWS Infra Monitoring→ CloudWatch


8.Documentation for entire setup & process
   Prepare the step by step documentation using Confluence
    Design Architectures using Draw.io

##################################################

Option 2#
Setup for High Level using micro service based & Kubernetes

1.Design the Architecture
2.Prepare the techstack
3.Setup the Infrastructure using IAAC Terraform / CloudFormation
4.Setup the CI/CD Pipeline using Jenkins / GitHub Actions / GitLab CICD / helm / ArgoCD
5.Follow the Security Best Practices for Layer7 (WAF) , Layer3 (Firewall) 
6.Enable Scaling using HPA / VPA / KEDA
7.Setup the Observability stack using Loki , prometheus, Grafana, Cloudwatch
8.Cost Optimisation
9.Documentation for entire setup & process

1.Design the Architecture:

Frontend flow:
User request → WAF → CDN → Public ALB (Ingress) → ALB Ingress Controller → Frontend K8s service → Pod → Container → Application

Frontend - Backend flow:
User request → WAF → CDN → Public ALB (Ingress) → ALB Ingress Controller → Frontend K8s service → Pod → Container → Application → Backend API

Frontend - Backed - Database flow:
FE → BE → DB
User request → WAF → CDN → Public ALB (Ingress) → ALB Ingress Controller → Frontend K8s service → Pod → Container → Application → Backend API → DB , Kafka , Redis

Observability stack for FE -BE - DB:
FE , BE , DB:  Observability (Logs , Metrics , Traces) → Alerts (Pagerduty)


2.Prepare the techstack
     Cloud Provider: AWS
     IAAC tool: Terraform
     Container Technology: Docker
     Container Orchestration: Kubernetes (EKS)
     Application server: Apache Tomcat
     Ingress: AWS ALB
     Ingress Controller: AWS ALB Ingress Controller
     Certificates: AWS ACM
     DNS : Route53
     CICD Tools: Jenkins , GitHub Actions , ArgoCD, Helm , Ansible
     Observability Tools: Loki , Prometheus , Grafana, Cloudwatch 
     Alerting Tools: PagerDuty , Opsgenie
     Layer7 Security: AWS WAF or any external WAF
     Layer3 Security: AWS Firewall
     Subnet Level Security: NACL
     Server Level Security: Security Groups
     Code Quality: SonarQube
     Codescan: AWS ECR image scan
     Docker Registry: ECR
     Container Technology: Docker
     Container Orchestration Technology: AWS EKS
     EKS nodes scaling: AWS ASG , Karpenter
     Pod scaling: HPA, VPA, KEDA
     Database: RDS PostgreSQL
     Caching Database: AWS EC Redis
     Environments: DEV , QA, UAT, PREPROD, PROD
     
     
3.Setup the Infrastructure using IAAC Terraform / CloudFormation
    Provider
    IAM roles
    vpc (subnets , RouteTables, IGW, NACL, NAT, EIP, )
    acm
    NACL
    SecurityGroups
    CDN
    WAF
    ALB
    EKS
    ECR
    RDS PostgreSQL
    EC Redis
    Cloudwatch
    SNS
    Route53
    AWS MSK (Kafka)
       
    
4.Setup the CI/CD Pipeline using Jenkins / GitHub Actions / GitLab CICD / helm / ArgoCD

Write Code → SCM →  Jenkins Build → Sonar Test → Build Docker Image → Push Docker Image (ECR) → Deploy in environments (ArgoCD/Helm) → Run application in environments ( EKS )

IDE
GitHub / GitLab
Jenkins / GitHub Actions / ArgoCD / Helm
SonarQube
ECR
EKS


5.Follow the Security Best Practices for Layer7 (WAF) , Layer3 (Firewall) , Code scan (SonarQube)
 WAF
 NACL 
 Security groups
 Create Only ALB in public
 Remaining all resources in private subnets (EKS, EC2, Database, Kafka , Redis, CICD Tools, SRE Tools)
Scan docker image using ECR scan
Store Secrets / application properties in AWS Secrets Manager / K8s Secrets / AWS Parameter 

6.Enable Scaling using HPA / VPA / KEDA
     EKS nodes scaling: AWS ASG , Karpenter
     Pod scaling: HPA, VPA, KEDA

7.Setup the Observability stack using Loki , prometheus, Grafana, Cloudwatch
Logs: Loki
Metrics: Prometheus
Traces: Jeager
Visualisation: Grafana

FLow:
App → Prometheus → Grafana
App Logs → Loki → Grafana
AWS Infra Monitoring→ CloudWatch


8.Documentation for entire setup & process
   Prepare the step by step documentation using Confluence
   Design Architectures using Draw.io
















