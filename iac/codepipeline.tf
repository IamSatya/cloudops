
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
    location = "cloudops-artifacts-bucket"
    type = "S3"
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
        Repo  = "cloudops-academy-full"
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
      version = "1"
      configuration = {
        ProjectName = aws_codebuild_project.frontend.name
      }
    }
  }
}
