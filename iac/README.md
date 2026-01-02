# CloudOps Infrastructure

This project provisions a complete AWS infrastructure for deploying a Next.js frontend application using AWS native CI/CD services.

## Architecture

The infrastructure includes:
- **S3**: Storage for the static frontend and pipeline artifacts
- **CloudFront**: CDN for global content delivery
- **CodePipeline**: Orchestrates the CI/CD workflow
- **CodeBuild**: Builds the Next.js application
- **IAM**: Roles and policies for secure service integration

## Prerequisites

1. **AWS Account** with appropriate permissions
2. **Terraform** >= 1.0 installed
3. **AWS CLI** configured with credentials
4. **GitHub Repository** for your code
5. **CodeStar Connection** to GitHub (see setup below)

## Setup Instructions

### 1. Create GitHub Connection

Before deploying, create a CodeStar connection to GitHub:

```bash
# Via AWS Console (Recommended):
# 1. Go to AWS Console -> Developer Tools -> Settings -> Connections
# 2. Click "Create connection"
# 3. Choose "GitHub" as provider
# 4. Name it (e.g., "github-connection")
# 5. Click "Connect to GitHub" and authorize
# 6. Copy the connection ARN

# Via AWS CLI:
aws codestar-connections create-connection \
  --provider-type GitHub \
  --connection-name github-connection

# Then complete the handshake in the AWS Console
```

### 2. Configure Terraform Variables

```bash
cd iac
cp terraform.tfvars.example terraform.tfvars
```

Edit `terraform.tfvars` with your values:
```hcl
aws_region            = "us-east-1"
environment           = "dev"
project_name          = "cloudops"
github_connection_arn = "arn:aws:codestar-connections:us-east-1:ACCOUNT_ID:connection/CONNECTION_ID"
github_repo           = "your-username/your-repo"
github_branch         = "main"
```

### 3. Deploy Infrastructure

```bash
cd iac

# Initialize Terraform
terraform init

# Review the plan
terraform plan

# Apply the configuration
terraform apply
```

### 4. Access Your Application

After deployment completes, Terraform will output:
```
cloudfront_domain_name = "d1234567890.cloudfront.net"
website_url = "https://d1234567890.cloudfront.net"
```

Visit the `website_url` to see your deployed application.

## CI/CD Pipeline

The pipeline automatically triggers on commits to your configured branch:

1. **Source Stage**: Fetches code from GitHub via CodeStar connection
2. **Build Stage**: 
   - Installs Node.js dependencies
   - Builds the Next.js application
   - Syncs build artifacts to S3
   - Invalidates CloudFront cache

## Project Structure

```
.
├── iac/                    # Terraform infrastructure code
│   ├── providers.tf        # AWS provider configuration
│   ├── variables.tf        # Input variables
│   ├── outputs.tf          # Output values
│   ├── s3.tf              # S3 buckets configuration
│   ├── cloudfront.tf      # CloudFront CDN setup
│   ├── codebuild.tf       # CodeBuild project
│   └── codepipeline.tf    # CodePipeline orchestration
├── cicd/
│   └── buildspec.yml      # CodeBuild build specification
├── frontend/              # Next.js application
│   ├── app/
│   ├── next.config.js
│   └── package.json
└── scripts/
    └── invalidate_cloudfront.sh
```

## Terraform Outputs

After deployment, useful outputs include:
- `cloudfront_distribution_id`: For manual cache invalidation
- `cloudfront_domain_name`: Your CDN domain
- `s3_bucket_name`: Frontend bucket name
- `codepipeline_name`: CI/CD pipeline name
- `website_url`: Full HTTPS URL to your site

## Manual Operations

### Invalidate CloudFront Cache

```bash
aws cloudfront create-invalidation \
  --distribution-id $(terraform output -raw cloudfront_distribution_id) \
  --paths "/*"
```

### Trigger Pipeline Manually

```bash
aws codepipeline start-pipeline-execution \
  --name $(terraform output -raw codepipeline_name)
```

### View Pipeline Status

```bash
aws codepipeline get-pipeline-state \
  --name $(terraform output -raw codepipeline_name)
```

## Costs

This infrastructure uses:
- S3 (Standard storage + requests)
- CloudFront (Data transfer + requests)
- CodePipeline (1 active pipeline)
- CodeBuild (Build minutes)

Estimated cost: ~$5-10/month for low traffic development environment.

## Cleanup

To destroy all resources:

```bash
cd iac
terraform destroy
```

**Note**: This will delete all resources including S3 buckets and their contents.

## Troubleshooting

### Pipeline Fails at Source Stage
- Verify CodeStar connection is in "Available" status
- Check repository and branch names are correct
- Ensure connection has proper GitHub permissions

### Build Fails
- Check CodeBuild logs in AWS Console
- Verify Node.js version matches buildspec.yml
- Review environment variables in codebuild.tf

### CloudFront Not Serving Latest Content
- Run cache invalidation manually
- Check S3 bucket has latest files
- Verify CloudFront OAC permissions

## Security Notes

- S3 buckets are private with access only via CloudFront
- All HTTP traffic is redirected to HTTPS
- IAM roles follow least-privilege principle
- Bucket versioning is enabled for disaster recovery
- Never commit `terraform.tfvars` with sensitive values

## License

MIT
