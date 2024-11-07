resource "aws_s3_bucket" "app" {
  bucket = var.data_bucket
}

resource "aws_s3_bucket_public_access_block" "app" {
  bucket = aws_s3_bucket.app.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Block all public access, because the application will be served through CloudFront.
resource "aws_s3_bucket_policy" "app" {
  bucket = aws_s3_bucket.app.id

  policy = <<POLICY
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Sid": "AllowCloudFrontServicePrincipalReadOnly",
          "Effect": "Allow",
          "Principal": {
            "Service": "cloudfront.amazonaws.com"
          },
          "Action": "s3:GetObject",
          "Resource": "${aws_s3_bucket.app.arn}/*",
          "Condition": {
            "StringEquals": {
              "AWS:SourceArn": "${aws_cloudfront_distribution.app.arn}"
            }
          }
        },
        {
          "Effect": "Allow",
          "Principal": {
            "Service": "cloudfront.amazonaws.com"
          },
          "Action": [
              "s3:ListBucket"
          ],
          "Resource": "${aws_s3_bucket.app.arn}",
          "Condition": {
            "StringEquals": {
              "AWS:SourceArn": "${aws_cloudfront_distribution.app.arn}"
            }
          }
        }
      ]
    }
    POLICY
}
