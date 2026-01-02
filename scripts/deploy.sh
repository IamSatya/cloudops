#!/bin/bash

# CloudOps Infrastructure Deployment Script
# This script automates the deployment of the AWS infrastructure

set -e

echo "======================================"
echo "CloudOps Infrastructure Deployment"
echo "======================================"
echo ""

# Check prerequisites
echo "Checking prerequisites..."

# Check Terraform
if ! command -v terraform &> /dev/null; then
    echo "❌ Terraform is not installed. Please install it from https://www.terraform.io/downloads"
    exit 1
fi
echo "✅ Terraform found: $(terraform version | head -n1)"

# Check AWS CLI
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it from https://aws.amazon.com/cli/"
    exit 1
fi
echo "✅ AWS CLI found: $(aws --version)"

# Check AWS credentials
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials not configured. Run 'aws configure' first."
    exit 1
fi
echo "✅ AWS credentials configured"

echo ""
echo "======================================"
echo "Step 1: Configure Variables"
echo "======================================"
echo ""

cd iac

if [ ! -f "terraform.tfvars" ]; then
    echo "Creating terraform.tfvars from example..."
    cp terraform.tfvars.example terraform.tfvars
    echo ""
    echo "⚠️  Please edit iac/terraform.tfvars with your values:"
    echo "   - github_connection_arn (create via AWS Console)"
    echo "   - github_repo (your-username/repo-name)"
    echo ""
    read -p "Press Enter after you've updated terraform.tfvars..."
else
    echo "✅ terraform.tfvars already exists"
fi

echo ""
echo "======================================"
echo "Step 2: Initialize Terraform"
echo "======================================"
echo ""

terraform init

echo ""
echo "======================================"
echo "Step 3: Validate Configuration"
echo "======================================"
echo ""

terraform validate

echo ""
echo "======================================"
echo "Step 4: Plan Infrastructure"
echo "======================================"
echo ""

terraform plan -out=tfplan

echo ""
echo "======================================"
echo "Step 5: Apply Infrastructure"
echo "======================================"
echo ""
echo "Review the plan above carefully."
read -p "Do you want to apply these changes? (yes/no): " confirm

if [ "$confirm" = "yes" ]; then
    terraform apply tfplan
    rm -f tfplan
    
    echo ""
    echo "======================================"
    echo "✅ Deployment Complete!"
    echo "======================================"
    echo ""
    terraform output
    echo ""
    echo "Your application URL:"
    terraform output -raw website_url
    echo ""
    echo ""
    echo "Note: CloudFront distribution may take 10-15 minutes to fully deploy."
else
    echo "Deployment cancelled."
    rm -f tfplan
    exit 1
fi
