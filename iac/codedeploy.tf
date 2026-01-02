
resource "aws_iam_role" "codedeploy" {
  name = "cloudops-codedeploy-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = { Service = "codedeploy.amazonaws.com" }
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_codedeploy_app" "frontend" {
  name = "cloudops-frontend"
  compute_platform = "Server"
}
