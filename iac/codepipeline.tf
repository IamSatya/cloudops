
resource "aws_iam_role" "codepipeline" {
  name = "cloudops-codepipeline-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = { Service = "codepipeline.amazonaws.com" }
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_codepipeline" "frontend" {
  name = "cloudops-frontend-pipeline"
  role_arn = aws_iam_role.codepipeline.arn

  artifact_store {
    location = "cloudops-artifacts"
    type     = "S3"
  }

  stage {
    name = "Source"
    action {
      name = "GitHub"
      category = "Source"
      owner = "ThirdParty"
      provider = "GitHub"
      version = "1"
      output_artifacts = ["source"]
      configuration = {
        Owner = "ORG"
        Repo  = "cloudops-academy-aws-native"
        Branch = "main"
        OAuthToken = "REPLACE_ME"
      }
    }
  }

  stage {
    name = "Build"
    action {
      name = "CodeBuild"
      category = "Build"
      owner = "AWS"
      provider = "CodeBuild"
      input_artifacts = ["source"]
      output_artifacts = ["build_output"]
      version = "1"
      configuration = {
        ProjectName = aws_codebuild_project.frontend.name
      }
    }
  }

  stage {
    name = "Deploy"
    action {
      name = "CodeDeploy"
      category = "Deploy"
      owner = "AWS"
      provider = "CodeDeploy"
      input_artifacts = ["build_output"]
      version = "1"
      configuration = {
        ApplicationName = aws_codedeploy_app.frontend.name
        DeploymentGroupName = "default"
      }
    }
  }
}
