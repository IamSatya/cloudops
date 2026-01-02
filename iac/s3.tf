
resource "aws_s3_bucket" "frontend" {
  bucket = "cloudops-academy-frontend"
}

resource "aws_s3_bucket_public_access_block" "block" {
  bucket = aws_s3_bucket.frontend.id
  block_public_acls = true
  block_public_policy = true
  restrict_public_buckets = true
  ignore_public_acls = true
}
