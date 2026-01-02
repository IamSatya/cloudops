
resource "aws_iam_role" "codebuild" {
  name = "cloudops-codebuild-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = { Service = "codebuild.amazonaws.com" }
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_codebuild_project" "frontend" {
  name = "cloudops-frontend-build"
  service_role = aws_iam_role.codebuild.arn
  artifacts { type = "NO_ARTIFACTS" }
  environment {
    compute_type = "BUILD_GENERAL1_SMALL"
    image = "aws/codebuild/standard:7.0"
    type = "LINUX_CONTAINER"
    environment_variable {
      name = "S3_BUCKET"
      value = aws_s3_bucket.frontend.bucket
    }
    environment_variable {
      name = "CF_ID"
      value = aws_cloudfront_distribution.cdn.id
    }
  }
  source {
    type = "GITHUB"
    location = "https://github.com/ORG/cloudops-academy-full"
    buildspec = file("${path.module}/../cicd/buildspec.yml")
  }
}
