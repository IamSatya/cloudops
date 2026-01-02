
# CloudOps Academy - AWS Native CI/CD

A complete AWS-native CI/CD solution for deploying a Next.js application using Terraform, CodePipeline, CodeBuild, S3, and CloudFront.

## 🏗️ Architecture Overview

```
GitHub → CodePipeline → CodeBuild → S3 → CloudFront → Users
```

**Components:**
- **CodePipeline**: Orchestrates the deployment workflow
- **CodeBuild**: Builds the Next.js application
- **S3**: Hosts static files
- **CloudFront**: Global CDN with HTTPS
- **Terraform**: Infrastructure as Code

## 🚀 Quick Start

### Prerequisites

- AWS Account with admin access
- [Terraform](https://www.terraform.io/downloads) >= 1.0
- [AWS CLI](https://aws.amazon.com/cli/) configured
- GitHub repository

### Step 1: Create GitHub Connection

Create a CodeStar connection to authenticate with GitHub:

**Option A: AWS Console (Recommended)**
1. Navigate to: AWS Console → Developer Tools → Settings → Connections
2. Click "Create connection"
3. Select "GitHub" as provider
4. Name: `github-connection`
5. Click "Connect to GitHub" and authorize
6. Copy the Connection ARN

**Option B: AWS CLI**
```bash
aws codestar-connections create-connection \
  --provider-type GitHub \
  --connection-name github-connection \
  --region us-east-1
```
Then complete authorization in the AWS Console.

### Step 2: Configure Variables

```bash
cd iac
cp terraform.tfvars.example terraform.tfvars
```

Edit `terraform.tfvars`:
```hcl
github_connection_arn = "arn:aws:codestar-connections:us-east-1:123456789012:connection/abc-123"
github_repo           = "yourusername/cloudops"
github_branch         = "main"
```

### Step 3: Deploy Infrastructure

```bash
cd iac
terraform init
terraform plan
terraform apply
```

Type `yes` when prompted. Deployment takes ~5-10 minutes.

### Step 4: Access Your Site

Terraform will output your CloudFront URL:
```
website_url = "https://d1234567890.cloudfront.net"
```

## 📁 Project Structure

```
cloudops/
├── iac/                      # Terraform infrastructure
│   ├── providers.tf          # AWS provider & backend
│   ├── variables.tf          # Input variables
│   ├── outputs.tf            # Output values
│   ├── s3.tf                 # S3 buckets & policies
│   ├── cloudfront.tf         # CloudFront CDN
│   ├── codebuild.tf          # Build configuration
│   ├── codepipeline.tf       # Pipeline orchestration
│   └── terraform.tfvars.example
├── cicd/
│   └── buildspec.yml         # CodeBuild instructions
├── frontend/                 # Next.js application
│   ├── app/
│   │   └── page.tsx
│   ├── next.config.js
│   ├── package.json
│   └── tsconfig.json
└── scripts/
    └── invalidate_cloudfront.sh
```

## 🔄 CI/CD Pipeline Flow

1. **Source**: Code committed to GitHub → CodePipeline triggered
2. **Build**: 
   - CodeBuild pulls source code
   - Installs Node.js dependencies
   - Builds Next.js app (`npm run build`)
   - Syncs to S3 bucket
   - Invalidates CloudFront cache
3. **Deploy**: Content instantly available via CloudFront CDN

## 🛠️ Common Operations

### View Pipeline Status
```bash
aws codepipeline get-pipeline-state \
  --name cloudops-frontend-pipeline
```

### Manual Pipeline Trigger
```bash
aws codepipeline start-pipeline-execution \
  --name cloudops-frontend-pipeline
```

### Invalidate CloudFront Cache
```bash
# Get distribution ID
terraform output cloudfront_distribution_id

# Create invalidation
aws cloudfront create-invalidation \
  --distribution-id E1234567890ABC \
  --paths "/*"
```

### View Build Logs
```bash
# In AWS Console
CodeBuild → Build projects → cloudops-frontend-build → Build history

# Or via CLI
aws codebuild list-builds-for-project \
  --project-name cloudops-frontend-build
```

## 📊 Terraform Outputs

After successful deployment:

| Output | Description |
|--------|-------------|
| `website_url` | Full HTTPS URL of your site |
| `cloudfront_distribution_id` | CloudFront distribution ID |
| `cloudfront_domain_name` | CloudFront domain |
| `s3_bucket_name` | Frontend S3 bucket |
| `codepipeline_name` | Pipeline name |

View outputs:
```bash
cd iac
terraform output
```

## 🔒 Security Features

- ✅ S3 buckets are private (no public access)
- ✅ CloudFront OAC (Origin Access Control) for S3
- ✅ HTTPS enforced via CloudFront
- ✅ IAM roles with least-privilege policies
- ✅ S3 versioning enabled
- ✅ Secure GitHub authentication via CodeStar

## 💰 Cost Estimation

**Monthly costs (low traffic dev environment):**
- S3: ~$0.50 (5GB storage, 10k requests)
- CloudFront: ~$1-2 (10GB transfer, 100k requests)
- CodePipeline: $1 (1 active pipeline)
- CodeBuild: ~$2 (100 build minutes)

**Total: ~$5-10/month**

Free tier covers most costs for the first year.

## 🧹 Cleanup

To delete all resources:

```bash
cd iac
terraform destroy
```

**⚠️ Warning**: This permanently deletes:
- S3 buckets and all contents
- CloudFront distribution
- CodePipeline and CodeBuild projects
- All associated resources

## 🐛 Troubleshooting

### Pipeline Not Triggering
- Verify CodeStar connection status: "Available"
- Check webhook in GitHub repository settings
- Ensure branch name matches configuration

### Build Failures
- Review CodeBuild logs in AWS Console
- Verify `buildspec.yml` syntax
- Check environment variables in CodeBuild

### 404 Errors on CloudFront
- Wait 10-15 minutes for distribution to deploy
- Check S3 bucket has files in the correct structure
- Verify CloudFront origin settings

### Permission Errors
- Review IAM role policies in `codebuild.tf` and `codepipeline.tf`
- Ensure CodeBuild has S3 and CloudFront permissions

## 📚 Additional Resources

- [Terraform AWS Provider Docs](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [AWS CodePipeline User Guide](https://docs.aws.amazon.com/codepipeline/)
- [AWS CodeBuild User Guide](https://docs.aws.amazon.com/codebuild/)
- [Next.js Documentation](https://nextjs.org/docs)
- [CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)

## 📝 License

MIT

---

**Built with ❤️ for CloudOps Academy**
