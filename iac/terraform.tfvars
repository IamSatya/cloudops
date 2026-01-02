# AWS Configuration
aws_region  = "ap-south-1"
environment = "dev"

# Project Configuration added
project_name = "cloudops"

# GitHub Configuration
# Create a CodeStar connection in AWS Console first:
# AWS Console -> Developer Tools -> Settings -> Connections -> Create connection
# After creating, copy the ARN here
github_connection_arn = "arn:aws:codestar-connections:ap-south-1:471112662115:connection/86a2411e-bbcb-4f31-8736-45da6f4c8629"

# Your GitHub repository in format: owner/repo-name
github_repo = "IamSatya/cloudops"

# Branch to deploy
github_branch = "main"

