# Quick Reference Guide

## 🚀 Deployment Commands

### Initial Setup
```bash
# 1. Create CodeStar Connection (AWS Console)
AWS Console → Developer Tools → Settings → Connections → Create connection

# 2. Configure variables
cd iac
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your values

# 3. Deploy
terraform init
terraform plan
terraform apply
```

### Using Deploy Scripts
```bash
# Linux/Mac
./scripts/deploy.sh

# Windows PowerShell
.\scripts\deploy.ps1
```

## 📋 Common Commands

### View Outputs
```bash
cd iac
terraform output
terraform output -raw website_url
```

### Pipeline Operations
```bash
# Start pipeline
aws codepipeline start-pipeline-execution --name cloudops-frontend-pipeline

# Check status
aws codepipeline get-pipeline-state --name cloudops-frontend-pipeline

# List executions
aws codepipeline list-pipeline-executions --pipeline-name cloudops-frontend-pipeline
```

### CodeBuild
```bash
# List builds
aws codebuild list-builds-for-project --project-name cloudops-frontend-build

# View build details
aws codebuild batch-get-builds --ids <build-id>
```

### CloudFront
```bash
# Get distribution ID from Terraform
DIST_ID=$(cd iac && terraform output -raw cloudfront_distribution_id)

# Create invalidation
aws cloudfront create-invalidation --distribution-id $DIST_ID --paths "/*"

# List invalidations
aws cloudfront list-invalidations --distribution-id $DIST_ID
```

### S3 Operations
```bash
# Get bucket name
BUCKET=$(cd iac && terraform output -raw s3_bucket_name)

# List files
aws s3 ls s3://$BUCKET/

# Sync local files (manual deployment)
aws s3 sync frontend/out/ s3://$BUCKET/ --delete
```

## 🔧 Troubleshooting Commands

### Check AWS Identity
```bash
aws sts get-caller-identity
```

### Verify CodeStar Connection
```bash
aws codestar-connections list-connections
```

### View CloudWatch Logs
```bash
# CodeBuild logs
aws logs tail /aws/codebuild/cloudops-frontend --follow
```

### Terraform Debug
```bash
cd iac
terraform fmt        # Format files
terraform validate   # Validate syntax
terraform refresh    # Sync state with real infrastructure
terraform show       # Show current state
```

## 🗑️ Cleanup

### Destroy Infrastructure
```bash
cd iac
terraform destroy
```

### Remove State Files (after destroy)
```bash
cd iac
rm -rf .terraform
rm terraform.tfstate*
rm .terraform.lock.hcl
```

## 📊 Cost Monitoring

```bash
# View current month costs
aws ce get-cost-and-usage \
  --time-period Start=$(date -d "1 day ago" +%Y-%m-01),End=$(date +%Y-%m-%d) \
  --granularity MONTHLY \
  --metrics BlendedCost \
  --group-by Type=SERVICE

# Set up budget alert (one-time)
aws budgets create-budget \
  --account-id $(aws sts get-caller-identity --query Account --output text) \
  --budget file://budget.json
```

## 🔐 Security Checks

```bash
# List S3 bucket policies
aws s3api get-bucket-policy --bucket $BUCKET

# Check public access block
aws s3api get-public-access-block --bucket $BUCKET

# List IAM roles
aws iam list-roles --query 'Roles[?contains(RoleName, `cloudops`)]'

# View role policy
aws iam get-role-policy --role-name cloudops-codebuild-role --policy-name cloudops-codebuild-policy
```

## 📈 Monitoring

```bash
# CloudFront metrics
aws cloudwatch get-metric-statistics \
  --namespace AWS/CloudFront \
  --metric-name Requests \
  --dimensions Name=DistributionId,Value=$DIST_ID \
  --start-time $(date -u -d '1 hour ago' +%Y-%m-%dT%H:%M:%S) \
  --end-time $(date -u +%Y-%m-%dT%H:%M:%S) \
  --period 3600 \
  --statistics Sum

# Pipeline metrics
aws cloudwatch get-metric-statistics \
  --namespace AWS/CodePipeline \
  --metric-name PipelineExecutionDuration \
  --dimensions Name=PipelineName,Value=cloudops-frontend-pipeline \
  --start-time $(date -u -d '1 day ago' +%Y-%m-%dT%H:%M:%S) \
  --end-time $(date -u +%Y-%m-%dT%H:%M:%S) \
  --period 86400 \
  --statistics Average,Maximum
```

## 🔄 Update Infrastructure

```bash
cd iac

# After modifying .tf files
terraform plan
terraform apply

# Update specific resource
terraform apply -target=aws_cloudfront_distribution.cdn
```

## 📦 Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Run locally
npm run dev

# Build
npm run build

# Test build output
cd out
python -m http.server 3000
```

## Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `aws_region` | AWS region | `us-east-1` |
| `project_name` | Project name prefix | `cloudops` |
| `environment` | Environment name | `dev`, `prod` |
| `github_connection_arn` | CodeStar connection ARN | `arn:aws:codestar-connections:...` |
| `github_repo` | GitHub repository | `username/repo` |
| `github_branch` | Git branch | `main` |
