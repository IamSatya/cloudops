# CloudOps Infrastructure Deployment Script
# This script automates the deployment of the AWS infrastructure

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "CloudOps Infrastructure Deployment" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
Write-Host "Checking prerequisites..." -ForegroundColor Yellow

# Check Terraform
if (!(Get-Command terraform -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Terraform is not installed. Please install it from https://www.terraform.io/downloads" -ForegroundColor Red
    exit 1
}
$tfVersion = (terraform version | Select-Object -First 1)
Write-Host "✅ Terraform found: $tfVersion" -ForegroundColor Green

# Check AWS CLI
if (!(Get-Command aws -ErrorAction SilentlyContinue)) {
    Write-Host "❌ AWS CLI is not installed. Please install it from https://aws.amazon.com/cli/" -ForegroundColor Red
    exit 1
}
$awsVersion = (aws --version)
Write-Host "✅ AWS CLI found: $awsVersion" -ForegroundColor Green

# Check AWS credentials
try {
    aws sts get-caller-identity | Out-Null
    Write-Host "✅ AWS credentials configured" -ForegroundColor Green
} catch {
    Write-Host "❌ AWS credentials not configured. Run 'aws configure' first." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Step 1: Configure Variables" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

Set-Location -Path "$PSScriptRoot\..\iac"

if (!(Test-Path "terraform.tfvars")) {
    Write-Host "Creating terraform.tfvars from example..." -ForegroundColor Yellow
    Copy-Item terraform.tfvars.example terraform.tfvars
    Write-Host ""
    Write-Host "⚠️  Please edit iac\terraform.tfvars with your values:" -ForegroundColor Yellow
    Write-Host "   - github_connection_arn (create via AWS Console)" -ForegroundColor Yellow
    Write-Host "   - github_repo (your-username/repo-name)" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter after you've updated terraform.tfvars"
} else {
    Write-Host "✅ terraform.tfvars already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Step 2: Initialize Terraform" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

terraform init

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Step 3: Validate Configuration" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

terraform validate

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Step 4: Plan Infrastructure" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

terraform plan -out=tfplan

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Step 5: Apply Infrastructure" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Review the plan above carefully." -ForegroundColor Yellow
$confirm = Read-Host "Do you want to apply these changes? (yes/no)"

if ($confirm -eq "yes") {
    terraform apply tfplan
    Remove-Item tfplan -ErrorAction SilentlyContinue
    
    Write-Host ""
    Write-Host "======================================" -ForegroundColor Green
    Write-Host "✅ Deployment Complete!" -ForegroundColor Green
    Write-Host "======================================" -ForegroundColor Green
    Write-Host ""
    terraform output
    Write-Host ""
    Write-Host "Your application URL:" -ForegroundColor Cyan
    terraform output -raw website_url
    Write-Host ""
    Write-Host ""
    Write-Host "Note: CloudFront distribution may take 10-15 minutes to fully deploy." -ForegroundColor Yellow
} else {
    Write-Host "Deployment cancelled." -ForegroundColor Yellow
    Remove-Item tfplan -ErrorAction SilentlyContinue
    exit 1
}
