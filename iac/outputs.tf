output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID"
  value       = aws_cloudfront_distribution.cdn.id
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.cdn.domain_name
}

output "s3_bucket_name" {
  description = "S3 bucket name for frontend"
  value       = aws_s3_bucket.frontend.id
}

output "codepipeline_name" {
  description = "CodePipeline name"
  value       = aws_codepipeline.frontend.name
}

output "website_url" {
  description = "Website URL"
  value       = "https://${aws_cloudfront_distribution.cdn.domain_name}"
}
